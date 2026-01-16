<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if ($user->role->name === 'Data Center Administrator') {
            $resources = Resource::with('category', 'manager')->get();
        } else {
            // Manager sees only their resources
            $resources = Resource::with('category')->where('manager_id', $user->id)->get();
        }
        
        return view('manager.resources.index', compact('resources'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return view('manager.resources.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'cpu' => 'nullable|string',
            'ram' => 'nullable|string',
            'storage' => 'nullable|string',
        ]);

        $specs = [
            'cpu' => $request->cpu,
            'ram' => $request->ram,
            'storage' => $request->storage,
        ];

        Resource::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'manager_id' => Auth::id(),
            'specifications' => $specs,
            'status' => 'available',
            'is_active' => true,
        ]);

        return redirect()->route('manager.resources.index')->with('success', 'Resource created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resource $resource)
    {
        $this->authorizeResource($resource);
        $categories = Category::all();
        return view('manager.resources.edit', compact('resource', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resource $resource)
    {
        $this->authorizeResource($resource);

        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:available,maintenance,reserved',
            'cpu' => 'nullable|string',
            'ram' => 'nullable|string',
            'storage' => 'nullable|string',
        ]);

        $specs = [
            'cpu' => $request->cpu,
            'ram' => $request->ram,
            'storage' => $request->storage,
        ];

        $resource->update([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'specifications' => $specs,
            'status' => $request->status,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect()->route('manager.resources.index')->with('success', 'Resource updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resource $resource)
    {
        $this->authorizeResource($resource);
        $resource->delete();
        return redirect()->route('manager.resources.index')->with('success', 'Resource deleted successfully.');
    }

    private function authorizeResource($resource) {
        $user = Auth::user();
        if ($user->role->name !== 'Data Center Administrator' && $resource->manager_id !== $user->id) {
            abort(403);
        }
    }
}

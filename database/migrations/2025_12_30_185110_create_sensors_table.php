<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sensors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resource_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('rack_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('type'); // temp, humidity, power, door
            $table->string('name');
            $table->string('unit')->nullable(); // C, %, W, Status
            $table->decimal('current_value', 10, 2)->nullable();
            $table->string('status')->default('normal'); // normal, warning, critical
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sensors');
    }
};

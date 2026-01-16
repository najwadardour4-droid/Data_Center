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
        Schema::table('resources', function (Blueprint $table) {
            $table->foreignId('rack_id')->nullable()->constrained()->onDelete('set null');
            $table->integer('u_position')->nullable(); // Starting U position (bottom)
            $table->integer('u_height')->nullable(); // Height in U e.g. 2U
            $table->string('model')->nullable();
            $table->string('serial_number')->nullable();
            $table->date('purchase_date')->nullable();
            $table->date('warranty_expiry')->nullable();
            $table->string('lifecycle_status')->default('deployed'); // procured, deployed, decommissioned
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resources', function (Blueprint $table) {
            $table->dropForeign(['rack_id']);
            $table->dropColumn(['rack_id', 'u_position', 'u_height', 'model', 'serial_number', 'purchase_date', 'warranty_expiry', 'lifecycle_status']);
        });
    }
};

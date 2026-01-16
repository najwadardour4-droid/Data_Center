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
        Schema::create('cloud_instances', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('provider'); // AWS, Azure, GCP
            $table->string('instance_type'); // e.g., t3.micro
            $table->string('region');
            $table->string('status'); // Running, Stopped, Terminated
            $table->decimal('cost_per_hour', 8, 4);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cloud_instances');
    }
};

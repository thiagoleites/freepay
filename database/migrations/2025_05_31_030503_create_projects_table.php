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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('value', 15, 2)->nullable(); // Valor total do projeto
            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();
            $table->string('status'); // Status do projeto (e.g., 'pending', 'in_progress', 'completed', 'cancelled')
            $table->integer('progress')->default(0); // Progresso do projeto em porcentagem
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

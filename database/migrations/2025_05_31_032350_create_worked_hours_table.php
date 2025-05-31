<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('worked_hours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            // $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Se multiplos usuarios puderem registrar (Implementar depois)
            $table->date('date');
            $table->decimal('hours', 5, 2); // Horas trabalhadas, por exemplo, 8.50 para 8 horas e 30 minutos
            $table->text('description');
            $table->boolean('billed')->default(true); // Indica se as horas foram faturadas
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('worked_hours');
    }
};

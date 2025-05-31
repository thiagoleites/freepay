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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('set null'); // Despesa vinculada a um projeto
            $table->date('expense_date');
            $table->string('description');
            $table->decimal('value', 15, 2);
            $table->string('category'); // Ex: software_assinaturas, impostos_taxas
            $table->string('supplier')->nullable(); // Fornecedor
            $table->string('payment_method')->nullable();
            $table->string('receipt_path')->nullable(); // Caminho para comprovante
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};

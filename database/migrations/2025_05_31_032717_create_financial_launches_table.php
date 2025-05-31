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
        Schema::create('financial_launches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('client_id')->nullable()->constrained()->onDelete('set null'); // Para lançamentos avulsos sem projeto
            $table->foreignId('invoice_id')->nullable()->constrained()->onDelete('set null'); // Se originado de uma fatura
            $table->string('description');
            $table->decimal('value', 15, 2);
            $table->date('launch_date'); // Data do lançamento/recebimento
            $table->string('status'); // Ex: recebido, pendente, atrasado
            $table->string('category')->nullable(); // Ex: Desenvolvimento Web, Consultoria
            $table->string('payment_method')->nullable(); // Ex: PIX, Transferência
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_launches');
    }
};

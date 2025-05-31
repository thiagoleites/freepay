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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('client_id')->constrained()->onDelete('cascade');
    $table->foreignId('project_id')->nullable()->constrained()->onDelete('set null'); // Se a fatura é para um projeto específico
    $table->foreignId('quote_id')->nullable()->constrained()->onDelete('set null'); // Se originada de um orçamento
    $table->string('invoice_number')->unique(); // Ex: FAT2024-001
    $table->date('issue_date'); // Data de Emissão
    $table->date('due_date');   // Data de Vencimento
    $table->jsonb('items');     // [{description, quantity, unit_price}, ...]
    $table->decimal('discount_value', 15, 2)->default(0);
    $table->decimal('total_value', 15, 2);
    $table->string('status'); // Ex: draft, sent, paid, overdue, cancelled
    $table->text('notes')->nullable(); // Termos de pagamento, etc.
    $table->timestamp('paid_at')->nullable(); // Data que foi marcada como paga
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

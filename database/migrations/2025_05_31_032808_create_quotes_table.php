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
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('client_id')->constrained()->onDelete('cascade');
    $table->string('quote_number')->unique(); // Ex: ORC2024-001
    $table->string('title');
    $table->date('creation_date');
    $table->date('expiry_date');
    $table->jsonb('items'); // [{description, quantity, price}, ...] - JSONB é ótimo no Postgres, TEXT no MySQL (requer serialize/deserialize)
    $table->decimal('total_value', 15, 2);
    $table->text('terms')->nullable();
    $table->string('status'); // Ex: draft, sent, approved, rejected, expired, converted_to_project
    $table->foreignId('project_id_converted_to')->nullable()->constrained('projects')->onDelete('set null'); // Se convertido
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};

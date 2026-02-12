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
    Schema::create('transactions', function (Blueprint $table) {
        $table->id();
        $table->string('title'); // Judul transaksi
        $table->decimal('amount', 15, 2); // Nominal
        $table->enum('type', ['income', 'expense']); // Tipe
        $table->date('date'); // <--- INI YG BIKIN ERROR TADI (Ketinggalan)
        $table->text('description')->nullable();
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};

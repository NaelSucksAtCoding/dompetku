<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction; // Panggil Model Transaction biar bisa dipake

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Ambil data transaksi, urutin dari yang terbaru
        $transactions = Transaction::orderBy('date', 'desc')->get();

        // 2. Hitung Total Pemasukan (Income)
        $income = Transaction::where('type', 'income')->sum('amount');

        // 3. Hitung Total Pengeluaran (Expense)
        $expense = Transaction::where('type', 'expense')->sum('amount');

        // 4. Hitung Sisa Saldo
        $balance = $income - $expense;

        // 5. Kirim semua variabel di atas ke View (tampilan)
        return view('dashboard', compact('transactions', 'income', 'expense', 'balance'));
    }

    public function store(Request $request)
    {
        // Validasi input biar user ga ngisi asal-asalan
        $request->validate([
            'title' => 'required',
            'amount' => 'required|numeric',
            'type' => 'required|in:expense,income',
            'date' => 'required|date'
        ]);

        // Simpan ke database
        Transaction::create($request->all());

        // Balik lagi ke halaman dashboard
        return redirect()->route('dashboard')->with('success', 'Transaksi berhasil disimpan!');
    }
}
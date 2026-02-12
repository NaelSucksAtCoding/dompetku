<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DompetKu - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-100 text-gray-800">

    <div class="max-w-4xl mx-auto p-4 md:p-8">
        
        <header class="mb-8 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-indigo-700">DompetKu 💰</h1>
                <p class="text-gray-500 text-sm">Kelola duit biar gak boncos.</p>
            </div>
            <div class="text-right hidden md:block">
                <span class="text-xs text-gray-400">Hari ini</span>
                <p class="font-bold text-gray-700">{{ date('d M Y') }}</p>
            </div>
        </header>

        @if(session('success'))
        <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm" role="alert">
            <p class="font-bold">Berhasil!</p>
            <p>{{ session('success') }}</p>
        </div>
        @endif

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 rounded-2xl text-white shadow-lg md:col-span-3 transform transition hover:scale-105 duration-300">
                <p class="text-blue-100 text-sm font-semibold uppercase tracking-wider">Sisa Saldo Lu</p>
                <h2 class="text-5xl font-bold mt-2">Rp {{ number_format($balance, 0, ',', '.') }}</h2>
                <div class="mt-4 flex gap-4 text-sm text-blue-100">
                    <span>Target bulan ini aman? 🤔</span>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
                <p class="text-gray-400 text-xs font-bold uppercase">Pemasukan Total</p>
                <h3 class="text-2xl font-bold text-green-600 mt-1">+ Rp {{ number_format($income, 0, ',', '.') }}</h3>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
                <p class="text-gray-400 text-xs font-bold uppercase">Pengeluaran Total</p>
                <h3 class="text-2xl font-bold text-red-600 mt-1">- Rp {{ number_format($expense, 0, ',', '.') }}</h3>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div class="lg:col-span-1">
                <div class="bg-white p-6 rounded-2xl shadow-lg sticky top-8">
                    <h3 class="text-xl font-bold mb-4 text-gray-800">Tambah Transaksi</h3>
                    <form action="{{ route('transaction.store') }}" method="POST" class="space-y-4">
                        @csrf
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                            <input type="text" name="title" placeholder="Cth: Makan Siang" class="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nominal (Rp)</label>
                            <input type="number" name="amount" placeholder="0" class="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                            <select name="type" class="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="expense">🔴 Pengeluaran</option>
                                <option value="income">🟢 Pemasukan</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                            <input type="date" name="date" class="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" value="{{ date('Y-m-d') }}" required>
                        </div>

                        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-md transform active:scale-95">
                            Simpan Data
                        </button>
                    </form>
                </div>
            </div>

            <div class="lg:col-span-2">
                <h3 class="text-xl font-bold mb-4 text-gray-800">Riwayat Terakhir</h3>
                
                <div class="space-y-4">
                    @forelse($transactions as $t)
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition duration-200">
                        <div class="flex items-center gap-4">
                            <div class="h-12 w-12 rounded-full flex items-center justify-center text-xl {{ $t->type == 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }}">
                                {{ $t->type == 'income' ? '💰' : '💸' }}
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-800">{{ $t->title }}</h4>
                                <p class="text-xs text-gray-400">{{ \Carbon\Carbon::parse($t->date)->translatedFormat('d F Y') }}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold {{ $t->type == 'income' ? 'text-green-600' : 'text-red-600' }}">
                                {{ $t->type == 'income' ? '+' : '-' }} Rp {{ number_format($t->amount, 0, ',', '.') }}
                            </p>
                        </div>
                    </div>
                    @empty
                    <div class="text-center py-10">
                        <p class="text-gray-400 text-lg">Belum ada transaksi nih bro.</p>
                        <p class="text-gray-300 text-sm">Yuk isi form di samping!</p>
                    </div>
                    @endforelse
                </div>
            </div>

        </div>
    </div>

</body>
</html>
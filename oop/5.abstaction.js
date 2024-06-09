// Abstraction (Abstraksi)
// Menyembunyikan detail implementasi dan hanya menampilkan fungsionalitas penting kepada pengguna

class Appliance {
    // Properti untuk menyimpan status apakah alat sedang berjalan atau tidak
    isRunning = false;

    // Constructor untuk menginisialisasi properti model dan type
    constructor(brand, type) {
        this.brand = brand; // Merek alat
        this.type = type; // Tipe alat
    }

    // Method untuk memulai alat
    start() {
        this.isRunning = true; // Mengubah status menjadi berjalan
    }

    // Method untuk menghentikan alat
    stop() {
        this.isRunning = false; // Mengubah status menjadi tidak berjalan
    }

    // Method untuk mendapatkan informasi tentang alat
    getInfo() {
        return `${this.brand} ${this.type} is currently running: ${this.isRunning}`;
    }
}

// Membuat instance baru dari class Appliance
const myAppliance = new Appliance("Samsung", "Washing Machine");

// Mengubah properti brand dari instance
myAppliance.brand = "LG";

// Memulai alat
myAppliance.start();

// Menampilkan informasi tentang alat
console.log(myAppliance.getInfo()); // Output: LG Washing Machine is currently running: true

// Menghentikan alat
myAppliance.stop();

// Menampilkan informasi tentang alat setelah dihentikan
console.log(myAppliance.getInfo()); // Output: LG Washing Machine is currently running: false

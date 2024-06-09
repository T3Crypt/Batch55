// Encapsulation (Enkapsulasi)
// Menyembunyikan detail implementasi dan hanya memberikan akses melalui method tertentu
// Menggunakan tanda # untuk mendeklarasikan properti private yang tidak bisa diakses dari luar class

class Computer {
    // Properti private
    #brand = "";
    #type = "";

    #isOn = false;

    // Constructor untuk menginisialisasi properti
    constructor(brand, type) {
        this.#brand = brand; // Merek komputer
        this.#type = type; // Tipe komputer
    }

    // Method untuk menyalakan komputer
    turnOn() {
        this.#isOn = true; // Mengubah status menjadi menyala
    }

    // Method untuk mematikan komputer
    turnOff() {
        this.#isOn = false; // Mengubah status menjadi mati
    }

    // Method untuk mendapatkan informasi tentang komputer
    getInfo() {
        return `${this.#brand} ${this.#type} is currently on: ${this.#isOn}`;
    }
}

// Membuat instance baru dari class Computer
const myComputer = new Computer("Apple", "MacBook Pro");

// Mencoba mengubah properti private dari luar class (tidak akan berhasil)
myComputer.brand = "Dell";

// Menyalakan komputer
myComputer.turnOn();

// Menampilkan informasi tentang komputer
console.log(myComputer.getInfo()); // Output: Apple MacBook Pro is currently on: true

// Mematikan komputer
myComputer.turnOff();

// Menampilkan informasi tentang komputer setelah dimatikan
console.log(myComputer.getInfo()); // Output: Apple MacBook Pro is currently on: false

// Class adalah bagian dari OOP (Object-Oriented Programming)
// Motorcycle adalah nama class yang kita definisikan untuk menggambarkan sebuah sepeda motor

class Motorcycle {
  // Properti dari class Motorcycle
  color = "";
  wheels = "2";
  brand = "";
  frame = "Aluminium";

  // Constructor untuk menginisialisasi properti
  constructor(color, wheels, brand) {
    // Menginisialisasi properti dengan nilai dari parameter
    this.color = color; // Warna sepeda motor
    this.wheels = wheels; // Jumlah roda sepeda motor
    this.brand = brand; // Merek sepeda motor
  }

  // Method untuk mendapatkan informasi sepeda motor dalam bentuk string
  getInfo() {
    // Menggunakan template literals untuk menyisipkan variabel ke dalam string
    return `Color: ${this.color}, Wheels: ${this.wheels}, Brand: ${this.brand}, Frame: ${this.frame}`;
  }
}

// Contoh penggunaan class Motorcycle
const myMotorcycle = new Motorcycle("Red", "2", "Honda");
console.log(myMotorcycle.getInfo());

const defaultMotorcycle = new Motorcycle();
console.log(defaultMotorcycle.getInfo());

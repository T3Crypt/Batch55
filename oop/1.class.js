// Class adalah bagian dari OOP (Object-Oriented Programming)
// Bicycle adalah nama class yang kita definisikan, bisa diubah sesuai kebutuhan

class Bicycle {
  // Properties (atribut) dari class Bicycle
  type = "";
  gears = 0;
  brand = "";
  frameMaterial = "";

  // Constructor yang menerima parameter untuk menginisialisasi properti
  constructor(type, gears, brand, frameMaterial) {
    // Mengisi properti dengan nilai dari parameter
    this.type = type; // Jenis sepeda (misalnya: Mountain, Road)
    this.gears = gears; // Jumlah gigi
    this.brand = brand; // Merek sepeda
    this.frameMaterial = frameMaterial; // Bahan rangka (misalnya: Aluminium, Carbon Fiber)
  }

  // Method untuk mendapatkan informasi sepeda dalam bentuk string
  getInfo() {
    return `This bicycle is a ${this.type} bike with ${this.gears} gears, made by ${this.brand} with a ${this.frameMaterial} frame.`;
  }
}

// Contoh penggunaan class Bicycle
const myBike = new Bicycle("Mountain", 21, "Trek", "Carbon Fiber");
console.log(myBike.getInfo());

// Inheritance (Pewarisan)
// Mewarisi properti dan metode dari parent class

class Vehicle {
  // Properti dari class Vehicle
  make = "";
  model = "";

  // Constructor untuk menginisialisasi properti
  constructor(make, model) {
    this.make = make; // Merek kendaraan
    this.model = model; // Model kendaraan
  }

  // Method untuk mendapatkan informasi kendaraan dalam bentuk string
  getInfo() {
    return `This vehicle is a ${this.make} ${this.model}`;
  }
}

// Class ElectricVehicle akan mewarisi properti dan metode dari class Vehicle (parent)
// Dengan demikian, properti dan metode dari class Vehicle dapat digunakan di dalam class ElectricVehicle
// Selain itu, kita dapat menambahkan properti baru yang spesifik untuk ElectricVehicle
class ElectricVehicle extends Vehicle {
  // Constructor yang menerima parameter tambahan untuk kapasitas baterai
  constructor(make, model, batteryCapacity) {
    // Memanggil constructor dari parent class Vehicle
    super(make, model);
    // Menambahkan properti baru dari ElectricVehicle
    this.batteryCapacity = batteryCapacity; // Kapasitas baterai dalam kWh
  }

  // Method untuk mendapatkan informasi kendaraan listrik dalam bentuk string
  getInfo() {
    // Menggunakan super untuk memanggil method getInfo dari parent class dan menambahkan informasi kapasitas baterai
    return `${super.getInfo()}. It has a battery capacity of ${this.batteryCapacity} kWh`;
  }
}

// Membuat instance baru dari class ElectricVehicle
const nissanLeaf = new ElectricVehicle("Nissan", "Leaf", 40);
// Menampilkan informasi kendaraan listrik
console.log(nissanLeaf.getInfo());

// Menampilkan objek kendaraan listrik
console.log(nissanLeaf);

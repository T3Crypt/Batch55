// Polymorphism memungkinkan kita untuk meng-extend class yang sudah di-extend sebelumnya
// Menggunakan method yang sama dengan cara yang berbeda

// Class Animal adalah class dasar yang akan di-extend oleh class lainnya
class Animal {
  constructor(name, species) {
    this.name = name; // Nama hewan
    this.species = species; // Spesies hewan
  }

  // Method untuk membuat hewan bersuara
  makeSound() {
    return `${this.name} the ${this.species} makes a sound.`;
  }
}

// Class Bird meng-extend class Animal
class Bird extends Animal {
  constructor(name, species, canFly) {
    super(name, species); // Memanggil constructor dari parent class Animal
    this.canFly = canFly; // Menambahkan properti baru untuk kemampuan terbang
  }

  // Method untuk mendapatkan informasi tentang burung
  getInfo() {
    return `${super.makeSound()} Can it fly? ${this.canFly ? 'Yes' : 'No'}`;
  }
}

// Class Parrot meng-extend class Bird
class Parrot extends Bird {
  // Method khusus untuk class Parrot
  speak() {
    return `This is a parrot named ${this.name}. ${super.getInfo()}`;
  }
}

// Membuat instance baru dari class Animal
const genericAnimal = new Animal("Generic", "Animal");
// Membuat instance baru dari class Bird
const sparrow = new Bird("Sparrow", "Bird", true);
// Membuat instance baru dari class Parrot
const polly = new Parrot("Polly", "Parrot", true);

console.log(genericAnimal.makeSound()); // Output: Generic the Animal makes a sound.
console.log(sparrow.getInfo()); // Output: Sparrow the Bird makes a sound. Can it fly? Yes
console.log(polly.speak()); // Output: This is a parrot named Polly. Polly the Parrot makes a sound. Can it fly? Yes


const arr = [2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11];
let ganjil = [];
let genap = [];

// Memisahkan angka ganjil dan genap ke dalam array yang berbeda
for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
        genap.push(arr[i]);
    } else {
        ganjil.push(arr[i]);
    }
}

function bubbleSort(arr) {
    // Memeriksa panjang array
    if (arr.length === 1) return;

    let count = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            // Swap arr[i] dengan arr[i+1]
            let temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
            count++;
        }
    }

    // Jika tidak ada pertukaran, array sudah terurut
    if (count === 0) {
        console.log("Array:", arr.join(", "));
        console.log("Ganjil:", ganjil.join(", "));
        console.log("Genap:", genap.join(", "));
        return;
    }

    // Rekursi untuk mengurutkan sisa array
    bubbleSort(arr);
}

bubbleSort(arr);

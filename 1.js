
function gambarSegitiga(alasTinggi) {
    // Cek bilangan prima
    function bilanganPrima(angka) {
        if (angka <= 1) return false;  // Bil. <= 1 bukan Bil. prima
        if (angka <= 3) return true;   // Bil. 2 dan 3 adalah Bil. prima
        if (angka % 2 === 0 || angka % 3 === 0) return false; // Bil. kelipatan 2 atau 3 bukan Bil. prima
        for (let i = 5; i * i <= angka; i += 6) {
            // Cek prime
            if (angka % i === 0 || angka % (i + 2) === 0) return false;
        }
        return true;
    }

  
    let deretPrima = [];
    let bilangan = 2; // bil prima pertama

    while (deretPrima.length < alasTinggi * (alasTinggi + 1) / 2) {
        if (bilanganPrima(bilangan)) {  // Cek bil prima
            deretPrima.push(bilangan); // masukkan ke array
        }
        bilangan++; // Memeriksa bilangan berikutnya
        // console.log(bilangan++);
    }

    let indeksPrima = 0;

    // Mencetak segitiga terbalik
    for (let i = 1; i <= alasTinggi; i++) {
        let baris = ''; 
        for (let j = 0; j < i; j++) {
            baris += deretPrima[indeksPrima++] + ' '; // Masukkan prime ke baris
        }
        console.log(baris); // Print baris
    }
}

// Contoh penggunaan fungsi
gambarSegitiga(7);

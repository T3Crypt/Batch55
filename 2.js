// Fungsi untuk menghitung diskon dan total pembayaran berdasarkan voucher
function hitungVoucher(voucher, totalBelanja) {
    let diskon = 0;
    let totalBayar = totalBelanja;
    
    if (voucher === "DumbWaysJos") {
        if (totalBelanja >= 50000) {
            diskon = totalBelanja * 0.21;
            if (diskon > 20000) {
                diskon = 20000;
            }
        }
    } else if (voucher === "DumbWaysMantap") {
        if (totalBelanja >= 80000) {
            diskon = totalBelanja * 0.30;
            if (diskon > 40000) {
                diskon = 40000;
            }
        }
    }

    totalBayar -= diskon;
    return {
        totalBayar: totalBayar,
        diskon: diskon
    };
}

// Contoh penggunaan
const hasilVoucher = hitungVoucher("DumbWaysJos", 100000); // Output: { totalBayar: 80000, diskon: 20000 }

// console.log(hitungVoucher("DumbWaysJos", 100000)); // Output: { totalBayar: 80000, diskon: 20000 }
console.log("Total Bayar : ", hasilVoucher.totalBayar);
console.log("Diskon      : ", hasilVoucher.diskon);

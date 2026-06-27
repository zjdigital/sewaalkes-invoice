// ======================================
// CALCULATOR.JS
// Invoice AI Designer
// Hitung subtotal dan grand total
// ======================================

// ======================================
// HITUNG SUBTOTAL BARIS
// ======================================

function calculateRow(row) {

    const qty = Number(
        row.querySelector(".item-qty")?.value || 0
    );

    const price = Number(
        row.querySelector(".item-price")?.value || 0
    );

    // Subtotal = Qty × Harga (durasi tidak berpengaruh)
    const subtotal = qty * price;

    const subtotalInput = row.querySelector(".item-subtotal");
    if (subtotalInput) {
        subtotalInput.value = subtotal.toLocaleString("id-ID");
    }

    row.dataset.subtotal = subtotal;

    calculateGrandTotal();
}

// ======================================
// HELPER — Update text elemen jika ada
// ======================================

function setElText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
}

// ======================================
// GRAND TOTAL
// Formula: Total Subtotal - Diskon + Biaya Antar + Biaya Ambil - DP
// ======================================

function calculateGrandTotal() {

    let totalSewa = 0;

    document.querySelectorAll("#itemTableBody tr").forEach(row => {
        totalSewa += Number(row.dataset.subtotal || 0);
    });

    const discount = Number(
        document.getElementById("discount")?.value || 0
    );
    const delivery = Number(
        document.getElementById("deliveryFee")?.value || 0
    );
    const pickup = Number(
        document.getElementById("pickupFee")?.value || 0
    );
    const dp = Number(
        document.getElementById("downPayment")?.value || 0
    );

    // Total Akhir = Total Subtotal - Diskon + Biaya Antar + Biaya Ambil - DP
    const grandTotal = totalSewa - discount + delivery + pickup - dp;

    // Update baris TOTAL di tabel
    setElText("totalSewaRow",  "Rp " + totalSewa.toLocaleString("id-ID"));

    // Update breakdown formula di ringkasan
    setElText("totalSewaLabel", "Rp " + totalSewa.toLocaleString("id-ID"));
    setElText("discountLabel",  "Rp " + discount.toLocaleString("id-ID"));
    setElText("deliveryLabel",  "Rp " + delivery.toLocaleString("id-ID"));
    setElText("pickupLabel",    "Rp " + pickup.toLocaleString("id-ID"));
    setElText("dpLabel",        "Rp " + dp.toLocaleString("id-ID"));

    // Update Total Akhir
    setElText("grandTotal",
        "Total Akhir : Rp " + grandTotal.toLocaleString("id-ID")
    );

    // Update live prompt
    if (typeof buildPrompt === "function") {
        const output = document.getElementById("promptOutput");
        if (output) output.value = buildPrompt();
    }
}

// ======================================
// EVENT LISTENER — Biaya fields
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    ["discount", "deliveryFee", "pickupFee", "downPayment"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", calculateGrandTotal);
        }
    });

});
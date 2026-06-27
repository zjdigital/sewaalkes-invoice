// ======================================
// INVOICE.JS
// Dynamic Equipment Table
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const addBtn =
    document.getElementById("addItemBtn");

    if(addBtn){

        addBtn.addEventListener(
            "click",
            addItemRow
        );

    }

    // tambah 1 baris awal
    addItemRow();

});

// ======================================
// FORMAT RUPIAH
// ======================================

function formatRupiah(number){

    return Number(number || 0)
    .toLocaleString("id-ID");

}

// ======================================
// TAMBAH BARIS
// ======================================

function addItemRow(){

    const tbody =
    document.getElementById(
    "itemTableBody"
    );

    const row =
    document.createElement("tr");

    row.innerHTML = `

        <td>
            <input
            type="text"
            class="item-name"
            placeholder="Nama Alat">
        </td>

        <td>
            <input
            type="number"
            class="item-qty"
            value="1"
            min="1">
        </td>

        <td>
            <input
            type="number"
            class="item-price"
            value="0"
            min="0">
        </td>

        <td>
            <input
            type="text"
            class="item-subtotal"
            value="0"
            readonly>
        </td>

        <td>
            <button class="btn-delete">
                <i class="fa fa-trash"></i> Hapus
            </button>
        </td>

    `;

    tbody.appendChild(row);

    bindRowEvents(row);

    calculateGrandTotal();

}

// ======================================
// EVENT BARIS
// ======================================

function bindRowEvents(row){

    const qty   = row.querySelector(".item-qty");
    const price = row.querySelector(".item-price");

    qty.addEventListener(
        "input",
        () => calculateRow(row)
    );

    price.addEventListener(
        "input",
        () => calculateRow(row)
    );

    row
    .querySelector(".btn-delete")
    .addEventListener("click", () => {

        row.remove();
        calculateGrandTotal();

    });

}

// ======================================
// HITUNG BARIS
// ======================================

function calculateRow(row){

    const qty =
    Number(
        row.querySelector(".item-qty")
        .value || 0
    );

    const price =
    Number(
        row.querySelector(".item-price")
        .value || 0
    );

    // Subtotal = Qty × Harga (durasi tidak berpengaruh)
    const subtotal = qty * price;

    row.querySelector(
    ".item-subtotal"
    ).value =
    formatRupiah(subtotal);

    row.dataset.subtotal = subtotal;

    calculateGrandTotal();

}

// ======================================
// GRAND TOTAL
// ======================================

function calculateGrandTotal(){

    let totalSewa = 0;

    document
    .querySelectorAll(
    "#itemTableBody tr"
    )
    .forEach(row => {
        totalSewa += Number(row.dataset.subtotal || 0);
    });

    // Update baris TOTAL di tabel
    const totalSewaEl = document.getElementById("totalSewaRow");
    if (totalSewaEl) {
        totalSewaEl.innerHTML = "Rp " + formatRupiah(totalSewa);
    }

    const discount =
    Number(
        document.getElementById("discount")?.value || 0
    );

    const delivery =
    Number(
        document.getElementById("deliveryFee")?.value || 0
    );

    const pickup =
    Number(
        document.getElementById("pickupFee")?.value || 0
    );

    const dp =
    Number(
        document.getElementById("downPayment")?.value || 0
    );

    // Total Akhir = Total Subtotal - Diskon + Biaya Antar + Biaya Ambil - DP
    const grandTotal = totalSewa - discount + delivery + pickup - dp;

    document.getElementById(
    "grandTotal"
    ).innerHTML =
    "Total Akhir : Rp " +
    formatRupiah(grandTotal);

}

// ======================================
// AUTO UPDATE BIAYA
// ======================================

document.addEventListener(
"input",
(e) => {

    if(
        e.target.id==="discount" ||
        e.target.id==="deliveryFee" ||
        e.target.id==="pickupFee"  ||
        e.target.id==="downPayment"
    ){
        calculateGrandTotal();
    }

});
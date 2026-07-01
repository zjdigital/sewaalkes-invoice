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

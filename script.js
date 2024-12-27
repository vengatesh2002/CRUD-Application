let selectedRow = null;

function onFormSubmit(event) {
    event.preventDefault(); // Prevent page refresh
    const formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    return {
        productCode: document.getElementById("productCode").value.trim(),
        product: document.getElementById("product").value.trim(),
        qty: document.getElementById("qty").value.trim(),
        perPrice: document.getElementById("perPrice").value.trim(),
    };
}

function insertNewRecord(data) {
    const tableBody = document.getElementById("storeList").getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    newRow.insertCell(0).textContent = data.productCode;
    newRow.insertCell(1).textContent = data.product;
    newRow.insertCell(2).textContent = data.qty;
    newRow.insertCell(3).textContent = data.perPrice;

    const actionsCell = newRow.insertCell(4);
    actionsCell.className = "actions";
    actionsCell.innerHTML = `
        <button onclick="onEdit(this)">Edit</button>
        <button class="btn-delete" onclick="onDelete(this)">Delete</button>
    `;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productCode").value = selectedRow.cells[0].textContent;
    document.getElementById("product").value = selectedRow.cells[1].textContent;
    document.getElementById("qty").value = selectedRow.cells[2].textContent;
    document.getElementById("perPrice").value = selectedRow.cells[3].textContent;
}

function updateRecord(formData) {
    selectedRow.cells[0].textContent = formData.productCode;
    selectedRow.cells[1].textContent = formData.product;
    selectedRow.cells[2].textContent = formData.qty;
    selectedRow.cells[3].textContent = formData.perPrice;
    selectedRow = null;
}

function onDelete(td) {
    if (confirm("Are you sure you want to delete this record?")) {
        const row = td.parentElement.parentElement;
        document.getElementById("storeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function resetForm() {
    document.getElementById("productCode").value = "";
    document.getElementById("product").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("perPrice").value = "";
    selectedRow = null
}
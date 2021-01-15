var selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow === null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function requireName() {
    let isValid =true;
    let nameInput = document.querySelector('[name="name"]');
    let nume = nameInput.value;
    let nameMatch = /^[a-zA-Z\s\-]+$/;
    let errorMessageOne = nameInput.nextElementSibling;
    let errorMessageTwo = nameInput.nextElementSibling.nextElementSibling;
    let errorMessageThree = nameInput.nextElementSibling.nextElementSibling.nextElementSibling;

    if (nume === "") {
        isValid = false;
        nameInput.classList.add("invalid");
        errorMessageOne.classList.add("visible");
        nameInput.classList.remove("valid");
    } else if (nume.length < 3 && (nume !== "")) {
        isValid =false;
        nameInput.classList.add("invalid");
        errorMessageTwo.classList.add("visible");
        nameInput.classList.remove("valid");
    } else if (!(nume.match(nameMatch))) {
        isValid = false;
        nameInput.classList.add("invalid");
        errorMessageThree.classList.add("visible");
        nameInput.classList.remove("valid");
    } else {
        isValid = true;
        nameInput.classList.remove("invalid");
        errorMessageOne.classList.remove("visible");
        errorMessageTwo.classList.remove("visible");
        errorMessageThree.classList.remove("visible");
        nameInput.classList.add("valid");
    }
    return isValid;
}

function requireTel() {
    let isValid = false;
    let telInput = document.querySelector('[name="tel"]');
    let errorMessage = telInput.nextElementSibling;
    let telMatch = /^\(?([0-9]{4})\)?([0-9]{3})?([0-9]{3})$/;
    let tel = telInput.value;
    if (tel.match(telMatch)) {
        isValid =true;
        telInput.classList.add("valid");
        telInput.classList.remove("invalid");
        errorMessage.classList.remove("visible");
    } else {
        isValid = false;
        telInput.classList.remove("valid");
        telInput.classList.add("invalid");
        errorMessage.classList.add("visible");

    }
    return isValid;

}
function validateContact(form,event) {
    event.preventDefault();
    let fields = document.querySelectorAll("[name]");
    for(let i = 0; i< fields.length; i++){
        let elem = fields[i];
        elem.onblur(event);
    }
    if(document.querySelector(".invalid")!== null){

    }else {
        event.preventDefault();
    }
}

function clearInvalid(elem, event) {
    let errorMessage = elem.nextElementSibling;
    elem.classList.remove("valid");
    elem.classList.remove("invalid");
    errorMessage.classList.remove("visible");

}
function digitLimit(elem, event) {
    if (elem.value.length >= 11) {
        event.preventDefault();
    }
}
function submitEnter(event) {
    if(event.key === 13){
        onFormSubmit();

    }
}
function readFormData() {
    var formData = {};
    formData["name"] = document.querySelector('[name="name"]').value;
    formData["tel"] = document.querySelector('[name="tel"]').value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("contacts").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.tel;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<button class="link-icon" type="button" onclick="onEdit(this)"><i class="fas fa-edit icon-style-1"></i></button>`;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<button class="link-icon" type="button" onclick="onDelete(this)"><i class="fas fa-trash-alt icon-style-2"></i></button>`;

}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("name").classList.remove("valid");
    document.getElementById("tel").classList.remove("valid");
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("tel").value = selectedRow.cells[1].innerHTML;
    document.getElementById("name").classList.remove("invalid");
    document.getElementById("tel").classList.remove("invalid");
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.tel;
}

function onDelete(td) {
    if (confirm('Ești sigur că vrei să ștergi acest contact?')) {
        row = td.parentElement.parentElement;
        document.getElementById("contacts").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    let isValid =false;
    if(requireName() && requireTel()){
        isValid = true;
    }
    return isValid;
    // let nameInput = document.querySelector('[name="name"]');
    // let nume = nameInput.value;
    // let nameMatch = /^[a-zA-Z\s\-]+$/;
    // let errorMessageOne = nameInput.nextElementSibling;
    // let errorMessageTwo = nameInput.nextElementSibling.nextElementSibling;
    // let errorMessageThree = nameInput.nextElementSibling.nextElementSibling.nextElementSibling;
    // isValid = true;
    // if (nume === "") {
    //     isValid = false;
    //     nameInput.classList.add("invalid");
    //     errorMessageOne.classList.add("visible");
    //     nameInput.classList.remove("valid");
    // } else if(nume.length < 3 && (nume !== "")){
    //     isValid = false;
    //     nameInput.classList.add("invalid");
    //     errorMessageTwo.classList.add("visible");
    //     nameInput.classList.remove("valid");
    // } else if(!(nume.match(nameMatch))){
    //     isValid = false;
    //     nameInput.classList.add("invalid");
    //     errorMessageThree.classList.add("visible");
    //     nameInput.classList.remove("valid");
    // } else {
    //     isValid = true;
    //     nameInput.classList.remove("invalid");
    //     errorMessageOne.classList.remove("visible");
    //     errorMessageTwo.classList.remove("visible");
    //     errorMessageThree.classList.remove("visible");
    //     nameInput.classList.add("valid");
    // }
    // return isValid;
}
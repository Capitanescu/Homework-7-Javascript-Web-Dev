
var contacts = [];
var indexEdit = -1;
function draw() {
    let str = "";
    for (let i=0; i< contacts.length ; i++){
        str += `<tr>
                       <td>${contacts[i].nameInput}</td>
                       <td>${contacts[i].phone}</td>
                       <td id="editable">
                           <button class="link-icon" type="button" onclick="editing(${i});"><i class="fas fa-edit icon-style-1"></i></button>
                       </td>
                       <td>
                           <button class="link-icon" type="button" onclick="del(${i});"><i class="fas fa-trash-alt icon-style-2"></i></button>
                       </td>
                   </tr>
                   ` ;

    }

    let list = document.querySelector("#contacts tbody");
    list.innerHTML = str;
}

function addContact() {
    let inputName = document.querySelector("[name='name']");
    let inputTel = document.querySelector("[name='phone']");
    let errorMessageOne = inputName.nextElementSibling;
    let errorMessageTwo = inputName.nextElementSibling.nextElementSibling;
    let errorMessageThree = inputName.nextElementSibling.nextElementSibling.nextElementSibling;
    let errorMessageFour = inputTel.nextElementSibling;
    let inputNameVal = inputName.value;
    let inputTelVal = inputTel.value;
    if(requireName() && requireTel() && (indexEdit === -1)){
        contacts.push(
            {
                nameInput: inputNameVal,
                phone: inputTelVal


            }
        );

        inputName.value = "";
        inputTel.value = "";
        // document.querySelector("[name='name']").classList.remove("invalid");
        // document.querySelector("[name='name']").classList.remove("valid");
        // document.querySelector("[name='phone']").classList.remove("invalid");
        // document.querySelector("[name='phone']").classList.remove("valid");



    } else {
          contacts[indexEdit] = {
              nameInput: inputNameVal,
              phone: inputTelVal
          };
          indexEdit = -1;
        // document.querySelector("[name='name']").classList.remove("valid");
        // document.querySelector("[name='name']").classList.remove("invalid");
        // document.querySelector("[name='phone']").classList.remove("valid");
        // document.querySelector("[name='phone']").classList.remove("invalid");


    }

    draw();

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
        // nameInput.classList.remove("invalid");
        errorMessageOne.classList.remove("visible");
        errorMessageTwo.classList.remove("visible");
        errorMessageThree.classList.remove("visible");
        nameInput.classList.add("valid");
    }
    return isValid;
}

function requireTel() {
    let isValid =false;
    let telInput = document.querySelector('[name="phone"]');
    let errorMessage = telInput.nextElementSibling;
    let telMatch = /^\(?([0-9]{4})\)?([0-9]{3})?([0-9]{3})$/;
    let tel = telInput.value;
    if (tel.match(telMatch)) {
        isValid =true;
        telInput.classList.add("valid");
        telInput.classList.remove("invalid");
        errorMessage.classList.remove("visible");
    } else {
         isValid =false;
        telInput.classList.remove("valid");
        telInput.classList.add("invalid");
        errorMessage.classList.add("visible");

    }
    return isValid;
}

function enterAdd(telephone,event) {
    if (event.keyCode === 13) {
        let toBuy = telephone.value;

        if(toBuy){
            addContact();
            document.querySelector("[name='name']").classList.remove("invalid");
            document.querySelector("[name='name']").classList.remove("valid");
            document.querySelector("[name='phone']").classList.remove("invalid");
            document.querySelector("[name='phone']").classList.remove("valid");
        }

    }
}

function validateForm(form,event) {
    //daca nu pun prevent default aici, pagina se reincarca mereu
    event.preventDefault();
    //declansez validarea campului din formular
    // let fields = document.querySelectorAll("[name]");
    // for(let i = 0; i < fields.length; i++){
    //     let elem = fields[i];
    //     elem.onblur(event);
    // }

    //verifica daca formularul este valid sau nu ca sa dau preventDefault()
    if(
        document.querySelectorAll(".invalid").length === 0
    /*formularul este valid*/

    ){
        document.querySelector("[name='name']").classList.remove("invalid");
        document.querySelector("[name='name']").classList.remove("valid");
        document.querySelector("[name='phone']").classList.remove("invalid");
        document.querySelector("[name='phone']").classList.remove("valid");

    } else {

        event.preventDefault();
    }
}


function clearInvalid(elem,event) {
    elem.classList.remove("valid");
    elem.classList.remove("invalid");
}

function digitLimit(elem,event) {
    if(elem.value.length>=10){
        event.preventDefault();
    }
}

function editing(idx) {
    window.indexEdit = idx;
    var contact = contacts[idx];
    document.querySelector("[name='name']").value = contact.nameInput;
    document.querySelector("[name='phone']").value = contact.phone;
    document.querySelector("[name='name']").classList.remove("invalid");
    document.querySelector("[name='phone']").classList.remove("invalid");

}

function del(idx){
    if(confirm(`Ești sigur că vrei să ștergi acest contact?`)){
        contacts.splice(idx,1);
        draw();
    }
}
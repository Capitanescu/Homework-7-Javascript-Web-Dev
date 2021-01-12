/**
 * Created by Radu on 1/11/2021.
 */


function requireName(){
    let nameInput = document.querySelector('[name="name"]');
    let nume = nameInput.value;
    let errorMessage = nameInput.nextElementSibling;

    if(nume.length >=3){
        nameInput.classList.remove("invalid");
        errorMessage.classList.remove("visible");
        nameInput.classList.add("valid");
    } else {
        nameInput.classList.add("invalid");
        errorMessage.classList.add("visible");
        nameInput.classList.remove("valid");
    }
}

function requireTel(){
    let telInput = document.querySelector('[name="tel"]');
    let errorMessage = telInput.nextElementSibling;
    let telMatch = /^\(?([0-9]{4})\)?([0-9]{3})?([0-9]{3})$/;
    let tel = telInput.value;
    if(tel.match(telMatch)){
        telInput.classList.add("valid");
        telInput.classList.remove("invalid");
        errorMessage.remove("visible");
    } else {
        telInput.classList.remove("valid");
        telInput.classList.add("invalid");
        errorMessage.classList.add("visible");

    }
}

function clearInvalid(elem,event) {
    let errorMessage = elem.nextElementSibling;
    elem.classList.remove("valid");
    elem.classList.remove("invalid");
    errorMessage.classList.remove("visible");

}
function digitLimit(elem,event) {
    if(elem.value.length>=10){
        event.preventDefault();
    }
}
function validateContact(form,event) {
    event.preventDefault();
    let fields = document.querySelectorAll("[name]");
    for(let i = 0; i< fields.length; i++){
        let elem = fields[i];
        elem.onblur(event);
    }
    console.log(fields);
    if(document.querySelector(".invalid")!== null){
    }else {
        event.preventDefault();
    }
}

function addContact() {
    let nameInput = document.querySelector("[name='name']").value;
    let telInput = document.querySelector("[name='tel']").value;
    let str = `<tr>
                       <td>${nameInput}</td>
                       <td>${telInput}</td>
                       <td>
                           <a href="#">Modifică</a>
                       </td>
                       <td>
                           <a href="#">Șterge</a>
                       </td>
                   </tr>
                   `

    document.querySelector("#contacts tbody").innerHTML += str;


}
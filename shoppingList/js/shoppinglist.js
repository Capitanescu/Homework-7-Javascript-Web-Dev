/**
 * Created by Radu on 1/15/2021.
 */
var idxEdit = -1;
var products = [];

function draw() {
    let str = "";
    for (let i=0; i< products.length ; i++){
        if(products[i].marked === "no"){
            str += `
                    <tr>
                        <td class="align-middle">${products[i].name}</td>
                        <td class="align-middle "><button onclick="bought(${i});" type="button" class="btn btn-danger btn-lg btn-style">Marked as buyed</button></td>
                    </tr>


               `
        } else {
            str += `
            
                    <tr class="strikethrough">
                        <td class="align-middle ">${products[i].name}</td>
                        <td class="align-middle "><button onclick="bought(${i});" type="button" class="btn btn-danger btn-lg btn-style">Marked as buyed</button></td>
                    </tr>
            
               `
        }


    }

    let list = document.querySelector("#zoom tbody");
    list.innerHTML = str;

}
function addProduct() {
    let input = document.querySelector("input");
    let form = document.querySelector("form");
    let inputVal = input.value;
    if(requireProduct() && (idxEdit === -1)){
        products.push(
            {
                name: inputVal,
                marked: "no"


            }
        );
        input.value = "";
        document.querySelector("[name='name']").classList.remove("invalid");
        document.querySelector("[name='name']").classList.add("valid");


    } else {
        products[idxEdit] = {
            name: inputVal,
            marked: "no"
        };
        idxEdit = -1;
        document.querySelector("[name='name']").classList.remove("valid");
        document.querySelector("[name='name']").classList.add("invalid");


    }
    draw();

}

function validateForm(form,event) {
    //daca nu pun prevent default aici, pagina se reincarca mereu
    event.preventDefault();

     //verifica daca formularul este valid sau nu ca sa dau preventDefault()
    if(
        document.querySelectorAll(".invalid").length === 0
    /*formularul este valid*/

    ){

        document.querySelector("[name='name']").classList.remove("invalid");
        document.querySelector("[name='name']").classList.remove("valid");
    } else {

        event.preventDefault();
    }
        }
function enterAdd(input,event) {
    if (event.keyCode === 13) {
        let toBuy = input.value;

        if(toBuy){
            addProduct();
            document.querySelector("[name='name']").classList.remove("invalid");
            document.querySelector("[name='name']").classList.remove("valid");
        }

    }
}

/*VALIDATION AND ERROR MESSAGES*/

function requireProduct() {
    let isValid =true;
    let nameInput = document.querySelector('[name="name"]');
    let product = nameInput.value;
    let form = document.querySelector('.add-wrap');
    let nameMatch = /^[a-zA-Z\s\-]+$/;
    let errorMessageOne = form.nextElementSibling;
    let errorMessageTwo = form.nextElementSibling.nextElementSibling;
    let errorMessageThree = form.nextElementSibling.nextElementSibling;
    if (product === "") {
        isValid = false;
        nameInput.classList.add("invalid");
        errorMessageOne.classList.add("visible");

        nameInput.classList.remove("valid");
    } else if (!(product.match(nameMatch)) &&(product !== "")){
        isValid = false;
        nameInput.classList.add("invalid");
        errorMessageThree.classList.add("visible");
        nameInput.classList.remove("valid");
    } else if ((product.length < 3) &&(product.match(nameMatch))){
        isValid =false;
        nameInput.classList.add("invalid");
        errorMessageTwo.classList.add("visible");
        nameInput.classList.remove("valid");
    }  else {
        isValid = true;
        nameInput.classList.remove("invalid");
        errorMessageOne.classList.remove("visible");
        errorMessageTwo.classList.remove("visible");
        errorMessageThree.classList.remove("visible");
        nameInput.classList.add("valid");
    }
    return isValid;
}

function clearInvalid() {
    let form = document.querySelector(".add-wrap");
    let inputName = document.querySelector("input");
    let errorMessage = form.nextElementSibling;
    inputName.classList.remove("valid");
    inputName.classList.remove("invalid");
    errorMessage.classList.remove("visible");
}

 function bought(idx) {
    if(products[idx].marked === "no"){
        products[idx].marked = "yes";
        draw();
    } else {
        products[idx].marked = "no";
        draw();
    }
 }
function sort(direction){
    if(direction === "az"){
        products.sort(function(a,b){
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });
    } else {
        products.sort(function(a,b){
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }

            return 0;
        });
    }
    draw();
}


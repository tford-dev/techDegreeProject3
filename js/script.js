const form            = document.querySelector("form");
const nameField       = document.getElementById("name");
const emailField      = document.getElementById("email")
const jobTitle        = document.getElementById("title");
const otherJobRole    = document.getElementById("other-job-role");
const shirtDesign     = document.getElementById("design");
const colorDiv        = document.getElementById("shirt-colors")
const shirtColor      = document.getElementById("color");
const colorMenu       = shirtColor.children;
const activitiesField = document.getElementById("activities");
const activitiesBox   = document.getElementById("activities-box");
const activities      = activitiesBox.children;
const checkbox        = document.querySelectorAll("input[type=checkbox]");
const mainCon         = document.querySelector("input[name=all]");
const activitiesCost  = document.getElementById("activities-cost");
const creditCard      = document.getElementById("credit-card");
const bitcoin         = document.getElementById("bitcoin");
const payPal          = document.getElementById("paypal");
const paySelect       = document.getElementById("payment");
const expYear         = document.getElementById("exp-year");
const expMonth        = document.getElementById("exp-month");
const payMethods      = document.querySelector(".payment-methods");
const zipCode         = document.getElementById("zip");
const cvv             = document.getElementById("cvv");
const ccNum           = document.getElementById("cc-num");
const hint            = document.getElementsByClassName("hint");
let priceTotal        = 0;

//function to focus on name field when page is loaded
const defaultPrompt = () => {
    nameField.focus();
}

//Input field for "other" job role
const jobOther = () => {
    otherJobRole.style.display = "none";
    jobTitle.addEventListener("change", ()=>{
        if(jobTitle.value === "other"){
            otherJobRole.style.display = "inline";
            otherJobRole.focus();
        } else {
            otherJobRole.style.display = "none";
        }
    })
}

//Function to organize shirts based on which theme user prefers
const tShirtInfo = () => {
    colorDiv.style.display = "none"
    shirtDesign.addEventListener("change", () =>{
        if(shirtDesign.value === "js puns") {
            colorDiv.style.display = "block";
            colorMenu[1].style.display = "inline";
            colorMenu[2].style.display = "inline";
            colorMenu[3].style.display = "inline";
            colorMenu[4].style.display = "none";
            colorMenu[5].style.display = "none";
            colorMenu[6].style.display = "none";
            colorMenu[1].selected      = "selected";
        } else if (shirtDesign.value === "heart js"){
            colorDiv.style.display = "block";
            colorMenu[1].style.display = "none";
            colorMenu[2].style.display = "none";
            colorMenu[3].style.display = "none";
            colorMenu[4].style.display = "inline";
            colorMenu[5].style.display = "inline";
            colorMenu[6].style.display = "inline";
            colorMenu[4].selected      = "selected";
        }
    })
}

//Function to display price based on which activities user chooses
const totalCost = () => {
    activitiesCost.innerHTML = `Total: $${priceTotal}`;
}

//Logic to uncheck activities if users pick activities with conflicting times
const uncheck = (idx) =>{
    if(checkbox[idx].checked == true){
        checkbox[idx].checked = false;
        priceTotal -= 100;
        totalCost();
    }
}

//Function that takes 2 arguments in case user picks activities with conflicting times on Tuesday
const checkTues = (idxA, idxB) =>{
    checkbox[idxA].addEventListener("change", ()=>{
        if(checkbox[idxA].checked == true){
            uncheck(idxB);
            priceTotal += 100;
            totalCost();
        } else {
            priceTotal -= 100;
           totalCost();
        }
    });
}

//Function for when users pick activities on Wednesday
const checkWeds = (idx) =>{
    checkbox[idx].addEventListener("change", ()=>{
        if(checkbox[idx].checked == true){
            priceTotal += 100;
            totalCost();
        } else {
            priceTotal -= 100;
            totalCost();
        }
    });
}

//Funtion to call other functions for activities user chooses as well as handles logic for main conference as the main conference costs the most
const activityPrice = () => {
    mainCon.addEventListener("change", ()=>{
        if(mainCon.checked == true){
            priceTotal += 200;
            totalCost();
        } else {
            priceTotal -= 200;
            totalCost();
        }
    })
    checkTues(1, 3);
    checkTues(2, 4);
    checkTues(3, 1);
    checkTues(4, 2);
    checkWeds(5);
    checkWeds(6);
};

//function to organize information/inputs displayed on page based off of payment option
const payInfo = () => {
    paySelect.value           = "credit-card";
    payPal.style.display      = "none";
    bitcoin.style.display     = "none";
    paySelect.addEventListener("change", ()=>{
        if(paySelect.value === "credit-card"){
            creditCard.style.display  = "inline";
            payPal.style.display      = "none";
            bitcoin.style.display     = "none";
        } else if (paySelect.value === "paypal"){
            creditCard.style.display  = "none";
            bitcoin.style.display     = "none";
            payPal.style.display      = "block";
        } else if(paySelect.value === "bitcoin"){
            creditCard.style.display  = "none";
            payPal.style.display      = "none";
            bitcoin.style.display     = "block";
        };
    });
};

//===FORM VALIDATION=== 
//event argument is present in functions because these functions will be called in an event listener that has an event argument

//function that handles errors and focuses on name input field if errors occur
const nameInput = () =>{
    if(nameField.value.length == 0){
        event.preventDefault();
        hint[0].style.display = "block";
        nameField.parentElement.classList.add("not-valid")
        nameField.focus();
    }
}

//function that handles errors and focuses on email input field if errors occur
const emailInput = () =>{
    if(emailField.value.length == 0){
        event.preventDefault();
        hint[1].style.display = "block";
        emailField.parentElement.classList.add("not-valid");
        emailField.focus();
    } else if(/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailField.value) == false){ 
        event.preventDefault();
        hint[1].style.display = "block";
        emailField.parentElement.classList.add("not-valid");
        emailField.focus();
    };
}

//Function to check to see if at least one activity is chosen and to focus on activity section if left unchecked
const isChecked = () => {
    if(priceTotal === 0) {
        event.preventDefault();
        checkbox[1].focus();
        activitiesField.classList.add("not-valid");
        hint[2].style.display = "block";
    }
}

//function that handles errors and focuses on credit card input field if errors occur
const ccInput = () =>{
    if(paySelect.value === "credit-card"){
        if(expMonth.value == "Select Date"){
            event.preventDefault();
            payMethods.classList.add("not-valid");
            expMonth.focus();
        } else if(expYear.value == "Select Year"){
            event.preventDefault();
            payMethods.classList.add("not-valid");
            expYear.focus();
        } else if(/^\d{13,16}$/.test(ccNum.value) == false){
            event.preventDefault();
            hint[3].style.display = "block";
            payMethods.classList.add("not-valid");
            ccNum.focus();
        } else if(/^\d{5}$/.test(zipCode.value) == false){
            event.preventDefault();
            hint[4].style.display = "block";
            payMethods.classList.add("not-valid");
            zipCode.focus();
        } else if(/^\d{3}$/.test(cvv.value) == false){
            event.preventDefault();
            hint[5].style.display = "block";
            payMethods.classList.add("not-valid");
            cvv.focus();
        } else {
            payMethods.classList.remove("not-valid");
        }
    } else if(paySelect.value === "select method"){
        event.preventDefault();
        payMethods.classList.add("not-valid");
        paySelect.focus();
    }
}

//function to call validation/error handling functions
const validate = () =>{
    form.addEventListener("submit", (event)=>{
        nameInput();
        emailInput();
        isChecked();
        ccInput();
    });
};

//function to help user input valid information as they type and complete form
const liveValidation = () =>{
    nameField.addEventListener("keyup", ()=>{
        if(nameField.value.length < 2){
            hint[0].style.display = "block";
        } else if (nameField.value.length >= 3){
            hint[0].style.display = "none";
            nameField.parentElement.classList.remove("not-valid")
        }
    });
    emailField.addEventListener("keyup", ()=>{
        if(/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailField.value) == false){ 
            hint[1].style.display = "block"
        } else if(/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailField.value) == true){ 
            hint[1].style.display = "none"
            emailField.parentElement.classList.remove("not-valid");
        }
    });
    for(let i = 0; i < checkbox.length; i++){
        checkbox[i].addEventListener("change", ()=>{
            if(checkbox[i].checked == false){
                hint[2].style.display = "block";
            } else {
                hint[2].style.display = "none";
                activitiesField.classList.remove("not-valid");
            }
        });
    }
    ccNum.addEventListener("keyup", ()=>{
        if(/^\d{13,16}$/.test(ccNum.value) == false){
        hint[3].style.display = "block";
        } else if(/^\d{13,16}$/.test(ccNum.value) == true){
            hint[3].style.display = "none";
            payMethods.classList.remove("not-valid");}
    });
    zipCode.addEventListener("keyup", ()=>{
        if(/^\d{5}$/.test(zipCode.value) == false){
            hint[4].style.display = "block";
            } else if(/^\d{5}$/.test(zipCode.value) == true){
            hint[4].style.display = "none";
            payMethods.classList.remove("not-valid");}
    });
    cvv.addEventListener("keyup", ()=>{
        if(/^\d{3}$/.test(cvv.value) == false){
            hint[5].style.display = "block";
        } else if(/^\d{3}$/.test(cvv.value) == true){
            hint[5].style.display = "none";
            payMethods.classList.remove("not-valid");}
    });
    paySelect.addEventListener("change", ()=>{
        if(paySelect.value === "credit-card" || "paypal" || "bitcoin"){
            payMethods.classList.remove("not-valid");
        } 
    });
}

//===Better accessability for checkbox inputs===
const focus = () =>{
    for(let i = 0; i < activities.length; i++){
        checkbox[i].addEventListener("focus", ()=>{
            activities[i].classList.add("focus");
        });
        checkbox[i].addEventListener("blur", ()=>{
            activities[i].classList.remove("focus");
        });
    }
}

defaultPrompt();
jobOther();
tShirtInfo();
activityPrice();
payInfo();
validate();
liveValidation();
focus();

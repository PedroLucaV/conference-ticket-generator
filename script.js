const form = document.querySelector(".formDiv");
const emailInput = document.getElementById("emailAdress");
const fullNameInput = document.getElementById("fullName");
const githubUserInput = document.getElementById("githubUser");
const fileInput = document.getElementById("fileUp");
const fileInputDesign = document.getElementById("inpUpLoad");

form.addEventListener("submit", (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const githubRegex = /^@[a-zA-Z0-9_-]{1,39}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const validateField = (input, regex, errorMessage) => {
        const existingError = input.parentNode.querySelector(".error-container");
        if (existingError) existingError.remove();
    
        if (!regex.test(input.value.trim())) {
            event.preventDefault();
            input.classList.add("inputItemError");
    
            // Criando o contêiner de erro
            const errorContainer = document.createElement("div");
            errorContainer.classList.add("error-container");
            const errorText = document.createElement("span");
            errorText.classList.add("error");
            errorText.textContent = errorMessage;
            const errorIcon = document.createElement("img");
            errorIcon.src = "./assets/images/icon-info.svg";
            errorIcon.alt = "Info";
            errorIcon.classList.add("error-icon");
            errorContainer.appendChild(errorIcon);
            errorContainer.appendChild(errorText);
            
            input.parentNode.appendChild(errorContainer);
        } else {
            input.classList.remove("inputItemError");
        }
    };
    

    const validateFileSize = (input, box) => {
        const textBellow = document.getElementById("textBellow");
        const icon = document.getElementById("iconInfo");
        let tamanho = input.files[0].size;
        tamanho = (tamanho/1024).toFixed(2);
        if(tamanho > 500){
            event.preventDefault();
            icon.style.color = "hsl(7, 71%, 60%)"
            textBellow.style.color = "hsl(7, 71%, 60%)";
            textBellow.innerText = 'File too large. Please upload a photo under 500kb';
        }else{
        textBellow.style.color = "white";
        textBellow.innerText = 'Upload your photo (JPG or PNG, max size: 500KB).'
        }
    }
    

    validateFileSize(fileInput, fileInputDesign);
    validateField(emailInput, emailRegex, "Please enter a valid email address.");
    validateField(fullNameInput, nameRegex, "Please enter a valid full name.");
    validateField(githubUserInput, githubRegex, "Please enter a valid GitHub username (e.g., @username).");
});
const form = document.querySelector(".formDiv");
const emailInput = document.getElementById("emailAdress");
const fullNameInput = document.getElementById("fullName");
const githubUserInput = document.getElementById("githubUser");
const fileInput = document.getElementById("fileUp");
const fileInputDesign = document.getElementById("inpUpLoad");
const textBellow = document.getElementById("textBellow");
const ticket = document.getElementById("ticket-generated");
const formMain = document.getElementById("formMain");
const nameShow = document.getElementById("name");
const emailShow = document.getElementById("email");
const github = document.getElementById('github');
const nameShow1 = document.getElementById("name1");
const imgTicket = document.getElementById("img-ticket");

const showTicket = (event) => {
    event.preventDefault()
    ticket.style.display = 'flex';
    formMain.style.display = 'none';
    nameShow.innerText = fullNameInput.value;
    nameShow1.innerText = fullNameInput.value;
    github.innerText = githubUserInput.value;
    email.innerText = emailInput.value;
    const reader = new FileReader();
    reader.onload = (e) => {
        imgTicket.src = e.target.result
    }
    reader.readAsDataURL(fileInput.files[0])
}

fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];

    const setMessage = (msg, isError = false) => {
        if(isError){
            fileInputDesign.classList.remove('inpUpLoadEmpty')
            fileInputDesign.classList.add('inpUpLoadError')
            textBellow.innerText = msg;
            return textBellow.style.color = "hsl(7, 71%, 60%)";
        }
        fileInputDesign.classList.remove('inpUpLoadError')
        textBellow.innerText = msg;
        textBellow.style.color = "#fff";
        
    };

    const resetUploadUI = () => {
        fileInputDesign.innerHTML = `
            <img src="assets/images/icon-upload.svg" alt="" class="upFoto">
            <span>Drag and drop or click to upload</span>
        `;
        setMessage("Upload your photo (JPG or PNG, max size: 500KB)");
    };

    if (!file){
        return resetUploadUI()
    };
    if (!["image/jpeg", "image/png"].includes(file.type)){ 
        return setMessage("Invalid file type. Upload JPG, PNG", true);
    }
    if (file.size > 500 * 1024) {
        return setMessage("File too large. Please upload a photo under 500KB.", true);
    }

    setMessage("Upload your photo (JPG or PNG, max size: 500KB).");

    const reader = new FileReader();
    reader.onload = (e) => {
        fileInputDesign.innerHTML = `
            <div class="image-preview">
                <img src="${e.target.result}" class="avatar-preview">
                <div class="btn-group">
                    <button type="button" id="removeImage">Remove Image</button>
                    <button type="button" id="changeImage">Change Image</button>
                </div>
            </div>
        `;
        document.getElementById("removeImage").addEventListener("click", resetUploadUI);
        document.getElementById("changeImage").addEventListener("click", () => fileInput.click());
    };
    reader.readAsDataURL(file);
});

form.addEventListener("submit", (event) => {
    let isValid = true; 

    const setMessage = (msg, isError = false, isEmpty = false) => {
        if(isEmpty){
            fileInputDesign.classList.remove('inpUpLoadError')
            fileInputDesign.classList.add('inpUpLoadEmpty')
            textBellow.innerText = msg;
            textBellow.style.color = "hsl(7, 71%, 60%)";
            return;
        }
        if(isError){
            fileInputDesign.classList.remove('inpUpLoadEmpty')
            fileInputDesign.classList.add('inpUpLoadError')
            textBellow.innerText = msg;
            textBellow.style.color = "hsl(7, 71%, 60%)";
            return;
        }
        fileInputDesign.classList.remove('inpUpLoadEmpty')
        fileInputDesign.classList.remove('inpUpLoadError')
        textBellow.innerText = msg;
    };

    const file = fileInput.files[0];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const githubRegex = /^@[a-zA-Z0-9_-]{1,39}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    const validateField = (input, regex, errorMessage) => {
        const existingError = input.parentNode.querySelector(".error-container");
        if (existingError) existingError.remove();

        if (!regex.test(input.value.trim())) {
            isValid = false;
            input.classList.add("inputItemError");

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

    validateField(emailInput, emailRegex, "Please enter a valid email address.");
    validateField(fullNameInput, nameRegex, "Please enter a valid full name.");
    validateField(githubUserInput, githubRegex, "Please enter a valid GitHub username (e.g., @username).");

    if (!file) {
        isValid = false;
        setMessage("Please input a file before continue", false, true);
    } else if (!["image/jpeg", "image/png"].includes(file.type)) {
        isValid = false;
        setMessage("Invalid file type. Upload JPG, PNG", true);
    } else if (file.size > 500 * 1024) {
        isValid = false;
        setMessage("File too large. Please upload a photo under 500KB.", true);
    } else {
        setMessage("Upload your photo (JPG or PNG, max size: 500KB).");
    }

    if (!isValid) {
        event.preventDefault();
        return;
    }

    event.preventDefault();
    showTicket(event);
});

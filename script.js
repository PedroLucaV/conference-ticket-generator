const form = document.querySelector(".formDiv");
const emailInput = document.getElementById("emailAdress");
const fullNameInput = document.getElementById("fullName");
const githubUserInput = document.getElementById("githubUser");
const fileInput = document.getElementById("fileUp");
const fileInputDesign = document.getElementById("inpUpLoad");
const textBellow = document.getElementById("textBellow");
fileInput.addEventListener("change", function () {
    const icon = document.getElementById("iconInfo");
    const file = fileInput.files[0];

    const setMessage = (msg, isError = false) => {
        textBellow.innerText = msg;
        textBellow.style.color = icon.style.color = isError ? "hsl(7, 71%, 60%)" : "";
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
    const file = fileInput.files[0];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const githubRegex = /^@[a-zA-Z0-9_-]{1,39}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const validateField = (input, regex, errorMessage) => {
        const existingError = input.parentNode.querySelector(".error-container");
        if (existingError) existingError.remove();

        if (!regex.test(input.value.trim())) {
            event.preventDefault();
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
    if (!file){
        event.preventDefault();
    };
    if (!["image/jpeg", "image/png"].includes(file.type)){ 
        event.preventDefault();
    }
    if (file.size > 500 * 1024) {
        event.preventDefault();
    }
});
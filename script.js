const form = document.querySelector(".formDiv");
const emailInput = document.getElementById("emailAdress");
const fullNameInput = document.getElementById("fullName");
const githubUserInput = document.getElementById("githubUser");

form.addEventListener("submit", (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const githubRegex = /^@[a-zA-Z0-9_-]{1,39}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    const validateField = (input, regex, errorMessage) => {
        const existingError = input.parentNode.querySelector(".error");
        if (existingError) existingError.remove();

        if (!regex.test(input.value.trim())) {
            event.preventDefault();
            input.classList.add("inputItemError")
            const errorText = document.createElement("span");
            errorText.classList.add("error");
            errorText.textContent = errorMessage;
            input.parentNode.appendChild(errorText);
        } else {
            input.classList.remove("inputItemError");
        }
    };

    validateField(emailInput, emailRegex, "Please enter a valid email address.");
    validateField(fullNameInput, nameRegex, "Please enter a valid full name.");
    validateField(githubUserInput, githubRegex, "Please enter a valid GitHub username (e.g., @username).");
});
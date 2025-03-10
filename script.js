const btn = document.getElementById("btn");
const errorEmailMsg = document.getElementsByClassName('emptyMensage')

btn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('emailAdress').value;
    const emailRegex = /^[a-z0-9\._]+@[a-z]+\.[a-z]{2,3}$/;
    if(!email.match(emailRegex)){
        console.log("A");
        
    }
})

const turnOnDisplay = (ele) => {
    ele.style.display = 'inherit';
}

const turnOffDisplay = (ele) => {
    ele.style.display = 'none';
}
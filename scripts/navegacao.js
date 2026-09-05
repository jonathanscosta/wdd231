
const hamBtn = document.querySelector("#ham-btn");
const navMenu = document.querySelector("#nav-menu")

hamBtn.addEventListener("click",()=>{
    hamBtn.classList.toggle("aberto");
    navMenu.classList.toggle("aberto")

})


const menu_ham = document.querySelector("#menu_ham");
menu_ham.textContent = "≡"
menu_ham.classList.add("botao_menu")

const navegacao = document.querySelector("#navegacao");

menu_ham.addEventListener('click', ()=>{
    navegacao.classList.toggle("aberto")

    if(navegacao.classList.contains("aberto")){
        menu_ham.textContent = "x"
    }
    else{
        menu_ham.textContent = "≡"
    }
})








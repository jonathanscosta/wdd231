// BOTÃO E MENU

const hamBtn = document.querySelector("#ham-btn");

hamBtn.classList.add("botao-hamburguer");
hamBtn.textContent = "≡";

const navegacao = document.querySelector("#navegacao");

hamBtn.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");

    if (navegacao.classList.contains("aberto")) {
        hamBtn.textContent = "X";
    }
    else {
        hamBtn.textContent = "≡"
    }

})


// FOOTER

const ano = new Date().getFullYear();

document.querySelector("#anoAtual").textContent =
    `© ${ano} Câmara de Comércio`;

document.querySelector("#ultima-atualizacao").textContent =
    document.lastModified;
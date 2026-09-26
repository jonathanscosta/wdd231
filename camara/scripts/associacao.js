
// BOTÃO MENU

const hamBtn = document.querySelector("#ham-btn");

const navegacao = document.querySelector("#navegacao");

hamBtn.classList.add("botao-hamburguer");

hamBtn.textContent = "≡";


hamBtn.addEventListener("click", () => {

    navegacao.classList.toggle("aberto");

    if (navegacao.classList.contains("aberto")) {

        hamBtn.textContent = "X";

    } else {

        hamBtn.textContent = "≡";

    }

});


// FORMULÁRIO

const campoDataHora = document.querySelector("#dataHora");

const agora = new Date();

campoDataHora.value = agora.toLocaleString("pt-BR");


// ABRIR MODAIS

const linksModal = document.querySelectorAll(".cartao a");

linksModal.forEach((link) => {

    link.addEventListener("click", (evento) => {

        evento.preventDefault();

        const idModal = link.getAttribute("href");

        const modal = document.querySelector(idModal);

        modal.showModal();

    });

});


// FECHAR MODAIS

const botoesFechar =
    document.querySelectorAll(".fechar-modal");


botoesFechar.forEach((botao) => {

    botao.addEventListener("click", () => {

        const modal = botao.closest("dialog");

        modal.close();

    });

});


// FOOTER

const ano = new Date().getFullYear();

document.querySelector("#anoAtual").textContent =
    `© ${ano} Câmara de Comércio`;

document.querySelector("#ultima-atualizacao").textContent =
    document.lastModified;


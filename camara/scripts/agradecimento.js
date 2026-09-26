
// BOTÃO MENU

const hamBtn = document.querySelector("#ham-btn");

const navegacao = document.querySelector("#navegacao");

hamBtn.classList.add("botao-hamburguer");

hamBtn.textContent = "≡";


hamBtn.addEventListener("click", () => {

    navegacao.classList.toggle("aberto");

    if (navegacao.classList.contains("aberto")) {

        hamBtn.textContent = "X";

        hamBtn.setAttribute("aria-label", "Fechar menu");

    } else {

        hamBtn.textContent = "≡";

        hamBtn.setAttribute("aria-label", "Abrir menu");

    }

});


// DADOS DO FORMULÁRIO

const parametros = new URLSearchParams(window.location.search);


// MOSTRA OS DADOS ENVIADOS

document.querySelector("#resultadoNome").textContent =
    parametros.get("nome") || "";

document.querySelector("#resultadoSobrenome").textContent =
    parametros.get("sobrenome") || "";

document.querySelector("#resultadoEmail").textContent =
    parametros.get("email") || "";

document.querySelector("#resultadoTelefone").textContent =
    parametros.get("telefone") || "";

document.querySelector("#resultadoOrganizacao").textContent =
    parametros.get("organizacao") || "";

document.querySelector("#resultadoDataHora").textContent =
    parametros.get("dataHora") || "";


// FOOTER

const ano = new Date().getFullYear();

document.querySelector("#anoAtual").textContent =
    `© ${ano} Câmara de Comércio`;

document.querySelector("#ultima-atualizacao").textContent =
    document.lastModified;


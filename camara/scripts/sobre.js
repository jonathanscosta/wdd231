import { locais } from "../dados/locais.mjs"





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


// MAIN


// VERIFICANDO A DATA DA ÚLTIMA VEZ QUE O USUÁRIO ENTROU NO SISTEMA

const mensagemVisita = document.querySelector("#mensagem_visita");

const ultimaVisita = localStorage.getItem("ultimaVisita");

const agora = Date.now();

const milissegundosPorDia = 1000 * 60 * 60 * 24;


if (ultimaVisita === null) {

    mensagemVisita.textContent =
        "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";

} else {

    const diferenca = agora - Number(ultimaVisita);

    const dias = Math.floor(
        diferenca / milissegundosPorDia
    );


    if (dias < 1) {

        mensagemVisita.textContent =
            "Já voltou? Que legal!";

    } else {

        const palavraDia = dias === 1 ? "dia" : "dias";

        mensagemVisita.textContent =
            `Seu último acesso foi há ${dias} ${palavraDia}.`;

    }

}


localStorage.setItem("ultimaVisita", agora);


// CONSTRUINDO CARDS

const cards = document.querySelector("#cards")

locais.forEach((local => {

    const cartoes = document.createElement("div")
    cartoes.classList.add("cartoes")

    const img = document.createElement("img")
    img.src = local.url
    img.alt = local.nome
    img.loading = "lazy"
    img.width = 300
    img.height = 200

    const titulo = document.createElement("h2")
    titulo.textContent = local.nome

    const endereco = document.createElement("span")
    endereco.textContent = local["endereço"]
    const descricao = document.createElement("p")
    descricao.textContent = local["descrição"]

    const saiba_mais = document.createElement("button")
    saiba_mais.textContent = "Saiba mais"
    saiba_mais.classList.add("botao_saiba_mais")

    cartoes.appendChild(titulo)
    cartoes.appendChild(img)
    cartoes.appendChild(endereco)
    cartoes.appendChild(descricao)
    cartoes.appendChild(saiba_mais)
    cards.appendChild(cartoes)
}));


// FOOTER

const ano = new Date().getFullYear();

document.querySelector("#anoAtual").textContent =
    `© ${ano} Câmara de Comércio`;

document.querySelector("#ultima-atualizacao").textContent =
    document.lastModified;


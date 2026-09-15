

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

// MAIN
const botaoCard = document.querySelector("#botao-card");
const botaoLista = document.querySelector("#botao-lista");

let empresas = [];


// FUNÇÃO PARA LER JSON

async function ver_empresas() {
    const resposta = await fetch("dados/membros.json");

    empresas = await resposta.json();

    ver_cards(empresas)
}

// FUNÇÃO PARA CRIAR CARDS

function ver_cards(empresas) {
    const lista_de_empresas = document.querySelector("#lista_de_empresas");

    lista_de_empresas.innerHTML = "";

    empresas.forEach((empresa) => {

        const card = document.createElement("div");


        card.classList.add("card")
        card.innerHTML = `
            <h2>${empresa.Nome}</h2>
            <img src="${empresa.Imagem}" alt="${empresa.Nome}" loading="lazy">
            <p>${empresa.Endereço}</p>
            <p>Tel.: ${empresa.Telefone}</p>
            <p>Site: ${empresa["URL do site"]}</p>
            <p>Nível de associado: ${empresa["Nível de associação"]}</p>
            <p>Sobre: ${empresa["Outras informações"]}</p>`;

        lista_de_empresas.appendChild(card)
    })
}


// FUNÇÃO PARA CRIAR AS LISTAS

function ver_lista(empresas) {
    const lista_de_empresas = document.querySelector("#lista_de_empresas");

    lista_de_empresas.innerHTML = "";

    const tabela = document.createElement("table");

    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>Site</th>
                <th>Nível de associação</th>
            </tr>
        </thead>

        <tbody></tbody>
    `;

    const corpoTabela = tabela.querySelector("tbody");

    empresas.forEach((empresa) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${empresa.Nome}</td>
            <td>${empresa.Endereço}</td>
            <td>${empresa.Telefone}</td>
            <td>
                <a href="${empresa["URL do site"]}" target="_blank">
                    Visitar site
                </a>
            </td>
            <td>${empresa["Nível de associação"]}</td>
        `;

        corpoTabela.appendChild(linha);
    });

    lista_de_empresas.appendChild(tabela);
}

// FAZER OS BOTÕES FUNCIONAREM ENTRE LISTA E CARDS

botaoCard.addEventListener("click", () => {
    ver_cards(empresas);
});

botaoLista.addEventListener("click", () => {
    ver_lista(empresas);
});






ver_empresas();




// FOOTER

const ano = new Date().getFullYear();

document.querySelector("#anoAtual").textContent = `©${ano} Francisco Jonathan Sousa Da Costa`;

document.querySelector("#ultima-atualizacao").textContent = document.lastModified;
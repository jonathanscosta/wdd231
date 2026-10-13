import { bucar_produtos } from "./estoque.mjs";

// MENU HAMBÚRGUER


const menu_ham = document.querySelector("#menu_ham");
const navegacao = document.querySelector("#navegacao");

menu_ham.textContent = "≡";
menu_ham.classList.add("botao_menu");

menu_ham.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");

    if (navegacao.classList.contains("aberto")) {
        menu_ham.textContent = "x";
    } else {
        menu_ham.textContent = "≡";
    }
});

// MAIN COM DASHBOAD E MENU LATERAL



 // ELEMENTOS DO DASHBOARD

const dashboard = document.querySelector("#dashboard");
const menu_lateral = document.querySelector("#menu_lateral");
const menu = document.querySelector("#menu");
const cards_dashboard = document.querySelector("#cards_dashboard");

const controle_estoque = document.querySelector("#controle_estoque");

const produtos_mais_vendidos = document.querySelector(
    "#produtos_mais_vendidos"
);

// CHAVE DO LOCALSTORAGE UTILIZADA NA PÁGINA ESTOQUE

const chave_favoritos = "wayne_corp_favoritos";

// ORGANIZAR O MENU E A ÁREA DOS CARDS

menu_lateral.appendChild(menu);
dashboard.appendChild(menu_lateral);
dashboard.appendChild(cards_dashboard);


// FUNÇÃO: CRIAR UM CARD DE PRODUTO

function criar_card(produto) {

    // Criar o card principal
    const card = document.createElement("article");
    card.classList.add("card_estoque");

    // Criar o título
    const titulo = document.createElement("h2");
    titulo.textContent = produto.title;


    // Criar a quantidade em estoque
    const quantidade = document.createElement("p");
    quantidade.textContent = `Quantidade: ${produto.stock} unidades`;

    // Criar o status do estoque
    const status = document.createElement("p");
    status.classList.add("status_estoque");

    if (produto.stock < 50) {

        status.textContent = "Reabastecer";
        status.classList.add("reabastecer");

    } else {

        status.textContent = "Estoque OK";
        status.classList.add("estoque_ok");
    }

    // Adicionar os elementos ao card
    card.appendChild(titulo);
    card.appendChild(quantidade);
    card.appendChild(status);

    return card;
}


// FUNÇÃO: EXIBIR UMA LISTA DE PRODUTOS NO DASHBOARD

function mostrar_cards(lista) {

    // Limpar os cards ou mensagens anteriores
    cards_dashboard.innerHTML = "";

    // Criar um card para cada produto
    lista.forEach((produto) => {

        const card = criar_card(produto);

        cards_dashboard.appendChild(card);
    });
}


// FUNÇÃO: MOSTRAR TODOS OS PRODUTOS DO ESTOQUE

async function mostrar_estoque() {

    cards_dashboard.innerHTML = "<p>Carregando produtos...</p>";

    try {

        const produtos = await bucar_produtos();

        // Exibir todos os produtos usando os cards padronizados
        mostrar_cards(produtos);

    } catch (erro) {

        console.error("Erro ao carregar o estoque:", erro);

        cards_dashboard.innerHTML =
            "<p>Não foi possível carregar os produtos. Tente novamente.</p>";
    }
}


// FUNÇÃO: MOSTRAR OS PRODUTOS MAIS VENDIDOS

async function mostrar_mais_vendidos() {

    cards_dashboard.innerHTML =
        "<p>Carregando produtos mais vendidos...</p>";

    try {

        // Buscar os produtos da API
        const produtos = await bucar_produtos();

        // Recuperar os IDs salvos na página de estoque
        const favoritos_salvos = localStorage.getItem(chave_favoritos);

        // Transformar o conteúdo salvo em uma lista
        const favoritos = favoritos_salvos
            ? JSON.parse(favoritos_salvos)
            : [];

        // Verificar se o conteúdo salvo é uma lista válida
        if (!Array.isArray(favoritos)) {

            throw new Error("A lista de produtos mais vendidos é inválida.");
        }

        // Usar filter() para selecionar os produtos marcados
        const lista_mais_vendidos = produtos.filter(
            (produto) => favoritos.includes(produto.id)
        );

        // Verificar se existem produtos selecionados
        if (lista_mais_vendidos.length === 0) {

            cards_dashboard.innerHTML =
                "<p>Nenhum produto foi selecionado como mais vendido. " +
                "Acesse a página Estoque e selecione os produtos desejados.</p>";

            return;
        }

        // Exibir somente os produtos mais vendidos
        mostrar_cards(lista_mais_vendidos);

    } catch (erro) {

        console.error("Erro ao carregar os mais vendidos:", erro);

        cards_dashboard.innerHTML =
            "<p>Não foi possível carregar os produtos mais vendidos. Tente novamente.</p>";
    }
}


// EVENTO: CONTROLE DE ESTOQUE

controle_estoque.addEventListener("click", (evento) => {

    evento.preventDefault();

    mostrar_estoque();
});


// EVENTO: PRODUTOS MAIS VENDIDOS

produtos_mais_vendidos.addEventListener("click", (evento) => {

    evento.preventDefault();

    mostrar_mais_vendidos();
});









// FOOTER: SELECIONAR O RODAPÉ


const rodape = document.querySelector("#rodape");



// BLOCO EMPRESA


const empresa = document.querySelector("#empresa");

// Primeira linha: logo à esquerda e título à direita
const linha_empresa = document.createElement("div");
linha_empresa.classList.add("linha-empresa");

const img = document.createElement("img");
img.src = "imagens/logo_wayne.webp";
img.alt = "Logo da Wayne Corp";
img.width = 70;
img.height = 70;
img.loading = "lazy";

const titulo = document.createElement("h3");
titulo.textContent = "Wayne Corp";

const texto = document.createElement("p");
texto.textContent =
    "Sistema desenvolvido para facilitar o controle de estoque e a gestão de recursos da Wayne Corp.";

// Agrupar a logo e o título
linha_empresa.appendChild(img);
linha_empresa.appendChild(titulo);



// Segunda linha: texto à esquerda e perfil à direita
const linha_perfil = document.createElement("div");
linha_perfil.classList.add("linha-perfil");

const texto2 = document.createElement("p");
texto2.textContent = "Desenvolvido por";

const perfil = document.createElement("img");
perfil.src = "imagens/foto_perfil.webp";
perfil.alt = "Foto de perfil de Jonathan";
perfil.width = 50;
perfil.height = 50;
perfil.loading = "lazy";

// Agrupar o texto e a foto

linha_perfil.appendChild(perfil);
linha_perfil.appendChild(texto2);




// Nome do autor
const autor = document.createElement("h4");
autor.textContent = "Jonathan Costa";


// Adicionar os elementos ao bloco empresa
empresa.appendChild(linha_empresa);
empresa.appendChild(texto);
empresa.appendChild(linha_perfil);
empresa.appendChild(autor);



// BLOCO DOS VÍDEOS


const videos = document.querySelector("#videos");

const link = document.createElement("h3");
link.textContent = "Links dos vídeos";

const link_video = document.createElement("a");
link_video.href = "https://youtu.be/IEiVlAELLIw";
link_video.target = "_blank";
link_video.textContent = "Vídeo de demonstração (JavaScript)";


// Adicionar os elementos ao bloco vídeos
videos.appendChild(link);
videos.appendChild(link_video);



// BLOCO DE IDENTIFICAÇÃO DO PROJETO


const identificador = document.querySelector("#identificador");

const projeto = document.createElement("h3");
projeto.textContent = "Projeto";

const texto3 = document.createElement("p");
texto3.innerHTML =
    'Este site faz parte do projeto acadêmico da ' +
    '<strong>BYU Pathway Worldwide</strong>, ' +
    'desenvolvido como parte do curso de ' +
    'Desenvolvimento de Software WDD 231.';


// Adicionar os elementos ao bloco identificador
identificador.appendChild(projeto);
identificador.appendChild(texto3);



// BLOCO DE DIREITOS AUTORAIS


const direitos = document.querySelector("#direitos");

const ano = new Date().getFullYear();

direitos.textContent = `© ${ano} Wayne Corp | Francisco Jonathan Sousa da Costa`;



// ADICIONAR OS BLOCOS AO RODAPÉ


rodape.appendChild(empresa);
rodape.appendChild(videos);
rodape.appendChild(identificador);
rodape.appendChild(direitos);

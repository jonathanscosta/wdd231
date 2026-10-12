
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



// MAIN: PRODUTOS E FAVORITOS


// Selecionar os elementos do HTML
const botao_todos = document.querySelector("#botao_todos");
const botao_favorito = document.querySelector("#favoritos");
const lista_de_produtos = document.querySelector("#lista_de_produtos");
const mensagem = document.querySelector("#mensagem");

// Selecionar os elementos do modal
const modal_produto = document.querySelector("#modal_produto");
const titulo_modal = document.querySelector("#titulo_modal");
const descricao_produto = document.querySelector("#descricao_produto");
const fechar_modal = document.querySelector("#fechar_modal");

// Definir os textos dos botões
botao_todos.textContent = "Todos os produtos";
botao_favorito.textContent = "Todos os favoritos";

// Guardar todos os produtos recebidos da API
let produtos = [];

// Controlar qual lista está sendo exibida
let mostrar_apenas_favoritos = false;

// Nome da chave utilizada no localStorage
const chave_favoritos = "wayne_corp_favoritos";



// FUNÇÃO: BUSCAR OS FAVORITOS SALVOS


function buscar_favoritos() {
    const favoritos_salvos = localStorage.getItem(chave_favoritos);

    // Se não houver favoritos salvos, retornar uma lista vazia
    if (!favoritos_salvos) {
        return [];
    }

    try {
        const favoritos = JSON.parse(favoritos_salvos);

        // Garantir que o conteúdo salvo seja uma lista
        if (!Array.isArray(favoritos)) {
            return [];
        }

        return favoritos;
    } catch (erro) {
        console.error("Erro ao ler os favoritos:", erro);
        return [];
    }
}



// FUNÇÃO: SALVAR OS FAVORITOS


function salvar_favoritos(favoritos) {
    localStorage.setItem(
        chave_favoritos,
        JSON.stringify(favoritos)
    );
}



// FUNÇÃO: VERIFICAR SE É FAVORITO


function verificar_favorito(id_produto) {
    const favoritos = buscar_favoritos();

    return favoritos.includes(id_produto);
}



// FUNÇÃO: EXIBIR OS PRODUTOS NA TELA


function mostrar_lista(lista) {

    // Limpar os cards anteriores antes de desenhar a nova lista
    lista_de_produtos.innerHTML = "";

    // Percorrer somente os produtos da lista recebida
    lista.forEach((produto) => {

        // Criar o card
        const card = document.createElement("div");
        card.classList.add("cards");

        // Guardar o ID do produto no próprio card
        card.dataset.id = produto.id;

        // Criar o título
        const titulo = document.createElement("h2");
        titulo.textContent = produto.title;

        // Criar o preço
        const preco = document.createElement("p");
        preco.textContent = `Preço: R$ ${produto.price}`;

        // Criar a quantidade em estoque
        const quantidade = document.createElement("p");
        quantidade.textContent = `Quantidade: ${produto.stock} unidades`;

        // Criar a categoria
        const categoria = document.createElement("p");
        categoria.textContent = `Categoria: ${produto.category}`;

        // Criar o botão Saiba Mais
        const saiba_mais = document.createElement("button");
        saiba_mais.classList.add("saiba_mais");
        saiba_mais.textContent = "Saiba Mais";

        // Abrir o modal com a descrição do produto
        saiba_mais.addEventListener("click", () => {

            // Colocar o nome do produto no título do modal
            titulo_modal.textContent = produto.title;

            // Buscar a descrição que veio da API
            descricao_produto.textContent = produto.description;

            // Abrir o modal na tela
            modal_produto.showModal();
        });

        // Fechar pelo botão X
        fechar_modal.addEventListener("click", () => {
            modal_produto.close();
        });

        // Fechar ao clicar fora do conteúdo
        modal_produto.addEventListener("click", (evento) => {

            if (evento.target === modal_produto) {
                modal_produto.close();
            }
        });


        // Criar o botão de favoritos
        const botao = document.createElement("button");
        botao.classList.add("botao");

        // Verificar se o produto já está favoritado
        const ja_e_favorito = verificar_favorito(produto.id);

        // Definir o texto correto do botão
        if (ja_e_favorito) {
            botao.textContent = "Sair dos favoritos";
        } else {
            botao.textContent = "Favoritar";
        }

        // Adicionar o evento de clique ao botão
        botao.addEventListener("click", () => {

            // Buscar a lista atualizada de favoritos
            const favoritos = buscar_favoritos();

            // Verificar se o produto já está na lista
            if (favoritos.includes(produto.id)) {

                // Remover somente o ID desse produto
                const novos_favoritos = favoritos.filter(
                    (id) => id !== produto.id
                );

                // Salvar a lista atualizada
                salvar_favoritos(novos_favoritos);

            } else {

                // Adicionar o ID sem duplicar favoritos existentes
                favoritos.push(produto.id);

                // Salvar a lista atualizada
                salvar_favoritos(favoritos);
            }

            // Atualizar a tela após a alteração
            atualizar_lista();
        });

        // Adicionar os elementos ao card
        card.appendChild(titulo);
        card.appendChild(preco);
        card.appendChild(quantidade);
        card.appendChild(categoria);
        card.appendChild(saiba_mais);
        card.appendChild(botao);

        // Adicionar o card à lista de produtos
        lista_de_produtos.appendChild(card);
    });
}


// FUNÇÃO: ATUALIZAR A LISTA EXIBIDA


function atualizar_lista() {

    // Buscar os favoritos atuais
    const favoritos = buscar_favoritos();

    // Se o usuário estiver na visualização de favoritos
    if (mostrar_apenas_favoritos) {

        // Usar filter() para selecionar somente os favoritos
        const produtos_favoritos = produtos.filter(
            (produto) => favoritos.includes(produto.id)
        );

        // Mostrar somente os produtos selecionados
        mostrar_lista(produtos_favoritos);

        // Atualizar a mensagem
        mensagem.textContent =
            `${produtos_favoritos.length} produtos favoritos`;

        // Informar quando não houver favoritos
        if (produtos_favoritos.length === 0) {
            mensagem.textContent = "Você ainda não tem produtos favoritos.";
        }

    } else {

        // Mostrar novamente todos os produtos recebidos da API
        mostrar_lista(produtos);

        // Atualizar a quantidade exibida
        mensagem.textContent =
            `${produtos.length} produtos carregados`;
    }
}


// BOTÃO: TODOS OS PRODUTOS


botao_todos.addEventListener("click", () => {

    // Alterar a visualização para todos os produtos
    mostrar_apenas_favoritos = false;

    // Atualizar os cards
    atualizar_lista();
});


// BOTÃO: TODOS OS FAVORITOS


botao_favorito.addEventListener("click", () => {

    // Alterar a visualização para favoritos
    mostrar_apenas_favoritos = true;

    // Atualizar os cards usando filter()
    atualizar_lista();
});



// FUNÇÃO: CARREGAR OS PRODUTOS DA API


async function mostrar_produtos() {

    try {

        // Buscar os produtos da API
        produtos = await bucar_produtos();

        // Exibir a lista inicial
        atualizar_lista();

    } catch (erro) {

        // Informar o usuário caso ocorra um erro
        mensagem.textContent =
            "Não foi possível carregar os produtos.";

        console.error("Erro ao buscar produtos:", erro);
    }
}

// Executar o carregamento inicial
mostrar_produtos();



// FOOTER: SELECIONAR O RODAPÉ


const rodape = document.querySelector("#rodape");



// BLOCO EMPRESA


const empresa = document.querySelector("#empresa");

// Primeira linha: logo e título
const linha_empresa = document.createElement("div");
linha_empresa.classList.add("linha-empresa");

const img = document.createElement("img");
img.src = "imagens/logo_wayne.webp";
img.alt = "Logo da Wayne Corp";
img.width = 100;
img.height = 100;
img.loading = "lazy";

const titulo_empresa = document.createElement("h3");
titulo_empresa.textContent = "Wayne Corp";

linha_empresa.appendChild(img);
linha_empresa.appendChild(titulo_empresa);

// Texto de apresentação
const texto = document.createElement("p");
texto.textContent =
    "Sistema desenvolvido para facilitar o controle de estoque e a gestão de recursos da Wayne Corp.";

// Segunda linha: perfil
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

linha_perfil.appendChild(perfil);
linha_perfil.appendChild(texto2);

// Nome do autor
const autor = document.createElement("h4");
autor.textContent = "Jonathan Costa";

// Adicionar elementos ao bloco empresa
empresa.appendChild(linha_empresa);
empresa.appendChild(texto);
empresa.appendChild(linha_perfil);
empresa.appendChild(autor);



// BLOCO DOS VÍDEOS


const videos = document.querySelector("#videos");

const link = document.createElement("h3");
link.textContent = "Links dos vídeos";

const link_video = document.createElement("a");
link_video.href = "https://www.youtube.com/watch?v=RELXqbIH4MY&t=347s";
link_video.target = "_blank";
link_video.textContent = "Vídeo de demonstração (JavaScript)";

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

identificador.appendChild(projeto);
identificador.appendChild(texto3);



// BLOCO DE DIREITOS AUTORAIS


const direitos = document.querySelector("#direitos");

const ano = new Date().getFullYear();

direitos.textContent =
    `© ${ano} Wayne Corp | Francisco Jonathan Sousa da Costa`;



// ADICIONAR OS BLOCOS AO RODAPÉ


rodape.appendChild(empresa);
rodape.appendChild(videos);
rodape.appendChild(identificador);
rodape.appendChild(direitos);

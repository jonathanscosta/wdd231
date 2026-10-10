

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

// MAIN

export async function bucar_produtos() {

    const resposta = await fetch("https://dummyjson.com/products")

    if(!resposta.ok){
        throw new Error("Não foi encontrado o produto");
    }

    const dados = await resposta.json()

    return dados
    
}





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
img.width = 100;
img.height = 100;
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
link_video.href ="https://www.youtube.com/watch?v=RELXqbIH4MY&t=347s";
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

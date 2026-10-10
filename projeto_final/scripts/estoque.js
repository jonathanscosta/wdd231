


import { bucar_produtos } from "./estoque.mjs";

const lista_de_produtos = document.querySelector("#lista_de_produtos");

async function mostrar_produtos() {
    try{
        const produtos = await bucar_produtos()

        produtos.forEach((produto) => {

            const card = document.createElement("div");
            card.classList.add("cards")

            const titulo = document.createElement("h2");
            titulo.textContent = produto.title;

            const preco = document.createElement("p")
            preco.textContent = `Preço: R$ ${produto.price}`

            const quantidade = document.createElement("p");
            quantidade.textContent = `Quantidade: ${produto.stock} unidades`

            card.appendChild(titulo)
            card.appendChild(preco)
            card.appendChild(quantidade)

            lista_de_produtos.appendChild(card)
        });

        document.querySelector("#mensagem").textContent = `${produtos.length} produtos carregados`;

    }catch (erro) {
        
        document.querySelector("#mensagem").textContent =
            "Não foi possível carregar os produtos.";

        console.error("Erro ao buscar produtos:", erro);
    }
}

mostrar_produtos();

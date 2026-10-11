

// MAIN

export async function bucar_produtos() {

    const resposta = await fetch("https://dummyjson.com/products")

    if(!resposta.ok){
        throw new Error("Não foi encontrado o produto");
    }

    const dados = await resposta.json()
    console.log(dados.products)
    return dados.products
    
}






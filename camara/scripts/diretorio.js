

// BOTÃO E MENU

const hamBtn = document.querySelector("#ham-btn");

hamBtn.classList.add("botao-hamburguer");
hamBtn.textContent = "≡";

const navegacao = document.querySelector("#navegacao");

hamBtn.addEventListener("click", () =>{
    navegacao.classList.toggle("aberto");

    if(navegacao.classList.contains("aberto")){
        hamBtn.textContent = "X";
    }
    else{
        hamBtn.textContent = "≡"
    }
    
})

// MAIN

// FUNÇÃO PARA LER JSON

async function ver_empresas() {
    const resposta = await fetch("dados/membros.json");

    const empresas = await resposta.json();

    const Lista_de_empresas = document.querySelector("#Lista_de_empresas");

        empresas.forEach((empresa)=>{

            const card = document.createElement("div");
            card.classList.add("card")
            card.innerHTML = `
            <h2>${empresa.Nome}</h2>
            <img src="${empresa.Imagem}" alt="${empresa.Nome}">
            <p>${empresa.Endereço}</p>
            <p>Tel.: ${empresa.Telefone}</p>
            <p>Site: ${empresa["URL do site"]}</p>
            <p>Nível de associado: ${empresa["Nível de associação"]}</p>
            <p>Sobre: ${empresa["Outras informações"]}</p>`;

            Lista_de_empresas.appendChild(card)
    })
}

ver_empresas();




// FOOTER

const ano = new Date().getFullYear();

document.querySelector("#anoAtual").textContent = `©${ano} Francisco Jonathan Sousa Da Costa`;

document.querySelector("#ultima-atualizacao").textContent = document.lastModified;
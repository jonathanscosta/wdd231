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

    
    const eventos = document.querySelector("#eventos_atuais")
    const tempo = document.querySelector("#tempo")
    const empresas_em_destaque = document.querySelector("#empresas_em_destaque")
    const evento = document.querySelector("#evento")
    const clima = document.querySelector("#clima")

    evento.innerHTML = `<h2>Eventos</h2>
    <p>Reunião empresarial</p>
    <p>25 de Dezembro</p>
    <p>Camara de Comércio de Arthon</p>`

    // FUNÇÃO PARA CRIAR O CARD DE CLIMA
    const CHAVE_DE_API = "5628874b7800b7ac335d0cfbb2d7e06b"

    const latitude = 0;
    const longitude = 0;

    async function buscarClima() {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`
    }


// FOOTER

const ano = new Date().getFullYear();

document.querySelector("#anoAtual").textContent =
    `© ${ano} Câmara de Comércio`;

document.querySelector("#ultima-atualizacao").textContent =
    document.lastModified;
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


const eventos = document.querySelector("#eventos_atuais");

async function buscarEmpresas() {

    
    const resposta = await fetch("dados/membros.json");

    
    const empresas = await resposta.json();

    
    const empresasPermitidas = empresas.filter(empresa =>
        empresa["Nível de associação"] === "ouro" ||
        empresa["Nível de associação"] === "prata"
    );

    
    empresasPermitidas.sort(() => Math.random() - 0.5);

    
    const destaques = empresasPermitidas.slice(0, 3);

    
    destaques.forEach(empresa => {

        empresas_em_destaque.innerHTML += `
            <div class="empresa-card">

                <h3>${empresa.Nome}</h3>

                <img src="${empresa.Imagem}" 
                     alt="Logo da empresa ${empresa.Nome}">

                <p>${empresa.Telefone}</p>

                <p>${empresa.Endereço}</p>

                <p>
                    <a href="${empresa["URL do site"]}" target="_blank">
                        Visitar site
                    </a>
                </p>

                <p>
                    Associação: ${empresa["Nível de associação"]}
                </p>

            </div>
        `;
    });
}



const tempo = document.querySelector("#tempo");
const empresas_em_destaque = document.querySelector("#empresas_em_destaque");
const evento = document.querySelector("#evento");
const clima = document.querySelector("#clima");


evento.innerHTML = `
    <h2>Eventos</h2>

    <div class="lista-eventos">

        <div class="evento-item">
            <h3>Reunião empresarial</h3>
            <p>25 de Setembro</p>
            <p>Câmara de Comércio de Arthon</p>
        </div>

        <div class="evento-item">
            <h3>Empreendedores à 1000</h3>
            <p>15 de Dezembro</p>
            <p>Praça central de Arthon</p>
        </div>

    </div>
`;




const CHAVE_DE_API = "537c208dff26ed122941ad7bde289a5e";

const latitude = -3.7318;
const longitude = -38.5266;


// FUNÇÃO PARA BUSCAR O CLIMA ATUAL

async function buscarClima() {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${CHAVE_DE_API}&units=metric&lang=pt_br`;

    const resposta = await fetch(url);
    const dados = await resposta.json();


    

    clima.innerHTML = `
        <div class="clima-atual">

            <h3 id="temperatura">-- °C</h3>

            <p id="descricao">Carregando...</p>

        </div>


        <div class="previsao">

            <div class="dia">
                <h3 id="dia1">---</h3>
                <p id="temp1">-- °C</p>
            </div>

            <div class="dia">
                <h3 id="dia2">---</h3>
                <p id="temp2">-- °C</p>
            </div>

            <div class="dia">
                <h3 id="dia3">---</h3>
                <p id="temp3">-- °C</p>
            </div>

        </div>
    `;


    

    document.querySelector("#temperatura").textContent =
        `${Math.round(dados.main.temp)} °C`;


    

    document.querySelector("#descricao").textContent =
        dados.weather[0].description;
}


// FUNÇÃO PARA BUSCAR A PREVISÃO

async function buscarPrevisao() {

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${CHAVE_DE_API}&units=metric&lang=pt_br`;

    const resposta = await fetch(url);

    const dados = await resposta.json();


    console.log(dados);


    

    const dias = {};


    

    dados.list.forEach(previsao => {

     

        const data = previsao.dt_txt.split(" ")[0];


      

        if (!dias[data]) {
            dias[data] = [];
        }



        dias[data].push(previsao.main.temp);

    });


    

    


    

    const datas = Object.keys(dias).slice(0, 3);



    datas.forEach((data, index) => {

       

        const temperaturas = dias[data];


       

        const maiorTemperatura =
            Math.max(...temperaturas);


       

        const dataFormatada =
            new Date(`${data}T12:00:00`);


        

        const nomeDia =
            dataFormatada.toLocaleDateString("pt-BR", {
                weekday: "long"
            });


        

        document.querySelector(`#dia${index + 1}`).textContent =
            nomeDia;


      

        document.querySelector(`#temp${index + 1}`).textContent =
            `${Math.round(maiorTemperatura)} °C`;

    });

}




buscarEmpresas();

buscarClima();

buscarPrevisao();


// FOOTER

const ano = new Date().getFullYear();

document.querySelector("#anoAtual").textContent =
    `© ${ano} Câmara de Comércio`;

document.querySelector("#ultima-atualizacao").textContent =
    document.lastModified;
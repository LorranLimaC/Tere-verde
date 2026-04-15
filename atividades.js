

// Dados das atividades
const atividades = [
    {
        parque:"Parque nacinal da serra dos Órgãos",
        nome: "Trilha Suspensa",
        distancia: "1,3 km",
        tempo: "1h",
        descricao: "passarela acessível, suspensa sobre a mata, ideal para observar a copa das árvores e a fauna.",
        disponibilidade: "Aberto",
        imagens:"png/atividadesParques/trilha_suspensa2.jpeg",
        dificuldade: "Fácil",
        tipo:"Trilha"
    },
    {
        parque:"Parque nacinal da serra dos Órgãos",
        nome: "Trilha Primavera",
        distancia: "500m",
        tempo: "15 min",
        descricao: "curta e perfeita para iniciantes, com destaque para o palmito-juçara, espécie ameaçada.",
        disponibilidade: "Aberto",
        imagens:"png/atividadesParques/primavera.jpeg",
        dificuldade: "Fácil",
        tipo:"Trilha"
    },
    {
        parque:"Parque nacinal da serra dos Órgãos",
        nome:"Poço dois irmãos",
        distancia: "300m",
        tempo: "5 min",
        descricao: "curta e perfeita para iniciantes, com destaque para o poço dois irmãos.",
        disponibilidade: "Aberto",
        imagens:"png/atividadesParques/dois-irmaos.jpg",
        dificuldade: "Fácil",
        tipo:"Cachoeira"
    },
    {
        parque:"Parque nacinal da serra dos Órgãos",
        nome:"Cartão postal",
        distancia: "1,2km",
        tempo: "2h(ida e volta)",
        descricao: " revelando belas vistas das montanhas. O percurso leva o visitante a um mirante com um novo ângulo de observação do Dedo de Deus.",
        disponibilidade: "Aberto",
        imagens:"png/atividadesParques/Cartao-Postal.jpeg",
        dificuldade: "Médio",
        tipo:"Trilha"

    },

    {
        parque:"Parque nacinal da serra dos Órgãos",
        nome:"Escalavrado",
        distancia: "1,2km",
        tempo: "Aproximadamente 3h(ida e volta)",
        descricao: " O Escalavrado, com 1.420m de altitude, é uma montanha icônica na Serra dos Órgãos, entre Guapimirim e Teresópolis, famosa pela vista privilegiada do Dedo de Deus",
        disponibilidade: "Aberto",
        imagens:"png/atividadesParques/escalavrado.jpg",
        dificuldade: "Difícil",
        tipo:"Escalada"

    },

 {
        parque:"Parque nacinal da serra dos Órgãos",
        nome: "travessia teresópolis petrópolis",
        distancia: "30km",
        tempo: "3 dias",
        descricao: "considerado um dos mais belos e exigentes do Brasil. Com alta dificuldade, exige preparo físico para subidas íngremes e terreno acidentado, com destaque para a subida do Açu, Elevador e Cavalinho.",
        disponibilidade: "Aberto",
        imagens:"png/atividadesParques/travessia.jpg",
        dificuldade: "Difícil",
        tipo:"Trilha"
    },

    {
        parque: "Parque estadual dos tres picos",
        nome: "Torres de Bonsucesso",
        distancia: " 7 km (ida e volta)",
        tempo: "3 h",
        descricao: "Trilha íngreme e bem definida, com início na localidade de Bonsucesso. Oferece vista panorâmica, incluindo a Pedra do Ferro de Passa.",
        disponibilidade: "Aberto",
        imagens: "png/atividadesParques/torres-Bonsucesso.jpeg",
        dificuldade: "Médio",
        tipo:"Trilha"
    },
    {
        parque: "Parque montanhas de teresopolis",
        nome: "Pedra da Tartaruga",
        distancia: " 650 m",
        tempo: "20 min",
        descricao: "No cume de 1180 metros de altitude as atividades de rapel, acampamento e piquenique são as mais procuradas.",
        disponibilidade: "Aberto",
        imagens: "png/atividadesParques/tartaruga.jpg",
        dificuldade: "Fácil",
        tipo:"Trilha",

    },
     

];

// Função para renderizar as atividades
function renderAtividades(atividadesExibir) {
    const container = document.getElementById('conteudoAtividades');
    container.innerHTML = ''; // Limpa o conteúdo existente

    if (atividadesExibir.length === 0) {
        
        container.innerHTML = `
            <div class="mensagem-vazia">
                <p>⚠️ Atividade não localizado</p>
            </div>`;
        return;
    }

    atividadesExibir.forEach(atividade => {
        const card = document.createElement('div');
        card.className = 'atividadeCard';

        card.innerHTML = `
            <p class="parqueNome">${atividade.parque}</p>
            <h2>${atividade.nome}</h2>
            <div class="infoQuadrado">
                <div class="quadrado">Distância: ${atividade.distancia}</div>
                <div class="quadrado">Tempo: ${atividade.tempo}</div>
                <div class="quadrado">Disponibilidade: ${atividade.disponibilidade}</div>
                <div Class="quadrado">Dificuldade: ${atividade.dificuldade}</div>
                <div Class="quadrado">Tipo:${atividade.tipo}</div>
            </div>
            <div class="campoInformacao">${atividade.descricao}</div>
            <img class="imagemCaixa" src="${atividade.imagens || ''}" alt="${atividade.nome}">
        `;

        container.appendChild(card);
    });
}


// Função que aplica os filtros
function aplicarFiltros() {
    const parqueSelecionado = document.getElementById('filtroParque').value;
    const dificuldadeSelecionada = document.getElementById('filtroDificuldade').value;
    const tipoSelecionado = document.getElementById('filtroTipo').value
    

    const atividadesFiltradas = atividades.filter(atividade => {
        // Verifica o Parque
        const filtroParqueOk = parqueSelecionado === "Todos" || atividade.parque === parqueSelecionado;
        
        // Verifica a Dificuldade (usando toLowerCase para não ter erro de digitação)
        const diffAtividade = atividade.dificuldade.toLowerCase();
        const diffFiltro = dificuldadeSelecionada.toLowerCase();
        
        
        let filtroDificuldadeOk = diffFiltro === "todos" || diffAtividade === diffFiltro;
        if (diffFiltro === "Médio") filtroDificuldadeOk = true;
        if (diffFiltro==="Difícil") filtroDificuldadeOk = true;
        
        const tipoAtividade = atividade.tipo.toLowerCase();
        const tipoFiltro = tipoSelecionado.toLowerCase();
        const filtroTipoOk = tipoFiltro === "todos" || tipoAtividade === tipoFiltro;

        return filtroParqueOk && filtroDificuldadeOk && filtroTipoOk;
    });

   
    renderAtividades(atividadesFiltradas);
}

// Event Listeners para detectar mudanças nos selects
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza tudo ao carregar a página
    renderAtividades(atividades);

    // Adiciona os eventos de mudança
    document.getElementById('filtroParque').addEventListener('change', aplicarFiltros);
    document.getElementById('filtroDificuldade').addEventListener('change', aplicarFiltros);
    document.getElementById('filtroTipo').addEventListener('change',aplicarFiltros)
});
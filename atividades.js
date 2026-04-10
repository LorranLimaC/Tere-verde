

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
        dificuldade: "Fácil"
    },
    {
        parque:"Parque nacinal da serra dos Órgãos",
        nome: "Trilha Primavera",
        distancia: "500m",
        tempo: "15 min",
        descricao: "curta e perfeita para iniciantes, com destaque para o palmito-juçara, espécie ameaçada.",
        disponibilidade: "Aberto",
        imagens:"png/atividadesParques/primavera.jpeg",
        dificuldade: "Fácil"
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
    },
    {
        parque:"Parque nacinal da serra dos Órgãos",
        nome:"Cartão postal",
        distancia: "1,2km",
        tempo: "2h(ida e volta)",
        descricao: " revelando belas vistas das montanhas. O percurso leva o visitante a um mirante com um novo ângulo de observação do Dedo de Deus.",
        disponibilidade: "Aberto",
        imagens:"png/atividadesParques/Cartao-Postal.jpeg",
        dificuldade: "moderada",

    },
    {
        parque: "Parque estadual dos tres picos",
        nome: "Torres de Bonsucesso",
        distancia: " 7 km (ida e volta)",
        tempo: "3 h",
        descricao: "Trilha íngreme e bem definida, com início na localidade de Bonsucesso. Oferece vista panorâmica, incluindo a Pedra do Ferro de Passa.",
        disponibilidade: "Aberto",
        imagens: "png/atividadesParques/torres-Bonsucesso.jpeg",
        dificuldade: "Médio"
    },
    {
         parque: "Parque montanhas de teresopolis",
        nome: "Pedra da Tartaruga",
        distancia: " 650 m",
        tempo: "20 min",
        descricao: "No cume de 1180 metros de altitude as atividades de rapel, acampamento e piquenique são as mais procuradas.",
        disponibilidade: "Aberto",
        imagens: "png/atividadesParques/tartaruga.jpg",
        dificuldade: "facil"

    }

];

// Função para renderizar as atividades
function renderAtividades() {
    const container = document.getElementById('conteudoAtividades');
    container.innerHTML = ''; // Limpa o conteúdo existente

    atividades.forEach(atividade => {
        const card = document.createElement('div');
        card.className = 'atividadeCard';

        card.innerHTML = `
            <p class="parqueNome">${atividade.parque}</p>
            <h2>${atividade.nome}</h2>
            <div class="infoQuadrado">
                <div class="quadrado">Distância: ${atividade.distancia}</div>
                <div class="quadrado">Tempo: ${atividade.tempo}</div>
                <div class="quadrado">Disponibilidade: ${atividade.disponibilidade}</div>
                <div class="quadrado">Dificuldade: ${atividade.dificuldade}</div>
            </div>
            <div class="campoInformacao">${atividade.descricao}</div>
            <img class="imagemCaixa" src="${atividade.imagens || ''}" alt="${atividade.nome}">
        `;

        container.appendChild(card);
    });
}

// Chama a função quando a página carrega
document.addEventListener('DOMContentLoaded', renderAtividades);
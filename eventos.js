document.addEventListener('DOMContentLoaded', () => {
    renderizarEventos();
});

function renderizarEventos() {
    const container = document.getElementById('conteudoEventos');
    const eventos = JSON.parse(localStorage.getItem('eventosCadastrados')) || [];

    if (eventos.length === 0) {
        container.innerHTML = `
            <div style="width: 100%; text-align: center; color: white; padding: 20px;">
                <p>Nenhum evento programado no momento. Fique atento às atualizações!</p>
            </div>`;
        return;
    }

    // Limpa o container e renderiza os cards
    container.innerHTML = '';

    eventos.forEach(evento => {
        const card = document.createElement('div');
        card.className = 'atividadeCard'; // Reutilizando a classe CSS de atividades

        // Mapeamento dos nomes dos parques para exibição amigável
        const nomesParques = {
            'SerraDosOrgaos': 'Parque Nacional da Serra dos Órgãos',
            'TresPicos': 'Parque Estadual dos Três Picos',
            'MontanhasTeresopolis': 'Parque Montanhas de Teresópolis'
        };

        const nomeParqueExibicao = nomesParques[evento.local] || evento.local;

        card.innerHTML = `
            <div class="parqueNome">${nomeParqueExibicao}</div>
            <h3 class="atividadeTitulo">${evento.nome}</h3>
            
            <div class="containerQuadrado">
                <div class="quadrado">📅 ${formatarData(evento.data)}</div>
                <div class="quadrado">⏰ ${evento.horario} às ${evento.horarioTer}</div>
            </div>

            <div class="campoInformacao">
                <p>${evento.descricao}</p>
            </div>
            
            <div class="quadrado" style="width: 100%; margin-top: 10px; background: #e8f5e9;">
                📍 Local: ${nomeParqueExibicao}
            </div>
        `;
        container.appendChild(card);
    });
}

// Função auxiliar para deixar a data no padrão brasileiro
function formatarData(dataISO) {
    if(!dataISO) return "";
    const partes = dataISO.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

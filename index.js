const imagens = [
    "png/serraDosOrgoas/pedradosino.jpeg",
    "png/serraDosOrgoas/pedradosino1.jpeg",
    "png/serraDosOrgoas/pocoverde.jpeg",
    "png/serraDosOrgoas/piscinaOrgaos.jpg",
    "png/serraDosOrgoas/serraDeTeresopolis.jpeg"
];

const imagensMontanhas = [
    "png/montanhasDeTeresopolis/pedraTartaruga.jpg",
    "png/montanhasDeTeresopolis/tartarugaRapel.jpeg",
    "png/montanhasDeTeresopolis/tartaruga.jpg",
];
const imagensTresPicos = [
    "png/tresPicos/tresPicos.jpg",
    "png/tresPicos/caixaDeFosforos.jpg",
    "png/tresPicos/camping.jpg",
    "png/tresPicos/Bonsucesso.jpeg",
]

const imagemInicial = "png/serraDosOrgoas/pedradosino.jpeg";

let indexatual = 0;
let sliderInterval = null;
let parqueAtual = 'parque nacinal da serra dos órgãos';
let imagensAtuais = imagens;

function setImagensAtuaisPorParque(nomeParque) {
    const key = (nomeParque || parqueAtual || '').toLowerCase();

    if (key.includes('montanhas')) {
        // Garantir alternância dos 3 itens de Montanhas de Teresópolis
        imagensAtuais = [...imagensMontanhas];
    } else if (key.includes('tres picos')) {
        imagensAtuais = [...imagensTresPicos];
    } else {
        imagensAtuais = [...imagens];
    }

    // Reiniciar índice e banner ao trocar de parque
    indexatual = 0;
    updateBanner();
    reiniciarTimer();
}

function configurarAreasAtividades(parqueNome) {
    const estacionamento = document.querySelector('.atv-estacionamento');
    const camping = document.querySelector('.atv-camping');
    const cachoeira = document.querySelector('.atv-cachoeira');
    const trilha = document.querySelector('.atv-trilha');
    const escalada = document.querySelector('.atv-escalada');

    if (!estacionamento || !camping || !cachoeira || !trilha || !escalada) return;

    const key = parqueNome.trim().toLowerCase();
    if (key.includes('montanhas')) {
        estacionamento.style.display = 'none';
        camping.style.display = 'flex';
        cachoeira.style.display = 'none';
        trilha.style.display = 'flex';
        escalada.style.display = 'flex';
    } else if (key.includes('tres picos')) {
        estacionamento.style.display = 'none';
        camping.style.display = 'flex';
        cachoeira.style.display = 'flex';
        trilha.style.display = 'flex';
        escalada.style.display = 'flex';
    }else{
        estacionamento.style.display = 'flex';
        camping.style.display = 'flex';
        cachoeira.style.display = 'flex';
        trilha.style.display = 'flex';
        escalada.style.display = 'flex';

    }
}

function updateBanner(){
    const elementoImagem = document.getElementById("meuBanner");
    if (!elementoImagem || !imagensAtuais || imagensAtuais.length === 0) return;
    const idx = ((indexatual % imagensAtuais.length) + imagensAtuais.length) % imagensAtuais.length;
    elementoImagem.src = imagensAtuais[idx];
}

function mudarManual(direcao){
    indexatual += direcao;
    if (!imagensAtuais || imagensAtuais.length === 0) return;
    if (indexatual >= imagensAtuais.length){
        indexatual = 0;
    } else if (indexatual < 0){
        indexatual = imagensAtuais.length - 1;
    }
    updateBanner();
    reiniciarTimer();
}

function avancarAutomatico(){
    if (!imagensAtuais || imagensAtuais.length === 0) return;
    indexatual++;
    if (indexatual >= imagensAtuais.length){
        indexatual = 0;
    }
    updateBanner();
}

function iniciarSlider(){
    if (sliderInterval){
        clearInterval(sliderInterval);
    }
    sliderInterval = setInterval(avancarAutomatico, 15000);
}

function reiniciarTimer(){
    clearInterval(sliderInterval);
    iniciarSlider();
}

// Dados do modal
const modalData = {
    titulo: 'Informações do Parque',
    secoes: [
        {
            titulo: 'Funcionamento e Dias',
            conteudo: [
                'O Parque funciona de terça a domingo e feriados nacionais e estaduais do Rio de Janeiro das 07:00h às 16h',
                'As segundas-feiras o parque permanece fechado para manutenção interna, não havendo visitação.',
                '<strong>OBS:</strong> Caso o feriado ou véspera de feriado (nacionais e estaduais RJ) caia na segunda-feira, o parque abrirá para visitação.'
            ]
        },
        {
            titulo: 'Limite de Veículos',
            conteudo: [
                'Há limite diário de veículos. A entrada é por ordem de chegada.',
                '<strong>Lotação máxima atingida?</strong> A entrada de veículos fica restrita a pessoas com mobilidade reduzida (idosos acima de 80 anos, crianças de colo, pessoas com deficiência)'
            ]
        }
    ],
    rodape: 'Para mais informações, entre em contato com nossa central de atendimento.'
};

const modalDataMontanhas = {
    titulo: 'Informações Montanhas de Teresópolis',
    secoes: [
        {
            titulo: 'Horário de Funcionamento',
            conteudo: [
                'Horário de abertura: 08:00 às 17:00',
                'O parque funciona de terça a domingo.'
            ]
        },
        {
            titulo: 'Regras de Conduta',
            conteudo: [
                'Proibido soltar pipa.',
                'Proibido churrasco.',
                'Proibido instrumentos sonoros.',
                'Proibido fogueiras.',
                'Proibido animais domésticos.',
                'Proibido bebidas alcoólicas.',
                'Acampar é permitido somente em área demarcada na sede Pedra da Tartaruga.'
            ]
        }
    ],
    rodape: 'Obrigado por respeitar as regras ambientais e de segurança.'
};

const modalDataTresPicos = {
    titulo: 'Informações Tres Picos',
    secoes: [
        {
            titulo: 'Horário de Funcionamento',
            conteudo: [
                'aberto todos os dias, das 8h às 17h',
                
            ]
        },
        {
            titulo: 'Dicas importantes para todos',
            conteudo: [
                'Levar água, lanche, protetor solar, repelente e roupas confortáveis.',
                'Para trilhas mais longas ou travessias, recomenda-se acompanhamento de guia ou condutor habilitado.',
                'Respeitar as normas do parque, não deixar lixo, e aproveitar a natureza com segurança.'
            ]
        },
        {   
            titulo:'Para garantir a segurança, a preservação da natureza e a convivência harmoniosa com outros visitantes, siga estas normas:',
            conteudo:[
                '1. E proibido o consumo de bebidas alcoólicas;',
                '2. É proibida a realização de churrasco;',
                '3. Não é permitido o uso de fogo;',
                '4. Não é permitido o uso de caixas de som – ouça a natureza;',
                '5. Não é permitido alimentar os animais;',
                '6. Não é permitido realizar pichações;',
                '7. Não é permitido levar animais domésticos (em unidades de proteção integral);',
                '8. Não é permitido retirar espécies da flora e fauna;',
                '9. Estacione somente em locais permitidos;',
                '10. Recolha e leve seu lixo de volta;',
                '11. Você é responsável pela sua própria segurança;',
                '12. Após ou durante chuvas, tenha cuidado com enchentes e cabeças d’água;',
                '13. Respeite os outros visitantes e as comunidades locais.',
            ]
        }
    ],
    rodape: 'Desfrute da natureza com responsabilidade.'
};

function criarModal() {
    // Criar overlay
    const modal = document.createElement('div');
    modal.id = 'modalInfos';
    modal.className = 'modal';
    
    // Criar conteúdo
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    // Botão fechar
    const closeBtn = document.createElement('span');
    closeBtn.className = 'modal-close';
    closeBtn.textContent = '×';
    
    // Título
    const title = document.createElement('h2');
    title.textContent = modalData.titulo;
    
    // Seções
    const secoesContainer = document.createElement('div');
    secoesContainer.className = 'modal-secoes';
    
    modalData.secoes.forEach(secao => {
        // Título da seção
        const secaoTitle = document.createElement('h3');
        secaoTitle.className = 'modal-secao-titulo';
        secaoTitle.textContent = secao.titulo;
        secoesContainer.appendChild(secaoTitle);
        
        // Conteúdo da seção
        secao.conteudo.forEach(item => {
            const p = document.createElement('p');
            p.className = 'modal-secao-item';
            p.innerHTML = item;
            secoesContainer.appendChild(p);
        });
    });
    
    // Rodapé
    const rodape = document.createElement('p');
    rodape.className = 'modal-rodape';
    rodape.textContent = modalData.rodape;
    
    // Montar
    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(secoesContainer);
    content.appendChild(rodape);
    modal.appendChild(content);
    
    // Adicionar ao body
    document.body.appendChild(modal);
    
    return modal;
}

function atualizarModalPorParque(parqueNome, modal) {
    if (!modal) return;

    const secoesContainer = modal.querySelector('.modal-secoes');
    const title = modal.querySelector('h2');
    if (!secoesContainer || !title) return;

    const isMontanhas = parqueNome && parqueNome.toLowerCase().includes('montanhas');
    const isTresPicos = parqueNome && parqueNome.toLowerCase().includes('tres picos');

    if (isMontanhas) {
        title.textContent = modalDataMontanhas.titulo;
        secoesContainer.innerHTML = '';
        modalDataMontanhas.secoes.forEach(secao => {
            const secaoTitle = document.createElement('h3');
            secaoTitle.className = 'modal-secao-titulo';
            secaoTitle.textContent = secao.titulo;
            secoesContainer.appendChild(secaoTitle);
            secao.conteudo.forEach(item => {
                const p = document.createElement('p');
                p.className = 'modal-secao-item';
                p.innerHTML = item;
                secoesContainer.appendChild(p);
            });
        });
        const rodape = document.createElement('p');
        rodape.className = 'modal-rodape';
        rodape.textContent = modalDataMontanhas.rodape;
        if (modal.querySelector('.modal-rodape')) {
            modal.querySelector('.modal-rodape').remove();
        }
        modal.querySelector('.modal-content').appendChild(rodape);
    } else if (isTresPicos) {
        title.textContent = modalDataTresPicos.titulo;
        secoesContainer.innerHTML = '';
        modalDataTresPicos.secoes.forEach(secao => {
            const secaoTitle = document.createElement('h3');
            secaoTitle.className = 'modal-secao-titulo';
            secaoTitle.textContent = secao.titulo;
            secoesContainer.appendChild(secaoTitle);
            secao.conteudo.forEach(item => {
                const p = document.createElement('p');
                p.className = 'modal-secao-item';
                p.innerHTML = item;
                secoesContainer.appendChild(p);
            });
        });
        const rodape = document.createElement('p');
        rodape.className = 'modal-rodape';
        rodape.textContent = modalDataTresPicos.rodape;
        if (modal.querySelector('.modal-rodape')) {
            modal.querySelector('.modal-rodape').remove();
        }
        modal.querySelector('.modal-content').appendChild(rodape);
    } else {
        title.textContent = modalData.titulo;
        secoesContainer.innerHTML = '';
        modalData.secoes.forEach(secao => {
            const secaoTitle = document.createElement('h3');
            secaoTitle.className = 'modal-secao-titulo';
            secaoTitle.textContent = secao.titulo;
            secoesContainer.appendChild(secaoTitle);
            secao.conteudo.forEach(item => {
                const p = document.createElement('p');
                p.className = 'modal-secao-item';
                p.innerHTML = item;
                secoesContainer.appendChild(p);
            });
        });
    }
}

window.addEventListener('load', () => {
    setImagensAtuaisPorParque(parqueAtual);
    configurarAreasAtividades('Parque nacinal da serra dos Órgãos');
    updateBanner();
    iniciarSlider();
    
    // Criar e configurar modal
    const modal = criarModal();
    const botaoMaisInfo = document.getElementById('botaoMaisInfo');
    const modalClose = document.querySelector('.modal-close');
    
    botaoMaisInfo.addEventListener('click', () => {
        atualizarModalPorParque(parqueAtual, modal);
        modal.classList.add('show');
    });
    
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Botões de parque
    const parqueBtns = document.querySelectorAll('.parqueBtn');
    const tituloParque = document.getElementById('TituloParque');
    parqueBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nome = btn.dataset.parque;
            if (tituloParque) {
                tituloParque.textContent = nome;
            }
            parqueAtual = nome;
            setImagensAtuaisPorParque(parqueAtual);
            indexatual = 0;
            updateBanner();
            configurarAreasAtividades(nome);
            reiniciarTimer();
        });
    });
});


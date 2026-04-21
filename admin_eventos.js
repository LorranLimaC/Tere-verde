// --- LÓGICA DE SALVAR ---
document.getElementById('formEvento').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(document.getElementById('data').value)

    const novoEvento = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        data: document.getElementById('data').value,
        dataTer: document.getElementById('dataTer').value,
        horario: document.getElementById('horario').value,
        horarioTer: document.getElementById('horarioTer').value,
        local: document.getElementById('local').value,
        descricao: document.getElementById('descricao').value
    };

    let lista = JSON.parse(localStorage.getItem('eventosCadastrados')) || [];
    lista.push(novoEvento);
    localStorage.setItem('eventosCadastrados', JSON.stringify(lista));

    alert("✅ Evento salvo com sucesso!");
    this.reset();
});

// --- LÓGICA DO MODAL (TELA FLUTUANTE) ---
const modal = document.getElementById("modalEdicao");
const btnAbrir = document.getElementById("btnAbrirEdicao");
const spanFechar = document.getElementsByClassName("fechar")[0];
const listaEdicao = document.getElementById("listaEdicao");

// Abrir Modal e Carregar Lista
btnAbrir.onclick = function() {
    modal.style.display = "block";
    renderizarListaEdicao();
}

// Fechar Modal
spanFechar.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

function renderizarListaEdicao() {
    let lista = JSON.parse(localStorage.getItem('eventosCadastrados')) || [];
    listaEdicao.innerHTML = "";

    if (lista.length === 0) {
        listaEdicao.innerHTML = "<p>Nenhum evento para gerenciar.</p>";
        return;
    }

    lista.forEach(evento => {
        const div = document.createElement('div');
        div.className = 'item-gerencia';
        div.innerHTML = `
            <span>${evento.nome} (${evento.data})</span>
            <div>
                <button class="btn-editar-item" onclick="preencherParaEditar(${evento.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirEvento(${evento.id})">Excluir</button>
            </div>
        `;
        listaEdicao.appendChild(div);
    });
}

// --- EXCLUIR EVENTO ---
function excluirEvento(id) {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
        let lista = JSON.parse(localStorage.getItem('eventosCadastrados')) || [];
        lista = lista.filter(ev => ev.id !== id);
        localStorage.setItem('eventosCadastrados', JSON.stringify(lista));
        renderizarListaEdicao();
    }
}

// --- EDITAR EVENTO (Preencher formulário) ---
function preencherParaEditar(id) {
    let lista = JSON.parse(localStorage.getItem('eventosCadastrados')) || [];
    const evento = lista.find(ev => ev.id === id);

    if (evento) {
        document.getElementById('nome').value = evento.nome;
        document.getElementById('data').value = evento.data;
        document.getElementById('dataTer').value = evento.dataTer;
        document.getElementById('horario').value = evento.horario;
        document.getElementById('horarioTer').value = evento.horarioTer;
        document.getElementById('local').value = evento.local;
        document.getElementById('descricao').value = evento.descricao;
        
        // Remove o antigo para salvar o novo atualizado ao clicar em Salvar
        excluirEvento(id); 
        modal.style.display = "none";
        alert("Dados carregados no formulário. Altere e clique em Salvar.");
    }
}


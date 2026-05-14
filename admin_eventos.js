// --- LÓGICA DE SALVAR ---
// Validação de horários: impedir digitação inválida
document.getElementById('horario').addEventListener('input', function() {
    const value = this.value;
    if (value && (value < '00:00' || value > '23:59')) {
        alert("❌ Horário inválido. Deve estar entre 00:00 e 23:59.");
        this.value = '';
    }
});

document.getElementById('horarioTer').addEventListener('input', function() {
    const value = this.value;
    if (value && (value < '00:00' || value > '23:59')) {
        alert("❌ Horário inválido. Deve estar entre 00:00 e 23:59.");
        this.value = '';
    }
});

document.getElementById('formEvento').addEventListener('submit', function(e) {
    e.preventDefault();

    const dataInicio = document.getElementById('data').value;
    const dataTermino = document.getElementById('dataTer').value;
    const horarioInicio = document.getElementById('horario').value;
    const horarioTermino = document.getElementById('horarioTer').value;

    // Validação de datas: data de início não pode ser maior que data de término
    if (dataInicio > dataTermino) {
        alert("❌ A data de início não pode ser posterior à data de término.");
        return;
    }

    // Validação de horários: horário de início não pode ser maior que horário de término se datas forem iguais
    if (dataInicio === dataTermino && horarioInicio > horarioTermino) {
        alert("❌ O horário de início não pode ser posterior ao horário de término no mesmo dia.");
        return;
    }

    const novoEvento = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        data: dataInicio,
        dataTer: dataTermino,
        horario: horarioInicio,
        horarioTer: horarioTermino,
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



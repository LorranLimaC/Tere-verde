try {
  const eventContainerEl = document.getElementById("eventContainer");
  if (!eventContainerEl) throw new Error("Elemento 'eventContainer' não encontrado no HTML.");

  // --- 1. GESTÃO DE DADOS (LocalStorage) ---
  const events = getEvents();

  function getEvents() {
    const storedEvents = localStorage.getItem("eventosCadastrados");
    
    if (storedEvents) {
      const parsed = JSON.parse(storedEvents);
      return parsed.sort((a, b) => a.data.localeCompare(b.data));
    }

    // Eventos padrão caso o LocalStorage esteja vazio
    const eventsDefault = [
      {
        id: crypto.randomUUID(),
        nome: "Café da manhã beneficênte",
        data: "2026-12-17",
        dataTer: "2026-12-17",
        horario: "07:00",
        horarioTer: "10:00",
        local: "Serra_dos_Orgaos",
        descricao: "Junte-se a nós no Café da Manhã Beneficente no Parque Nacional da Serra dos Órgãos. Entrada R$ 5,00 destinados à conservação."
      },
      {
        id: crypto.randomUUID(),
        nome: "Oficina de Fotografia na Natureza",
        data: "2026-07-23",
        dataTer: "2026-07-23",
        horario: "09:00",
        horarioTer: "12:00",
        local: "Tres_Picos",
        descricao: "Oficina prática de fotografia explorando as paisagens do Parque Estadual dos Três Picos."
      },
      {
        id: crypto.randomUUID(),
        nome: "Trilha Guiada Ecológica",
        data: "2026-09-09",
        dataTer: "2026-09-09",
        horario: "08:00",
        horarioTer: "11:30",
        local: "Montanhas_Teresopolis",
        descricao: "Explore as trilhas do Parque Montanhas de Teresópolis com guias especializados."
      }
    ];

    localStorage.setItem("eventosCadastrados", JSON.stringify(eventsDefault));
    return eventsDefault;
  }

  // --- 2. CLASSE DO CARTÃO DO EVENTO ---
  class EventCard {
    constructor(event, fatherEl) {
      this.eventName = event.nome;
      this.dateStart = event.data;
      this.dateEnd = event.dataTer;
      this.hourStart = event.horario;
      this.hourEnd = event.horarioTer;
      this.eventSpot = this.formatEventSpot(event.local);
      this.eventDescription = event.descricao || "Sem descrição disponível.";
      this.fatherEl = fatherEl;
    }

    formatEventSpot(eventSpot) {
      const spots = {
        Serra_dos_Orgaos: "Parque Nacional da Serra dos Órgãos",
        Tres_Picos: "Parque Estadual dos Três Picos",
        Montanhas_Teresopolis: "Parque Montanhas de Teresópolis"
      };
      return spots[eventSpot] || eventSpot;
    }

    built() {
      this.createEventCardElement();
    }

    createElementWithClass(tag, className) {
      const el = document.createElement(tag);
      if (className) el.classList.add(...className.split(" "));
      return el;
    }

    createEventCardElement() {
      const eventCard = this.createElementWithClass("div", "eventCard");
      
      // Header
      const eventCardHeader = this.createElementWithClass("div", "eventCardHeader");
      for (let i = 0; i < 3; i++) {
        eventCardHeader.append(this.createElementWithClass("div", "hole"));
      }

      // Body
      const eventCardBody = this.createElementWithClass("div", "eventCardBody");
      const [ano, mes, dia] = this.dateStart.split("-");
      
      const dateEl = this.createElementWithClass("div", "date");
      dateEl.textContent = `${dia}/${mes}`;

      const hourEl = this.createElementWithClass("div", "hour");
      hourEl.textContent = `${this.hourStart} às ${this.hourEnd}`;

      // Modal
      const modal = this.createModalElement(ano, mes, dia);

      eventCardBody.append(dateEl, hourEl, modal);
      eventCard.append(eventCardHeader, eventCardBody);
      this.fatherEl.append(eventCard);
    }

    createModalElement(ano, mes, dia) {
      const modal = this.createElementWithClass("div", "eventModal");
      const content = this.createElementWithClass("div", "eventModal-content");
      
      const closeBtn = this.createElementWithClass("button", "closeBtn");
      closeBtn.innerHTML = '<i class="fa-solid fa-x"></i>';

      const header = this.createElementWithClass("div", "eventContent-header");
      header.innerHTML = `
        <h2 class="eventName">${this.eventName}</h2>
        <div class="eventTimeInfo">
          <span><div class="label">Início</div>${dia}/${mes}/${ano}</span>
          <span><div class="label">Local</div>${this.eventSpot}</span>
        </div>
      `;

      const body = this.createElementWithClass("div", "eventContent-body");
      body.innerHTML = `<div class="eventDescription">${this.eventDescription}</div>`;

      content.append(closeBtn, header, body);
      modal.append(content);
      return modal;
    }
  }

  // --- 3. FUNÇÕES DE APOIO E RENDERIZAÇÃO ---

  function setCardElementClickEvents(cardElement) {
    const modal = cardElement.querySelector(".eventModal");
    const closeBtn = cardElement.querySelector(".closeBtn");

    cardElement.addEventListener("click", () => {
      modal.classList.add("show");
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Impede que o clique no botão fechar abra o modal de novo
      modal.classList.remove("show");
    });
  }

  // Função Principal de Renderização (Limpa e Filtra)
  function renderEvents(filtro = "Todos") {
    eventContainerEl.innerHTML = ""; // Limpa os cards atuais

    const filteredEvents = events.filter(ev => {
      return filtro === "Todos" || ev.local === filtro;
    });

    filteredEvents.forEach(event => {
      const card = new EventCard(event, eventContainerEl);
      card.built();
    });

    // Ativa os eventos de clique nos cards recém-criados
    const currentCards = eventContainerEl.querySelectorAll(".eventCard");
    currentCards.forEach(card => setCardElementClickEvents(card));
  }

  // --- 4. INICIALIZAÇÃO ---

  const filterSelect = document.getElementById("filtroParque");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      renderEvents(e.target.value);
    });
  }

  // Renderiza tudo ao carregar a página
  renderEvents();

} catch (error) {
  console.error("Erro na aplicação:", error);
}

// --- FUNÇÕES GLOBAIS (Excluir/Editar) ---
function excluirEvento(id) {
  if (confirm("Deseja excluir este evento?")) {
    let lista = JSON.parse(localStorage.getItem('eventosCadastrados')) || [];
    lista = lista.filter(ev => ev.id !== id);
    localStorage.setItem('eventosCadastrados', JSON.stringify(lista));
    location.reload(); // Recarrega para atualizar a lista
  }
}
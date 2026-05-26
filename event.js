try {
  const eventContainerEl = document.getElementById("eventContainer");
  if (!eventContainerEl) throw new Error("Elemento pai não definido");
  
  // Obtem os eventos armazenados no LocalStorage ou Cria os eventos padrão(Caso não estejam salvos)
  const events = getEvents();
  function getEvents() {
    const storedEvents = localStorage.getItem("eventosCadastrados");
    
    if (storedEvents) {
      const parsed = JSON.parse(storedEvents)
      parsed.sort((a, b) => a.data.localeCompare(b.data))
      return parsed;
    }

    const eventsDefault = [
      {
        id: crypto.randomUUID(),
        nome: "Café da manhã beneficente",
        data: "2026-12-17",
        dataTer: "2026-12-17",
        horario: "07:00",
        horarioTer: "10:00",
        local: "Serra_dos_Orgaos",
        descricao:
          "Junte-se a nós no Café da Manhã Beneficente, um encontro especial no Parque Nacional da Serra dos Órgãos, no dia 17 de dezembro de 2026. Das 7h às 10h da manhã, você poderá desfrutar de um café delicioso ao ar livre, em meio à natureza exuberante. A entrada tem o valor de R$ 5,00, e todo o montante será destinado a projetos de conservação ambiental e apoio a comunidades locais. Venha fazer parte dessa manhã de solidariedade e conexão com a natureza!",
      },
      {
        id: crypto.randomUUID(),
        nome: "Oficina de Fotografia na Natureza",
        data: "2026-07-23",
        dataTer: "2026-07-23",
        horario: "09:00",
        horarioTer: "12:00",
        local: "Tres_Picos",
        descricao:
          "Participe de uma oficina prática de fotografia ao ar livre, explorando as paisagens deslumbrantes do Parque Nacional da Serra dos Órgãos. Durante o encontro, serão abordadas técnicas de composição, iluminação natural e uso criativo de equipamentos. Ideal para iniciantes e entusiastas. Traga sua câmera ou smartphone e venha registrar momentos únicos em meio à natureza.",
      },
      {
        id: crypto.randomUUID(),
        nome: "Trilha Guiada Ecológica",
        data: "2026-09-09",
        dataTer: "2026-09-09",
        horario: "08:00",
        horarioTer: "11:30",
        local: "Montanhas_Teresopolis",
        descricao:
          "Explore as trilhas do Parque Nacional da Serra dos Órgãos com acompanhamento de guias especializados. Durante o percurso, você aprenderá sobre a fauna, flora e a importância da preservação ambiental. Uma experiência enriquecedora para todas as idades, promovendo contato direto com a natureza e consciência ecológica.",
      },
    ];

    localStorage.setItem("eventosCadastrados", JSON.stringify(eventsDefault.sort((a, b) => a.data.localeCompare(b.data))))
    return eventsDefault;
  }

  // Classe que constroi o Objeto "Cartão do evento" e suas funcionalidades
  class EventCard {
    constructor(event, fatherEl) {
      this.eventName = event.nome;
      this.dateStart = event.data;
      this.dateEnd = event.dataTer;
      this.hourStart = event.horario;
      this.hourEnd = event.horarioTer;
      this.eventSpot = this.formatEventSpot(event.local);
      this.eventDescription = event.descricao || " ";
      this.fatherEl = fatherEl;
    }

    formatEventSpot(eventSpot){
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
    
    createEventCardElement() {
      const cardContainer = this.createElementWithClass("div", "cardContainer")

      const infoPreview = this.createElementWithClass("div", "infoPreview")
      const previewH3 = this.createElementWithClass("h3", "previewH3")
      const previewLocation = this.createElementWithClass("p", "previewLocation")
      const previewSpan = document.createElement("span")

      previewSpan.textContent = "Local: "
      previewLocation.append(previewSpan, this.eventSpot)
      previewH3.append(this.eventName)
      infoPreview.append(previewH3, previewLocation)

      // Armazenar o local original no atributo data para facilitar filtro
      cardContainer.setAttribute('data-local', this.eventSpot)

      // Criação do Elemento "Cartão do evento"
      const eventCard = this.createElementWithClass("div", "eventCard")

      // Cabeçalho do cartão
      const eventCardHeader = this.createElementWithClass(
        "div",
        "eventCardHeader",
      )

      for (let i = 0; i < 3; i++) {
        const hole = this.createElementWithClass("div", "hole")
        eventCardHeader.append(hole)
      }

      // Corpo do cartão
      const eventCardBody = this.createElementWithClass("div", "eventCardBody")
      const eventCardBody_date = this.createElementWithClass("div", "date")
      let [ano, mes, dia] = this.dateStart.split("-")
      eventCardBody_date.textContent = `${dia}/${mes}`

      const eventCardBody_hour = this.createElementWithClass("div", "hour")
      const eventCardBody_hourStart = this.createElementWithClass(
        "span",
        "hour_start",
      )
      const eventCardBody_hourEnd = this.createElementWithClass(
        "span",
        "hour_end",
      )

      eventCardBody_hourStart.textContent = this.hourStart
      eventCardBody_hourEnd.textContent = this.hourEnd

      eventCardBody_hour.append(
        eventCardBody_hourStart,
        " às ",
        eventCardBody_hourEnd,
      )

      // Modal do Evento (Que será inserido no corpo)
      const eventCardModal = this.createElementWithClass("div", "eventModal")
      const modalContent = this.createElementWithClass(
        "div",
        "eventModal-content",
      ) // Class SHOW

      // Botão close do Modal
      const modalCloseBtn = this.createElementWithClass("button", "closeBtn")
      const closeIcon = this.createElementWithClass("i", "fa-solid fa-x")
      modalCloseBtn.append(closeIcon)

      //Header do Modal
      const modalContent_header = this.createElementWithClass(
        "div",
        "eventContent-header",
      )
      const modalContent_header_h2 = this.createElementWithClass(
        "h2",
        "eventName",
      )
      modalContent_header_h2.textContent = this.eventName

      const modalContent_TimeInfo = this.createElementWithClass(
        "div",
        "eventTimeInfo",
      )

      const TimeInfo_dateStart = this.createElementWithClass(
        "span",
        "dateStart",
      )

      const dateStart_label = this.createElementWithClass("div", "label")
      dateStart_label.textContent = "Data início"
      const dateStart_text = document.createElement("div")
      dateStart_text.textContent = `${dia}/${mes}/${ano}`
      TimeInfo_dateStart.append(dateStart_label, dateStart_text)

      const TimeInfo_dateEnd = this.createElementWithClass("span", "dateEnd")
      const dateEnd_label = this.createElementWithClass("div", "label")
      dateEnd_label.textContent = "Data fim"
      const dateEnd_text = document.createElement("div")
      dateEnd_text.textContent = `${dia}/${mes}/${ano}`
      TimeInfo_dateEnd.append(dateEnd_label, dateEnd_text)

      const TimeInfo_hourStart = this.createElementWithClass(
        "span",
        "hourStart",
      )
      const hourStart_label = this.createElementWithClass("div", "label")
      hourStart_label.textContent = "Inicia"
      const hourStart_text = document.createElement("div")
      hourStart_text.textContent = this.hourStart
      TimeInfo_hourStart.append(hourStart_label, hourStart_text)

      const TimeInfo_hourEnd = this.createElementWithClass("span", "hourEnd")
      const hourEnd_label = this.createElementWithClass("div", "label")
      hourEnd_label.textContent = "Finaliza"
      const hourEnd_text = document.createElement("div")
      hourEnd_text.textContent = this.hourEnd
      TimeInfo_hourEnd.append(hourEnd_label, hourEnd_text)

      modalContent_TimeInfo.append(
        TimeInfo_dateStart,
        TimeInfo_dateEnd,
        TimeInfo_hourStart,
        TimeInfo_hourEnd,
      )

      const modalContent_eventSpot = this.createElementWithClass(
        "div",
        "eventSpot",
      )
      const spotSpan = document.createElement("span")
      spotSpan.textContent = "Local: "
      const spotText = document.createTextNode(this.eventSpot)
      modalContent_eventSpot.append(spotSpan, spotText)

      modalContent_header.append(
        modalContent_header_h2,
        modalContent_TimeInfo,
        modalContent_eventSpot,
      )

      // Body do modal (Onde fica a descrição)
      const modalContent_body = this.createElementWithClass(
        "div",
        "eventContent-body",
      )
      const eventDescription = this.createElementWithClass(
        "div",
        "eventDescription",
      )
      eventDescription.textContent = this.eventDescription

      modalContent_body.append(eventDescription)

      modalContent.append(
        modalCloseBtn,
        modalContent_header,
        modalContent_body,
      )
      eventCardModal.append(modalContent)
      eventCardBody.append(
        eventCardBody_date,
        eventCardBody_hour,
        eventCardModal,
      )
      eventCard.append(eventCardHeader, eventCardBody)
      cardContainer.append(eventCard, infoPreview)

      this.fatherEl.append(cardContainer)
    }

    createElementWithClass(tag, className) {
      const el = document.createElement(tag);
      if (className) {
        el.classList.add(...className.split(" "));
      }
      return el;
    }
  }

  // Função que adiciona os eventListeners
  function setCardElementClickEvents(cardElement) {
    if (!(cardElement instanceof HTMLElement)) return;

    const modal = cardElement.querySelector(".eventModal");
    const closeBtn = cardElement.querySelector(".closeBtn");

    cardElement.addEventListener("click", (e) => {
      modal.classList.add("show");
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        modal.classList.remove("show");
      });
    }
  }

  events.forEach((event) => {
    const card = new EventCard(event, eventContainerEl);
    card.built();
  });

  const eventCards = eventContainerEl.querySelectorAll(".cardContainer");
  eventCards.forEach((card) => {
    setCardElementClickEvents(card);
  });

  // ========== LÓGICA DE FILTRO DE EVENTOS ==========
  let filtroAtual = 'todos';

  // Mapa de conversão de IDs de parques para nomes formatados
  const mapaParques = {
    'Serra_dos_Orgaos': 'Parque Nacional da Serra dos Órgãos',
    'Tres_Picos': 'Parque Estadual dos Três Picos',
    'Montanhas_Teresopolis': 'Parque Montanhas de Teresópolis'
  };

  const parqueIdPorNome = Object.fromEntries(
    Object.entries(mapaParques).map(([id, nome]) => [nome, id]),
  );

  window.filtrarEventosPorParqueNome = function (parqueNome) {
    const filtro = parqueIdPorNome[parqueNome];
    if (!filtro) return;

    const botaoFiltro = document.querySelector(`.filtro-btn[data-filtro="${filtro}"]`);
    if (botaoFiltro) {
      const botoesAtivos = document.querySelectorAll('.filtro-btn');
      botoesAtivos.forEach((btn) => btn.classList.remove('ativo'));
      botaoFiltro.classList.add('ativo');
    }

    filtrarEventos(filtro);
  };

  function filtrarEventos(filtro) {
    const cards = eventContainerEl.querySelectorAll(".cardContainer");
    
    cards.forEach((card) => {
      if (filtro === 'todos') {
        card.classList.remove('oculto');
      } else {
        const localEvento = card.getAttribute('data-local');
        const localFiltro = mapaParques[filtro];
        
        if (localEvento === localFiltro) {
          card.classList.remove('oculto');
        } else {
          card.classList.add('oculto');
        }
      }
    });
  }

  // Adicionar event listeners aos botões de filtro
  const botoesAtivos = document.querySelectorAll('.filtro-btn');
  botoesAtivos.forEach((botao) => {
    botao.addEventListener('click', function() {
      // Remover classe ativo de todos os botões
      botoesAtivos.forEach((btn) => btn.classList.remove('ativo'));
      
      // Adicionar classe ativo ao botão clicado
      this.classList.add('ativo');
      
      // Aplicar filtro
      filtroAtual = this.getAttribute('data-filtro');
      filtrarEventos(filtroAtual);
    });
  });

} catch (error) {
  console.error(error);
}

/* ================================
   CONFIRMAÇÃO DE REFEIÇÃO
================================ */

let confirmacoes = {
  sim: 47,
  nao: 18,
  historico: [
    { data: "2026-08-29", usuario: "Maria Silva", resposta: "sim" },
    { data: "2026-08-29", usuario: "João Santos", resposta: "sim" },
    { data: "2026-08-28", usuario: "Ana Costa", resposta: "nao" },
    { data: "2026-08-28", usuario: "Pedro Oliveira", resposta: "sim" }
  ]
};


/* ================================
   ESTOQUE
================================ */

let estoque = [
  {
    item: "Papel A4",
    setor: "RH",
    qtd: "12 caixas",
    validade: "2026-12-15"
  },
  {
    item: "Toner preto",
    setor: "Financeiro",
    qtd: "3 unidades",
    validade: "2026-10-05"
  },
  {
    item: "Leite",
    setor: "Refeitório",
    qtd: "20 caixas",
    validade: "2026-09-18"
  },
  {
    item: "Café",
    setor: "Refeitório",
    qtd: "15 pacotes",
    validade: "2027-01-20"
  },
  {
    item: "Produtos de limpeza",
    setor: "Operações",
    qtd: "8 unidades",
    validade: "2026-09-25"
  },
  {
    item: "Água mineral",
    setor: "Administrativo",
    qtd: "30 fardos",
    validade: "2027-02-10"
  }
];

function renderizarTabelaEstoque() {
  const tabela = document.getElementById("tabela-estoque");

  if (!tabela) return;

  tabela.innerHTML = "";

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  estoque.forEach(function(item) {
    const validade = new Date(item.validade + "T00:00:00");
    const diferenca = validade - hoje;
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

    let status = "Normal";
    let classe = "ok";
    let classeLinha = "validade-ok";

    if (dias < 0) {
      status = "Vencido";
      classe = "critico";
      classeLinha = "validade-critica";
    } else if (dias <= 30) {
      status = "Próximo do vencimento";
      classe = "atencao";
      classeLinha = "validade-atencao";
    }

    const linha = document.createElement("tr");
    linha.className = classeLinha;

    linha.innerHTML = `
      <td>${item.item}</td>
      <td>${item.setor}</td>
      <td class="num">${item.qtd}</td>
      <td>${validade.toLocaleDateString("pt-BR")}</td>
      <td>
        <span class="selo ${classe}">${status}</span>
      </td>
    `;

    tabela.appendChild(linha);
  });
}


/* ================================
   CONTAGEM DE REFEIÇÕES
================================ */

function atualizarContagemRefeicao() {
  const elemento = document.getElementById("contagem-refeicao");

  if (!elemento) return;

  const total = confirmacoes.sim + confirmacoes.nao;

  elemento.textContent =
    "Confirmações registradas: " +
    total +
    " | Sim: " +
    confirmacoes.sim +
    " | Não: " +
    confirmacoes.nao;
}


/* ================================
   HISTÓRICO DE REFEIÇÕES
================================ */

function mostrarHistoricoRefeicoes() {
  const elemento = document.getElementById("historico-refeicoes");

  if (!elemento) return;

  elemento.innerHTML = "<h3>Histórico recente</h3>";

  const lista = document.createElement("div");

  confirmacoes.historico.slice(0, 6).forEach(function(registro) {
    const item = document.createElement("p");

    const resposta =
      registro.resposta === "sim"
        ? "Vai almoçar"
        : "Não vai almoçar";

    const data = new Date(
      registro.data + "T00:00:00"
    ).toLocaleDateString("pt-BR");

    item.className = "rodape-nota";
    item.textContent =
      registro.usuario +
      " — " +
      data +
      " — " +
      resposta;

    lista.appendChild(item);
  });

  elemento.appendChild(lista);
}


/* ================================
   BAZAR
================================ */

let itensBazar = [
  {
    item: "Papel sulfite",
    setor: "Administrativo",
    descricao: "Pacote com 500 folhas"
  },
  {
    item: "Canetas",
    setor: "RH",
    descricao: "Caixa com 20 unidades"
  },
  {
    item: "Pastas",
    setor: "Financeiro",
    descricao: "Pacote com 10 pastas"
  },
  {
    item: "Marcadores",
    setor: "Marketing",
    descricao: "Kit com 6 unidades"
  },
  {
    item: "Cadernos",
    setor: "Administrativo",
    descricao: "Caderno de 100 folhas"
  }
];

function renderizarBazar(lista = itensBazar) {
  const container = document.getElementById("lista-bazar");

  if (!container) return;

  container.innerHTML = "";

  lista.forEach(function(item) {
    const elemento = document.createElement("div");

    elemento.className = "item-bazar";

    elemento.innerHTML = `
      <div>
        <div class="setor">${item.setor}</div>
        <div class="descricao">
          <strong>${item.item}</strong><br>
          ${item.descricao}
        </div>
      </div>
    `;

    container.appendChild(elemento);
  });
}


/* ================================
   CALCULADORA DE REUNIÃO
================================ */

function calcularReuniao() {
  const pessoas = document.getElementById("pessoas-reuniao");
  const duracao = document.getElementById("duracao-reuniao");
  const resultado = document.getElementById("resultado-reuniao");

  if (!pessoas || !duracao || !resultado) return;

  const quantidade = Number(pessoas.value) || 0;
  const tempo = Number(duracao.value) || 0;

  const custo = quantidade * tempo * 0.08;

  resultado.innerHTML = `
    <div class="valor">
      R$ ${custo.toFixed(2).replace(".", ",")}
    </div>
    <div class="obs">
      Estimativa de custo da reunião.
    </div>
  `;
}


/* ================================
   FORMULÁRIOS DIGITAIS
================================ */

let formulariosEnviados = [];

function mostrarListaFormulariosEnviados() {
  const elemento = document.getElementById(
    "lista-formularios-enviados"
  );

  if (!elemento) return;

  elemento.innerHTML = "";

  formulariosEnviados.forEach(function(formulario) {
    const item = document.createElement("p");

    item.className = "rodape-nota";

    item.textContent =
      formulario.nome +
      " — " +
      formulario.data;

    elemento.appendChild(item);
  });
}


/* ================================
   CONSUMO
================================ */

let consumoDetalhado = {
  agua: [
    { setor: "RH", valor: 120 },
    { setor: "Financeiro", valor: 180 },
    { setor: "Administrativo", valor: 240 },
    { setor: "Operações", valor: 350 },
    { setor: "Refeitório", valor: 480 }
  ],

  energia: [
    { setor: "RH", valor: 320 },
    { setor: "Financeiro", valor: 450 },
    { setor: "Administrativo", valor: 520 },
    { setor: "Operações", valor: 780 },
    { setor: "Refeitório", valor: 610 }
  ]
};

function renderizarGraficoConsumoDetalhado() {
  const agua = document.getElementById("grafico-agua");
  const energia = document.getElementById("grafico-energia");

  if (agua) {
    agua.innerHTML = "";

    const maiorAgua = Math.max(
      ...consumoDetalhado.agua.map(function(item) {
        return item.valor;
      })
    );

    consumoDetalhado.agua.forEach(function(item) {
      const percentual =
        (item.valor / maiorAgua) * 100;

      const linha = document.createElement("div");

      linha.className = "barra-setor";

      linha.innerHTML = `
        <span>${item.setor}</span>
        <div class="trilha">
          <div
            class="preenc"
            style="width:${percentual}%"
          ></div>
        </div>
        <span class="valor-setor">${item.valor} L</span>
      `;

      agua.appendChild(linha);
    });
  }

  if (energia) {
    energia.innerHTML = "";

    const maiorEnergia = Math.max(
      ...consumoDetalhado.energia.map(function(item) {
        return item.valor;
      })
    );

    consumoDetalhado.energia.forEach(function(item) {
      const percentual =
        (item.valor / maiorEnergia) * 100;

      const linha = document.createElement("div");

      linha.className = "barra-setor";

      if (item.valor >= 700) {
        linha.classList.add("pico");
      }

      linha.innerHTML = `
        <span>${item.setor}</span>
        <div class="trilha">
          <div
            class="preenc"
            style="width:${percentual}%"
          ></div>
        </div>
        <span class="valor-setor">${item.valor} kWh</span>
      `;

      energia.appendChild(linha);
    });
  }
}


/* ================================
   IMPRESSÕES
================================ */

let dadosImpressao = [
  {
    departamento: "Operações",
    impressoes: 1850
  },
  {
    departamento: "Financeiro",
    impressoes: 1420
  },
  {
    departamento: "RH",
    impressoes: 980
  },
  {
    departamento: "Administrativo",
    impressoes: 760
  },
  {
    departamento: "Marketing",
    impressoes: 540
  }
];

function renderizarTabelaImpressao(filtro = "todos") {
  const tabela = document.getElementById(
    "tabela-impressao"
  );

  if (!tabela) return;

  tabela.innerHTML = "";

  let lista = dadosImpressao;

  if (filtro !== "todos") {
    lista = dadosImpressao.filter(function(item) {
      return item.departamento === filtro;
    });
  }

  lista.forEach(function(item, index) {
    let classificacao = "Normal";
    let classe = "ok";

    if (item.impressoes >= 1500) {
      classificacao = "Alto";
      classe = "critico";
    } else if (item.impressoes >= 900) {
      classificacao = "Atenção";
      classe = "atencao";
    }

    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.departamento}</td>
      <td class="num">${item.impressoes}</td>
      <td>
        <span class="selo ${classe}">
          ${classificacao}
        </span>
      </td>
    `;

    tabela.appendChild(linha);
  });
}


/* ================================
   INICIALIZAÇÃO
================================ */

document.addEventListener("DOMContentLoaded", function() {

  const refSim = document.getElementById("ref-sim");
  const refNao = document.getElementById("ref-nao");
  const mensagem = document.getElementById(
    "mensagem-refeicao"
  );

  if (refSim) {
    refSim.addEventListener("click", function() {

      confirmacoes.sim++;

      confirmacoes.historico.unshift({
        data: new Date()
          .toISOString()
          .split("T")[0],
        usuario: "Você",
        resposta: "sim"
      });

      if (mensagem) {
        mensagem.textContent =
          "Almoço confirmado para amanhã.";
        mensagem.className =
          "aviso-confirmado sim";
      }

      atualizarContagemRefeicao();
      mostrarHistoricoRefeicoes();
    });
  }

  if (refNao) {
    refNao.addEventListener("click", function() {

      confirmacoes.nao++;

      confirmacoes.historico.unshift({
        data: new Date()
          .toISOString()
          .split("T")[0],
        usuario: "Você",
        resposta: "nao"
      });

      if (mensagem) {
        mensagem.textContent =
          "Sua ausência foi registrada para amanhã.";
        mensagem.className =
          "aviso-confirmado nao";
      }

      atualizarContagemRefeicao();
      mostrarHistoricoRefeicoes();
    });
  }


  /* Bazar */

  renderizarBazar();


  /* Estoque */

  renderizarTabelaEstoque();


  /* Consumo */

  renderizarGraficoConsumoDetalhado();


  /* Impressões */

  renderizarTabelaImpressao();


  /* Refeições */

  atualizarContagemRefeicao();
  mostrarHistoricoRefeicoes();


  /* Calculadora */

  calcularReuniao();


  /* Formulários */

  mostrarListaFormulariosEnviados();


  /* Filtro de impressões */

  const filtro = document.getElementById(
    "filtro-impressao"
  );

  if (filtro) {
    filtro.addEventListener("change", function() {
      renderizarTabelaImpressao(this.value);
    });
  }


  /* Calculadora */

  const pessoas = document.getElementById(
    "pessoas-reuniao"
  );

  const duracao = document.getElementById(
    "duracao-reuniao"
  );

  if (pessoas) {
    pessoas.addEventListener("input", calcularReuniao);
  }

  if (duracao) {
    duracao.addEventListener("input", calcularReuniao);
  }


  /* Pesquisa do bazar */

  const pesquisa = document.getElementById(
    "pesquisa-bazar"
  );

  if (pesquisa) {
    pesquisa.addEventListener("input", function() {

      const termo = this.value.toLowerCase();

      const resultado = itensBazar.filter(function(item) {
        return (
          item.item.toLowerCase().includes(termo) ||
          item.setor.toLowerCase().includes(termo) ||
          item.descricao.toLowerCase().includes(termo)
        );
      });

      renderizarBazar(resultado);
    });
  }

});
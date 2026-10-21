const categorias = [
  {
    nome: "Componentes Passivos Básicos",
    assuntos: [
      "Resistores e a Lei de Ohm",
      "Capacitores e Armazenamento de Energia",
      "Indutores e Eletromagnetismo",
      "Associação de Componentes"
    ]
  },
  {
    nome: "Semicondutores e Componentes Ativos",
    assuntos: [
      "Diodos e Retificação",
      "Transistores Bipolares de Junção (TBJ)",
      "Transistores de Efeito de Campo (MOSFETs)",
      "Circuitos Integrados (CIs)"
    ]
  },
  {
    nome: "Grandezas, Sinais e Circuitos Elétricos",
    assuntos: [
      "Corrente Contínua (CC) vs. Corrente Alternada (CA)",
      "Leis de Kirchhoff",
      "Potência Elétrica e Efeito Joule",
      "Frequência e Sinais Elétricos"
    ]
  },
  {
    nome: "Aplicações Práticas dos Componentes",
    assuntos: [
      "Circuitos de Filtros Passivos (RC e RL)",
      "Divisores de Tensão e Corrente",
      "Fontes de Alimentação Lineares",
      "Circuitos de Temporização (Constante de Tempo RC)"
    ]
  },
  {
    nome: "Proteção, Medição e Materiais",
    assuntos: [
      "Dispositivos de Proteção Circuitos",
      "Materiais Condutores, Isolantes e Semicondutores",
      "Uso do Multímetro no Diagnóstico de Componentes",
      "Relés e Chaves Eletromecânicas"
    ]
  }
];

// Mapeamento dos grupos confirmados no sorteio do professor.
// Os arquivos serão adicionados quando estiverem disponíveis.
const arquivosPorAssunto = {
  "1.1": "grupo-07.html",
  "2.4": "grupo-06.html",
  "3.1": "grupo-03.html",
  "3.2": "grupo-01.html",
  "4.4": "grupo-02.html",
  "5.2": "grupo-08.html",
  "5.4": "grupo-04.html"
};

// Caminho relativo ao index.html dentro de src/
const pastaConteudos = "conteudos/";

const menu = document.getElementById("menu-assuntos");

if (menu) {
  categorias.forEach((categoria, indiceCategoria) => {
    const grupo = document.createElement("details");
    grupo.className = "grupo-menu";
    grupo.open = indiceCategoria === 4;

    const titulo = document.createElement("summary");
    titulo.textContent =
      `${indiceCategoria + 1}. ${categoria.nome}`;

    grupo.appendChild(titulo);

    const lista = document.createElement("ul");

    categoria.assuntos.forEach((assunto, indiceAssunto) => {
      const codigo =
        `${indiceCategoria + 1}.${indiceAssunto + 1}`;

      const item = document.createElement("li");
      const arquivo = arquivosPorAssunto[codigo];

      if (arquivo) {
        const link = document.createElement("a");
        link.href = pastaConteudos + arquivo;
        link.textContent = `${codigo} — ${assunto}`;

        if (codigo === "5.4") {
          link.classList.add("assunto-nosso");
        }

        item.appendChild(link);
      } else {
        const texto = document.createElement("span");
        texto.className = "assunto-pendente";
        texto.textContent = `${codigo} — ${assunto}`;
        texto.title = "Arquivo ainda não definido";
        item.appendChild(texto);
      }

      lista.appendChild(item);
    });

    grupo.appendChild(lista);
    menu.appendChild(grupo);
  });
}

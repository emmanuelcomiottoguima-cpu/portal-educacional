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


const arquivosPorAssunto = {
    "1.1": "grupo-07.html",
    "2.4": "grupo-06.html",
    "3.1": "grupo-03.html",
    "3.2": "grupo-01.html",
    "4.4": "grupo-02.html",
    "5.2": "grupo-08.html",
    "5.4": "grupo-04.html"
};


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


                link.addEventListener("click", (evento) => {
                    evento.preventDefault();

                    const titulo = document.getElementById("titulo-conteudo");
                    const descricao = document.getElementById("descricao-conteudo");
                    const area = document.getElementById("area-conteudo");

                    if (!titulo || !descricao || !area) return;

                    // Atualiza o título e a descrição
                    titulo.textContent = assunto;
                    descricao.textContent = `Assunto ${codigo}`;

                    // Limpa o conteúdo anterior
                    area.replaceChildren();

                    // Carrega diretamente o arquivo HTML local
                    const iframe = document.createElement("iframe");

                    iframe.src = link.getAttribute("href");
                    iframe.title = assunto;
                    iframe.className = "iframe-conteudo";
                    iframe.loading = "eager";

                    area.appendChild(iframe);
                });


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



const campoPesquisa = document.getElementById("pesquisa-assuntos");
const resultadoPesquisa = document.getElementById("resultado-pesquisa");

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function pesquisarAssuntos() {
    if (!campoPesquisa || !menu || !resultadoPesquisa) return;

    const termo = normalizarTexto(campoPesquisa.value);
    const grupos = menu.querySelectorAll(".grupo-menu");

    let quantidadeResultados = 0;

    grupos.forEach((grupo) => {
        const itens = grupo.querySelectorAll("li");
        let resultadosNoGrupo = 0;

        itens.forEach((item) => {
            const texto = normalizarTexto(item.textContent);
            const corresponde = texto.includes(termo);

            item.hidden = !corresponde;

            if (corresponde) {
                resultadosNoGrupo++;
                quantidadeResultados++;
            }
        });

        if (termo) {
            grupo.hidden = resultadosNoGrupo === 0;

            if (resultadosNoGrupo > 0) {
                grupo.open = true;
            }
        } else {
            grupo.hidden = false;
        }
    });

    if (!termo) {
        resultadoPesquisa.textContent =
            "Explore os 20 assuntos disponíveis.";
    } else if (quantidadeResultados === 0) {
        resultadoPesquisa.textContent =
            "Nenhum assunto encontrado.";
    } else {
        resultadoPesquisa.textContent =
            `${quantidadeResultados} assunto(s) encontrado(s).`;
    }
}

if (campoPesquisa) {
    campoPesquisa.addEventListener("input", pesquisarAssuntos);
}

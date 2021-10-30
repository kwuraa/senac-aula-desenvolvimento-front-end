const perfis = [
  {
    id: 1,
    nome: "Teste 1",
    fundo: "dodgerblue",
    favoritos: [],
  },
  {
    id: 2,
    nome: "Teste 2",
    fundo: "red",
    favoritos: [],
  },
  {
    id: 3,
    nome: "Teste 3",
    fundo: "green",
    favoritos: [],
  },
];

const filmes = [
  {
    id: 1,
    categorias: ["Terror", "Populares", "Adicionados Recentemente"],
    nome: "Teste filme terror",
    etaria: "16",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
    tempo: 180,
    ano_lancamento: "2021",
    imagem: "assets/imagens/filme-1.jpg",
    infos: {
      estrelando: ["Ator #1", "Ator #2", "Ator #3"],
      criacao: ["diretor #1"],
    },
    videos: [
      { id: "1.1", nome: "Trailer 1", miniatura: "assets/imagens/filme-1.jpg" },
      { id: "1.2", nome: "Trailer 2", miniatura: "assets/imagens/filme-2.jpg" },
      { id: "1.3", nome: "Trailer 3", miniatura: "assets/imagens/filme-1.jpg" },
    ],
  },
  {
    id: 2,
    categorias: ["Terror", "Populares"],
    nome: "Teste serie terror",
    etaria: "18",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
    imagem: "assets/imagens/filme-1.jpg",
    infos: {
      estrelando: ["Ator #1", "Ator #2", "Ator #3"],
      criacao: ["diretor #1"],
    },
    temporadas: [
      {
        temporada: 1,
        ano_lancamento: "2018",
        episodios: [
          {
            id: "1.1",
            nome: "EP teste",
            descricao:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
            tempo: 50,
            miniatura: "assets/imagens/filme-1.jpg",
          },
          {
            id: "1.2",
            nome: "EP teste 2",
            descricao:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
            tempo: 52,
            miniatura: "assets/imagens/filme-1.jpg",
          },
          {
            id: "1.3",
            nome: "EP teste 3",
            descricao:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
            tempo: 55,
            miniatura: "assets/imagens/filme-1.jpg",
          },
        ],
      },
      {
        temporada: 2,
        ano_lancamento: "2019",
        episodios: [
          {
            id: "2.1",
            nome: "EP teste",
            descricao:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
            tempo: 50,
            miniatura: "assets/imagens/filme-2.jpg",
          },
          {
            id: "2.2",
            nome: "EP teste 2",
            descricao:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
            tempo: 52,
            miniatura: "assets/imagens/filme-1.jpg",
          },
          {
            id: "2.3",
            nome: "EP teste 3",
            descricao:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
            tempo: 55,
            miniatura: "assets/imagens/filme-1.jpg",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    categorias: ["Terror", "Populares", "Adicionados Recentemente"],
    nome: "Teste filme terror #2",
    etaria: "12",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
    tempo: 50,
    ano_lancamento: "2020",
    imagem: "assets/imagens/filme-2.jpg",
    infos: {
      estrelando: ["Ator #1", "Ator #2", "Ator #3"],
      criacao: ["diretor #1"],
    },
  },
  {
    id: 4,
    categorias: ["Terror", "Populares"],
    nome: "Teste filme terror #3",
    etaria: "18",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
    tempo: 180,
    ano_lancamento: "2019",
    imagem: "assets/imagens/filme-1.jpg",
    infos: {
      estrelando: ["Ator #1", "Ator #2", "Ator #3"],
      criacao: ["diretor #1"],
    },
  },
  {
    id: 5,
    categorias: ["Terror"],
    nome: "Teste filme terror #4",
    etaria: "13",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
    tempo: 55,
    ano_lancamento: "2021",
    imagem: "assets/imagens/filme-1.jpg",
    infos: {
      estrelando: ["Ator #1", "Ator #2", "Ator #3"],
      criacao: ["diretor #1"],
    },
  },
  {
    id: 6,
    categorias: ["Terror"],
    nome: "Teste filme terror #5",
    etaria: "18",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
    tempo: 90,
    ano_lancamento: "1964",
    imagem: "assets/imagens/filme-1.jpg",
    infos: {
      estrelando: ["Ator #1", "Ator #2", "Ator #3"],
      criacao: ["diretor #1"],
    },
  },
  {
    id: 7,
    categorias: ["Terror"],
    nome: "Teste filme terror #6",
    etaria: "18",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus metus sapien, cursus pharetra porta et, tincidunt ut sem. Phasellus eu faucibus odio. Morbi lorem libero",
    tempo: 180,
    ano_lancamento: "1999",
    imagem: "assets/imagens/filme-1.jpg",
    infos: {
      estrelando: ["Ator #1", "Ator #2", "Ator #3"],
      criacao: ["diretor #1"],
    },
  },
];

const novidades = [
  {
    imagem: "assets/imagens/infantil.png",
    link: "#",
    tipo: "novidades",
    texto: "Tem alguem na sua casa",
    infos: "Há 2 dias",
    visualizado: false,
  },
];

function carregarValoresStorage(chave, valores_atuais) {
  const valor_storage = JSON.parse(localStorage.getItem(chave));

  if (valor_storage) {
    valores_atuais.length = 0;
    valores_atuais.push(...valor_storage);
  } else {
    localStorage.setItem(chave, JSON.stringify(valores_atuais));
  }
}

carregarValoresStorage("perfis", perfis);
carregarValoresStorage("filmes", filmes);
carregarValoresStorage("novidades", novidades);

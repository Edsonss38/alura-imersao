let cardContainer = document.querySelector('.card-container');
let inputBusca = document.querySelector('input[type="text"]');

let dados = [];

// Função principal da busca
async function iniciarBusca() {
  let termo = inputBusca.value.toLowerCase().trim();

  // Carrega os dados apenas uma vez
  if (dados.length === 0) {
    let resposta = await fetch('data.json');
    dados = await resposta.json();
  }

  // Filtragem dos jogos
  let filtrados = dados.filter(
    (jogo) =>
      jogo.nome.toLowerCase().includes(termo) ||
      jogo.descricao.toLowerCase().includes(termo)
  );

  renderizarCards(filtrados);
}

// Função para exibir os cards na tela
function renderizarCards(lista) {
  cardContainer.innerHTML = '';

  if (lista.length === 0) {
    cardContainer.innerHTML = '<p>Nenhum jogo encontrado.</p>';
    return;
  }

  for (let jogo of lista) {
    let article = document.createElement('article');
    article.classList.add('card');

    article.innerHTML = `
      <img src="${jogo.imagem}" alt="Capa do jogo ${jogo.nome}">
      <h2>${jogo.nome}</h2>
      <p><strong>Ano:</strong> ${jogo.ano}</p>
      <p>${jogo.descricao}</p>
      <a href="${jogo.link}" target="_blank">Saiba mais</a>
    `;

    cardContainer.appendChild(article);
  }
}

// Busca automática ao apertar Enter
inputBusca.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    iniciarBusca();
  }
});

// Carrega todos os jogos ao iniciar a página
iniciarBusca();

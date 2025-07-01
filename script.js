const botaoTema = document.getElementById('mudar-tema');
const iconeTema = document.getElementById('icone-tema');
const body = document.body;

// Tema salvo no localStorage
if (localStorage.getItem('tema') === 'claro') {
  body.classList.add('tema-claro');
  iconeTema.src = 'assets/images/icon-moon.svg';
  iconeTema.alt = 'modo escuro';
}

botaoTema.addEventListener('click', () => {
  body.classList.toggle('tema-claro');
  const temaClaro = body.classList.contains('tema-claro');
  if (temaClaro) {
    iconeTema.src = 'assets/images/icon-moon.svg';
    iconeTema.alt = 'modo escuro';
    localStorage.setItem('tema', 'claro');
  } else {
    iconeTema.src = 'assets/images/icon-sun.svg';
    iconeTema.alt = 'modo claro';
    localStorage.setItem('tema', 'escuro');
  }
});

const lista = document.querySelector('.sessao_lista_cards');
let extensoes = extensoesData.map((ext, i) => ({ id: i + 1, ...ext }));

function renderizarExtensoes(listaExt) {
  lista.innerHTML = '';
  listaExt.forEach(ext => {
    const li = document.createElement('li');
    li.classList.add('sessao_card_item');
    li.setAttribute('data-id', ext.id);
    li.innerHTML = `
      <div class="sessao_card_conteudo">
        <div class="sessao_card_conteudo_descricao">
          <div class="sessao_card_logo">
            <img class="sessao_card_logo_img" src="${ext.logo}" alt="logo-${ext.name.toLowerCase()}" />
          </div>
          <div class="sessao_card_texto">
            <h3 class="sessao_card_texto_titulo">${ext.name}</h3>
            <p class="sessao_card_texto_paragrafo">${ext.description}</p>
          </div>
        </div>
        <div class="sessao_card_rodape">
          <button class="sessao_botao">Remover</button>
          <label class="switch">
            <input type="checkbox" ${ext.isActive ? 'checked' : ''} />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `;
    lista.appendChild(li);
  });

  adicionarEventos();
}

function adicionarEventos() {
  document.querySelectorAll('.sessao_botao').forEach(botao => {
    botao.addEventListener('click', () => {
      const card = botao.closest('.sessao_card_item');
      const id = parseInt(card.dataset.id);
      extensoes = extensoes.filter(ext => ext.id !== id);
      renderizarExtensoes(extensoes);
    });
  });

  document.querySelectorAll('.switch input').forEach(input => {
    input.addEventListener('change', () => {
      const card = input.closest('.sessao_card_item');
      const id = parseInt(card.dataset.id);
      const extensao = extensoes.find(ext => ext.id === id);
      extensao.isActive = input.checked;
    });
  });
}

// Filtros
document.querySelectorAll('.sessao_opcoes_botoes').forEach(botao => {
  botao.addEventListener('click', () => {
    const filtro = botao.textContent.toLowerCase();
    let filtradas = [];

    if (filtro === 'todos') {
      filtradas = extensoes;
    } else if (filtro === 'ativos') {
      filtradas = extensoes.filter(ext => ext.isActive);
    } else if (filtro === 'inativos') {
      filtradas = extensoes.filter(ext => !ext.isActive);
    }

    renderizarExtensoes(filtradas);
  });
});

renderizarExtensoes(extensoes);

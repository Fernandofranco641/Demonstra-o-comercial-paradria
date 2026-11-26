// 1. Configuração de contato
const loja = {
    whatsapp: '5516988409928',
    instagram: 'https://www.instagram.com/ouro_verde_conveniencia/'
};

function contato(mensagem) {
    const url = `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank', 'noopener');
}

// 2. Catálogo de produtos
const catalog = document.querySelector('#catalog');
const filters = document.querySelector('#filters');

function render(categoria) {
    catalog.replaceChildren();
    const selecionados = produtos.filter(produto =>
        categoria === 'Todos' || produto.categoria === categoria
    );

    selecionados.forEach(produto => {
        const card = document.createElement('article');
        card.className = 'product';

        const img = document.createElement('img');
        img.src = `https://images.unsplash.com/${produto.foto}?auto=format&fit=crop&w=700&q=80`;
        img.alt = `Foto ilustrativa: ${produto.nome}`;
        img.loading = 'lazy';
        img.onerror = () => { img.style.display = 'none'; };

        const body = document.createElement('div');
        const titulo = document.createElement('h3');
        titulo.textContent = produto.nome;
        const descricao = document.createElement('p');
        descricao.textContent = produto.descricao;
        const preco = document.createElement('p');
        preco.className = 'price';
        preco.textContent = produto.preco;
        const botao = document.createElement('button');
        botao.textContent = 'Consultar pelo WhatsApp →';
        botao.onclick = () => contato(`Olá! Gostaria de saber sobre ${produto.nome}.`);

        body.append(titulo, descricao, preco, botao);
        card.append(img, body);
        catalog.append(card);
    });
}

// 3. Filtros por categoria
const categorias = ['Todos', ...new Set(produtos.map(produto => produto.categoria))];
categorias.forEach((categoria, indice) => {
    const botao = document.createElement('button');
    botao.textContent = categoria;
    botao.classList.toggle('active', indice === 0);
    botao.setAttribute('aria-pressed', String(indice === 0));
    botao.onclick = () => {
        filters.querySelectorAll('button').forEach(item => {
            item.classList.toggle('active', item === botao);
            item.setAttribute('aria-pressed', String(item === botao));
        });
        render(categoria);
    };
    filters.append(botao);
});
render('Todos');

// 4. Menu responsivo
const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');
menu.onclick = () => {
    const aberto = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(aberto));
};
nav.querySelectorAll('a').forEach(link => {
    link.onclick = () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
    };
});

// 5. Redes sociais e botões de contato
document.querySelectorAll('.contact-action').forEach(botao => {
    botao.onclick = () => contato('Olá! Gostaria de saber mais sobre os produtos da Ouro Verde.');
});
document.querySelector('#instagram').href = loja.instagram;

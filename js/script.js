// Banco de dados de produtos
const produtos = [
    { id: 1, nome: "Notebook Gamer", preco: 4500, categoria: "notebooks" },
    { id: 2, nome: "Smartphone Top", preco: 2200, categoria: "smartphones" },
    { id: 3, nome: "Fone Bluetooth", preco: 350, categoria: "acessorios" }
  ];
  
  // Banco de dados de comentários
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
  
  // Carrinho de compras
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  
// Simulação de login (apenas para teste)
function loginAdmin() {
    localStorage.setItem('adminLoggedIn', 'true');
    window.location.href = 'admin.html';
  }

  // Função para filtrar produtos
  function filterProducts(categoria) {
    const container = document.getElementById("produtos-container");
    container.innerHTML = produtos
      .filter(prod => categoria === "todos" || prod.categoria === categoria)
      .map(prod => `
        <div class="produto">
          <img src="img/${prod.nome.toLowerCase().replace(/ /g, '-')}.jpg" alt="${prod.nome}">
          <h3>${prod.nome}</h3>
          <p>R$ ${prod.preco.toFixed(2).replace('.', ',')}</p>
          <button onclick="addToCart('${prod.nome}', ${prod.preco})">Comprar</button>
          
          <!-- Seção de Avaliações -->
          <div class="avaliacoes">
            <h3>Avaliações</h3>
            <div class="comentarios" id="comentarios-${prod.id}"></div>
            <form class="form-avaliacao" onsubmit="adicionarComentario(event, ${prod.id})">
              <select name="estrelas" required>
                <option value="">Avalie (1-5)</option>
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3">★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
              </select>
              <textarea name="texto" placeholder="Deixe seu comentário..." required></textarea>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      `).join("");
  
    // Carrega comentários existentes
    produtos.forEach(prod => carregarComentarios(prod.id));
  }
  
  // Função para carregar comentários
  function carregarComentarios(produtoId) {
    const container = document.getElementById(`comentarios-${produtoId}`);
    if (!container) return;
  
    container.innerHTML = '';
    const comentariosProduto = comentarios[produtoId] || [];
  
    comentariosProduto.forEach(comentario => {
      container.innerHTML += `
        <div class="comentario">
          <div class="estrelas">${'★'.repeat(comentario.estrelas)}${'☆'.repeat(5 - comentario.estrelas)}</div>
          <p>${comentario.texto}</p>
          <small>Por: ${comentario.usuario || 'Anônimo'} • ${comentario.data}</small>
        </div>
      `;
    });
  }
  
  // Função para adicionar comentário
  function adicionarComentario(event, produtoId) {
    event.preventDefault();
    const form = event.target;
    
    if (!comentarios[produtoId]) {
      comentarios[produtoId] = [];
    }
  
    comentarios[produtoId].push({
      estrelas: parseInt(form.estrelas.value),
      texto: form.texto.value,
      usuario: "Usuário", // Em sistema real, pegaria do login
      data: new Date().toLocaleDateString('pt-BR')
    });
  
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    form.reset();
    carregarComentarios(produtoId);
  }
  
  // Funções do carrinho (mantidas iguais)
  function addToCart(nome, preco) { /* ... */ }
  function updateCartCount() { /* ... */ }
  function loadCartItems() { /* ... */ }
  function removeFromCart(nome) { /* ... */ }
  
  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("produtos-container")) {
      filterProducts("todos");
    }
    if (document.getElementById("cart-items")) {
      loadCartItems();
    }
    updateCartCount();
  });
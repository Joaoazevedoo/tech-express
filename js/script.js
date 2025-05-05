// Banco de dados fictício de produtos
const produtos = [
    { id: 1, nome: "Notebook Gamer", preco: 4500, categoria: "notebooks" },
    { id: 2, nome: "Smartphone Top", preco: 2200, categoria: "smartphones" },
    { id: 3, nome: "Fone Bluetooth", preco: 350, categoria: "acessorios" },
  ];
  
  // Carrinho (salvo no localStorage)
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  
  // Atualiza o contador do carrinho no header
  function updateCartCount() {
    const count = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
  }
  
  // Adiciona item ao carrinho
  function addToCart(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({ nome, preco, quantidade: 1 });
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    updateCartCount();
    alert(`${nome} foi adicionado ao carrinho!`);
  }
  
  // Filtra produtos por categoria
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
        </div>
      `).join("");
  }
  
  // Carrega os itens do carrinho na página
  function loadCartItems() {
    const container = document.getElementById("cart-items");
    if (!container) return;
  
    container.innerHTML = carrinho.map(item => `
      <div class="cart-item">
        <h3>${item.nome}</h3>
        <p>R$ ${item.preco.toFixed(2).replace('.', ',')} x ${item.quantidade}</p>
        <button onclick="removeFromCart('${item.nome}')">Remover</button>
      </div>
    `).join("");
  
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    document.getElementById("total").textContent = total.toFixed(2).replace('.', ',');
  }
  
  // Remove item do carrinho
  function removeFromCart(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    loadCartItems();
    updateCartCount();
  }
  
  // Simula o checkout
  document.getElementById("checkout-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("checkout-form").style.display = "none";
    document.getElementById("confirmation").style.display = "block";
    localStorage.removeItem("carrinho");
    updateCartCount();
  });
  
  // Inicialização
  if (document.getElementById("produtos-container")) {
    filterProducts("todos");
  }
  if (document.getElementById("cart-items")) {
    loadCartItems();
  }
  updateCartCount();
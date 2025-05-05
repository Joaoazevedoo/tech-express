// Dados mockados (simulando um banco de dados)
let produtosAdmin = JSON.parse(localStorage.getItem('produtos')) || [
  { id: 1, nome: "Notebook Gamer", preco: 4500, categoria: "notebooks" },
  { id: 2, nome: "Smartphone Top", preco: 2200, categoria: "smartphones" }
];

let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [
  { id: 1001, produtos: ["Notebook Gamer"], total: 4500, status: "Entregue" },
  { id: 1002, produtos: ["Smartphone Top"], total: 2200, status: "Processando" }
];

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
  { id: 1, nome: "Admin", email: "admin@techexpress.com", tipo: "admin" },
  { id: 2, nome: "Cliente Teste", email: "cliente@teste.com", tipo: "cliente" }
];

// Funções do painel
function showSection(sectionId) {
  document.querySelectorAll('.admin-section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

function logout() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = 'index.html';
}

// Gerenciamento de produtos
document.getElementById('form-produto').addEventListener('submit', function(e) {
  e.preventDefault();
  const novoProduto = {
    id: Date.now(),
    nome: document.getElementById('prod-nome').value,
    preco: parseFloat(document.getElementById('prod-preco').value),
    categoria: document.getElementById('prod-categoria').value
  };
  
  produtosAdmin.push(novoProduto);
  localStorage.setItem('produtos', JSON.stringify(produtosAdmin));
  carregarProdutosAdmin();
  this.reset();
});

function carregarProdutosAdmin() {
  const container = document.getElementById('lista-produtos-admin');
  container.innerHTML = produtosAdmin.map(prod => `
    <div class="produto-admin">
      <h3>${prod.nome}</h3>
      <p>R$ ${prod.preco.toFixed(2)} | ${prod.categoria}</p>
      <button onclick="editarProduto(${prod.id})">Editar</button>
      <button onclick="removerProduto(${prod.id})">Remover</button>
    </div>
  `).join('');
}

// Funções para pedidos e usuários
function carregarPedidos() {
  document.getElementById('lista-pedidos').innerHTML = pedidos.map(pedido => `
    <div class="pedido">
      <p><strong>Pedido #${pedido.id}</strong></p>
      <p>Produtos: ${pedido.produtos.join(', ')}</p>
      <p>Total: R$ ${pedido.total.toFixed(2)}</p>
      <p>Status: ${pedido.status}</p>
    </div>
  `).join('');
}

function carregarUsuarios() {
  document.getElementById('lista-usuarios').innerHTML = usuarios.map(user => `
    <div class="usuario">
      <p><strong>${user.nome}</strong> (${user.tipo})</p>
      <p>Email: ${user.email}</p>
    </div>
  `).join('');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'index.html';
  }
  
  carregarProdutosAdmin();
  carregarPedidos();
  carregarUsuarios();
});
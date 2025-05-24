let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

function salvarPedidos() {
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function adicionarProdutoAoCliente() {
  const cliente = document.getElementById('cliente').value.trim();
  if (!cliente) return alert('Informe o nome do cliente antes de adicionar produtos.');

  const produto = prompt("Nome do produto:");
  if (!produto) return;

  const quantidadeStr = prompt(`Quantidade de ${produto}:`);
  const quantidade = parseInt(quantidadeStr);

  if (isNaN(quantidade) || quantidade <= 0) {
    alert("Quantidade inválida.");
    return;
  }

  pedidos.push({ cliente, produto, quantidade });
  salvarPedidos();
  atualizarTela();
}

function atualizarTela() {
  const resumo = {};
  const pedidosPorCliente = {};

  pedidos.forEach(p => {
    resumo[p.produto] = (resumo[p.produto] || 0) + p.quantidade;

    if (!pedidosPorCliente[p.cliente]) pedidosPorCliente[p.cliente] = [];
    pedidosPorCliente[p.cliente].push({ produto: p.produto, quantidade: p.quantidade });
  });

  // Resumo geral
  const resumoDiv = document.getElementById('resumo-geral');
  resumoDiv.innerHTML = Object.entries(resumo).map(
    ([produto, qtd]) => `<p><strong>${produto}:</strong> ${qtd} unidades</p>`
  ).join('');

  // Pedidos por cliente
  const listaPedidos = document.getElementById('lista-pedidos');
  listaPedidos.innerHTML = Object.entries(pedidosPorCliente).map(([cliente, itens]) => {
    const produtos = itens.map(p => `${p.produto} (${p.quantidade})`).join(', ');
    return `<p><strong>${cliente}:</strong> ${produtos}</p>`;
  }).join('');
}

window.onload = atualizarTela;
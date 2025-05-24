let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

function salvarPedidos() {
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function adicionarPedido() {
  const cliente = document.getElementById('cliente').value.trim();
  const produto = document.getElementById('produto').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);

  if (!cliente || !produto || isNaN(quantidade) || quantidade <= 0) return alert('Preencha todos os campos corretamente.');

  pedidos.push({ cliente, produto, quantidade });
  salvarPedidos();
  atualizarTela();

  document.getElementById('cliente').value = '';
  document.getElementById('produto').value = '';
  document.getElementById('quantidade').value = '';
}

function atualizarTela() {
  const resumo = {};
  const pedidosPorCliente = {};

  pedidos.forEach(p => {
    resumo[p.produto] = (resumo[p.produto] || 0) + p.quantidade;

    if (!pedidosPorCliente[p.cliente]) pedidosPorCliente[p.cliente] = [];
    pedidosPorCliente[p.cliente].push({ produto: p.produto, quantidade: p.quantidade });
  });

  // Atualizar resumo geral
  const resumoDiv = document.getElementById('resumo-geral');
  resumoDiv.innerHTML = Object.entries(resumo).map(
    ([produto, qtd]) => `<p><strong>${produto}:</strong> ${qtd} unidades</p>`
  ).join('');

  // Atualizar pedidos por cliente
  const listaPedidos = document.getElementById('lista-pedidos');
  listaPedidos.innerHTML = Object.entries(pedidosPorCliente).map(([cliente, itens]) => {
    const produtos = itens.map(p => `${p.produto} (${p.quantidade})`).join(', ');
    return `<p><strong>${cliente}:</strong> ${produtos}</p>`;
  }).join('');
}

window.onload = atualizarTela;
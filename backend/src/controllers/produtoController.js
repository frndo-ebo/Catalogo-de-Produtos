// Mantenha sua lista ou sua conexão com banco existente
let produtos = []; // ou seu array/banco atual

const listarProdutos = (req, res) => {
  const { busca } = req.query;
  // NOVO: Adiciona lógica de busca se houver parâmetro
  if (busca) {
    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));
    return res.json(filtrados);
  }
  res.json(produtos);
};

const cadastrarProduto = (req, res) => {
  const { nome, preco } = req.body;
  
  // NOVO: Validações de negócio
  if (!nome || nome.trim() === "") {
    return res.status(400).json({ erro: "O nome do produto é obrigatório." });
  }
  if (!preco || Number(preco) <= 0) {
    return res.status(400).json({ erro: "O preço deve ser maior que zero." });
  }

  const novoProduto = { id: Date.now(), nome: nome.trim(), preco: Number(preco) };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
};

module.exports = { listarProdutos, cadastrarProduto };

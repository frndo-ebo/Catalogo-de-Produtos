import { useEffect, useState } from "react";
import Header from "./components/Header";
import FormProduto from "./components/FormProduto";
import ListaProdutos from "./components/ListaProdutos";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  // Busca os produtos quando a aplicação é carregada.
  async function carregarProdutos() {
    try {
      const resposta = await fetch("/api/produtos");
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro){
      setMensagem("Não foi possível carregar os produtos.", erro);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function cadastrarProduto(produto) {
    setMensagem("");

    try {
      const resposta = await fetch("/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        setMensagem(erro.mensagem);
        return;
      }

      const novoProduto = await resposta.json();

      // Atualiza o estado sem precisar recarregar a página.
      setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);
      setMensagem("Produto cadastrado com sucesso.");
    } catch (erro){
      setMensagem("Não foi possível cadastrar o produto.", erro);
    }
  }

  return (
    <>
      <Header />

      <main className="container">
        <FormProduto aoCadastrar={cadastrarProduto} />

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <ListaProdutos produtos={produtos} />
      </main>
    </>
  );
}

export default App;

import Contador from "./components/Contador";
import Busca from "./components/Busca";
import Footer from "./components/Footer";
import FormProduto from "./components/FormProduto";
import ListaProdutos from "./components/ListaProdutos";
import { useState, useEffect, use } from "react";
import Header from "./components/Header";

function App() {  
  const [produtos, setProdutos] = useState([]);  
  const [mensagem, setMensagem] = useState("");  
  const [busca, setBusca] = useState("");  
  
  async function carregarProdutos(termo = "") {  
    try {  
      const resposta = await fetch(`/api/produtos?busca=${encodeURIComponent(termo)}`);  
      const dados = await resposta.json();  
      setProdutos(dados);  
    } catch (erro) {  
      setMensagem("Não foi possível carregar os produtos.", erro);  
    }  
  }  
  
  useEffect(() => {  
    carregarProdutos(busca);  
  }, [busca]);  
  
  async function cadastrarProduto(produto) {  
    setMensagem("");  
    try {  
      const resposta = await fetch("/api/produtos", {  
        method: "POST",  
        headers: { "Content-Type": "application/json" },  
        body: JSON.stringify(produto)  
      });  
      if (!resposta.ok) {  
        const erro = await resposta.json();  
        setMensagem(erro.mensagem);  
        return;  
      }  
      const novoProduto = await resposta.json();  
      setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);  
      setMensagem("Produto cadastrado com sucesso.");  
    } catch (erro) {  
      setMensagem("Não foi possível cadastrar o produto.", erro);  
    }  
  }  
  
  return (  
    <>  
      <Header />  
  
      <main className="container">  
        <FormProduto aoCadastrar={cadastrarProduto} />  
        <Busca valor={busca} aoBuscar={setBusca} />  
  
        {mensagem && <p className="mensagem">{mensagem}</p>}  
  
        <ListaProdutos produtos={produtos} />  
      </main>  
  
      <Footer />  
    </>  
  );  
}  
  
export default App;
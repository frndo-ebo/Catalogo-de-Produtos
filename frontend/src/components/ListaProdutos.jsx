import Produto from "./Produto";  
import Contador from "./Contador";  
  
function ListaProdutos({ produtos }) {  
  if (produtos.length === 0) {  
    return <p>Nenhum produto cadastrado.</p>;  
  }  
  
  return (  
    <section>  
      <h2 className="titulo-secao">Produtos cadastrados</h2>  
      <Contador total={produtos.length} />  
  
      <div className="grid">  
        {produtos.map((produto) => (  
          <Produto key={produto.id} produto={produto} />  
        ))}  
      </div>  
    </section>  
  );  
}  
  
export default ListaProdutos;
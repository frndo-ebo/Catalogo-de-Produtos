function Busca({ valor, aoBuscar }) {  
  return (  
    <input class="busca-input" 
      type="text"  
      value={valor}  
      onChange={(evento) => aoBuscar(evento.target.value)}  
      placeholder="Buscar produto..."  
    />  
  );  
}  
  
export default Busca;
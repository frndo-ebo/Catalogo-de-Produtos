function Busca({ valor, aoBuscar }) {  
  return (  
    <input  
      type="text"  
      value={valor}  
      onChange={(evento) => aoBuscar(evento.target.value)}  
      placeholder="Buscar produto..."  
    />  
  );  
}  
  
export default Busca;
const CardResumo = ({ titulo, valor, sub, cor }) => {
  return (
    <div className="card-resumo" style={{ '--card-cor': cor }}>
      <div className="card-valor">{valor}</div>
      <div className="card-titulo">{titulo}</div>
      {sub && <div className="card-sub">{sub}</div>}
    </div>
  );
};

export default CardResumo;
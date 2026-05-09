const FiltrosBusca = ({ ano, setAno, distrito, setDistrito, busca, setBusca }) => {
  return (
    <div className="filtros">
      <div className="filtros-grupo">
        <label>Ano</label>
        <select value={ano} onChange={(e) => setAno(Number(e.target.value))}>
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
          <option value={2022}>2022</option>
          <option value={2021}>2021</option>
          <option value={2020}>2020</option>
        </select>
      </div>

      <div className="filtros-grupo">
        <label>Distrito</label>
        <select value={distrito} onChange={(e) => setDistrito(e.target.value)}>
          <option value="">Todos</option>
          <option value="RPA 1">RPA 1</option>
          <option value="RPA 2">RPA 2</option>
          <option value="RPA 3">RPA 3</option>
          <option value="RPA 4">RPA 4</option>
          <option value="RPA 5">RPA 5</option>
          <option value="RPA 6">RPA 6</option>
        </select>
      </div>

      <div className="filtros-grupo">
        <label>Buscar escola</label>
        <input
          type="text"
          placeholder="Nome da escola..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FiltrosBusca;
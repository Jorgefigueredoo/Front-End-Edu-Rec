import { useState, useEffect } from 'react';

const TabelaEscolas = ({ escolas }) => {
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

  // Volta para página 1 quando o filtro muda
  useEffect(() => {
    setPagina(1);
  }, [escolas]);

  const totalPaginas = Math.ceil(escolas.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const escolasPagina = escolas.slice(inicio, inicio + porPagina);

  const irPara = (p) => {
    if (p >= 1 && p <= totalPaginas) setPagina(p);
  };

  // Gera os números de página visíveis
  const paginas = () => {
    const nums = [];
    const delta = 2;
    for (let i = 1; i <= totalPaginas; i++) {
      if (
        i === 1 ||
        i === totalPaginas ||
        (i >= pagina - delta && i <= pagina + delta)
      ) {
        nums.push(i);
      }
    }
    // Adiciona "..." onde há saltos
    const resultado = [];
    let anterior = null;
    for (const num of nums) {
      if (anterior && num - anterior > 1) resultado.push('...');
      resultado.push(num);
      anterior = num;
    }
    return resultado;
  };

  return (
    <div className="card">
      <h3 className="card-titulo-secao">
        Escolas — {escolas.length} encontradas
      </h3>

      <div className="tabela-wrap">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome da Escola</th>
              <th>Distrito</th>
              <th>Bairro</th>
              <th>Matrículas</th>
            </tr>
          </thead>
          <tbody>
            {escolasPagina.map((escola) => (
              <tr key={escola.codigoEscola}>
                <td>{escola.codigoEscola}</td>
                <td>{escola.nomeEscola}</td>
                <td>{escola.distrito}</td>
                <td>{escola.bairro}</td>
                <td>{escola.totalMatriculas.toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINAÇÃO */}
      {totalPaginas > 1 && (
        <div className="paginacao">
          <button
            className="pag-btn"
            onClick={() => irPara(pagina - 1)}
            disabled={pagina === 1}
          >
            ‹ Anterior
          </button>

          <div className="pag-numeros">
            {paginas().map((item, idx) =>
              item === '...' ? (
                <span key={idx} className="pag-reticencias">...</span>
              ) : (
                <button
                  key={idx}
                  className={`pag-numero ${pagina === item ? 'ativo' : ''}`}
                  onClick={() => irPara(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <button
            className="pag-btn"
            onClick={() => irPara(pagina + 1)}
            disabled={pagina === totalPaginas}
          >
            Próxima ›
          </button>
        </div>
      )}
    </div>
  );
};

export default TabelaEscolas;
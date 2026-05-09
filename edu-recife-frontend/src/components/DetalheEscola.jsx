const DetalheEscola = ({ escola, onFechar }) => {
  if (!escola) return null;

  const maxTurno = escola.turnos[0]?.total || 1;
  const maxModalidade = escola.modalidades[0]?.total || 1;

  return (
    <div className="detalhe-overlay" onClick={onFechar}>
      <div className="detalhe-modal" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="detalhe-header">
          <div>
            <div className="detalhe-codigo">Código {escola.codigoEscola} · {escola.distrito}</div>
            <h2 className="detalhe-nome">{escola.nomeEscola}</h2>
          </div>
          <button className="detalhe-fechar" onClick={onFechar}>✕</button>
        </div>

        {/* LOCALIZAÇÃO EM DESTAQUE */}
        <a
          className="detalhe-localizacao"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            escola.endereco + ', ' + escola.numero + ', ' + escola.bairro + ', Recife, PE'
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <div className="detalhe-localizacao-icone">📍</div>
          <div className="detalhe-localizacao-info">
            <div className="detalhe-localizacao-endereco">
              {escola.endereco}, {escola.numero}
            </div>
            <div className="detalhe-localizacao-bairro">
              {escola.bairro} · Recife, PE
            </div>
          </div>
          <div className="detalhe-localizacao-seta">↗ Ver no mapa</div>
        </a>

        {/* TOTAL */}
        <div className="detalhe-total">
          <span className="detalhe-total-valor">
            {escola.totalMatriculas.toLocaleString('pt-BR')}
          </span>
          <span className="detalhe-total-label">matrículas no total</span>
        </div>

        {/* TURNOS */}
        <div className="detalhe-secao">
          <h4 className="detalhe-secao-titulo">Por Turno</h4>
          <div className="detalhe-barras">
            {escola.turnos.map((t) => (
              <div key={t.nome} className="detalhe-barra-item">
                <div className="detalhe-barra-meta">
                  <span>{t.nome}</span>
                  <span>{t.total.toLocaleString('pt-BR')}</span>
                </div>
                <div className="detalhe-barra-track">
                  <div
                    className="detalhe-barra-fill"
                    style={{ width: `${(t.total / maxTurno) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODALIDADES */}
        <div className="detalhe-secao">
          <h4 className="detalhe-secao-titulo">Por Modalidade</h4>
          <div className="detalhe-barras">
            {escola.modalidades.map((m) => (
              <div key={m.nome} className="detalhe-barra-item">
                <div className="detalhe-barra-meta">
                  <span>{m.nome}</span>
                  <span>{m.total.toLocaleString('pt-BR')}</span>
                </div>
                <div className="detalhe-barra-track">
                  <div
                    className="detalhe-barra-fill verde"
                    style={{ width: `${(m.total / maxModalidade) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetalheEscola;
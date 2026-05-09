import CardResumo from '../components/CardResumo';
import GraficoBarras from '../components/GraficoBarras';
import GraficoLinha from '../components/GraficoLinha';
import FiltrosBusca from '../components/FiltrosBusca';
import TabelaEscolas from '../components/TabelaEscolas';
import { useMatriculas } from '../hooks/useMatriculas';

const Painel = () => {
  const {
    ano, setAno,
    distrito, setDistrito,
    busca, setBusca,
    resumo,
    escolas,
    distritos,
    evolucao,
    carregando,
    erro,
  } = useMatriculas();

  return (
    <div className="painel">
      {/* HEADER */}
      <header className="header">
        <div className="header-pattern" aria-hidden="true" />
        <div className="header-conteudo">
          <div className="header-esquerda">
            <div className="header-icone">
              <img src="/logo-recife.png" alt="Prefeitura do Recife" width="72" height="72" />
            </div>
            <div>
              <div className="header-tag">RECIFE · PAINEL EDUCACIONAL</div>
              <h1>Matrículas Escolares</h1>
              <p>Secretaria de Educação · Dados Abertos do Município</p>
            </div>
          </div>
          <div className="header-badge">
            <span className="header-badge-dot" />
            Dados atualizados · Portal Aberto
          </div>
        </div>
      </header>

      <div className="conteudo">
        {/* ERRO */}
        {erro && <div className="erro">{erro}</div>}

        {/* CARREGANDO */}
        {carregando && <div className="carregando">Carregando dados...</div>}

        {/* FILTROS */}
        <FiltrosBusca
          ano={ano} setAno={setAno}
          distrito={distrito} setDistrito={setDistrito}
          busca={busca} setBusca={setBusca}
        />

        {/* KPI CARDS */}
        {resumo && (
          <div className="cards-grid">
            <CardResumo
              titulo="Total de Escolas"
              valor={resumo.totalEscolas.toLocaleString('pt-BR')}
              sub="Rede municipal do Recife"
              cor="#1351b4"
            />
            <CardResumo
              titulo="Total de Matrículas"
              valor={resumo.totalMatriculas.toLocaleString('pt-BR')}
              sub={`Ano letivo ${ano}`}
              cor="#168821"
            />
            <CardResumo
              titulo="Média por Escola"
              valor={resumo.mediaAlunos.toLocaleString('pt-BR')}
              sub="Alunos matriculados"
              cor="#e8a000"
            />
          </div>
        )}

        {/* GRÁFICOS */}
        <div className="graficos-grid">
          <GraficoBarras dados={distritos} />
          <GraficoLinha dados={evolucao} />
        </div>

        {/* TABELA */}
        <TabelaEscolas escolas={escolas} />
      </div>
    </div>
  );
};

export default Painel;
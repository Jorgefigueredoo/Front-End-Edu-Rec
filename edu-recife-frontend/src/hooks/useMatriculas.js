import { useState, useEffect } from 'react';
import { getResumo, getEscolas, getDistritos, getEvolucao } from '../services/api';

export const useMatriculas = () => {
  const [ano, setAno] = useState(2024);
  const [distrito, setDistrito] = useState('');
  const [busca, setBusca] = useState('');

  const [resumo, setResumo] = useState(null);
  const [todasEscolas, setTodasEscolas] = useState([]);
  const [escolasFiltradas, setEscolasFiltradas] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [evolucao, setEvolucao] = useState([]);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // Busca tudo do backend apenas quando o ano muda
  useEffect(() => {
    const buscarTudo = async () => {
      try {
        setCarregando(true);
        setErro(null);
        const [dadosResumo, dadosEscolas, dadosDistritos, dadosEvolucao] = await Promise.all([
          getResumo(ano),
          getEscolas(ano),
          getDistritos(ano),
          getEvolucao(),
        ]);
        setResumo(dadosResumo);
        setTodasEscolas(dadosEscolas.data);
        setEscolasFiltradas(dadosEscolas.data);
        setDistritos(dadosDistritos.data);
        setEvolucao(dadosEvolucao.data);
      } catch (err) {
        setErro('Erro ao carregar dados. Verifique se o backend está rodando.');
      } finally {
        setCarregando(false);
      }
    };

    buscarTudo();
  }, [ano]);

  // Filtro local — sem chamar o backend
  useEffect(() => {
    let resultado = todasEscolas;

    if (distrito) {
      resultado = resultado.filter((e) =>
        e.distrito.toLowerCase().includes(distrito.toLowerCase())
      );
    }

    if (busca) {
      resultado = resultado.filter((e) =>
        e.nomeEscola.toLowerCase().includes(busca.toLowerCase())
      );
    }

    setEscolasFiltradas(resultado);
  }, [busca, distrito, todasEscolas]);

  return {
    ano, setAno,
    distrito, setDistrito,
    busca, setBusca,
    resumo,
    escolas: escolasFiltradas,
    distritos,
    evolucao,
    carregando,
    erro,
  };
};
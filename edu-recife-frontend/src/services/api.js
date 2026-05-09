import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

export const getResumo = (ano) =>
  api.get(`/api/matriculas/resumo?ano=${ano}`).then((r) => r.data);

export const getEscolas = (ano, distrito, busca) =>
  api.get(`/api/matriculas/escolas`, {
    params: { ano, distrito, busca },
  }).then((r) => r.data);

export const getDistritos = (ano) =>
  api.get(`/api/matriculas/distritos?ano=${ano}`).then((r) => r.data);

export const getEvolucao = () =>
  api.get(`/api/matriculas/evolucao`).then((r) => r.data);
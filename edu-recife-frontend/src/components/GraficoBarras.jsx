import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const GraficoBarras = ({ dados }) => {
  return (
    <div className="card">
      <h3 className="card-titulo-secao">Matrículas por Distrito</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={dados}>
          <XAxis dataKey="distrito" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(value) => [value.toLocaleString('pt-BR'), 'Matrículas']}
          />
          <Bar dataKey="totalMatriculas" fill="#1351b4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoBarras;
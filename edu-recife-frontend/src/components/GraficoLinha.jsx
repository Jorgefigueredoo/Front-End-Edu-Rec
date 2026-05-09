import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const GraficoLinha = ({ dados }) => {
  return (
    <div className="card">
      <h3 className="card-titulo-secao">Evolução de Matrículas (2020–2024)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef1f6" />
          <XAxis dataKey="ano" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(value) => [value.toLocaleString('pt-BR'), 'Matrículas']}
          />
          <Line
            type="monotone"
            dataKey="totalMatriculas"
            stroke="#1351b4"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoLinha;
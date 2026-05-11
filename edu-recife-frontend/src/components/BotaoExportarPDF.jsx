import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

const BotaoExportarPDF = ({ ano, distrito, escolas, distritos }) => {
  const [exportando, setExportando] = useState(false);

  const exportarPDF = async () => {
    setExportando(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      let posY = 0;

      // Captura os cards e gráficos
      const graficos = document.getElementById("graficos-exportaveis");
      const canvasGraficos = await html2canvas(graficos, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f0f4f8",
      });

      // Cabeçalho
      pdf.setFillColor(19, 81, 180);
      pdf.rect(0, 0, pdfWidth, 20, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("Prefeitura do Recife — Painel de Matrículas Escolares", 10, 13);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      const filtroTexto = distrito
        ? `Distrito: ${distrito}`
        : "Todos os distritos";
      pdf.text(
        `Ano letivo: ${ano} · ${filtroTexto} · Gerado em: ${new Date().toLocaleDateString("pt-BR")}`,
        10,
        19,
      );

      posY = 22;

      // Cards e gráficos
      const imgGraficos = canvasGraficos.toDataURL("image/png");
      const alturaGraficos =
        (canvasGraficos.height * pdfWidth) / canvasGraficos.width;
      pdf.addImage(imgGraficos, "PNG", 0, posY, pdfWidth, alturaGraficos);
      posY += alturaGraficos + 8;

      // Título da tabela
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(26, 26, 46);
      pdf.text(`Escolas — ${escolas.length} encontradas`, 10, posY);
      posY += 8;

      // Cabeçalho da tabela
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, posY, pdfWidth, 8, "F");
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(100, 116, 139);
      pdf.text("CÓD.", 10, posY + 5);
      pdf.text("NOME DA ESCOLA", 25, posY + 5);
      pdf.text("DISTRITO", 120, posY + 5);
      pdf.text("BAIRRO", 150, posY + 5);
      pdf.text("MATRÍCULAS", 185, posY + 5);
      posY += 10;

      // Linhas da tabela
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(26, 26, 46);

      escolas.forEach((escola, idx) => {
        // Nova página se necessário
        if (posY > pdfHeight - 15) {
          pdf.addPage();
          posY = 15;
        }

        // Fundo alternado
        if (idx % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(0, posY - 4, pdfWidth, 8, "F");
        }

        pdf.setFontSize(8);
        pdf.text(String(escola.codigoEscola), 10, posY);
        pdf.text(escola.nomeEscola.substring(0, 45), 25, posY);
        pdf.text(escola.distrito, 120, posY);
        pdf.text(escola.bairro.substring(0, 18), 150, posY);
        pdf.setTextColor(19, 81, 180);
        pdf.text(
          String(escola.totalMatriculas.toLocaleString("pt-BR")),
          185,
          posY,
        );
        pdf.setTextColor(26, 26, 46);

        posY += 8;
      });

      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `matriculas-recife-${ano}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (err) {
      console.error("Erro ao exportar PDF:", err);
    } finally {
      setExportando(false);
    }
  };

  return (
    <button
      className="btn-exportar-pdf"
      onClick={exportarPDF}
      disabled={exportando}
    >
      {exportando ? "⏳ Gerando PDF..." : "📄 Exportar PDF"}
    </button>
  );
};

export default BotaoExportarPDF;

import type { Colaborador, Workshop } from "@/data/mocks";
import { formatarDataHora, formatarId } from "./format";
import { participantesDoWorkshop } from "./participacao";

function slug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Gera e baixa a ata de presença do workshop em PDF. */
export async function exportarAtaPdf(
  workshop: Workshop,
  colaboradores: Colaborador[],
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margem = 56;
  let y = margem;

  doc.setTextColor(10, 37, 64);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("FAST Soluções", margem, y);

  y += 18;
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 100, 115);
  doc.text("ATA DE PRESENÇA · WORKSHOP TRIMESTRAL", margem, y);

  y += 28;
  doc.setDrawColor(220, 225, 232);
  doc.line(margem, y, 595 - margem, y);

  y += 30;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(10, 37, 64);
  doc.text(doc.splitTextToSize(workshop.nome, 595 - margem * 2), margem, y);

  y += 20 * doc.splitTextToSize(workshop.nome, 595 - margem * 2).length;
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 100, 115);
  doc.text(formatarDataHora(workshop.dataRealizacao), margem, y);

  y += 26;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(45, 55, 72);
  const descricao = doc.splitTextToSize(workshop.descricao, 595 - margem * 2) as string[];
  doc.text(descricao, margem, y);
  y += descricao.length * 15 + 22;

  const presentes = participantesDoWorkshop(workshop, colaboradores);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(10, 37, 64);
  doc.text(`Colaboradores presentes (${presentes.length})`, margem, y);
  y += 18;

  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  doc.setTextColor(45, 55, 72);

  if (presentes.length === 0) {
    doc.text("Nenhum colaborador registrado.", margem, y);
  } else {
    presentes.forEach((colaborador) => {
      if (y > 780) {
        doc.addPage();
        y = margem;
      }
      doc.text(`${formatarId(colaborador.id)}  ${colaborador.nome}`, margem, y);
      y += 16;
    });
  }

  doc.save(`ata-${slug(workshop.nome)}.pdf`);
}

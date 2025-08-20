import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { GeneralInfoProps } from '../interface/GeneralInfoProps';
import type { ProducerInfoProps } from '../interface/ProducerInfoProps';
import type { ProductProps } from '../interface/ProductProps';
import formatAmount from './formatAmount';

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function exportPDF(
  general: GeneralInfoProps | null,
  producer: ProducerInfoProps | null,
  products: ProductProps[],
  totalCosto: number,
  totalVenta: number,
  options?: { returnBlob?: boolean }
) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text('Listado de productos', 14, 16);

  doc.setFontSize(10);
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 24;

  if (general) {
    const formattedDate = formatDate(general.fecha);

    doc.text(`Lugar: ${general.lugar}`, 14, y);
    doc.text(`Fecha: ${formattedDate}`, pageWidth - 14, y, { align: 'right' });
    y += 5;

    doc.text(`Receptor: ${general.receptor}`, 14, y);
    y += 10;
  }

  if (producer) {
    const p1 = `Productor: ${producer.nombre} ${producer.apellido}`;
    const p2 = [
      producer.documento && `Doc: ${producer.documento}`,
      producer.telefono && `Tel: ${producer.telefono}`,
      producer.email && `Email: ${producer.email}`,
    ]
      .filter(Boolean)
      .join(' · ');

    doc.text(p1, 14, y);
    y += 5;
    doc.text(p2, 14, y);
    y += 5;
  }

  if (general?.otros) {
    doc.text(`Nota: ${general.otros}`, 14, y);
    y += 5;
  }

  autoTable(doc, {
    startY: y + 2,
    head: [['Detalle', 'Cant.', 'Código', '$ Costo', '$ Venta']],
    body: products.map((p) => [
      p.detail,
      String(p.amount),
      String(p.code),
      formatAmount(p.cost_price),
      formatAmount(p.sale_price),
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [23, 49, 62] },
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right' },
    },
    didParseCell: function (data) {
      if (data.section === 'head') {
        if (data.column.index === 0) {
          data.cell.styles.halign = 'left';
        } else {
          data.cell.styles.halign = 'right';
        }
      }
    },
  });

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 6,
    body: [
      ['Total costo', formatAmount(totalCosto)],
      ['Total venta', formatAmount(totalVenta)],
    ],
    theme: 'plain',
    styles: { fontSize: 11 },
    columnStyles: {
      0: { halign: 'right' },
      1: { halign: 'right' },
    },
  });

  if (options?.returnBlob) {
    return doc.output('blob');
  } else {
    doc.save('productos.pdf');
    return undefined;
  }
}

export default exportPDF;

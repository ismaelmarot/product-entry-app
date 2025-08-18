// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import type { GeneralInfoProps } from '../interface/GeneralInfoProps';
// import type { ProducerInfoProps } from '../interface/ProducerInfoProps';
// import type { ProductProps } from '../interface/ProductProps';

// export default function exportPDF(
//   general: GeneralInfoProps | null,
//   producer: ProducerInfoProps | null,
//   products: ProductProps[],
//   totalCosto: number,
//   totalVenta: number
// ) {
//   const doc = new jsPDF();

//   doc.setFontSize(14);
//   doc.text("Listado de productos", 14, 16);

//   const lines: string[] = [];
//   if (general) {
//     lines.push(
//       `Lugar: ${general.lugar}`,
//       `Fecha: ${general.fecha}`,
//       `Receptor: ${general.receptor}`
//     );
//     if (general.otros) lines.push(`Otros: ${general.otros}`);
//   }
//   if (producer) {
//     const p1 = `Productor: ${producer.nombre} ${producer.apellido}`;
//     const p2 = [
//       producer.documento && `Doc: ${producer.documento}`,
//       producer.telefono && `Tel: ${producer.telefono}`,
//       producer.email && `Email: ${producer.email}`
//     ].filter(Boolean).join(' · ');
//     lines.push(p1, p2);
//   }

//   doc.setFontSize(10);
//   let y = 24;
//   lines.filter(Boolean).forEach(l => {
//     doc.text(l, 14, y);
//     y += 5;
//   });

//   autoTable(doc, {
//     startY: y + 2,
//     head: [["Detalle", "Cant.", "Costo", "Venta", "Subcosto", "Subventa"]],
//     body: products.map(p => [
//       p.detail,
//       String(p.amount),
//       p.cost_price.toFixed(2),
//       p.sale_price.toFixed(2),
//       (p.amount * p.cost_price).toFixed(2),
//       (p.amount * p.sale_price).toFixed(2)
//     ]),
//     styles: { fontSize: 9 },
//     headStyles: { fillColor: [33, 37, 41] }
//   });

//   autoTable(doc, {
//     startY: (doc as any).lastAutoTable.finalY + 6,
//     body: [
//       ['Total costo', totalCosto.toFixed(2)],
//       ['Total venta', totalVenta.toFixed(2)]
//     ],
//     theme: 'plain',
//     styles: { fontSize: 11 }
//   });

//   doc.save('productos.pdf');
// }


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { GeneralInfoProps } from '../interface/GeneralInfoProps';
import type { ProducerInfoProps } from '../interface/ProducerInfoProps';
import type { ProductProps } from '../interface/ProductProps';

export default function exportPDF(
  general: GeneralInfoProps | null,
  producer: ProducerInfoProps | null,
  products: ProductProps[],
  totalCosto: number,
  totalVenta: number,
  options?: { returnBlob?: boolean }
) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Listado de productos", 14, 16);

  const lines: string[] = [];
  if (general) {
    lines.push(
      `Lugar: ${general.lugar}`,
      `Fecha: ${general.fecha}`,
      `Receptor: ${general.receptor}`
    );
    if (general.otros) lines.push(`Otros: ${general.otros}`);
  }
  if (producer) {
    const p1 = `Productor: ${producer.nombre} ${producer.apellido}`;
    const p2 = [
      producer.documento && `Doc: ${producer.documento}`,
      producer.telefono && `Tel: ${producer.telefono}`,
      producer.email && `Email: ${producer.email}`
    ].filter(Boolean).join(' · ');
    lines.push(p1, p2);
  }

  doc.setFontSize(10);
  let y = 24;
  lines.filter(Boolean).forEach(l => {
    doc.text(l, 14, y);
    y += 5;
  });

  autoTable(doc, {
    startY: y + 2,
    head: [["Detalle", "Cant.", "Costo", "Venta", "Subcosto", "Subventa"]],
    body: products.map(p => [
      p.detail,
      String(p.amount),
      p.cost_price.toFixed(2),
      p.sale_price.toFixed(2),
      (p.amount * p.cost_price).toFixed(2),
      (p.amount * p.sale_price).toFixed(2)
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [33, 37, 41] }
  });

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 6,
    body: [
      ['Total costo', totalCosto.toFixed(2)],
      ['Total venta', totalVenta.toFixed(2)]
    ],
    theme: 'plain',
    styles: { fontSize: 11 }
  });

  if (options?.returnBlob) {
    return doc.output('blob');
  } else {
    doc.save('productos.pdf');
  }
}

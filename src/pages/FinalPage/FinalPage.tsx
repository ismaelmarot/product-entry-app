import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../helpers/formatDate';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';

function FinalPage() {
  const { general, producer, products, clearAll } = useAppContext();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const totalCosto = products.reduce((a, p) => a + p.cantidad * p.costo, 0);
  const totalVenta = products.reduce((a, p) => a + p.cantidad * p.venta, 0);

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text('Listado de productos', 14, 16);

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
      ]
        .filter(Boolean)
        .join(' · ');
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
      head: [['Detalle', 'Cant.', 'Costo', 'Venta', 'Subcosto', 'Subventa']],
      body: products.map(p => [
        p.detalle,
        String(p.cantidad),
        p.costo.toFixed(2),
        p.venta.toFixed(2),
        (p.cantidad * p.costo).toFixed(2),
        (p.cantidad * p.venta).toFixed(2)
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

    doc.save('productos.pdf');
  };

  function handleReiniciar() {
    clearAll();
    setShowConfirm(false);
    navigate('/general');
  }

  return (
    <div className="mt-3">
      <h3>Página 4 — Final / Imprimir / PDF</h3>

      {!general && (
        <div className="alert alert-warning">
          Falta completar la Información general (Paso 1).
        </div>
      )}
      {!producer && (
        <div className="alert alert-warning">
          Faltan Datos del productor (Paso 2).
        </div>
      )}
      {products.length === 0 && (
        <div className="alert alert-info">No hay productos (Paso 3).</div>
      )}

      <div className="mb-3 d-flex gap-2">
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/productos')}
        >
          Volver a productos
        </button>
        <button
          className="btn btn-success"
          onClick={exportPDF}
          disabled={!general || !producer || products.length === 0}
        >
          Descargar PDF
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => window.print()}
          disabled={!general || !producer || products.length === 0}
        >
          Imprimir
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => setShowConfirm(true)}
        >
          Reiniciar
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Resumen</h5>

          <div className="row">
            <div className="col-md-6">
              <h6>Información general</h6>
              {general ? (
                <ul className="mb-3">
                  <li>
                    <strong>Lugar:</strong> {general.lugar}
                  </li>
                  <li>
                    <strong>Fecha:</strong> {formatDate(general.fecha)}
                  </li>
                  <li>
                    <strong>Receptor:</strong> {general.receptor}
                  </li>
                  {general.otros && (
                    <li>
                      <strong>Nota:</strong> {general.otros}
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-muted">No cargado</p>
              )}
            </div>
            <div className="col-md-6">
              <h6>Datos del productor</h6>
              {producer ? (
                <ul className="mb-3">
                  <li>
                    <strong>Nombre:</strong> {producer.nombre}
                  </li>
                  <li>
                    <strong>Apellido:</strong> {producer.apellido}
                  </li>
                  {producer.documento && (
                    <li>
                      <strong>Documento:</strong> {producer.documento}
                    </li>
                  )}
                  {producer.telefono && (
                    <li>
                      <strong>Teléfono:</strong> {producer.telefono}
                    </li>
                  )}
                  {producer.email && (
                    <li>
                      <strong>Email:</strong> {producer.email}
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-muted">No cargado</p>
              )}
            </div>
          </div>

          <h6>Productos</h6>
          {products.length === 0 ? (
            <p className="text-muted">Sin productos.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Detalle</th>
                    <th className="text-end">Cant.</th>
                    <th className="text-end">Código</th>
                    <th className="text-end">$ Costo</th>
                    <th className="text-end">$ Venta</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>{p.detalle}</td>
                      <td className="text-end">{p.cantidad}</td>
                      <td className="text-end">{p.codigo}</td>
                      <td className="text-end">{p.costo.toFixed(2)}</td>
                      <td className="text-end">{p.venta.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={4} className="text-end">
                      Totales
                    </th>
                    <th className="text-end">{totalCosto.toFixed(2)}</th>
                    <th className="text-end">{totalVenta.toFixed(2)}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        show={showConfirm}
        title="Reiniciar datos"
        message="¿Está seguro de que desea reiniciar? Se perderá toda la información."
        confirmText="Sí, reiniciar"
        cancelText="Cancelar"
        onConfirm={handleReiniciar}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}

export default FinalPage;

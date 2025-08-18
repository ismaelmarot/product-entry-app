import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';
import GeneralInfoCard from '../../components/summary/GeneralInfoCard/GeneralInfoCard';
import ProducerInfoCard from '../../components/summary/ProducerInfoCard/ProducerInfoCard';
import ProductsTable from '../../components/summary/ProductsTable/ProductsTable';
import exportPDF from '../../helpers/exportPDF';

function FinalPage() {
  const { general, producer, products, clearAll } = useAppContext();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const totalCosto = products.reduce((a, p) => a + p.amount * p.cost_price, 0);
  const totalVenta = products.reduce((a, p) => a + p.amount * p.sale_price, 0);

  function handleReiniciar() {
    clearAll();
    setShowConfirm(false);
    navigate('/general');
  }

  return (
    <div className='mt-3'>
      <h3>Página 4 — Final / Imprimir / PDF</h3>

      {!general && <div className='alert alert-warning'>Falta completar la Información general (Paso 1).</div>}
      {!producer && <div className='alert alert-warning'>Faltan Datos del productor (Paso 2).</div>}
      {products.length === 0 && <div className='alert alert-info'>No hay productos (Paso 3).</div>}

      <div className='mb-3 d-flex gap-2'>
        <button className='btn btn-secondary' onClick={() => navigate('/productos')}>
          Volver a productos
        </button>
        <button
          className='btn btn-success'
          onClick={() => exportPDF(general, producer, products, totalCosto, totalVenta)}
          disabled={!general || !producer || products.length === 0}
        >
          Descargar PDF
        </button>
        <button
          onClick={() => {
            const blob = exportPDF(general, producer, products, totalCosto, totalVenta, { returnBlob: true });
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const win = window.open(url);
            if (win) {
              win.onload = () => win.print();
            }
          }}
        >
          Imprimir
        </button>
        <button
          className='btn btn-outline-danger'
          onClick={() => setShowConfirm(true)}
        >
          Reiniciar
        </button>
      </div>

      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>Resumen</h5>
          <div className='row'>
            <GeneralInfoCard general={general} />
            <ProducerInfoCard producer={producer} />
          </div>
          <h6>Productos</h6>
          <ProductsTable products={products} total_cost={totalCosto} total_sell={totalVenta} />
        </div>
      </div>

      <ConfirmDeleteModal
        show={showConfirm}
        title="Borrar datos"
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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import type { ProductProps } from '../../interface/ProductProps';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';
import GeneralInfoCard from '../../components/GeneralInfoCard/GeneralInfoCard';
import ProducerInfoCard from '../../components/ProducerInfoCard/ProducerInfoCard';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import exportPDF from '../../helpers/exportPDF';
import 'bootstrap-icons/font/bootstrap-icons.css';

function FinalPage() {
  const { general, producer, products, clearAll, sortColumn, sortDirection } = useAppContext();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const { removeProduct } = useAppContext();

  const sortedProducts: ProductProps[] = [...products].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue: any = (a as any)[sortColumn];
    let bValue: any = (b as any)[sortColumn];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalCosto = sortedProducts.reduce((a, p) => a + p.amount * p.cost_price, 0);
  const totalVenta = sortedProducts.reduce((a, p) => a + p.amount * p.sale_price, 0);

  function handleReiniciar() {
    clearAll();
    setShowConfirm(false);
    navigate('/general');
  }

  return (
    <div className='mt-3'>
      <h3>Final / Imprimir / PDF</h3>

      {!general && <div className='alert alert-warning'>Falta completar la Información general (Paso 1).</div>}
      {!producer && <div className='alert alert-warning'>Faltan Datos del productor (Paso 2).</div>}
      {products.length === 0 && <div className='alert alert-info'>No hay productos (Paso 3).</div>}

      <div className='mb-3 d-flex gap-2'>
        <button className='btn btn-secondary d-flex align-items-center' onClick={() => navigate('/productos')}>
          <i className='bi bi-backspace d-inline d-sm-none'></i>
          <span className='d-none d-sm-inline'>Volver a productos</span>
        </button>
        <button
          className='btn btn-success'
          onClick={() => exportPDF(general, producer, sortedProducts, totalCosto, totalVenta)}
          disabled={!general || !producer || products.length === 0}
        >
          <i className='bi bi-download d-inline d-sm-none'></i>
          <span className='d-none d-sm-inline'>Descargar PDF</span>
        </button>
        <button
          className='btn btn-warning'
          onClick={() => {
            const blob = exportPDF(general, producer, sortedProducts, totalCosto, totalVenta, { returnBlob: true });
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const win = window.open(url);
            if (win) {
              win.onload = () => win.print();
            }
          }}
        >
          <i className='bi bi-printer d-inline d-sm-none'></i>
          <span className='d-none d-sm-inline'>Imprimir</span>
        </button>
        <button
          className='btn btn-danger'
          onClick={() => setShowConfirm(true)}
        >
          <i className='bi bi-download d-inline d-sm-none'></i>
          <span className='d-none d-sm-inline'>Reiniciar</span>
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
          <ProductsTable 
            products={sortedProducts} 
            total_cost={totalCosto} 
            total_sell={totalVenta} 
            onDelete={(id: string | number) => removeProduct(String(id))} 
          />
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

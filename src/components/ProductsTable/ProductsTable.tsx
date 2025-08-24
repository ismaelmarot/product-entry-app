import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import formatAmount from '../../helpers/formatAmount';
import type { ProductsTableProps } from '../../interface/ProductsTableProps';

import type { Product } from '../../types/types';
import EditProductModal from '../EditProductModal/EditProductModal';

function ProductsTable({ products, total_cost, total_sell, onDelete }: ProductsTableProps) {
  const { sortColumn, sortDirection, setSort, updateProduct } = useAppContext();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortColumn) return 0;
    let aValue: string | number = (a as any)[sortColumn];
    let bValue: string | number = (b as any)[sortColumn];
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleHeaderClick = (column: string) => {
    if (sortColumn === column) {
      setSort(column, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(column, 'asc');
    }
  };

  const handleEditConfirm = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
    setEditingProduct(null);
  };

  if (products.length === 0) return <p className='text-muted'>Sin productos.</p>;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className='table table-sm' style={{ minWidth: '700px', tableLayout: 'fixed', width: '100%' }}>
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick('detail')} style={{ cursor: 'pointer' }}>
              Detalle {sortColumn === 'detail' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className='text-end' onClick={() => handleHeaderClick('amount')} style={{ cursor: 'pointer' }}>
              Cant. {sortColumn === 'amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className='text-end' onClick={() => handleHeaderClick('code')} style={{ cursor: 'pointer' }}>
              Código {sortColumn === 'code' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className='text-end' onClick={() => handleHeaderClick('cost_price')} style={{ cursor: 'pointer' }}>
              $ Costo {sortColumn === 'cost_price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className='text-end' onClick={() => handleHeaderClick('sale_price')} style={{ cursor: 'pointer' }}>
              $ Venta {sortColumn === 'sale_price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className='text-center'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.detail}</td>
              <td className='text-end'>{p.amount}</td>
              <td className='text-end'>{p.code || '-'}</td>
              <td className='text-end'>{formatAmount(p.cost_price)}</td>
              <td className='text-end'>{formatAmount(p.sale_price)}</td>
              <td className='text-center'>
                <button
                  className='btn btn-sm btn-primary me-2'
                  onClick={() => setEditingProduct({ ...p, id: String(p.id) })}
                >
                  Editar
                </button>
                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => onDelete(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th className='text-end' />
            <th className='text-end' />
            <th className='text-end'>{total_cost.toFixed(2)}</th>
            <th className='text-end'>{total_sell.toFixed(2)}</th>
            <th className='text-center' />
          </tr>
        </tfoot>
      </table>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onConfirm={handleEditConfirm}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductsTable;

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext, type Product } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import formatAmount from '../../helpers/formatAmount';

const schema = yup.object({
  code: yup.string().optional(),
  detail: yup.string().required("Detalle requerido"),
  amount: yup.number().typeError("Número válido").positive('> 0').integer("Entero").required(),
  cost_price: yup.number().typeError("Número válido").min(0, '>= 0').required(),
  sale_price: yup.number().typeError("Número válido").min(0, '>= 0').required(),
}).required();

export default function ProductsPage() {
  const { products, addProduct, removeProduct } = useAppContext();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Product, 'id'>>({
    resolver: yupResolver(schema),
    defaultValues: { code: '', detail: '', amount: 1, cost_price: 0, sale_price: 0 }
  });

  const onAdd = (data: Omit<Product, 'id'>) => {
    const formattedDetail =
      data.detail.charAt(0).toUpperCase() + data.detail.slice(1);

     addProduct({ ...data, detail: formattedDetail });
    reset({ code: '', detail: '', amount: 1, cost_price: 0, sale_price: 0 });
  };

  // Estados para ordenar
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Ordenar productos según columna y dirección
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue: string | number = (a as any)[sortColumn];
    let bValue: string | number = (b as any)[sortColumn];

    // Para strings, comparar en minúsculas
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className='mt-3'>
      <h3>Página 3 — Productos</h3>

      <form onSubmit={handleSubmit(onAdd)} className='row g-3 mt-1' style={{ border:'1px solid rgba(153, 161, 175, 1', padding: '1rem', borderRadius:'.2rem' }}>
        <div className='col-md-12'>
          <label className='form-label'>Detalle</label>
          <input className='form-control' {...register('detail')} />
          {errors.detail && <div className='text-danger small'>{errors.detail.message}</div>}
        </div>
        <div className='col-md-3'>
          <label className='form-label'>Código (opcional)</label>
          <input
            className='form-control'
            {...register('code')}
            onChange={(e) => { e.target.value = e.target.value.toUpperCase(); }}
          />
        </div>
        <div className='col-md-3'>
          <label className='form-label'>Cantidad</label>
          <input type='number' className='form-control' {...register('amount', { valueAsNumber: true })} />
          {errors.amount && <div className='text-danger small'>{errors.amount.message}</div>}
        </div>
        <div className='col-md-3'>
          <label className='form-label'>$ Costo</label>
          <input type='number' step='0.01' className='form-control' {...register('cost_price', { valueAsNumber: true })} />
          {errors.cost_price && <div className='text-danger small'>{errors.cost_price.message}</div>}
        </div>
        <div className='col-md-3'>
          <label className='form-label'>$ Venta</label>
          <input type='number' step='0.01' className='form-control' {...register('sale_price', { valueAsNumber: true })} />
          {errors.sale_price && <div className='text-danger small'>{errors.sale_price.message}</div>}
        </div>
        <div className='col-12 d-flex justify-content-between'>
          <button className='btn btn-secondary' type='button' onClick={() => navigate('/productor')}>Anterior</button>
          <button className='btn btn-success' type='submit'>Agregar</button>
          <button className='btn btn-primary' type='button' onClick={() => navigate('/final')} disabled={products.length === 0}>Siguiente</button>
        </div>
      </form>

      <hr className='my-4' />

      <h5>Lista de productos</h5>
      {products.length === 0 ? (
        <div className='alert alert-info'>No hay productos cargados.</div>
      ) : (
        <div className='table-responsive'>
          <table className='table align-middle w-100'>
            <thead>
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('detail')}>
                  Detalle {sortColumn === 'detail' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className='text-end' style={{ cursor: 'pointer' }} onClick={() => handleSort('amount')}>
                  Cant. {sortColumn === 'amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className='text-end' style={{ cursor: 'pointer' }} onClick={() => handleSort('code')}>
                  Código {sortColumn === 'code' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className='text-end' style={{ cursor: 'pointer' }} onClick={() => handleSort('cost_price')}>
                  $ Costo {sortColumn === 'cost_price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className='text-end' style={{ cursor: 'pointer' }} onClick={() => handleSort('sale_price')}>
                  $ Venta {sortColumn === 'sale_price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map(p => (
                <tr key={p.id}>
                  <td>{p.detail}</td>
                  <td className='text-end'>{p.amount}</td>
                  <td className='text-end'>{p.code || '-'}</td>
                  <td className='text-end'>{formatAmount(p.cost_price)}</td>
                  <td className='text-end'>{formatAmount(p.sale_price)}</td>
                  <td className='text-nowrap text-end'>
                    <button className='btn btn-sm btn-outline-danger' onClick={() => removeProduct(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

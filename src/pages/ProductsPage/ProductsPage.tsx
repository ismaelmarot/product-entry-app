import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext, type Product } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import ProductsTable from '../../components/ProductsTable/ProductsTable';

const schema = yup.object({
  code: yup.string().optional(),
  detail: yup.string().required("Detalle requerido"),
  amount: yup.number().typeError("Número válido").positive('> 0').integer("Entero").required(),
  cost_price: yup.number().typeError("Número válido").min(0, '>= 0').required(),
  sale_price: yup.number().typeError("Número válido").min(0, '>= 0').required(),
  usePercentage: yup.boolean(),
  percentage: yup
    .number()
    .typeError("Número válido")
    .min(0, '>= 0')
    .when('usePercentage', {
      is: true,
      then: schema => schema.required('Porcentaje requerido'),
      otherwise: schema => schema.notRequired(),
    }),
}).required();

export default function ProductsPage() {
  const { products, addProduct } = useAppContext();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<
    Omit<Product, 'id'> & { usePercentage: boolean; percentage: number }
  >({
    resolver: yupResolver(schema),
    defaultValues: { code: '', detail: '', amount: 1, cost_price: 0, sale_price: 0, usePercentage: false, percentage: 0 }
  });

  const usePercentage = watch('usePercentage');
  const percentage = watch('percentage');
  const costPrice = watch('cost_price');

  React.useEffect(() => {
    const cPrice = Number(costPrice) || 0;
    const perc = Number(percentage) || 0;

    if (usePercentage) {
      const calculated = cPrice + (cPrice * perc / 100);
      setValue('sale_price', Number(calculated.toFixed(2)));
    }
  }, [usePercentage, percentage, costPrice, setValue]);

  const onAdd = (data: Omit<Product, 'id'> & { usePercentage: boolean; percentage: number }) => {
    addProduct({ ...data, detail: data.detail.charAt(0).toUpperCase() + data.detail.slice(1) });
    reset({ code: '', detail: '', amount: 1, cost_price: 0, sale_price: 0, usePercentage: false, percentage: 0 });
  };

  const totalCosto = products.reduce((a, p) => a + p.amount * p.cost_price, 0);
  const totalVenta = products.reduce((a, p) => a + p.amount * p.sale_price, 0);

  return (
    <div className='mt-3'>
      <h3>Página 3 — Productos</h3>
      <form
        onSubmit={handleSubmit(onAdd)}
        className='row g-3 mt-1'
        style={{ border:'1px solid rgba(153, 161, 175, 1)', padding: '1rem', borderRadius:'.2rem' }}
      >
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
            onChange={e => { e.target.value = e.target.value.toUpperCase(); }}
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

        <div className='col-md-3 d-flex align-items-center'>
          <input type='checkbox' {...register('usePercentage')} id='usePercentage' className='me-2' />
          <label htmlFor='usePercentage' className='form-label mb-0'>Usar %</label>
        </div>

        <div className='col-md-3'>
          <label className='form-label'>Porcentaje %</label>
          <input type='number' className='form-control' {...register('percentage', { valueAsNumber: true })} disabled={!usePercentage} />
          {errors.percentage && <div className='text-danger small'>{errors.percentage.message}</div>}
        </div>

        <div className='col-12 d-flex justify-content-between'>
          <button className='btn btn-secondary' type='button' onClick={() => navigate('/productor')}>Anterior</button>
          <button className='btn btn-success' type='submit'>Agregar</button>
          <button className='btn btn-primary' type='button' onClick={() => navigate('/final')} disabled={products.length === 0}>Siguiente</button>
        </div>
      </form>

      <hr className='my-4' />
      <h5>Lista de productos</h5>
      <ProductsTable products={products} total_cost={totalCosto} total_sell={totalVenta} />
    </div>
  );
}


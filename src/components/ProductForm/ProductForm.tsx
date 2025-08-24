import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { ProductForm } from '../../types/types';

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

interface ProductFormProps {
  onAdd: (data: ProductForm) => void;
  persistUsePercentage: boolean;
  persistPercentage: number | undefined;
  setPersistUsePercentage: (val: boolean) => void;
  setPersistPercentage: (val: number | undefined) => void;
}

export default function ProductFormComponent({
  onAdd,
  persistUsePercentage,
  persistPercentage,
  setPersistUsePercentage,
  setPersistPercentage
}: ProductFormProps) {

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<ProductForm>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      code: '',
      detail: '',
      amount: 1,
      cost_price: undefined,
      sale_price: undefined,
      usePercentage: persistUsePercentage,
      percentage: persistPercentage
    },
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

  const handleAdd = (data: ProductForm) => {
    onAdd({ 
      ...data, 
      detail: data.detail.charAt(0).toUpperCase() + data.detail.slice(1)
    });

    setPersistUsePercentage(data.usePercentage);
    setPersistPercentage(data.percentage);

    reset({
      code: '',
      detail: '',
      amount: 1,
      cost_price: undefined,
      sale_price: undefined,
      usePercentage: data.usePercentage,
      percentage: data.usePercentage ? data.percentage : undefined
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAdd)}
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
        <input
          type='number'
          step='0.01'
          className='form-control'
          {...register('cost_price', { valueAsNumber: true })}
        />
        {errors.cost_price && <div className='text-danger small'>{errors.cost_price.message}</div>}
      </div>

      <div className='col-md-3'>
        <label className='form-label'>$ Venta</label>
        <input
          type='number'
          step='0.01'
          className='form-control'
          {...register('sale_price', { valueAsNumber: true })}
          disabled={usePercentage}
        />
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

      <div className='col-12 d-flex justify-content-end'>
        <button className='btn btn-success' type='submit'>Agregar</button>
      </div>
    </form>
  );
}

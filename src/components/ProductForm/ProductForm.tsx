import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../../validation/productSchema';
import type { ProductForm } from '../../types/types';
import type { ProductFormProps } from '../../interface/ProductFormProps';
import { TextInput } from '../Form/TextInput/TextInput';
import { NumberInput } from '../Form/NumberInput/NumberInput';
import { CheckboxInput } from '../Form/CheckBox/CheckBox';

function ProductFormComponent({
    onAdd,
    persistUsePercentage,
    persistPercentage,
    setPersistUsePercentage,
    setPersistPercentage
}: ProductFormProps) {

    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<ProductForm>({
        resolver: yupResolver(productSchema) as any,
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
        <TextInput 
            label='Código (opcional)'
            register={register('code')}
            error={errors.code}
            onChange={(e: { target: { value: string; }; }) => { e.target.value = e.target.value.toUpperCase(); }}
        />
        <NumberInput 
            label='Cantidad' 
            register={register('amount', { valueAsNumber: true })} 
            error={errors.amount} 
            step='1'
        />
        <NumberInput 
            label='$ Costo' 
            register={register('cost_price', { valueAsNumber: true })} 
            error={errors.cost_price}
            step='0.01'
        />
        <NumberInput 
            label='$ Venta' 
            register={register('sale_price', { valueAsNumber: true })} 
            error={errors.sale_price}
            step='0.01'
            disabled={usePercentage}
        />
        <CheckboxInput 
            id='usePercentage' 
            label='Usar %' 
            register={register('usePercentage')}
        />
        <NumberInput 
            label='Porcentaje %'
            register={register('percentage', { valueAsNumber: true })} 
            error={errors.percentage}
            disabled={!usePercentage}
        />
        <div className='col-12 d-flex justify-content-end'>
            <button className='btn btn-success' type='submit'>Agregar</button>
        </div>
        </form>
    );
}

export default ProductFormComponent;

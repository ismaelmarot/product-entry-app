import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ProductForm as ProductFormType } from '../../types/types';
import { productSchema } from '../../validation/productSchema';
import { NumberInput } from '../Form/NumberInput/NumberInput';
import { TextInput } from '../Form/TextInput/TextInput';
import { CheckboxInput } from '../Form/CheckBox/CheckBox';
import type { ProductFormProps } from '../../interface/ProductFormProps';
import ConfirmModal from '../ConfirmCodeModal/ConfirmCodeModal';

function ProductForm({
    onAdd,
    products,
    persistUsePercentage,
    persistPercentage,
    setPersistUsePercentage,
    setPersistPercentage
}: ProductFormProps) {

    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<ProductFormType>({
        resolver: yupResolver(productSchema) as any,
        defaultValues: {
            code: '',
            detail: '',
            amount: 1,
            cost_price: 0,
            sale_price: 0,
            usePercentage: persistUsePercentage,
            percentage: persistPercentage || 0
        },
    });

    const usePercentage = watch('usePercentage');
    const percentage = watch('percentage');
    const costPrice = watch('cost_price');

    const [modalVisible, setModalVisible] = useState(false);
    const [pendingProduct, setPendingProduct] = useState<ProductFormType | null>(null);

    React.useEffect(() => {
        const cPrice = Number(costPrice) || 0;
        const perc = Number(percentage) || 0;
        if (usePercentage) {
            const calculated = cPrice + (cPrice * perc / 100);
            setValue('sale_price', Number(calculated.toFixed(2)));
        }
    }, [usePercentage, percentage, costPrice, setValue]);

    const handleAdd = (data: ProductFormType) => {
        const newCode = data.code?.toUpperCase() || '';
        if (newCode && products?.some(p => (p.code || '').toUpperCase() === newCode)) {
            setPendingProduct({ ...data, code: newCode });
            setModalVisible(true);
            return;
        }
        addProductAndReset(data, newCode);
    };

    const addProductAndReset = (data: ProductFormType, code: string) => {
        onAdd({ 
            ...data, 
            code: code,
            detail: data.detail.charAt(0).toUpperCase() + data.detail.slice(1)
        });
        setPersistUsePercentage(data.usePercentage);
        setPersistPercentage(data.percentage);

        reset({
            code: '',
            detail: '',
            amount: 1,
            cost_price: 0,
            sale_price: 0,
            usePercentage: data.usePercentage,
            percentage: data.usePercentage ? data.percentage : 0
        });
    };

    const handleConfirmModal = (confirm: boolean) => {
        if (confirm && pendingProduct) {
            const code = pendingProduct.code?.toUpperCase() || '';
            addProductAndReset(pendingProduct, code);
        }
        setModalVisible(false);
        setPendingProduct(null);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(handleAdd)}
                className='row g-3 mt-1'
                style={{ border:'1px solid rgba(153, 161, 175, 1)', padding: '1rem', borderRadius:'.2rem' }}
            >
                <div className="col-md-12">
                    <label className='form-label'>Detalle</label>
                    <input className='form-control' {...register('detail')} />
                    {errors.detail && <div className='text-danger small'>{errors.detail.message}</div>}
                </div>
                <TextInput 
                    label="Código (opcional)"
                    register={register('code')}
                    error={errors.code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.toUpperCase();
                    }}
                />
                <NumberInput 
                    label="Cantidad" 
                    register={register('amount', { valueAsNumber: true })} 
                    error={errors.amount} 
                    step="1"
                />
                <NumberInput 
                    label="$ Costo" 
                    register={register('cost_price', { valueAsNumber: true })} 
                    error={errors.cost_price}
                    step="0.01"
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => { if(e.target.value==='0') e.target.value=''; }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { if(e.target.value==='') setValue('cost_price',0); }}
                />
                <NumberInput 
                    label="$ Venta" 
                    register={register('sale_price', { valueAsNumber: true })} 
                    error={errors.sale_price}
                    step="0.01"
                    disabled={usePercentage}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => { if(e.target.value==='0') e.target.value=''; }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { if(e.target.value==='') setValue('sale_price',0); }}
                />
                <CheckboxInput 
                    id='usePercentage' 
                    label="Usar %" 
                    register={register('usePercentage')}
                />
                <NumberInput 
                    label="Porcentaje %" 
                    register={register('percentage', { valueAsNumber: true })} 
                    error={errors.percentage}
                    disabled={!usePercentage}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => { if(e.target.value!=='') e.target.value=''; }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { if(e.target.value==='') setValue('percentage',0); }}
                />
                <div className='col-12 d-flex justify-content-end'>
                    <button className='btn btn-success' type='submit'>Agregar</button>
                </div>
            </form>
            {modalVisible && pendingProduct && (
                <ConfirmModal 
                    message={`El código "${pendingProduct.code}" ya existe. ¿Deseas agregarlo de todas formas?`}
                    onConfirm={() => handleConfirmModal(true)}
                    onCancel={() => handleConfirmModal(false)}
                />
            )}
        </>
    );
}

export default ProductForm;

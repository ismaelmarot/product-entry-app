import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import type { EditProductModalProps, Product } from '../../types/types';

export default function EditProductModal({ product, onConfirm, onCancel }: EditProductModalProps) {
    const [form, setForm] = useState<Product>({ ...product });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
        ...prev,
        [name]: name === 'amount' || name.includes('price') ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(form);
    };

    return ReactDOM.createPortal(
        <div className='modal-overlay' onClick={onCancel}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <h3 className='mb-3'>Editar producto</h3>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label className='form-label'>Detalle</label>
                        <input
                        name='detail'
                        className='form-control'
                        value={form.detail}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Cantidad</label>
                        <input
                        name='amount'
                        type='number'
                        className='form-control'
                        value={form.amount}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Código</label>
                        <input
                        name='code'
                        className='form-control'
                        value={form.code || ''}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>$ Costo</label>
                        <input
                        name='cost_price'
                        type='number'
                        className='form-control'
                        value={form.cost_price}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>$ Venta</label>
                        <input
                        name='sale_price'
                        type='number'
                        className='form-control'
                        value={form.sale_price}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type='button' className='btn btn-secondary me-2' onClick={onCancel}>
                            Cancelar
                        </button>
                        <button type='submit' className='btn btn-primary'>
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

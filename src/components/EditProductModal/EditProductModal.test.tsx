import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import EditProductModal from './EditProductModal';
import type { Product } from '../../types/types';

describe('EditProductModal', () => {
    const product: Product = {
        id: 'p1',
        detail: 'Producto 1',
        amount: 2,
        code: 'P001',
        cost_price: 100,
        sale_price: 150
    };

    it('muestra los valores del producto en el formulario', () => {
        render(<EditProductModal product={product} onConfirm={() => {}} onCancel={() => {}} />);
        
        expect(screen.getByLabelText('Detalle')).toHaveValue('Producto 1');
        expect(screen.getByLabelText('Cantidad')).toHaveValue(2);
        expect(screen.getByLabelText('Código')).toHaveValue('P001');
        expect(screen.getByLabelText('$ Costo')).toHaveValue(100);
        expect(screen.getByLabelText('$ Venta')).toHaveValue(150);
    });

    it('llama a onConfirm con los valores actualizados', () => {
        const onConfirm = vi.fn();
        render(<EditProductModal product={product} onConfirm={onConfirm} onCancel={() => {}} />);

        fireEvent.change(screen.getByLabelText('Detalle'), { target: { value: 'Producto modificado' } });
        fireEvent.change(screen.getByLabelText('Cantidad'), { target: { value: '5' } });
        fireEvent.submit(screen.getByRole('form'));

        expect(onConfirm).toHaveBeenCalledWith({
        detail: 'Producto modificado',
        amount: 5,
        code: 'P001',
        cost_price: 100,
        sale_price: 150
        });
    });

    it('llama a onCancel al hacer clic en Cancelar', () => {
        const onCancel = vi.fn();
        render(<EditProductModal product={product} onConfirm={() => {}} onCancel={onCancel} />);

        fireEvent.click(screen.getByText('Cancelar'));
        expect(onCancel).toHaveBeenCalledTimes(1);
    });
});

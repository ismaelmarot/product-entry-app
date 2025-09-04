import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductForm from './ProductForm';

describe('ProductForm', () => {
    const defaultProps = {
        onAdd: vi.fn(),
        products: [],
        persistUsePercentage: false,
        persistPercentage: 0,
        setPersistUsePercentage: vi.fn(),
        setPersistPercentage: vi.fn(),
    };

    it('renderiza el formulario correctamente', () => {
        render(<ProductForm {...defaultProps} />);
        expect(screen.getByLabelText('Detalle')).toBeInTheDocument();
        expect(screen.getByLabelText('Código (opcional)')).toBeInTheDocument();
        expect(screen.getByLabelText('Cantidad')).toBeInTheDocument();
        expect(screen.getByLabelText('$ Costo')).toBeInTheDocument();
        expect(screen.getByLabelText('$ Venta')).toBeInTheDocument();
        expect(screen.getByLabelText('Usar %')).toBeInTheDocument();
        expect(screen.getByLabelText('Porcentaje %')).toBeInTheDocument();
    });

    it('llama a onAdd al enviar un producto nuevo', async () => {
        render(<ProductForm {...defaultProps} />);
        
        fireEvent.change(screen.getByLabelText('Detalle'), { target: { value: 'Producto 1' } });
        fireEvent.change(screen.getByLabelText('$ Costo'), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText('$ Venta'), { target: { value: '150' } });
        
        fireEvent.click(screen.getByText('Agregar'));
        
        expect(defaultProps.onAdd).toHaveBeenCalled();
    });

    it('muestra el modal si el código ya existe', () => {
        const products = [{ code: 'ABC123', detail: 'Prod', amount: 1, cost_price: 100, sale_price: 150 }];
        render(<ProductForm {...defaultProps} products={products} />);
        
        fireEvent.change(screen.getByLabelText('Detalle'), { target: { value: 'Nuevo' } });
        fireEvent.change(screen.getByLabelText('Código (opcional)'), { target: { value: 'ABC123' } });
        fireEvent.click(screen.getByText('Agregar'));
        
        expect(screen.getByText(/ya existe/)).toBeInTheDocument();
    });

    it('llama a onAdd si se confirma en el modal', () => {
        const products = [{ code: 'ABC123', detail: 'Prod', amount: 1, cost_price: 100, sale_price: 150 }];
        render(<ProductForm {...defaultProps} products={products} />);
        
        fireEvent.change(screen.getByLabelText('Detalle'), { target: { value: 'Nuevo' } });
        fireEvent.change(screen.getByLabelText('Código (opcional)'), { target: { value: 'ABC123' } });
        fireEvent.click(screen.getByText('Agregar'));
        
        fireEvent.click(screen.getByText('Sí'));
        
        expect(defaultProps.onAdd).toHaveBeenCalled();
    });

    it('no llama a onAdd si se cancela en el modal', () => {
        const products = [{ code: 'ABC123', detail: 'Prod', amount: 1, cost_price: 100, sale_price: 150 }];
        render(<ProductForm {...defaultProps} products={products} />);
        
        fireEvent.change(screen.getByLabelText('Detalle'), { target: { value: 'Nuevo' } });
        fireEvent.change(screen.getByLabelText('Código (opcional)'), { target: { value: 'ABC123' } });
        fireEvent.click(screen.getByText('Agregar'));
        
        fireEvent.click(screen.getByText('No'));
        
        expect(defaultProps.onAdd).not.toHaveBeenCalledWith(expect.objectContaining({ code: 'ABC123' }));
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import ProductsTable from './ProductsTable';
import { AppProvider } from '../../context/AppContext';
import type { Product } from '../../types/types';

describe('ProductsTable', () => {
    const mockOnDelete = vi.fn();

    const products: Product[] = [
        { id: '1', detail: 'Producto A', amount: 2, code: 'A01', cost_price: 10, sale_price: 15 },
        { id: '2', detail: 'Producto B', amount: 1, code: 'B01', cost_price: 20, sale_price: 25 },
    ];

    const renderWithProvider = (ui: React.ReactNode) =>
        render(<AppProvider>{ui}</AppProvider>);

    it('muestra todos los productos', () => {
        renderWithProvider(
        <ProductsTable products={products} total_cost={30} total_sell={40} onDelete={mockOnDelete} />
        );

        expect(screen.getByText('Producto A')).toBeInTheDocument();
        expect(screen.getByText('Producto B')).toBeInTheDocument();
        expect(screen.getByText('A01')).toBeInTheDocument();
        expect(screen.getByText('B01')).toBeInTheDocument();
    });

    it('llama a onDelete al eliminar un producto', () => {
        renderWithProvider(
        <ProductsTable products={products} total_cost={30} total_sell={40} onDelete={mockOnDelete} />
        );

        const deleteButtons = screen.getAllByText('Eliminar');
        fireEvent.click(deleteButtons[0]);

        // Aparece modal de confirmación
        expect(screen.getByText(/¿Estás seguro de eliminar el producto/)).toBeInTheDocument();

        const confirmButton = screen.getByText('Eliminar');
        fireEvent.click(confirmButton);

        expect(mockOnDelete).toHaveBeenCalledWith('1');
    });

    it('abre modal de edición al hacer clic en Editar', () => {
        renderWithProvider(
        <ProductsTable products={products} total_cost={30} total_sell={40} onDelete={mockOnDelete} />
        );

        const editButtons = screen.getAllByText('Editar');
        fireEvent.click(editButtons[0]);

        expect(screen.getByText('Editar producto')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Producto A')).toBeInTheDocument();
    });
});

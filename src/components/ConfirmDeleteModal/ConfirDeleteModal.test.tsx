import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import ConfirmDeleteModal from './ConfirmDeleteModal';

describe('ConfirmDeleteModal', () => {
    it('no renderiza nada si show es false', () => {
        const { container } = render(
        <ConfirmDeleteModal
            show={false}
            title="Eliminar"
            message="¿Estás seguro?"
            onConfirm={() => {}}
            onCancel={() => {}}
        />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renderiza correctamente el título y el mensaje', () => {
        render(
        <ConfirmDeleteModal
            show={true}
            title="Eliminar item"
            message="¿Seguro que quieres eliminar?"
            onConfirm={() => {}}
            onCancel={() => {}}
        />
        );

        expect(screen.getByText('Eliminar item')).toBeInTheDocument();
        expect(screen.getByText('¿Seguro que quieres eliminar?')).toBeInTheDocument();
    });

    it('llama a onConfirm al hacer clic en el botón Confirmar', () => {
        const onConfirm = vi.fn();
        render(
        <ConfirmDeleteModal
            show={true}
            title="Eliminar"
            message="Confirmar acción"
            onConfirm={onConfirm}
            onCancel={() => {}}
        />
        );

        fireEvent.click(screen.getByText('Confirmar'));
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('llama a onCancel al hacer clic en el botón Cancelar', () => {
        const onCancel = vi.fn();
        render(
        <ConfirmDeleteModal
            show={true}
            title="Eliminar"
            message="Cancelar acción"
            onConfirm={() => {}}
            onCancel={onCancel}
        />
        );

        fireEvent.click(screen.getByText('Cancelar'));
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('usa textos personalizados en los botones si se pasan props', () => {
        const onConfirm = vi.fn();
        const onCancel = vi.fn();

        render(
        <ConfirmDeleteModal
            show={true}
            title="Eliminar"
            message="Custom botones"
            confirmText="Sí"
            cancelText="No"
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
        );

        expect(screen.getByText('Sí')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Sí'));
        fireEvent.click(screen.getByText('No'));

        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onCancel).toHaveBeenCalledTimes(1);
    });
});

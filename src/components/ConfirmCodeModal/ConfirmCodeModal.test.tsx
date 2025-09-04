import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import ConfirmCodeModal from './ConfirmCodeModal';

describe('ConfirmCodeModal', () => {
    it('muestra el mensaje correctamente', () => {
        render(<ConfirmCodeModal message="¿Estás seguro?" onConfirm={() => {}} onCancel={() => {}} />);
        expect(screen.getByText('¿Estás seguro?')).toBeInTheDocument();
    });

    it('llama a onConfirm al hacer clic en "Sí"', () => {
        const onConfirm = vi.fn();
        render(<ConfirmCodeModal message="Confirma" onConfirm={onConfirm} onCancel={() => {}} />);
        fireEvent.click(screen.getByText('Sí'));
        expect(onConfirm).toHaveBeenCalled();
    });

    it('llama a onCancel al hacer clic en "No"', () => {
        const onCancel = vi.fn();
        render(<ConfirmCodeModal message="Confirma" onConfirm={() => {}} onCancel={onCancel} />);
        fireEvent.click(screen.getByText('No'));
        expect(onCancel).toHaveBeenCalled();
    });
});

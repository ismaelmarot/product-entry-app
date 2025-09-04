import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GeneralInfoCard from './GeneralInfoCard';
import formatDate from '../../helpers/formData';
import type { GeneralInfoProps } from '../../interface/GeneralInfoProps';

vi.mock('../../helpers/formData', () => ({
    default: vi.fn((date: string) => `formatted-${date}`)
}));

describe('GeneralInfoCard', () => {
    it('muestra la información general correctamente', () => {
        const general: GeneralInfoProps = {
        lugar: 'Buenos Aires',
        fecha: '2025-09-03',
        receptor: 'Juan Pérez',
        otros: 'Nota adicional'
        };

        render(<GeneralInfoCard general={general} />);

        expect(screen.getByText(/Lugar:/)).toHaveTextContent('Lugar: Buenos Aires');
        expect(screen.getByText(/Fecha:/)).toHaveTextContent('Fecha: formatted-2025-09-03');
        expect(screen.getByText(/Receptor:/)).toHaveTextContent('Receptor: Juan Pérez');
        expect(screen.getByText(/Nota:/)).toHaveTextContent('Nota: Nota adicional');

        expect(formatDate).toHaveBeenCalledWith('2025-09-03');
    });

    it('muestra mensaje de "No cargado" si general es null', () => {
        render(<GeneralInfoCard general={null} />);
        expect(screen.getByText('No cargado')).toBeInTheDocument();
    });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProducerInfoCard from './ProducerInfoCard';
import * as helpers from '../../helpers/formatDocumentId';

describe('ProducerInfoCard', () => {
    it('muestra los datos del productor correctamente', () => {
        const mockFormat = vi.spyOn(helpers, 'formatDocumentoId').mockImplementation((v) => `formatted-${v}`);

        const producer = {
        first_name: 'Juan',
        last_name: 'Pérez',
        id_number: '12345678',
        phone: '111-222-333',
        email: 'juan@example.com',
        };

        render(<ProducerInfoCard producer={producer} />);

        expect(screen.getByText(/Apellido:/)).toHaveTextContent('Apellido: Pérez');
        expect(screen.getByText(/Nombre:/)).toHaveTextContent('Nombre: Juan');
        expect(screen.getByText(/Documento:/)).toHaveTextContent('Documento: formatted-12345678');
        expect(screen.getByText(/Teléfono:/)).toHaveTextContent('Teléfono: 111-222-333');
        expect(screen.getByText(/Email:/)).toHaveTextContent('Email: juan@example.com');

        mockFormat.mockRestore();
    });

    it('muestra "No cargado" cuando producer es null', () => {
        render(<ProducerInfoCard producer={null} />);
        expect(screen.getByText('No cargado')).toBeInTheDocument();
    });
});

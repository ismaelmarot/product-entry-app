import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import TabsNav from './TabsNav';

describe('TabsNav', () => {
    it('renderiza todas las pestañas con los labels correctos', () => {
        render(
        <MemoryRouter>
            <TabsNav />
        </MemoryRouter>
        );

        const labels = [
            '1. Información general',
            '2. Datos del productor',
            '3. Productos',
            '4. Final / PDF'
        ];

        labels.forEach(label => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    it('marca la pestaña activa según la ruta', () => {
        render(
            <MemoryRouter initialEntries={['/productos']}>
                <TabsNav />
            </MemoryRouter>
        );

        const activeTab = screen.getByText('3. Productos');
        expect(activeTab.classList.contains('active')).toBe(true);

        const inactiveTab = screen.getByText('1. Información general');
        expect(inactiveTab.classList.contains('active')).toBe(false);
    });
});

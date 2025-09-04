import { describe, it, expect } from 'vitest';
import formatAmount from './formatAmount';

describe('formatAmount', () => {
    it('debería devolver string vacío si el valor es null', () => {
        expect(formatAmount(null as unknown as string)).toBe('');
    });

    it('debería devolver string vacío si el valor es undefined', () => {
        expect(formatAmount(undefined as unknown as string)).toBe('');
    });

    it('debería devolver string vacío si el valor es cadena vacía', () => {
        expect(formatAmount('')).toBe('');
    });

    it('debería formatear número entero', () => {
        expect(formatAmount(1000)).toBe('1.000,00');
    });

    it('debería formatear número con decimales', () => {
        expect(formatAmount(1234.56)).toBe('1.234,56');
    });

    it('debería aceptar número en string con coma', () => {
        expect(formatAmount('1234,56')).toBe('1.234,56');
    });

    it('debería aceptar número en string con punto', () => {
        expect(formatAmount('1234.56')).toBe('1.234,56');
    });

    it('debería devolver vacío si no es número válido', () => {
        expect(formatAmount('abc')).toBe('');
    });
});

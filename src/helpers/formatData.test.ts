import { describe, it, expect } from 'vitest';
import formatDate from './formatDate';

describe('formatDate', () => {
    it('devuelve vacío si la fecha es string vacío', () => {
        expect(formatDate('')).toBe('');
    });

    it('formatea una fecha válida en formato largo (es-AR)', () => {
        const result = formatDate('2025-09-03');
  
        expect(result).toBe('3 de septiembre de 2025');
    });

    it('funciona con otra fecha', () => {
        const result = formatDate('2000-01-15');
        expect(result).toBe('15 de enero de 2000');
    });
});

import { describe, it, expect } from 'vitest';
import formatDate from './formatDate';

describe('formatDate', () => {
    it('convierte fecha ISO a dd-mm-yyyy', () => {
        expect(formatDate('2025-09-03')).toBe('03-09-2025');
        expect(formatDate('2000-01-15')).toBe('15-01-2000');
    });

    it('devuelve string vacío si recibe valor vacío', () => {
        expect(formatDate('')).toBe('');
        expect(formatDate(undefined as unknown as string)).toBe('');
        expect(formatDate(null as unknown as string)).toBe('');
    });

    it('devuelve string raro si la fecha no tiene formato válido', () => {
        expect(formatDate('2025/09/03')).toBe('undefined-undefined-2025/09/03'); 
    });
});

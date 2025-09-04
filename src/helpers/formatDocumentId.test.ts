import { describe, it, expect } from 'vitest';
import { formatDocumentoId } from './formatDocumentId';

describe('formatDocumentoId', () => {
    it('elimina caracteres no numéricos', () => {
        expect(formatDocumentoId('12a34b')).toBe('1.234');
    });

    it('elimina ceros iniciales', () => {
        expect(formatDocumentoId('0001234')).toBe('1.234');
    });

    it('agrega puntos como separador de miles', () => {
        expect(formatDocumentoId('1234567')).toBe('1.234.567');
        expect(formatDocumentoId('9876543210')).toBe('9.876.543.210');
    });

    it('devuelve "0" si no hay números', () => {
        expect(formatDocumentoId('')).toBe('0');
        expect(formatDocumentoId('abc')).toBe('0');
        expect(formatDocumentoId('000')).toBe('0');
    });
});

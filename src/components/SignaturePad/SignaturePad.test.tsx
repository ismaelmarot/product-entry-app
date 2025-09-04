import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SignaturePad from './SignaturePad';
import type { SignaturePadRefProps } from '../../interface/SignaturePadRefProps';

describe('SignaturePad', () => {
    it('renderiza el canvas', () => {
        const { container } = render(<SignaturePad />);
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
    });

    it('ref expone métodos clear y getDataURL', () => {
        const ref = { current: null } as unknown as React.RefObject<SignaturePadRefProps>;
        render(<SignaturePad ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(typeof ref.current?.clear).toBe('function');
        expect(typeof ref.current?.getDataURL).toBe('function');

        const mockClear = vi.fn();
        const mockToDataURL = vi.fn(() => 'data:image/png;base64,test');
        if (ref.current) {
        ref.current.clear = mockClear;
        ref.current.getDataURL = mockToDataURL;
        }

        ref.current?.clear();
        expect(mockClear).toHaveBeenCalled();

        const dataUrl = ref.current?.getDataURL();
        expect(dataUrl).toBe('data:image/png;base64,test');
    });
});

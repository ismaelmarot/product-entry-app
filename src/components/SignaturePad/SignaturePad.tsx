import { useRef, useImperativeHandle, forwardRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import type { SignaturePadRefProps } from '../../interface/SignaturePadRefProps';
import type { SignaturePadProps } from '../../interface/SignaturePadProps';

const SignaturePad = forwardRef<SignaturePadRefProps, SignaturePadProps>(
    ({ width = 400, height = 150, backgroundColor = '#fff' }, ref) => {
        const sigCanvas = useRef<SignatureCanvas>(null);

        useImperativeHandle(ref, () => ({
        clear: () => sigCanvas.current?.clear(),
        getDataURL: () => sigCanvas.current?.toDataURL() || ''
        }));

        return (
            <div style={{ border: '1px solid #ccc', display: 'inline-block' }}>
                <SignatureCanvas
                ref={sigCanvas}
                penColor='black'
                canvasProps={{ width, height, style: { backgroundColor } }}
                />
            </div>
        );
    }
);

export default SignaturePad;

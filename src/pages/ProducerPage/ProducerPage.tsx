import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';
import type { ProducerInfo } from '../../types/types';

function ProducerForm() {
    const { register, handleSubmit, reset, getValues } = useForm<ProducerInfo>();
    const [producer, setProducer] = useState<ProducerInfo>({
        first_name: '',
        last_name: '',
        id_number: '',
        phone: '',
        email: '',
        signature: '',
    });
    const [isEmpty, setIsEmpty] = useState(true);
    const sigCanvas = useRef<SignatureCanvas>(null);

    const onSubmit = (data: ProducerInfo) => {
        console.log('Formulario enviado:', data);
    };

    const clearSignature = () => {
        sigCanvas.current?.clear();
        setIsEmpty(true);

        setProducer((prev) => ({
        ...prev,
        signature: undefined,
        }));

        reset(
        { ...getValues(), signature: '' },
        { keepErrors: true, keepDirty: true, keepTouched: true }
        );
    };

    const saveSignature = () => {
        if (sigCanvas.current) {
        const signatureData = sigCanvas.current
            .getTrimmedCanvas()
            .toDataURL('image/png');

        setProducer((prev) => ({
            ...prev,
            signature: signatureData,
        }));

        reset(
            { ...getValues(), signature: signatureData },
            { keepErrors: true, keepDirty: true, keepTouched: true }
        );

        setIsEmpty(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
            {...register('first_name')}
            defaultValue={producer.first_name}
            className="form-control"
            />
        </div>

        <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
            {...register('last_name')}
            defaultValue={producer.last_name}
            className="form-control"
            />
        </div>

        <div className="mb-3">
            <label className="form-label">DNI</label>
            <input
            {...register('id_number')}
            defaultValue={producer.id_number}
            className="form-control"
            />
        </div>

        <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
            {...register('phone')}
            defaultValue={producer.phone}
            className="form-control"
            />
        </div>

        <div className="mb-3">
            <label className="form-label">Email</label>
            <input
            {...register('email')}
            defaultValue={producer.email}
            className="form-control"
            />
        </div>

        <div className="mb-3">
            <label className="form-label">Firma</label>
            <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
                width: 500,
                height: 200,
                className: 'border border-dark rounded',
            }}
            />
            <div className="mt-2 d-flex gap-2">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={clearSignature}
            >
                Limpiar
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={saveSignature}
            >
                Guardar Firma
            </button>
            </div>
            {!isEmpty && (
            <div className="mt-3">
                <p>Vista previa de firma:</p>
                <img
                src={producer.signature}
                alt="Firma"
                className="border rounded"
                style={{ maxWidth: '200px' }}
                />
            </div>
            )}
        </div>

        <button type="submit" className="btn btn-success">
            Enviar
        </button>
        </form>
    );
    }

export default ProducerForm;

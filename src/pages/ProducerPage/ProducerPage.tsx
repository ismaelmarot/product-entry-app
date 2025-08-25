import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext } from '../../context/AppContext';
import type { ProducerInfoProps } from '../../interface/ProducerInfoProps';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const schema = yup.object({
    first_name: yup.string().required("El nombre es obligatorio"),
    last_name: yup.string().required("El apellido es obligatorio"),
    id_number: yup.string().optional(),
    phone: yup.string().optional(),
    email: yup.string().email('Email inválido').optional(),
}).required();

function ProducerPage() {
    const { producer, setProducer } = useAppContext();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProducerInfoProps>({
        resolver: yupResolver(schema) as any,
        defaultValues: producer ?? { first_name: '', last_name: '', id_number: '', phone: '', email: '', signature: '' }
    });

    const sigCanvas = useRef<SignatureCanvas>(null);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        if (producer?.signature && sigCanvas.current) {
            const img = new Image();
            img.src = producer.signature;
            img.onload = () => {
                const ctx = sigCanvas.current?.getCanvas().getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, sigCanvas.current!.getCanvas().width, sigCanvas.current!.getCanvas().height);
                }
                setIsEmpty(false);
            };
        }
    }, [producer]);

    const clearSignature = () => {
        sigCanvas.current?.clear();
        setIsEmpty(true);

        setProducer({
            first_name: producer?.first_name ?? '',
            last_name: producer?.last_name ?? '',
            id_number: producer?.id_number,
            phone: producer?.phone,
            email: producer?.email,
            signature: undefined
        });

        reset({
            first_name: producer?.first_name ?? '',
            last_name: producer?.last_name ?? '',
            id_number: producer?.id_number ?? '',
            phone: producer?.phone ?? '',
            email: producer?.email ?? '',
            signature: ''
        });
    };

    const onSubmit = (data: ProducerInfoProps) => {
        let signatureData: string | undefined = producer?.signature;

        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            signatureData = sigCanvas.current.toDataURL();
        }

        setProducer({
            first_name: data.first_name,
            last_name: data.last_name,
            id_number: data.id_number,
            phone: data.phone,
            email: data.email,
            signature: signatureData
        });

        navigate('/productos');
    };

    return (
        <div className='mt-3'>
            <h3>Datos del productor</h3>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className='row g-3 mt-1' 
                style={{ border:'1px solid rgba(153, 161, 175, 1)', padding: '1rem', borderRadius:'.2rem' }}
            >
                <div className='col-md-4'>
                    <label className='form-label'>Nombre</label>
                    <input className='form-control' {...register('first_name')} />
                    {errors.first_name && <div className='text-danger small'>{errors.first_name.message}</div>}
                </div>
                <div className='col-md-4'>
                    <label className='form-label'>Apellido</label>
                    <input className='form-control' {...register('last_name')} />
                    {errors.last_name && <div className='text-danger small'>{errors.last_name.message}</div>}
                </div>
                <div className='col-md-4'>
                    <label className='form-label'>Documento</label>
                    <input className='form-control' {...register('id_number')} />
                </div>
                <div className='col-md-4'>
                    <label className='form-label'>Teléfono</label>
                    <input className='form-control' {...register('phone')} />
                </div>
                <div className='col-md-4'>
                    <label className='form-label'>Email</label>
                    <input type='email' className='form-control' {...register('email')} />
                    {errors.email && <div className='text-danger small'>{errors.email.message}</div>}
                </div>

                <div className='col-12'>
                    <label className='form-label'>Firma digital (opcional)</label>
                    <div style={{ border: '1px solid #ccc', borderRadius: 4 }}>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor='black'
                            canvasProps={{ width: 500, height: 150, className: 'sigCanvas' }}
                            onEnd={() => setIsEmpty(false)}
                        />
                    </div>
                    <button 
                        type='button' 
                        className='btn btn-sm btn-secondary mt-1' 
                        onClick={clearSignature}
                        disabled={isEmpty}
                    >
                        Limpiar firma
                    </button>
                </div>

                <div className='col-12 d-flex justify-content-between mt-3'>
                    <button className='btn btn-secondary' type='button' onClick={() => navigate('/general')}>
                        Anterior
                    </button>
                    <button className='btn btn-primary' type='submit'>
                        Siguiente
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProducerPage;

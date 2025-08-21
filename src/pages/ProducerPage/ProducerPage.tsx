import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext, type ProducerInfo } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  nombre: yup.string().required("El nombre es obligatorio"),
  apellido: yup.string().required("El apellido es obligatorio"),
  documento: yup.string().optional(),
  telefono: yup.string().optional(),
  email: yup.string().email('Email inválido').optional(),
}).required();

export default function ProducerPage() {
  const { producer, setProducer } = useAppContext();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<ProducerInfo>({
    resolver: yupResolver(schema),
    defaultValues: producer ?? { nombre: '', apellido: '', documento: '', telefono: '', email: '' }
  });

  const onSubmit = (data: ProducerInfo) => {
    setProducer(data);
    navigate('/productos');
  };

  return (
    <div className='mt-3'>
      <h3>Datos del productor</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='row g-3 mt-1' style={{ border:'1px solid rgba(153, 161, 175, 1', padding: '1rem', borderRadius:'.2rem' }}>
        <div className='col-md-4'>
          <label className='form-label'>Nombre</label>
          <input className='form-control' {...register('nombre')} />
          {errors.nombre && <div className='text-danger small'>{errors.nombre.message}</div>}
        </div>
        <div className='col-md-4'>
          <label className='form-label'>Apellido</label>
          <input className='form-control' {...register('apellido')} />
          {errors.apellido && <div className='text-danger small'>{errors.apellido.message}</div>}
        </div>
        <div className='col-md-4'>
          <label className='form-label'>Documento</label>
          <input className='form-control' {...register('documento')} />
        </div>
        <div className='col-md-4'>
          <label className='form-label'>Teléfono</label>
          <input className='form-control' {...register('telefono')} />
        </div>
        <div className='col-md-4'>
          <label className='form-label'>Email</label>
          <input type='email' className='form-control' {...register('email')} />
          {errors.email && <div className='text-danger small'>{errors.email.message}</div>}
        </div>
        <div className='col-12 d-flex justify-content-between'>
          <button className='btn btn-secondary' type='button' onClick={() => navigate('/general')}>Anterior</button>
          <button className='btn btn-primary' type='submit'>Siguiente</button>
        </div>
      </form>
    </div>
  );
}

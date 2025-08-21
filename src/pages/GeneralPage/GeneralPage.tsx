import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext, type GeneralInfo } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  lugar: yup.string().required("El lugar es obligatorio"),
  fecha: yup.string().required("La fecha es obligatoria"),
  receptor: yup.string().required("El receptor es obligatorio"),
  otros: yup.string().optional(),
}).required();

export default function GeneralPage() {
  const { general, setGeneral } = useAppContext();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<GeneralInfo>({
    resolver: yupResolver(schema),
    defaultValues: general ?? { lugar: '', fecha: new Date().toISOString().slice(0,10), receptor: '', otros: '' }
  });

  const onSubmit = (data: GeneralInfo) => {
    setGeneral(data);
    navigate('/productor');
  };

  return (
    <div className='mt-3'>
      <h3>Información general</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='row g-3 mt-1' style={{ border:'1px solid rgba(153, 161, 175, 1', padding: '1rem', borderRadius:'.2rem' }}>
        <div className='col-md-4'>
          <label className='form-label'>Lugar</label>
          <input className='form-control' {...register('lugar')} />
          {errors.lugar && <div className='text-danger small'>{errors.lugar.message}</div>}
        </div>
        <div className='col-md-4'>
          <label className='form-label'>Fecha</label>
          <input type='date' className='form-control' {...register('fecha')} />
          {errors.fecha && <div className='text-danger small'>{errors.fecha.message}</div>}
        </div>
        <div className='col-md-4'>
          <label className='form-label'>Receptor</label>
          <input className='form-control' {...register('receptor')} />
          {errors.receptor && <div className='text-danger small'>{errors.receptor.message}</div>}
        </div>
        <div className='col-12'>
          <label className='form-label'>Nota</label>
          <textarea className='form-control' rows={2} {...register('otros')} />
        </div>
        <div className='col-12 d-flex justify-content-end'>
          <button className='btn btn-primary' type='submit'>Siguiente</button>
        </div>
      </form>
    </div>
  );
}

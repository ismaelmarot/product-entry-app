import type { ProducerInfoCardProps } from '../../interface/ProducerInfoCardProps';
import { formatDocumentoId } from '../../helpers/formatDocumentId';

function ProducerInfoCard({ producer }: ProducerInfoCardProps) {
  return (
    <div className='col-md-6'>
      <h6>Datos del productor</h6>
      {producer ? (
        <ul className='mb-3'>
          <li><strong>Apellido:</strong> {producer.last_name}</li>
          <li><strong>Nombre:</strong> {producer.first_name}</li>
          {producer.id_number && <li><strong>Documento:</strong> {formatDocumentoId(producer.id_number)}</li>}
          {producer.phone && <li><strong>Teléfono:</strong> {producer.phone}</li>}
          {producer.email && <li><strong>Email:</strong> {producer.email}</li>}
        </ul>
      ) : (
        <p className='text-muted'>No cargado</p>
      )}
    </div>
  );
}

export default ProducerInfoCard;

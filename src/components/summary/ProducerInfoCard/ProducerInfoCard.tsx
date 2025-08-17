import type { ProducerInfoProps } from '../../../interface/ProducerInfoProps';

interface Props {
  producer: ProducerInfoProps | null;
}

function ProducerInfoCard({ producer }: Props) {
  return (
    <div className="col-md-6">
      <h6>Datos del productor</h6>
      {producer ? (
        <ul className="mb-3">
          <li><strong>Nombre:</strong> {producer.nombre}</li>
          <li><strong>Apellido:</strong> {producer.apellido}</li>
          {producer.documento && <li><strong>Documento:</strong> {producer.documento}</li>}
          {producer.telefono && <li><strong>Teléfono:</strong> {producer.telefono}</li>}
          {producer.email && <li><strong>Email:</strong> {producer.email}</li>}
        </ul>
      ) : (
        <p className="text-muted">No cargado</p>
      )}
    </div>
  );
}

export default ProducerInfoCard;

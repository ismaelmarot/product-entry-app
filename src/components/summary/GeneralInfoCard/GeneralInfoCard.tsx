import formatDate from '../../../helpers/formData';
import type { GeneralInfoProps } from '../../../interface/GeneralInfoProps';

interface Props {
  general: GeneralInfoProps | null;
}

function GeneralInfoCard({ general }: Props) {
  return (
    <div className="col-md-6">
      <h6>Información general</h6>
      {general ? (
        <ul className="mb-3">
          <li><strong>Lugar:</strong> {general.lugar}</li>
          <li><strong>Fecha:</strong> {formatDate(general.fecha)}</li>
          <li><strong>Receptor:</strong> {general.receptor}</li>
          {general.otros && (
            <li><strong>Nota:</strong> {general.otros}</li>
          )}
        </ul>
      ) : (
        <p className="text-muted">No cargado</p>
      )}
    </div>
  );
}

export default GeneralInfoCard;

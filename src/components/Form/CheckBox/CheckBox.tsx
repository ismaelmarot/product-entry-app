import type { CheckboxInputProps } from '../../../interface/CheckboxInputProps';

export function CheckboxInput({ label, register, id, ...rest }: CheckboxInputProps) {
  return (
    <div className="col-md-3 d-flex align-items-center">
      <input type="checkbox" id={id} className="me-2" {...register} {...rest} />
      <label htmlFor={id} className="form-label mb-0">{label}</label>
    </div>
  );
}

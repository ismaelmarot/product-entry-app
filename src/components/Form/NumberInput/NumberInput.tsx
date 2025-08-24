import type { NumberInputProps } from '../../../interface/NumberInputProps';

export function NumberInput({ label, register, error, step = '1', ...rest }: NumberInputProps) {
  return (
    <div className="col-md-3">
      <label className="form-label">{label}</label>
      <input type="number" step={step} className="form-control" {...register} {...rest} />
      {error && <div className="text-danger small">{error.message}</div>}
    </div>
  );
}

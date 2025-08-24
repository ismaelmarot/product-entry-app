import type { TextInputProps } from '../../../interface/TextInputProps';

export function TextInput({ label, register, error, ...rest }: TextInputProps) {
  return (
    <div className="col-md-3">
      <label className="form-label">{label}</label>
      <input className="form-control" {...register} {...rest} />
      {error && <div className="text-danger small">{error.message}</div>}
    </div>
  );
}

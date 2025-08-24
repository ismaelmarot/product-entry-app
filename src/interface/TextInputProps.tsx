import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface TextInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  [x: string]: any;
}

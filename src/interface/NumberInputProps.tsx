import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface NumberInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  step?: string;
  [x: string]: any;
}

import type { UseFormRegisterReturn } from 'react-hook-form';

export interface CheckboxInputProps {
  label: string;
  register: UseFormRegisterReturn;
  id: string;
  [x: string]: any;
}

import type { ProductForm } from '../types/types';
export interface ProductFormProps {
    onAdd: (data: ProductForm) => void;
    products?: { code?: string }[];
    persistUsePercentage: boolean;
    persistPercentage: number | undefined;
    setPersistUsePercentage: (val: boolean) => void;
    setPersistPercentage: (val: number | undefined) => void;
}

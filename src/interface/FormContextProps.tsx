import type { FormStateProps } from './FormStateProps';
import type { ProducerDataProps } from './ProducerDataProps';
import type { ProductProps } from './ProductProps';

export interface FormContextProps {
    data: FormStateProps;
    setProducerData: (data: ProducerDataProps) => void;
    addProduct: (product: ProductProps) => void;
    updateProduct: (index: number, product: ProductProps) => void;
    removeProduct: (index: number) => void;
}

import type { ProductProps } from './ProductProps';
export interface ProductsTableProps {
  products: ProductProps[];
  total_cost: number;
  total_sell: number;
  onDelete: (id: string | number) => void;
}

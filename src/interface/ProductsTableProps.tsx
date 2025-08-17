import type { Product } from '../context/AppContext';

export interface ProductsTableProps {
  products: Product[];
  total_cost: number;
  total_sell: number;
}

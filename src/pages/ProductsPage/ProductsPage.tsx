import React from 'react';
import { useAppContext } from '../../context/AppContext';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import ProductFormComponent from '../../components/ProductForm/ProductForm';
import type { ProductForm } from '../../types/types';

export default function ProductsPage() {
  const { products, addProduct, removeProduct } = useAppContext();

  const [persistUsePercentage, setPersistUsePercentage] = React.useState(false);
  const [persistPercentage, setPersistPercentage] = React.useState<number | undefined>(undefined);

  const handleAdd = (data: ProductForm) => {
    addProduct(data);
  };

  const handleDelete = (id: string | number) => {
    removeProduct(id.toString());
  };

  const totalCosto = products.reduce((a, p) => a + p.amount * p.cost_price, 0);
  const totalVenta = products.reduce((a, p) => a + p.amount * p.sale_price, 0);

  return (
    <div className='mt-3'>
      <h3>Productos</h3>
      <ProductFormComponent 
        onAdd={handleAdd}
        persistUsePercentage={persistUsePercentage}
        persistPercentage={persistPercentage}
        setPersistUsePercentage={setPersistUsePercentage}
        setPersistPercentage={setPersistPercentage}
      />

      <hr className='my-4' />
      <h5>Lista de productos</h5>
      <ProductsTable 
        products={products} 
        total_cost={totalCosto} 
        total_sell={totalVenta} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

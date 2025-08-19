import formatAmount from '../../../helpers/formatAmount';
import type { Product } from '../../../context/AppContext';
import { useAppContext } from '../../../context/AppContext';

type ProductsTableProps = {
  products: Product[];
  total_cost: number;
  total_sell: number;
};

export default function ProductsTable({ products, total_cost, total_sell }: ProductsTableProps) {
  const { sortColumn, sortDirection, setSort } = useAppContext();

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue: string | number = (a as any)[sortColumn];
    let bValue: string | number = (b as any)[sortColumn];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleHeaderClick = (column: string) => {
    if (sortColumn === column) {
      setSort(column, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(column, 'asc');
    }
  };

  return products.length === 0 ? (
    <p className='text-muted'>Sin productos.</p>
  ) : (
    <div className='table-responsive'>
      <table className='table table-sm'>
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => handleHeaderClick('detail')}>
              Detalle {sortColumn === 'detail' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className='text-end' style={{ cursor: 'pointer' }} onClick={() => handleHeaderClick('amount')}>
              Cant. {sortColumn === 'amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className='text-end' style={{ cursor: 'pointer' }} onClick={() => handleHeaderClick('code')}>
              Código {sortColumn === 'code' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className='text-end' style={{ cursor: 'pointer' }} onClick={() => handleHeaderClick('cost_price')}>
              $ Costo {sortColumn === 'cost_price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className='text-end' style={{ cursor: 'pointer' }} onClick={() => handleHeaderClick('sale_price')}>
              $ Venta {sortColumn === 'sale_price' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(p => (
            <tr key={p.id}>
              <td>{p.detail}</td>
              <td className='text-end'>{p.amount}</td>
              <td className='text-end'>{p.code || '-'}</td>
              <td className='text-end'>{formatAmount(p.cost_price)}</td>
              <td className='text-end'>{formatAmount(p.sale_price)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{borderTop:'2px solid'}}>
            <th colSpan={3} className='text-end'>Totales</th>
            <th className='text-end'>{formatAmount(total_cost)}</th>
            <th className='text-end'>{formatAmount(total_sell)}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

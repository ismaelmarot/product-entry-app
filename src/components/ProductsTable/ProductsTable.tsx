import { useAppContext } from '../../context/AppContext';
import formatAmount from '../../helpers/formatAmount';
import type { ProductsTableProps } from '../../interface/ProductsTableProps';

export default function ProductsTable({ products, total_cost, total_sell, onDelete }: ProductsTableProps) {
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

  if (products.length === 0) return <p className='text-muted'>Sin productos.</p>;

  return (
    <table className='table table-sm' style={{ tableLayout: 'fixed', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => handleHeaderClick('detail')}>
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
          <th className='text-center'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sortedProducts.map((p) => (
          <tr key={p.id}>
            <td>{p.detail}</td>
            <td className='text-end'>{p.amount}</td>
            <td className='text-end'>{p.code || '-'}</td>
            <td className='text-end'>{formatAmount(p.cost_price)}</td>
            <td className='text-end'>{formatAmount(p.sale_price)}</td>
            <td className='text-center'>
              <button className='btn btn-sm' style={{borderColor: 'red', color:'red'}} onClick={() => onDelete(p.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th className='text-end' />
          <th className='text-end' />
          <th className='text-end'>{total_cost.toFixed(2)}</th>
          <th className='text-end'>{total_sell.toFixed(2)}</th>
          <th className='text-center' />
        </tr>
      </tfoot>
    </table>
  );
}

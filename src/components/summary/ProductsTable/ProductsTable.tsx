import formatAmount from '../../../helpers/formatAmount';
import type { ProductsTableProps } from '../../../interface/ProductsTableProps';

function ProductsTable({ products, total_cost, total_sell }: ProductsTableProps) {
  return products.length === 0 ? (
    <p className='text-muted'>Sin productos.</p>
  ) : (
    <div className='table-responsive'>
      <table className='table table-sm'>
        <thead>
          <tr>
            <th>Detalle</th>
            <th className='text-end'>Cant.</th>
            <th className='text-end'>Código</th>
            <th className='text-end'>$ Costo</th>
            <th className='text-end'>$ Venta</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.detail}</td>
              <td className='text-end'>{p.amount}</td>
              <td className='text-end'>{p.code}</td>
              <td className='text-end'>{formatAmount(p.cost_price)}</td>
              <td className='text-end'>{formatAmount(p.sale_price)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} className='text-end'>Totales</th>
            <th className='text-end'>{formatAmount(total_cost)}</th>
            <th className='text-end'>{formatAmount(total_sell)}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ProductsTable;

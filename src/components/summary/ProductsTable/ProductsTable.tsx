import type { ProductProps } from '../../../interface/ProductProps';

interface Props {
  products: ProductProps[];
  totalCosto: number;
  totalVenta: number;
}

function ProductsTable({ products, totalCosto, totalVenta }: Props) {
  return products.length === 0 ? (
    <p className="text-muted">Sin productos.</p>
  ) : (
    <div className="table-responsive">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Detalle</th>
            <th className="text-end">Cant.</th>
            <th className="text-end">Código</th>
            <th className="text-end">$ Costo</th>
            <th className="text-end">$ Venta</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.detalle}</td>
              <td className="text-end">{p.cantidad}</td>
              <td className="text-end">{p.codigo}</td>
              <td className="text-end">{p.costo.toFixed(2)}</td>
              <td className="text-end">{p.venta.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} className="text-end">Totales</th>
            <th className="text-end">{totalCosto.toFixed(2)}</th>
            <th className="text-end">{totalVenta.toFixed(2)}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ProductsTable;

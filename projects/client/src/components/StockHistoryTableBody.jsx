import { numToIDRCurrency } from "../helper/currency";
import BrokenImg from "../assets/broken-img.png";
import moment from "moment";

export default function StockHistoryTableBody({ products = [] }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {products.map((product) => (
        <tr key={product.id}>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900 line-clamp-3">
              {product.product_name}
            </div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900 line-clamp-3">{product.status}</div>
          </td>

          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
            {product.qty}
          </td>
          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
            {product.branch_name}
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900 line-clamp-3">
              {product.date.split("T")[0]}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

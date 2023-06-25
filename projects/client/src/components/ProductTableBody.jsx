import { numToIDRCurrency } from "../helper/currency";
import BrokenImg from "../assets/broken-img.png";

export default function ProductTableBody({ products = [], onEdit, onDelete }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {products.map((product) =>
        product.Stocks.map((stock, stockIdx) => (
          <tr key={stock.id}>
            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-10 w-10"
                    src={product.image_url || BrokenImg}
                    alt={product.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900 truncate max-w-[200px]">
                    {product.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {product.Category?.name || "—"}
              </div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">
                {numToIDRCurrency(product.price)}
              </div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900 line-clamp-3">
                {product.desc || "—"}
              </div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500 text-center">
              <div
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  product.Stocks?.[0].stock > 20
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="max-w-[100px] truncate">{stock.stock}</span>
              </div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900 line-clamp-3">
                {stock.Branch?.name}
              </div>
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <button
                className="text-teal-600 hover:text-teal-900"
                onClick={() => onEdit(product, stockIdx)}
              >
                Edit<span className="sr-only">{product.name}</span>
              </button>
              <button
                className="text-red-600 hover:text-red-900 ml-4"
                onClick={() => onDelete(product.id)}
              >
                Delete
                <span className="sr-only">{product.name}</span>
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
}

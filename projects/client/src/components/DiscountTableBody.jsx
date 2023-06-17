import { numToIDRCurrency } from "../helper/currency";

export default function DiscountTableBody({ vouchers = [], onEdit, onDelete }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {vouchers.map((voucher) => (
        <tr key={voucher.id}>
          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
            <div className="text-gray-900">{voucher.voucher_type || "—"}</div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            {voucher.Product ? (
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-10 w-10"
                    src={voucher.Product.image_url}
                    alt={voucher.Product.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900 truncate max-w-[200px]">
                    {voucher.Product.name}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-900">{"—"}</div>
            )}
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">
              {voucher.amount
                ? `${numToIDRCurrency(voucher.amount)}`
                : voucher.percentage
                ? `${voucher.percentage}%`
                : "—"}
            </div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">
              {voucher.limit ? numToIDRCurrency(voucher.limit) : "—"}
            </div>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">
              {voucher.min_purchase
                ? numToIDRCurrency(voucher.min_purchase)
                : "—"}
            </div>
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <button
              className="text-teal-600 hover:text-teal-900"
              onClick={() => onEdit(voucher)}
            >
              Edit<span className="sr-only">{voucher.voucher_type}</span>
            </button>
            <button
              className="text-red-600 hover:text-red-900 ml-4"
              onClick={() => onDelete(voucher.id)}
            >
              Delete
              <span className="sr-only">{voucher.voucher_type}</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

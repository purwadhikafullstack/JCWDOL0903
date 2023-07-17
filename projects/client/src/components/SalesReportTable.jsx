import moment from "moment";
import { numToIDRCurrency } from "../helper/currency";

export default function SalesReportTable({
  salesReport = [],
  subTotal = [],
  transactionTotals = [],
  totalCustomer = [],
}) {
  const total = parseInt(subTotal);

  return (
    <>
      <tbody className="divide-y divide-gray-200 bg-white">
        {salesReport.map((data) => (
          <tr key={data.id}>
            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
              <div className="text-gray-900 line-clamp-3">
                {data.product_name}
              </div>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900 line-clamp-3">
                {data.date.split("T")[0]}
              </div>
            </td>

            <td className="px-3 py-4 text-sm text-gray-500">
              {data.User_name}
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              {data.Branch_name}
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">
              {numToIDRCurrency(data.total)}
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={3}></td>
          <th
            scope="row"
            className="text-right px-3 py-4 text-sm text-gray-500"
          >
            Total customers
          </th>

          <td className="px-3 py-4 text-sm  text-gray-500">{totalCustomer}</td>
        </tr>
        <tr>
          <td colSpan={3}></td>
          <th
            scope="row"
            className="text-right px-3 py-4 text-sm text-gray-500"
          >
            Transaction total
          </th>

          <td className="px-3 py-4 text-sm text-gray-500">
            {transactionTotals}
          </td>
        </tr>
        <tr>
          <td colSpan={3}></td>
          <th
            scope="row"
            className="text-right px-3 py-4 text-sm text-gray-500"
          >
            Total sales
          </th>

          <td className="px-3 py-4 font-semibold text-sm text-gray-500">
            {numToIDRCurrency(total)}
          </td>
        </tr>
      </tfoot>
    </>
  );
}

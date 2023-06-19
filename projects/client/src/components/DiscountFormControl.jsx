import { useState } from "react";
import AsyncSelect from "react-select/async";
import Dropdown from "./Dropdown";
import { voucherTypes } from "../helper/filterOptions";
import { style, loadProduct } from "../helper/reactSelect";

export default function DiscountFormControl({ voucher = {} }) {
  const [voucherType, setVoucherType] = useState(
    voucher.voucher_type
      ? { value: voucher.voucher_type, label: voucher.voucher_type }
      : {}
  );

  const [unit, setUnit] = useState(
    voucher.percentage ? "percentage" : "nominal"
  );
  const [productName, setProductName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(
    voucher.product_id
      ? {
          id: voucher.product_id || "",
          name: voucher.Product?.name || "",
        }
      : ""
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Voucher Type
      </label>
      <Dropdown
        name="voucher_type"
        label="Type"
        options={voucherTypes}
        selectedValue={voucherType}
        onChange={setVoucherType}
        className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
      />

      {voucherType.value !== "Buy One Get One" && (
        <>
          <label
            htmlFor="amountPercentage"
            className="block text-sm font-medium my-2 text-gray-900"
          >
            Amount
          </label>
          <div className="relative rounded-md">
            <input
              name="amountPercentage"
              type="number"
              min="0"
              max={unit === "percentage" ? 100 : null}
              id="amountPercentage"
              defaultValue={voucher.amount || voucher.percentage || ""}
              className="spin-hidden block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="unit" className="sr-only">
                unit
              </label>
              <select
                name="unit"
                id="unit"
                defaultValue={unit}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm"
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="nominal">Nominal</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
          </div>
        </>
      )}

      {unit === "percentage" && voucherType.value !== "Buy One Get One" && (
        <>
          <label
            htmlFor="limit"
            className="block text-sm font-medium text-gray-700 my-2"
          >
            Limit
          </label>
          <input
            name="limit"
            type="number"
            min="0"
            id="limit"
            defaultValue={voucher.limit || ""}
            className="spin-hidden block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
        </>
      )}

      {voucherType.value === "Total Belanja" && (
        <>
          <label
            htmlFor="min_purchase"
            className="block text-sm font-medium text-gray-700 my-2"
          >
            Minimum Purchase
          </label>
          <input
            name="min_purchase"
            type="number"
            min="0"
            id="min_purchase"
            defaultValue={voucher.min_purchase || ""}
            className="spin-hidden block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
        </>
      )}

      {(voucherType.value === "Produk" ||
        voucherType.value === "Buy One Get One") && (
        <>
          <label className="block text-sm font-medium text-gray-700 my-2">
            Product
          </label>
          <AsyncSelect
            name="product_id"
            onInputChange={setProductName}
            onChange={setSelectedProduct}
            value={selectedProduct}
            loadOptions={() => loadProduct(productName)}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.id}
            cacheOptions
            styles={style}
            placeholder="Enter product name..."
          />
        </>
      )}
    </div>
  );
}

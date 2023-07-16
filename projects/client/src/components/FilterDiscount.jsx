import { useState } from "react";
import AsyncSelect from "react-select/async";
import Dropdown from "./Dropdown";
import { style, loadProduct } from "../helper/reactSelect";

export default function FilterDiscount({
  onSearchChange,
  sortOptions,
  sortFilter,
  onSortChange,
  voucherOptions,
  typeFilter,
  onTypeChange,
}) {
  const [productName, setProductName] = useState("");

  return (
    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
      <AsyncSelect
        className="w-full md:w-1/2"
        onInputChange={setProductName}
        onChange={onSearchChange}
        loadOptions={() => loadProduct(productName)}
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        cacheOptions
        styles={style}
        isClearable
        placeholder="Search product"
      />
      <div className="flex gap-2 items-center">
        <Dropdown
          label="Sort"
          options={sortOptions}
          selectedValue={sortFilter}
          onChange={onSortChange}
          className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />
        <Dropdown
          label="Types"
          options={voucherOptions}
          selectedValue={typeFilter}
          onChange={onTypeChange}
          className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

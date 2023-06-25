import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/20/solid";

export default function InputNumber({
  onSubtract,
  disabledSubtract,
  onAdd,
  disabledAdd,
  inputValue,
  onInputChange,
  onInputBlur,
}) {
  return (
    <div className="flex items-center border rounded-md focus-within:border-orange-500">
      <button
        type="button"
        aria-label="subtract"
        className="hover:bg-gray-100 rounded-md p-2 text-orange-400 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-not-allowed"
        onClick={onSubtract}
        disabled={disabledSubtract}
      >
        <MinusSmallIcon className="w-5 h-5" aria-hidden />
      </button>
      <input
        type="number"
        name="quantity"
        min="1"
        className="border-none focus:border-none spin-hidden focus:ring-0 max-w-[60px] text-center"
        value={inputValue}
        onChange={onInputChange}
        onBlur={onInputBlur}
      />
      <button
        type="button"
        aria-label="plus"
        className="hover:bg-gray-100 rounded-md p-2 text-orange-400 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-not-allowed"
        onClick={onAdd}
        disabled={disabledAdd}
      >
        <PlusSmallIcon className="w-5 h-5 " aria-hidden />
      </button>
    </div>
  );
}
// export default function InputNumber(
//   onSubtract,
//   onAdd,
//   disabledSubtract,
//   disabledAdd,
//   inputValue,
//   onInputChange,
//   onInputBlur
// ) {
//   return (
//     <div className="flex items-center border rounded-md focus-within:border-orange-500">
//       <button
//         type="button"
//         aria-label="subtract"
//         className="hover:bg-gray-100 rounded-md p-2 text-orange-400 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-not-allowed"
//         onClick={handleSubtract}
//         disabled={quantity <= 1}
//       >
//         <MinusSmallIcon className="w-5 h-5" aria-hidden />
//       </button>
//       <input
//         type="number"
//         name="quantity"
//         className="border-none focus:border-none spin-hidden focus:ring-0 max-w-[60px] text-center"
//         value={quantity}
//         onChange={handleChange}
//         onBlur={checkQuantity}
//       />
//       <button
//         type="button"
//         aria-label="plus"
//         className="hover:bg-gray-100 rounded-md p-2 text-orange-400 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-not-allowed"
//         onClick={handleAdd}
//         disabled={quantity >= productStock}
//       >
//         <PlusSmallIcon className="w-5 h-5 " aria-hidden />
//       </button>
//     </div>
//   );
// }

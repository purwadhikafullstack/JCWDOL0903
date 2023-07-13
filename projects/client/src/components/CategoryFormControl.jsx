export default function CategoryFormControl({ category = {} }) {
  return (
    <div>
      <label
        htmlFor="categoryName"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Name
      </label>
      <input
        type="text"
        name="categoryName"
        id="categoryName"
        defaultValue={category.name || ""}
        required
        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
      />
    </div>
  );
}

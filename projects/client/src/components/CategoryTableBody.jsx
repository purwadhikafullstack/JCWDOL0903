export default function CategoryTableBody({
  categories = [],
  onEdit,
  onDelete,
}) {
  console.log("categori", categories);
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {categories.map((category) => (
        <tr key={category.id}>
          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
            <div className="text-gray-900">{category.name}</div>
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <button
              className="text-teal-600 hover:text-teal-900"
              onClick={() => onEdit(category)}
            >
              Edit<span className="sr-only">{category.name}</span>
            </button>
            <button
              className="text-red-600 hover:text-red-900 ml-4"
              onClick={() => onDelete(category.id)}
            >
              Delete
              <span className="sr-only">{category.name}</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

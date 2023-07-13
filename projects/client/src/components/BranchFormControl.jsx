export default function BranchFormControl({ category = {} }) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Email User
      </label>
      <input
        type="email"
        name="email"
        id="email"
        // defaultValue={category.email || ""}
        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
      />
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        // defaultValue={category.email || ""}
        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
      />
      <div className="grow">
        <label
          htmlFor="name"
          className="block text-sm font-medium"
        >
          Branch Name
        </label>
        <div className="mt-1 ">
          <select
            id="name"
            name="name"
            type="text"
            autoComplete="country-name"
            className="block w-full  rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500  sm:text-sm"
          >
            <option>. . .</option>
            <option>Malang 1</option>
            <option>Jakarta 1</option>
            <option>Jakarta 2</option>
            <option>Tanggerang 1</option>
            <option>Cilegon 1</option>
          </select>
        </div>
      </div>
    </div>
  );
}

import { useSelector, useDispatch } from "react-redux";
import { fetchAllBranches } from "../reducers/branchSlice";
import { useEffect } from "react";
export default function BranchFormControl({ category = {} }) {
const allBranches = useSelector((state)=> (state.branch.allBranches))
const dispatch = useDispatch()
useEffect(() => {
  dispatch(fetchAllBranches())
},[])
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
            {allBranches.map((value) => (
              <option>{value.name}</option>
            ))}
            {/* <option>Malang 1</option>
            <option>JStore</option> */}
          </select>
        </div>
      </div>
    </div>
  );
}

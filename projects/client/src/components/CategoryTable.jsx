import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../reducers/categorySlice";
import CategoryModalForm from "./CategoryModalForm";
import { deleteConfirmationAlert } from "../helper/alerts";

export default function CategoryTable() {
  const dispatch = useDispatch();
  const categoriesGlobal = useSelector((state) => state.category);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedCategory, setEditedCategory] = useState({
    id: 0,
    editedValue: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleCreateCategory(e) {
    e.preventDefault();
    dispatch(createCategory(e.target.categoryName.value));
    setOpenAddModal(false);
  }

  function handleEditCategory(e) {
    e.preventDefault();
    dispatch(
      updateCategory(editedCategory.id, { name: e.target.categoryName.value })
    );
    setOpenEditModal(false);
  }

  function handleDelete(id) {
    deleteConfirmationAlert(() => dispatch(deleteCategory(id)));
  }

  function handleEditClick(id, editedValue) {
    setEditedCategory({
      id,
      editedValue,
    });
    setOpenEditModal(true);
  }

  return (
    <div className="mt-8">
      <CategoryModalForm
        open={openAddModal}
        setOpen={setOpenAddModal}
        action="add"
        onSubmit={handleCreateCategory}
      />
      <CategoryModalForm
        open={openEditModal}
        setOpen={setOpenEditModal}
        action="edit"
        editedValue={editedCategory.editedValue}
        onSubmit={handleEditCategory}
      />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the categories in your account.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setOpenAddModal(true)}
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add category
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {categoriesGlobal.map((category) => (
                    <tr key={category.id}>
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
                        <div className="text-gray-900">{category.name}</div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() =>
                            handleEditClick(category.id, category.name)
                          }
                        >
                          Edit<span className="sr-only">{category.name}</span>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 ml-4"
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                          <span className="sr-only">{category.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

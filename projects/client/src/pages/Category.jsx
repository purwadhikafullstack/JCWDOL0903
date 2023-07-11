import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../reducers/categorySlice";
import ModalForm from "../components/ModalForm";
import { deleteConfirmationAlert } from "../helper/alerts";
import AddDataHeader from "../components/AddDataHeader";
import CategoryFormControl from "../components/CategoryFormControl";
import Table from "../components/Table";
import CategoryTableBody from "../components/CategoryTableBody";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Spinner from "../components/Spinner";

const sortOptions = [
  { value: "", label: "None" },
  { value: "name_asc", label: "Name (A - Z)" },
  { value: "name_desc", label: "Name (Z - A)" },
];

export default function Category() {
  const dispatch = useDispatch();
  const categoriesGlobal = useSelector((state) => state.category);
  const userGlobal = useSelector((state) => state.user);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedCategory, setEditedCategory] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [sortFilter, setSortFilter] = useState(sortOptions[0]);

  useEffect(() => {
    if (!(userGlobal.role === "admin" || userGlobal.role === "superadmin"))
      return;
    let query = `page=${currentPage}`;
    if (categoryName) query += `&q=${categoryName}`;
    if (sortFilter.value) query += `&sort=${sortFilter.value}`;
    dispatch(fetchCategories(query));
  }, [dispatch, userGlobal.role, currentPage, categoryName, sortFilter.value]);

  useEffect(() => {
    if (!categoriesGlobal.isLoading) {
      setOpenAddModal(false);
      setOpenEditModal(false);
    }
  }, [categoriesGlobal.isLoading]);

  function handleCreateCategory(e) {
    e.preventDefault();
    dispatch(createCategory(e.target.categoryName?.value, currentPage));
  }

  function handleEditCategory(e) {
    e.preventDefault();
    dispatch(
      updateCategory(
        editedCategory.id,
        { name: e.target.categoryName?.value },
        currentPage
      )
    );
  }

  function handleDelete(id) {
    deleteConfirmationAlert(() => dispatch(deleteCategory(id, currentPage)));
  }

  function handleEditClick(category) {
    setEditedCategory(category);
    setOpenEditModal(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCategoryName(e.target.searchBar?.value);
  }

  if (
    categoriesGlobal.isLoading &&
    !(openAddModal === true || openEditModal === true)
  )
    return <Spinner />;

  return (
    <div>
      <ModalForm
        title="Category"
        open={openAddModal}
        setOpen={setOpenAddModal}
        action="add"
        isLoading={categoriesGlobal.isLoading}
        onSubmit={handleCreateCategory}
        children={<CategoryFormControl />}
      />
      <ModalForm
        title="Category"
        open={openEditModal}
        setOpen={setOpenEditModal}
        action="edit"
        isLoading={categoriesGlobal.isLoading}
        onSubmit={handleEditCategory}
        children={<CategoryFormControl category={editedCategory} />}
      />
      <div>
        <AddDataHeader
          title="Categories"
          desc="A list of all the categories in your account."
          addButtonText="Add category"
          onAddClick={() => setOpenAddModal(true)}
        />
        <div className="flex items-center justify-between gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
          <SearchBar onSubmit={handleSubmit} />
          <Dropdown
            label="Sort"
            options={sortOptions}
            selectedValue={sortFilter}
            onChange={setSortFilter}
            className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
        <Table
          className="mb-4"
          headCols={["Name"]}
          tableBody={
            <CategoryTableBody
              categories={categoriesGlobal.categories}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          }
        />
        <Pagination
          itemsInPage={categoriesGlobal.categories.length}
          totalItems={categoriesGlobal.totalItems}
          totalPages={categoriesGlobal.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

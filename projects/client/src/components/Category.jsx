import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../reducers/categorySlice";
import ModalForm from "./ModalForm";
import { deleteConfirmationAlert } from "../helper/alerts";
import AddDataHeader from "./AddDataHeader";
import CategoryFormControl from "./CategoryFormControl";
import Table from "./Table";
import CategoryTableBody from "./CategoryTableBody";

export default function Category() {
  const dispatch = useDispatch();
  const categoriesGlobal = useSelector((state) => state.category);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedCategory, setEditedCategory] = useState({});

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

  function handleEditClick(category) {
    setEditedCategory(category);
    setOpenEditModal(true);
  }

  return (
    <div className="mt-8">
      <ModalForm
        title="Category"
        open={openAddModal}
        setOpen={setOpenAddModal}
        action="add"
        onSubmit={handleCreateCategory}
        children={<CategoryFormControl />}
      />
      <ModalForm
        title="Category"
        open={openEditModal}
        setOpen={setOpenEditModal}
        action="edit"
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
        <Table
          headCols={["Name"]}
          tableBody={
            <CategoryTableBody
              categories={categoriesGlobal}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          }
        />
      </div>
    </div>
  );
}

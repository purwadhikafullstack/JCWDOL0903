import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../reducers/categorySlice";
import BranchFormControl from "../components/BranchFormControl";

import ModalForm from "../components/ModalForm";
import AddDataHeader from "../components/AddDataHeader";
import {
  addBranchAdmin,
  fetchBranch,
  fetchAllAdminBranch,
} from "../reducers/branchSlice";
// import TableBranchAdmin from "../components/TableBranchAdmin";

const Management = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);

  const renderBranchList = () => {
    return;
  };

  useEffect(() => {
    dispatch(fetchAllAdminBranch());
  }, []);

  function handleAddAdmin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    dispatch(
      addBranchAdmin({
        email: email,
        password: password,
        name: name,
      })
    );
    setOpenAddModal(false);
  }

  return (
    <div>
      <ModalForm
        title="Branch Admin"
        open={openAddModal}
        setOpen={setOpenAddModal}
        action="add"
        onSubmit={handleAddAdmin}
        children={<BranchFormControl />}
      />
      <div>
        <AddDataHeader
          title="Admin Management"
          addButtonText="Add Admin"
          onAddClick={() => setOpenAddModal(true)}
        />
      </div>
      {/* <div>
        <TableBranchAdmin />
      </div> */}
    </div>
  );
};

export default Management;

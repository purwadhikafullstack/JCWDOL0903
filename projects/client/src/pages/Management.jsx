import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BranchFormControl from "../components/BranchFormControl";

import ModalForm from "../components/ModalForm";
import AddDataHeader from "../components/AddDataHeader";
import {
  addBranchAdmin,
  fetchBranch,
  fetchAllAdminBranch,
} from "../reducers/branchSlice";
import TableBranchAdmin from "../components/TableBranchAdmin";

const Management = () => {
  const user = useSelector((state) => state.user);
  const branchAdmin = useSelector((state) => state.branch.adminAllBranchList);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === "admin") navigate("/dashboard");
    dispatch(fetchAllAdminBranch());
    //
  }, [user.role]);

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
          desc={"A list of all admin branch"}
          addButtonText="Add Admin"
          onAddClick={() => setOpenAddModal(true)}
        />
      </div>
      <div>
        <TableBranchAdmin data={branchAdmin} />
      </div>
    </div>
  );
};

export default Management;

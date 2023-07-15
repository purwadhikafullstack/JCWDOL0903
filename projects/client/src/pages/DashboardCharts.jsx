import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHeaderCategory } from "../reducers/transactionHeaderSlice";
import AddDataHeader from "../components/AddDataHeader";
import ChartsHeader from "../components/ChartHeader";
import Charts from "../components/Charts";
import Dropdown from "../components/Dropdown";
import { fetchAllBranches } from "../reducers/branchSlice";

const branchOptions = [{ value: 0, label: "All Branch" }];

// console.log("branchOp", branchOptions);
//

const DashboardCharts = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  const branchGlobal = useSelector((state) => state.branch);
  const TransactionHeader = useSelector((state) => state.transactionHeader);
  const [branchFilter, setBranchFilter] = useState(
    user.branch_id ? user.branch_id : branchOptions[0]
  );

  // branchOptions.find((branch) => branch?.value == user.branch_id)

  console.log("brancFilter", branchFilter);
  // console.log("branchOp", branchOptions);
  // console.log("setBranchOp", setBranchFilter);

  // console.log("transactionHeader", TransactionHeader);

  const dispatch = useDispatch();
  useEffect(() => {
    // mengirim userId dan branchFilter ke fetchTransactionHeaderCategory didalam reducer
    dispatch(fetchTransactionHeaderCategory(branchFilter.value));

    //
  }, [dispatch, user.id, branchFilter.value]);

  useEffect(() => {
    if (!(user.role === "superadmin")) return;
    dispatch(fetchAllBranches());

    // alert(user.branch_id);
    // console.log(branchOptions);
  }, []);

  const newBranchOptions = branchGlobal.allBranches.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));
  branchOptions.splice(1, branchOptions.length - 1, ...newBranchOptions);

  return (
    <div>
      <ChartsHeader title="Dashboard Charts" />

      {user.role === "superadmin" && (
        <Dropdown
          label="All branch"
          options={branchOptions}
          selectedValue={branchFilter}
          onChange={setBranchFilter}
          className="ml-auto mt-3 w-1/4 text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />
      )}
      {/* data dikirim via props di component */}
      <Charts data={TransactionHeader} />
    </div>
  );
};

export default DashboardCharts;

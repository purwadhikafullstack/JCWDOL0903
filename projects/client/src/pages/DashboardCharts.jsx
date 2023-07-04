import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHeaderCategory } from "../reducers/transactionHeaderSlice";
import AddDataHeader from "../components/AddDataHeader";
import ChartsHeader from "../components/ChartHeader";
import Charts from "../components/Charts";
import Dropdown from "../components/Dropdown";

const branchOptions = [{ value: "", label: "None" }];

const DashboardCharts = () => {
  const userId = useSelector((state) => state.user.id);
  const TransactionHeader = useSelector((state) => state.transactionHeader);
  const [branchFilter, setBranchFilter] = useState(branchOptions[0]);

  // console.log("transactionHeader", TransactionHeader);

  const dispatch = useDispatch();
  useEffect(() => {
    // mengirim userId ke fetchTransactionHeaderCategory didalam reducer
    dispatch(fetchTransactionHeaderCategory(userId));
    // dispatch(fetchTransactionHeaderCategory());
  }, [dispatch, userId]);

  return (
    <div>
      <ChartsHeader title="Dashboard Charts" />

      <Dropdown
        label="Branch"
        options={branchOptions}
        selectedValue={branchFilter}
        onChange={setBranchFilter}
        className="ml-auto mt-3 w-1/4 text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
      />

      {/* data dikirim via props di component */}
      <Charts data={TransactionHeader} />
    </div>
  );
};

export default DashboardCharts;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHeaderCategory } from "../reducers/transactionHeaderSlice";
import AddDataHeader from "../components/AddDataHeader";
import ChartsHeader from "../components/ChartHeader";
import Charts from "../components/Charts";

const DashboardCharts = () => {
  const userId = useSelector((state) => state.user.id);
  const TransactionHeader = useSelector((state) => state.transactionHeader);

  console.log("transactionHeader", TransactionHeader);
  const dispatch = useDispatch();

  useEffect(() => {
    // mengirim userId ke fetchTransactionHeaderCategory didalam reducer
    dispatch(fetchTransactionHeaderCategory(userId));
    // dispatch(fetchTransactionHeaderCategory());
  }, [dispatch, userId]);

  return (
    <div>
      <ChartsHeader title="Charts" />
      <div>DashboardCharts</div>
      {/* data dikirim via props di component */}
      <Charts data={TransactionHeader} />
    </div>
  );
};

export default DashboardCharts;

import DatePicker from "../components/DateRange";
import React, { useEffect } from "react";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import SalesReportTable from "../components/SalesReportTable";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBranches } from "../reducers/branchSlice";
import api from "../api/api";
import Pagination from "../components/Pagination";
import AddDataHeader from "../components/AddDataHeader";

const sortBy = [
  { value: 0, label: "none" },
  { value: 1, label: "Newer" },
  { value: 2, label: "Older" },
  { value: 3, label: "Price (Low - High)" },
  { value: 4, label: "Price (High - Low)" },
];

const branchOptions = [{ value: 0, label: "All Branch" }];

const SalesReport = () => {
  //
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branchGlobal = useSelector((state) => state.branch);
  //
  const [currentPage, setCurrentPage] = useState(1);
  console.log("curret", currentPage);

  const [dates, setDates] = useState([]);
  const [productName, setProductName] = useState("");
  const [sort, setSort] = useState(sortBy[0]);
  const [branchFilter, setBranchFilter] = useState(
    user.branch_id ? user.branch_id : branchOptions[0]
  );

  const [SalesReportData, setSalesReportData] = useState([]);
  const [subTotalList, setSubTotalList] = useState([]);
  const [transTotal, setTransTotal] = useState([]);
  const [totalCustomer, setTotalCustomer] = useState([]);

  console.log("totalcus", totalCustomer);

  const totalPages = SalesReportData;

  const [countItem, setCountItem] = useState([]);

  // console.log("sales", SalesReportData);

  // console.log("countItem", countItem);

  useEffect(() => {
    if (!(user.role === "superadmin")) return;
    dispatch(fetchAllBranches());
  }, [user.role]);

  const newBranchOption = branchGlobal.allBranches.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  branchOptions.splice(1, branchOptions.length - 1, ...newBranchOption);

  const getData = async () => {
    try {
      const result = await api.get("/sales-report", {
        params: {
          branchId: branchFilter.value,
          sortBy: sort.label,
          searchDate: dates,
          page: currentPage,
        },
      });
      setSalesReportData(result.data.df);

      // console.log("result", result);
      setSubTotalList(result.data.total[0].subTotal);
      setTransTotal(result.data.total[0].transaction_totals);
      setTotalCustomer(result.data.total[0].total_customers);

      console.log("subTotalList", result.data.total[0].subTotal);
    } catch (error) {
      // console.log("err", error);
    }
  };

  useEffect(() => {
    getData();
  }, [branchFilter.value, dates, sort.label, currentPage]);

  return (
    <div>
      <div className="sm:flex-auto">
        <h1 className="text-2xl relative font-semibold w-max text-gray-900 after:block after:bg-red-300 after:absolute after:h-[30%] after:bottom-1 after:-z-10 after:left-0 after:right-0">
          Sales Report
        </h1>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
        <div className="flex gap-2 items-center flex-wrap">
          <DatePicker
            dates={dates}
            setDates={setDates}
            className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
          <Dropdown
            label="Sort"
            options={sortBy}
            selectedValue={sort}
            onChange={setSort}
            className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
          {user.role === "superadmin" && (
            <Dropdown
              label="All branch"
              options={branchOptions}
              selectedValue={branchFilter}
              onChange={setBranchFilter}
              className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
          )}
        </div>
      </div>
      <Table
        className="mb-4"
        headCols={[
          "Product",
          "Transaction Date",
          "User",
          "Branch Name",
          "Price",
        ]}
        tableBody={
          <SalesReportTable
            salesReport={SalesReportData}
            subTotal={subTotalList}
            transactionTotals={transTotal}
            totalCustomer={totalCustomer}
          />
        }
      />
    </div>
  );
};

export default SalesReport;

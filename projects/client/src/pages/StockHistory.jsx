import React, { useEffect, useState } from "react";
import DatePicker from "../components/DateRange";
import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBranches } from "../reducers/branchSlice";
import DateRange from "../components/DateRange";
import Table from "../components/Table";
import StockHistoryTableBody from "../components/StockHistoryTableBody";
import { errorAlertWithMessage } from "../helper/alerts";

const sortBy = [
  { value: 0, label: "none" },
  { value: 1, label: "Newer" },
  { value: 2, label: "Older" },
];

const branchOptions = [{ value: 0, label: "All Branch" }];

// console.log("branchOption", branchOptions);

const StockHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branchGlobal = useSelector((state) => state.branch);
  //
  const [dates, setDates] = useState([]);
  const [productName, setProductName] = useState("");
  const [sortDate, setSortDate] = useState(sortBy[0]);
  const [branchFilter, setBranchFilter] = useState(
    user.branch_id ? user.branch_id : branchOptions[0]
  );

  const [stockHistoryData, setStockHistoryData] = useState([]);
  // console.log("productName", productName);
  // console.log("branFilter", branchFilter);
  // console.log("sortDate", sortDate);
  // console.log("dates", dates);
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
      const result = await api.get("/stock-history/", {
        params: {
          branchId: branchFilter.value,
          sortDate: sortDate.label,
          searchProduct: productName,
          date: dates,
        },
      });
      setStockHistoryData(result.data.df);
      // console.log("result", result.data.df);
    } catch (error) {
      errorAlertWithMessage(error.result);
    }
  };

  useEffect(() => {
    getData();
    // console.log("test");
  }, [branchFilter.value, sortDate.label, productName, dates]);

  function handleSearch(e) {
    e.preventDefault();
    // console.log("e");
    setProductName(e.target.searchBar?.value);
  }
  return (
    <div>
      <div className="sm:flex-auto">
        <h1 className="text-2xl relative font-semibold w-max text-gray-900 after:block after:bg-red-300 after:absolute after:h-[30%] after:bottom-1 after:-z-10 after:left-0 after:right-0">
          Stock History
        </h1>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
        <SearchBar onSubmit={handleSearch} />
        <div className="flex gap-2 items-center flex-wrap">
          <DatePicker
            dates={dates}
            setDates={setDates}
            className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
          <Dropdown
            label="Sort"
            options={sortBy}
            selectedValue={sortDate}
            onChange={setSortDate}
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
        headCols={["Product Name", "Status", "Quantity", "Branch Name", "Date"]}
        tableBody={<StockHistoryTableBody products={stockHistoryData} />}
      />
    </div>
  );
};

export default StockHistory;

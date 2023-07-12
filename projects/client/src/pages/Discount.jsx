import { useState, useEffect } from "react";
import AddDataHeader from "../components/AddDataHeader";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import DiscountFormControl from "../components/DiscountFormControl";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "../reducers/voucherSlice";
import AsyncSelect from "react-select/async";
import Dropdown from "../components/Dropdown";
import DiscountTableBody from "../components/DiscountTableBody";
import Pagination from "../components/Pagination";
import { style, loadProduct } from "../helper/reactSelect";
import { voucherTypes } from "../helper/filterOptions";
import { deleteConfirmationAlert } from "../helper/alerts";
import Spinner from "../components/Spinner";

const sortOptions = [
  { value: "", label: "None" },
  { value: "name_asc", label: "Voucher Type (A - Z)" },
  { value: "name_desc", label: "Voucher Type (Z - A)" },
];

const voucherOptions = [{ value: "", label: "None" }, ...voucherTypes];

export default function Discount() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const vouchersGlobal = useSelector((state) => state.voucher);
  const userGlobal = useSelector((state) => state.user);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productName, setProductName] = useState("");

  const [productId, setProductId] = useState(
    searchParams.get("productId") || 0
  );
  const sortFilterInitial = sortOptions.findIndex(
    (s) => s.value === searchParams.get("sort")
  );
  const [sortFilter, setSortFilter] = useState(
    sortOptions[sortFilterInitial === -1 ? 0 : sortFilterInitial]
  );
  const typeFilterInitial = voucherOptions.findIndex(
    (s) => s.value === searchParams.get("q")
  );
  const [typeFilter, setTypeFilter] = useState(
    voucherOptions[typeFilterInitial === -1 ? 0 : typeFilterInitial]
  );
  const [editedVoucher, setEditedVoucher] = useState({});

  useEffect(() => {
    if (!(userGlobal.role === "admin" || userGlobal.role === "superadmin"))
      return;
    let query = `page=${currentPage}`;
    typeFilter.value
      ? searchParams.set("q", typeFilter.value)
      : searchParams.delete("q");
    sortFilter.value
      ? searchParams.set("sort", sortFilter.value)
      : searchParams.delete("sort");
    productId
      ? searchParams.set("productId", productId)
      : searchParams.delete("productId");
    searchParams.sort();
    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);
    dispatch(fetchVouchers(query));
  }, [
    dispatch,
    userGlobal.role,
    currentPage,
    sortFilter.value,
    typeFilter.value,
    productId,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (!vouchersGlobal.isLoading) {
      setOpenAddModal(false);
      setOpenEditModal(false);
    }
  }, [vouchersGlobal.isLoading]);

  function getVoucherData(data) {
    const {
      "voucher_type[value]": voucher_type,
      amountPercentage,
      unit,
      limit,
      product_id,
      min_purchase,
    } = data;

    const amountOrPercentage = {};
    if (unit?.value === "nominal") {
      amountOrPercentage.amount = amountPercentage?.value;
      amountOrPercentage.percentage = null;
    } else if (unit?.value === "percentage") {
      amountOrPercentage.percentage = amountPercentage?.value;
      amountOrPercentage.amount = null;
    }

    return {
      voucher_type: voucher_type?.value,
      ...amountOrPercentage,
      limit: limit?.value,
      product_id: product_id?.value,
      min_purchase: min_purchase?.value,
    };
  }

  function handleCreateVoucher(e) {
    e.preventDefault();
    dispatch(createVoucher(getVoucherData(e.target), currentPage));
  }

  function handleEditVoucher(e) {
    e.preventDefault();
    dispatch(
      updateVoucher(editedVoucher.id, getVoucherData(e.target), currentPage)
    );
  }

  function handleDelete(id) {
    deleteConfirmationAlert(() => dispatch(deleteVoucher(id, currentPage)));
  }

  function handleEditClick(voucher) {
    setEditedVoucher(voucher);
    setOpenEditModal(true);
  }

  if (
    vouchersGlobal.isLoading &&
    !(openAddModal === true || openEditModal === true)
  )
    return <Spinner />;

  return (
    <div>
      <ModalForm
        title="Voucher"
        open={openAddModal}
        setOpen={setOpenAddModal}
        action="add"
        isLoading={vouchersGlobal.isLoading}
        onSubmit={handleCreateVoucher}
        children={<DiscountFormControl />}
      />
      <ModalForm
        title="Category"
        open={openEditModal}
        setOpen={setOpenEditModal}
        action="edit"
        isLoading={vouchersGlobal.isLoading}
        onSubmit={handleEditVoucher}
        children={<DiscountFormControl voucher={editedVoucher} />}
      />
      <div>
        <AddDataHeader
          title="Discounts"
          desc="A list of all vouchers."
          addButtonText="Add voucher"
          onAddClick={() => setOpenAddModal(true)}
        />
        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
          <AsyncSelect
            className="w-full md:w-1/2"
            onInputChange={setProductName}
            onChange={(p) => setProductId(p?.id || "")}
            loadOptions={() => loadProduct(productName)}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.id}
            cacheOptions
            styles={style}
            isClearable
            placeholder="Search product"
          />
          <div className="flex gap-2 items-center">
            <Dropdown
              label="Sort"
              options={sortOptions}
              selectedValue={sortFilter}
              onChange={setSortFilter}
              className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
            <Dropdown
              label="Types"
              options={voucherOptions}
              selectedValue={typeFilter}
              onChange={setTypeFilter}
              className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <Table
          className="mb-4"
          headCols={[
            "Voucher Type",
            "Product",
            "Discounts",
            "Limit",
            "Minimum Purchase",
          ]}
          tableBody={
            <DiscountTableBody
              vouchers={vouchersGlobal.vouchers}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          }
        />
        <Pagination
          itemsInPage={vouchersGlobal.vouchers.length}
          totalItems={vouchersGlobal.totalItems}
          totalPages={vouchersGlobal.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

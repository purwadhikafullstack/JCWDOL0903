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
import DiscountTableBody from "../components/DiscountTableBody";
import Pagination from "../components/Pagination";
import { voucherTypes } from "../helper/filterOptions";
import { deleteConfirmationAlert } from "../helper/alerts";
import { getVoucherFormData } from "../helper/voucher";
import Spinner from "../components/Spinner";
import FilterDiscount from "../components/FilterDiscount";

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

  function handleCreateVoucher(e) {
    e.preventDefault();
    dispatch(createVoucher(getVoucherFormData(e.target), currentPage));
  }

  function handleEditVoucher(e) {
    e.preventDefault();
    dispatch(
      updateVoucher(editedVoucher.id, getVoucherFormData(e.target), currentPage)
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
        <FilterDiscount
          onSearchChange={(p) => setProductId(p?.id || 0)}
          sortOptions={sortOptions}
          sortFilter={sortFilter}
          onSortChange={setSortFilter}
          voucherOptions={voucherOptions}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
        />
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

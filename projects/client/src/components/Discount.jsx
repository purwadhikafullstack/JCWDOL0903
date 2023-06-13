import { useState } from "react";
import AddDataHeader from "./AddDataHeader";
import Table from "./Table";

export default function Discount() {
  const [openAddModal, setOpenAddModal] = useState(false);
  return (
    <div>
      <AddDataHeader
        title="Discounts"
        desc="A list of all vouchers."
        addButtonText="Add voucher"
        onAddClick={() => setOpenAddModal(true)}
      />
      <Table
        headCols={["Voucher Type", "Amount", "Product ID"]}
        tableBody={null}
      />
    </div>
  );
}

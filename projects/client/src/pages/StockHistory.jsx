import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const StockHistory = () => {
  const [sortDate, setSorDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDate = (value) => {
    setSorDate(value);
  };

  return (
    <div>
      <div>StockHistory nih</div>
      <Datepicker
        value={sortDate}
        onChange={handleDate}
      />
    </div>
  );
};

export default StockHistory;

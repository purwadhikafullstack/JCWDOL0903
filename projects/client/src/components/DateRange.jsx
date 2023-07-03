import { DatePicker } from "antd";
import React, { useState } from 'react';
import moment from "moment"

const { RangePicker } = DatePicker;

const DateRange = () => {
  const [dates, setDates] = useState([]);

  console.log("inidates",dates);

  return (
    <div>
      <RangePicker
        onChange={(value) => {
          setDates(value.map(item => {
            return moment(item.$d).format("DD-MM-YY")
          }));
        }}
      />
    </div>
  );
};

export default DateRange;

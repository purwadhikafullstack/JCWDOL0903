import { DatePicker } from "antd";
import React, { useState } from "react";
import moment from "moment";

const { RangePicker } = DatePicker;

const DateRange = ({ dates, setDates}) => {

  return (
    <div>
      <RangePicker
        onChange={(value) => {
          if(value){
            setDates(value.map(item => {
              return moment(item.$d).format("YYYY-MM-DD")
            }));
          }else if(!value){
            setDates([])
          }
         
        }}
      />
    </div>
  );
};

export default DateRange;

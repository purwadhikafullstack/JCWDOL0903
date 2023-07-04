import React from "react";
import NavDashReports from "../components/NavDashReports";
// import NavbarDashReports from "../components/NavbarDashReports";

const navigation = [
  {
    name: "Sales report",
    path: "/dashboard/reports",
    // current: true
  },
  {
    name: "Stock history",
    path: "/dashboard/reports/stock-history",
    // current: false,
  },
];

const Reports = ({ element }) => {
  console.log(Element);
  return (
    <div>
      <NavDashReports
        navigation={navigation}
        children={element} // element ini apa yg dikirim?
      />
    </div>
  );
};

export default Reports;

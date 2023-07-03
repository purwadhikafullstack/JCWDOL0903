import {
  InboxIcon,
  SquaresPlusIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  ChartBarIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import DashboardSidebar from "../components/DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchTransactionHeaderCategory } from "../reducers/transactionHeaderSlice";
import TableBranchAdmin from "../components/TableBranchAdmin";
import AddDataHeader from "../components/AddDataHeader";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  {
    name: "Management",
    path: "/dashboard/management-setting",
    icon: UsersIcon,
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: InboxIcon,
  },
  {
    name: "Categories",
    path: "/dashboard/category",
    icon: SquaresPlusIcon,
  },
  {
    name: "Transactions",
    path: "/dashboard/transactions",
    icon: DocumentTextIcon,
  },
  {
    name: "Discounts",
    path: "/dashboard/discounts",
    icon: ReceiptPercentIcon,
  },
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: ChartBarIcon,
  },
];

export default function Dashboard({ element }) {
  console.log("element", element);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.user.id);

  console.log("user", user.id);

  useEffect(() => {
    // console.log("isloading", isLoading);
    // if (!isLoading) {
    // }
    if (!user.id || user.role === "user") navigate("/");
    // dispatch(fetchTransactionHeaderCategory(user.id));
  }, []);

  return (
    <div>
      <DashboardSidebar
        navigation={navigation}
        children={element}
      />
    </div>
  );
}

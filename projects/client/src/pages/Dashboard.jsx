import {
  InboxIcon,
  SquaresPlusIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  ChartBarIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import DashboardSidebar from "../components/DashboardSidebar";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
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
  return (
    <div>
      <DashboardSidebar navigation={navigation} children={element} />
    </div>
  );
}

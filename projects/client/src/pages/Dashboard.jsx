import {
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  ChartBarIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import DashboardSidebar from "../components/DashboardSidebar";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  {
    name: "Products & Inventory",
    path: "/dashboard/products",
    icon: BuildingStorefrontIcon,
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

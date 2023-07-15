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
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filteredNavigation =
    user.role === "admin"
      ? navigation.filter((item) => item.name !== "Management")
      : navigation;

  return (
    <div>
      <DashboardSidebar
        navigation={filteredNavigation}
        children={element}
      />
    </div>
  );
}

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
  children,
  adminOnly = false,
  needLogin = false,
}) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (adminOnly && !(user?.role === "admin" || user?.role === "superadmin")) {
      return navigate("/");
    } else if (needLogin && !user?.id) {
      return navigate("/login");
    }
  });

  return children;
}

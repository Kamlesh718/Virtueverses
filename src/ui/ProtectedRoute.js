import { BarLoader } from "react-spinners";
import { useUser } from "../pages/authentication/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1.Load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2.If there is NO authenticated user ,redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3.While Loading show spinner
  if (isLoading)
    return (
      <div className="h-[100vh] bg-violet-200 flex items-center justify-center">
        <BarLoader size={30} color="#210c41" />
      </div>
    );

  // 4.If there is a user,render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;

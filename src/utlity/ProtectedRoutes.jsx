import Loader from "../components/Loader";
import { useToken } from "../features/useToken";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { data: accessToken, isLoading } = useToken();

  if (isLoading) return <Loader />;

  if (!accessToken) return <Navigate to="/login" replace />;

  if(accessToken)return children;
  
}

export default ProtectedRoute;

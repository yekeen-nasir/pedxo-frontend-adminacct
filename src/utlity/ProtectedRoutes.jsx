import { Navigate} from "react-router-dom";
import { Dashboard } from "../pages";

const ProtectedRoutes = () => {
    const storedData = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {storedData && storedData?.expiry > Date.now() ? (
        <Dashboard />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
export default ProtectedRoutes;

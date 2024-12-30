import { Navigate } from "react-router-dom";
import { Dashboard } from "../pages";
import { refreshAccessToken } from "./RefreshAccessToken";

const ProtectedRoutes = () => {
  const storedData = JSON.parse(localStorage.getItem("user"));

  if (storedData) {
    const {
      accessToken,
      refreshToken,
      accessTokenExpiration,
      refreshTokenExpiration,
    } = storedData;

    if (Date.now() > accessTokenExpiration) {
      refreshAccessToken(refreshToken);
      console.log("token refreshed");
    }
    if (Date.now() > refreshTokenExpiration) {
      localStorage.removeItem("user");
    }
  }

  return (
    <div>
      {storedData.refreshTokenExpiration > Date.now() ? (
        <Dashboard />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
export default ProtectedRoutes;

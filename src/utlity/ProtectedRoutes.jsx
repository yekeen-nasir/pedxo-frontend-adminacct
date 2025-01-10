import { Navigate, replace } from "react-router-dom";
import { Dashboard } from "../pages";
import { refreshAccessToken } from "./RefreshAccessToken";

const ProtectedRoutes = ({ children }) => {
  const storedData = JSON.parse(localStorage.getItem("user") || null);

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

  if (!storedData) return <Navigate to="/login" replace />;

  return (
    <div>
      {storedData.refreshTokenExpiration > Date.now() ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
export default ProtectedRoutes;

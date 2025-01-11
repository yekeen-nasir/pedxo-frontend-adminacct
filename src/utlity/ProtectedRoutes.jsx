import { Navigate } from "react-router-dom";
import { refreshAccessToken } from "./RefreshAccessToken";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const ProtectedRoutes = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user")) || null;

    if (!storedData) {
      setIsLoading(false);
      setIsAuthenticated(false);
    } else {
      const {
        accessToken,
        refreshToken,
        accessTokenExpiration,
        refreshTokenExpiration,
      } = storedData;

      const checkTokenExpiritaion = async () => {
        if (Date.now() > refreshTokenExpiration) {
          localStorage.removeItem("user");
          setIsAuthenticated(false);
        } else if (Date.now() > accessTokenExpiration) {
          try {
            const newToken = await refreshAccessToken(refreshToken);
            refreshAccessToken(refreshToken);
            console.log("token refreshed");
            if (newToken) {
              setIsAuthenticated(true);
            } else throw new Error("Failed torefresh tokens");
          } catch (err) {
            console.log(err.message);
            localStorage.removeItem("user");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      };

      checkTokenExpiritaion();
    }
  }, []);

  if (isLoading) return <Loader />;

  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};
export default ProtectedRoutes;

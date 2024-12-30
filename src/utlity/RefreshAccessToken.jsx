import authFetch from "../components/auth";

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await authFetch.get("/auth/refresh-token",
       {
      refreshToken,
    });
    console.log(response);

    const newAccessToken = response.data.result.accessToken;

    const updatedTokenData = JSON.parse(localStorage.getItem("user"));
    updatedTokenData.accessToken = newAccessToken;

    localStorage.setItem("user", JSON.stringify(updatedTokenData));
  } catch (error) {
    console.log(error);
  }
};
            
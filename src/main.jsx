import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import AppContext from "./Context.jsx";
import { Toaster } from "react-hot-toast";
import { TbCircleCheckFilled } from "react-icons/tb";
import { FaRegTimesCircle } from "react-icons/fa";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContext>
      <ThemeProvider>

      <App />
      <Toaster
        containerStyle={{
          top: 0,
          padding: "10px 20px",
        }}
        toastOptions={{
          success: {
            duration: 2000,

            style: {
              fontWeight: 800,
              borderRadius: "0px",
              fontSize: "14px",
              background: "#188F4B",
              color: "#fff",
            },
            icon: <TbCircleCheckFilled size={25} />,
          },
          error: {
            duration: 2000,
            style: {
              fontWeight: 800,
              fontSize: "14px",
              borderRadius: "0px",
              background: "#EF393C",
              color: "#fff",
            },
            icon: <FaRegTimesCircle size={25} />,
          },
        }}
      />
      </ThemeProvider>
    </AppContext>
  </StrictMode>
);

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { ForgotPassword, HomeLayout, Landing, Login, SignUp } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signup" replace />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="w-[390px] px-[25px]">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

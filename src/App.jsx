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
    <div className="min-w-[390px] 2xl:max-w-[1512px] 2xl:mx-auto px-[25px]">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

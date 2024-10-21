import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import {
  AddDeveloper,
  Agreements,
  CreateContract,
  Dashboard,
  Expenses,
  ForgotPassword,
  Login,
  Overview,
  Payroll, 
  SignUp,
  Teams,
} from "./pages";

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
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "/dashboard/overview",
        element: <Overview />,
      },
      {
        path: "/dashboard/add-developer",
        element: <AddDeveloper />,
      },
      {
        path: "/dashboard/create-contract",
        element: <CreateContract />,
      },
      {
        path: "/dashboard/teams",
        element: <Teams />,
      },
      {
        path: "/dashboard/payroll",
        element: <Payroll />,
      },
      {
        path: "/dashboard/expenses",
        element: <Expenses />,
      },
      {
        path: "/dashboard/agreements",
        element: <Agreements />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
// min-w-[390px] 2xl:max-w-[1512px] 2xl:mx-auto px-[25px]

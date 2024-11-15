import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import {
  AccountVerification,
  AddDeveloper,
  Agreements,
  CreateContract,
  Dashboard,
  Error,
  Expenses,
  ForgotPassword,
  FullTimeContract,
  GigBasedContract,
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
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "/account-verification",
    element: <AccountVerification />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <Error />,
  },

  {
    path: "/full-time-form",
    element: <FullTimeContract />,
    errorElement: <Error />,
  },

  {
    path: "/gig-based-form",
    element: <GigBasedContract />,
    errorElement: <Error />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Overview />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard/overview",
        element: <Overview />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard/add-developer",
        element: <AddDeveloper />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard/create-contract",
        element: <CreateContract />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard/teams",
        element: <Teams />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard/payroll",
        element: <Payroll />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard/expenses",
        element: <Expenses />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard/agreements",
        element: <Agreements />,
        errorElement: <Error />,
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

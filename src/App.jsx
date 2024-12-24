import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import {
  AccountVerification,
  AddDeveloper,
  AgreementContract,
  Agreements,
  CreateContract,
  // Dashboard,
  Error,
  Expenses,
  ForgotPassword,
  FullTimeContract,
  GigBasedContract,
  Login,
  Overview,
  Payroll,
  ResetPasswordOtp,
  SignUp,
  Teams,
} from "./pages";
import ProtectedRoutes from "./utlity/ProtectedRoutes";

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
    path: "/reset-password-otp",
    element: <ResetPasswordOtp />,
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <Error />,
  },

  {
    path: "/dashboard",
    element: <ProtectedRoutes />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Overview />,
        errorElement: <Error />,
      },
      {
        path: "overview",
        element: <Overview />,
        errorElement: <Error />,
      },
      {
        path: "add-developer",
        element: <AddDeveloper />,
        errorElement: <Error />,
      },
      {
        path: "create-contract",
        element: <CreateContract />,
        errorElement: <Error />,
      },
      {
        path: "teams",
        element: <Teams />,
        errorElement: <Error />,
      },
      {
        path: "payroll",
        element: <Payroll />,
        errorElement: <Error />,
      },

      {
        path: "expenses",
        element: <Expenses />,
        errorElement: <Error />,
      },
      {
        path: "agreements",
        element: <Agreements />,
        errorElement: <Error />,
      },
      {
        path: "full-time-form",
        element: <FullTimeContract />,
        errorElement: <Error />,
      },

      {
        path: "gig-based-form",
        element: <GigBasedContract />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard/agreements/:id",
        element: <AgreementContract />,
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

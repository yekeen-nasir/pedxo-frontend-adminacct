import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomeLayout, Landing, Login, SignUp } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
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

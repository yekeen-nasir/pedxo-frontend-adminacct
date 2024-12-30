import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    // <div className="font-poppins md:mx-auto md:flex 2xl:max-w-[1440px] min-h-[844px] 2xl:max-h-[1024px] ">
    <div className="font-poppins md:mx-auto md:flex">
      <Navbar />
      {/* <main className="flex-1 min-h-[844px] 2xl:max-w-[1512px] 2xl:max-h-[1024px]"> */}
      <main className="flex-1 max-h-[1024px] ml-0 md:ml-[228px]">
        <Outlet />
      </main>
    </div>
  );
};
export default Dashboard;

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="2xl:max-w-[1512px] min-h-[844px] 2xl:max-h-[1024px] md:mx-auto md:flex">
      <Navbar />
      <main className="flex-1">
      <Outlet />
      </main>
    </div>
  );
};
export default Dashboard;



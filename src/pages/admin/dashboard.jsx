import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { FileText, Clock, UserCheck, CheckCircle } from "lucide-react";
import { getStats, listContracts } from "../../utility/adminApi.js";

const StatCard = ({ icon: Icon, title, value, subtitle }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-black mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  (async () => {
    try {
      // Fetch stats safely
      const s = await getStats();
      setStats(s || {}); // fallback to empty object if null/undefined

      // Fetch contracts safely
      const c = await listContracts();
      setRecent(Array.isArray(c) ? c.slice(0, 3) : []); // fallback to empty array
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setStats({});
      setRecent([]);
    }finally {
      setLoading(false);
    }
  })();
}, []);

  const badge = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-800",
      assigned: "bg-blue-100 text-blue-800",
      "in-progress": "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${map[status] || "bg-gray-100 text-gray-800"}`;
  };

    // 🔹 Add loading guard here
  if (loading) {
  return <div className="p-6 text-center">Loading dashboard...</div>;
}

  return (
    <AdminLayout title="Dashboard Overview">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FileText} title="Total Contracts" value={stats?.totalContracts ?? 0} subtitle="Active projects" />
        <StatCard icon={Clock} title="Pending Assignments" value={stats?.pendingAssignments ?? 0} subtitle="Awaiting developer" />
        <StatCard icon={UserCheck} title="Available Developers" value={stats?.availableDevelopers ?? 0} subtitle="Ready for work" />
        <StatCard icon={CheckCircle} title="Completed Projects" value={stats?.completedProjects ?? 0} subtitle="This month" />
      </div>

      {/* Recent */}
      <div className="bg-white rounded-lg border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">Recent Contracts</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recent.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <h3 className="font-medium text-black">{c.title}</h3>
                  <p className="text-sm text-gray-600">{c.client} • {c.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={badge(c.status)}>{c.status}</span>
                  <span className="font-semibold text-black">${c.budget.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

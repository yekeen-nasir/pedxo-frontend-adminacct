// 1. Dashboard Page - Fixed
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { FileText, Clock, UserCheck, CheckCircle } from "lucide-react";
import { getStats, listContracts, listDevelopers } from "../../utility/adminApi.js";

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
  const [stats, setStats] = useState({
    totalContracts: 0,
    pendingAssignments: 0,
    totalDevelopers: 0,
    completedProjects: 0
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Fetch all data
        const [statsData, contracts, developers] = await Promise.all([
          getStats(),
          listContracts(),
          listDevelopers()
        ]);

        // Calculate stats from actual data
        const contractsArray = Array.isArray(contracts) ? contracts : [];
        const developersArray = Array.isArray(developers) ? developers : [];
        
        // Count pending assignments (contracts without assigned developers)
        const pendingCount = contractsArray.filter(c => 
          !c.assignedTalent && !c.talentId && !c.developerId
        ).length;
        
        // Count completed projects
        const completedCount = contractsArray.filter(c => 
          c.status === 'completed' || c.isCompleted
        ).length;

        setStats({
          totalContracts: contractsArray.length,
          pendingAssignments: pendingCount,
          totalDevelopers: developersArray.length,
          completedProjects: completedCount
        });

        // Get 3 most recent contracts
        setRecent(contractsArray.slice(0, 3));
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
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

  if (loading) {
    return (
      <AdminLayout title="Dashboard Overview">
        <div className="p-6 text-center">Loading dashboard...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard Overview">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={FileText} 
          title="Total Contracts" 
          value={stats.totalContracts} 
          subtitle="Active projects" 
        />
        <StatCard 
          icon={Clock} 
          title="Pending Assignments" 
          value={stats.pendingAssignments} 
          subtitle="Awaiting developer" 
        />
        <StatCard 
          icon={UserCheck} 
          title="Available Developers" 
          value={stats.totalDevelopers} 
          subtitle="Ready for work" 
        />
        <StatCard 
          icon={CheckCircle} 
          title="Completed Projects" 
          value={stats.completedProjects} 
          subtitle="This month" 
        />
      </div>

      {/* Recent Contracts */}
      <div className="bg-white rounded-lg border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">Recent Contracts</h2>
        </div>
        <div className="p-6">
          {recent.length > 0 ? (
            <div className="space-y-4">
              {recent.map((contract, index) => (
                <div key={contract._id || index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-black">
                      {contract.YourTitle || contract.projectTitle || "Development Project"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {contract.name || "Unknown Client"} • {contract.email || "No email"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {contract.whereYouLive || contract.state || "Location not specified"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={badge(contract.assignedTalent ? "assigned" : "pending")}>
                      {contract.assignedTalent ? "assigned" : "pending"}
                    </span>
                    <span className="font-semibold text-black">
                      ${Number(contract.minimumToPayToTalent || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No contracts yet.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
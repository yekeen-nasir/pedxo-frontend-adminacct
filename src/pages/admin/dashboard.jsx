// src/pages/admin/dashboard.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { FileText, Clock, UserCheck, CheckCircle } from "lucide-react";
import { listContracts, listDevelopers } from "../../utility/adminApi.js";

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
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [stats, setStats] = useState({
    totalContracts: 0,
    pendingAssignments: 0,
    availableDevelopers: 0,
    completedProjects: 0,
  });
  const [recent, setRecent] = useState([]);

  // helper: normalize API responses into arrays
  const normalizeArray = (res) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  };

  // helper: get assigned talent ids from a contract (support multiple field names)
  const getAssignedTalentIds = (c) => {
    if (!c) return [];
    const ids =
      c.talentAssignedId ||
      c.talentIds ||
      c.assignedTalent ||
      c.assignedDev ||
      c.developerId ||
      c.assignedDeveloper ||
      c.talentAssigned ||
      null;
    if (!ids) return [];
    if (Array.isArray(ids)) return ids;
    if (typeof ids === "string") return [ids];
    return [];
  };

  // helper: check if contract considered completed
  const isContractCompleted = (c) => {
    if (!c) return false;
    if (c.isCompleted === true) return true;
    const p = (c.progress || "").toString().toLowerCase();
    if (p.includes("signed") || p.includes("completed") || p.includes("done")) return true;
    return false;
  };

  // helper: pick a numeric amount from various fields
  const getContractAmount = (c) => {
    // backend fields seen: paymentRate, payment_rate, minimumToPayToTalent
    const candidates = [c?.paymentRate, c?.payment_rate, c?.minimumToPayToTalent, c?.paymentAmount, c?.payment];
    for (const v of candidates) {
      if (v === null || v === undefined || v === "") continue;
      const num = Number(v);
      if (!Number.isNaN(num)) return num;
      // if string but not numeric, ignore
    }
    return 0;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [rawContracts, rawDevelopers] = await Promise.all([listContracts(), listDevelopers()]);

        const cons = normalizeArray(rawContracts);
        const devs = normalizeArray(rawDevelopers);

        // canonicalize contracts array items so we can safely use fields
        // sort by createdAt/updatedAt desc for "recent"
        const sortedContracts = cons.slice().sort((a, b) => {
          const ta = new Date(a.createdAt || a.updatedAt || 0).getTime() || 0;
          const tb = new Date(b.createdAt || b.updatedAt || 0).getTime() || 0;
          return tb - ta;
        });

        // gather set of all assigned talent ids across all contracts
        const assignedIdSet = new Set();
        sortedContracts.forEach((c) => {
          getAssignedTalentIds(c).forEach((id) => {
            if (id) assignedIdSet.add(id);
          });
        });

        // total contracts
        const totalContracts = cons.length;

        // pending assignments = contracts that are not completed AND have no assigned talent ids
        const pendingAssignments = cons.filter((c) => !isContractCompleted(c) && getAssignedTalentIds(c).length === 0).length;

        // completed projects
        const completedProjects = cons.filter((c) => isContractCompleted(c)).length;

        // available developers: developers whose id is not in assignedIdSet
        const availableDevelopers = devs.filter((d) => {
          const id = d?._id || d?.id || d?.talentId || d?.userId || "";
          // if developer record has explicit status field, prefer checking 'available'
          if (d?.status) {
            const st = (d.status || "").toString().toLowerCase();
            if (st === "available" || st === "free") return true;
            if (st === "busy" || st === "assigned") return false;
          }
          if (!id) return true; // can't match -> assume available
          return !assignedIdSet.has(id);
        }).length;

        // recent: take first 3 sortedContracts and map friendly display fields
        const recentContracts = sortedContracts.slice(0, 3).map((c) => ({
          id: c._id || c.id || "",
          title: c.roleTitle || c.YourTitle || c.projectTitle || c.scopeOfWork || c.explanationOfScopeOfWork || (c.clientName ? `${c.clientName} • ${c.contractType || c.progress || ""}` : "Untitled Contract"),
          client: c.clientName || c.companyName || c.name || "Unknown Client",
          contact: c.email || "No email",
          location: (c.whereYouLive || c.city || c.region || c.state || c.country) || "Location not specified",
          statusAssigned: getAssignedTalentIds(c).length > 0,
          amount: getContractAmount(c),
          createdAt: c.createdAt || c.updatedAt || null,
        }));

        // set state
        setContracts(sortedContracts);
        setDevelopers(devs);
        setStats({
          totalContracts,
          pendingAssignments,
          availableDevelopers,
          completedProjects,
        });
        setRecent(recentContracts);
      } catch (err) {
        console.error("Dashboard load error:", err);
        // leave defaults
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
        <StatCard icon={FileText} title="Total Contracts" value={stats.totalContracts} subtitle="Active projects" />
        <StatCard icon={Clock} title="Pending Assignments" value={stats.pendingAssignments} subtitle="Awaiting developer" />
        <StatCard icon={UserCheck} title="Available Developers" value={stats.availableDevelopers} subtitle="Ready for work" />
        <StatCard icon={CheckCircle} title="Completed Projects" value={stats.completedProjects} subtitle="This month" />
      </div>

      {/* Recent Contracts */}
      <div className="bg-white rounded-lg border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">Recent Contracts</h2>
        </div>
        <div className="p-6">
          {recent.length > 0 ? (
            <div className="space-y-4">
              {recent.map((contract) => (
                <div key={contract.id || contract.title} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-black">{contract.title}</h3>
                    <p className="text-sm text-gray-600">{contract.client} • {contract.contact}</p>
                    <p className="text-xs text-gray-500 mt-1">{contract.location} • {contract.createdAt ? new Date(contract.createdAt).toLocaleDateString() : ""}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={badge(contract.statusAssigned ? "assigned" : "pending")}>
                      {contract.statusAssigned ? "assigned" : "pending"}
                    </span>
                    <span className="font-semibold text-black">${(Number(contract.amount) || 0).toLocaleString()}</span>
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

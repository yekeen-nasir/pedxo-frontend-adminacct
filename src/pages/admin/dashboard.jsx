// src/pages/admin/dashboard.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { FileText, Clock, UserCheck, CheckCircle } from "lucide-react";
import { listContracts, listDevelopers } from "../../utility/adminApi.js";

/**
 * DashboardPage (improved)
 * - Robust normalization of API responses
 * - Accurate developer counts (total / busy / available)
 * - Accurate contract counts (total / pending / completed)
 * - Recent contracts sorted by createdAt/updatedAt
 */

const DEBUG = false; // set true locally to print helpful logs

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

/* ---------- Helpers ---------- */

const normalizeArray = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data?.data)) return res.data.data;
  return [];
};

/**
 * Extract assigned talent/dev IDs from a contract record.
 * Supports:
 * - arrays of strings: ["id1", "id2"]
 * - arrays of objects: [{ _id }, { id }, { talentId }]
 * - single string: "id"
 * - object: { _id: '...' }
 * - nested shapes (best-effort)
 */
const getAssignedTalentIds = (contract = {}) => {
  if (!contract) return [];

  // keys we saw in backend and some alternatives
  const candidateKeys = [
    "talentAssignedId",
    "talentAssigned",
    "talentIds",
    "talentAssignedIds",
    "assignedTalent",
    "assignedDev",
    "developerId",
    "assignedDeveloper",
    "talentId",
    "talent_assigned",
  ];

  for (const key of candidateKeys) {
    const v = contract[key];
    if (v === undefined || v === null) continue;

    // array
    if (Array.isArray(v)) {
      const out = v.flatMap((item) => {
        if (!item) return [];
        if (typeof item === "string") return [item];
        if (typeof item === "number") return [String(item)];
        if (typeof item === "object") {
          // try common id fields
          return [item._id ?? item.id ?? item.talentId ?? item.talent_id ?? item.value].filter(Boolean);
        }
        return [];
      });
      if (out.length) return Array.from(new Set(out.map(String)));
    }

    // string or number
    if (typeof v === "string" || typeof v === "number") {
      return [String(v)];
    }

    // single object
    if (typeof v === "object") {
      const id = v._id ?? v.id ?? v.talentId ?? v.talent_id ?? v.value;
      if (id) return [String(id)];
    }
  }

  // some contracts might nest assignment under 'hire' or 'meta'
  if (contract.hire?.talentAssignedId) return getAssignedTalentIds({ talentAssignedId: contract.hire.talentAssignedId });

  return [];
};

const isContractCompleted = (c) => {
  if (!c) return false;
  if (c.isCompleted === true) return true;
  const p = (c.progress ?? "").toString().toLowerCase();
  return p.includes("signed") || p.includes("completed") || p.includes("done") || p.includes("closed");
};

const getContractAmount = (c = {}) => {
  const candidates = [
    c.paymentRate,
    c.payment_rate,
    c.minimumToPayToTalent,
    c.paymentAmount,
    c.payment,
    c.payment_rate_amount,
  ];
  for (const x of candidates) {
    if (x === undefined || x === null || x === "") continue;
    const n = Number(x);
    if (!Number.isNaN(n)) return n;
  }
  return 0;
};

/* ---------- Component ---------- */

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [stats, setStats] = useState({
    totalContracts: 0,
    pendingAssignments: 0,
    availableDevelopers: 0,
    busyDevelopers: 0,
    completedProjects: 0,
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [rawContracts, rawDevelopers] = await Promise.all([listContracts(), listDevelopers()]);

        const cons = normalizeArray(rawContracts);
        const devs = normalizeArray(rawDevelopers);

        // Build canonical developer id map (devId -> developer)
        const devIdToDev = new Map();
        devs.forEach((d) => {
          const id = d._id ?? d.id ?? d.talentId ?? d.userId ?? null;
          if (id) devIdToDev.set(String(id), d);
        });

        // Build set of assigned developer IDs across all contracts (unique)
        const assignedIdSet = new Set();
        cons.forEach((c) => {
          const ids = getAssignedTalentIds(c);
          ids.forEach((id) => {
            if (id) assignedIdSet.add(String(id));
          });
        });

        // Determine busy vs available developers:
        // - busy if dev is in assignedIdSet OR dev.status suggests busy
        // - we count each developer once
        let busyCount = 0;
        let availableCount = 0;

        devs.forEach((d) => {
          const id = d._id ?? d.id ?? d.talentId ?? d.userId ?? null;
          const idStr = id ? String(id) : null;
          const status = (d.status ?? d.state ?? "").toString().toLowerCase();

          const statusBusy = ["busy", "assigned", "in-progress", "working", "unavailable"].some((s) =>
            status.includes(s)
          );

          const assignedByContract = idStr ? assignedIdSet.has(idStr) : false;

          if (statusBusy || assignedByContract) busyCount++;
          else availableCount++;
        });

        // There might be assigned ids in assignedIdSet that are not present in developer list
        // These are "external" assignments — we don't increment busyCount for them since they are not in our dev list,
        // but we might want to surface them in logs for debugging.
        const unmatchedAssigned = Array.from(assignedIdSet).filter((id) => !devIdToDev.has(id));
        if (DEBUG && unmatchedAssigned.length) {
          console.warn("Assigned IDs not found in developers list:", unmatchedAssigned);
        }

        const totalContracts = cons.length;
        const pendingAssignments = cons.filter((c) => !isContractCompleted(c) && getAssignedTalentIds(c).length === 0).length;
        const completedProjects = cons.filter((c) => isContractCompleted(c)).length;

        // Prepare recent contracts sorted by createdAt/updatedAt (newest first)
        const sorted = cons.slice().sort((a, b) => {
          const ta = new Date(a.createdAt ?? a.updatedAt ?? 0).getTime();
          const tb = new Date(b.createdAt ?? b.updatedAt ?? 0).getTime();
          return tb - ta;
        });

        const recentContracts = sorted.slice(0, 3).map((c) => ({
          id: c._id ?? c.id ?? "",
          title: c.roleTitle ?? c.YourTitle ?? c.projectTitle ?? c.scopeOfWork ?? c.explanationOfScopeOfWork ?? (c.clientName ? `${c.clientName} • ${c.contractType || c.progress || ""}` : "Untitled Contract"),
          client: c.clientName ?? c.companyName ?? c.name ?? "Unknown Client",
          contact: c.email ?? "No email",
          location: c.whereYouLive ?? c.city ?? c.region ?? c.state ?? c.country ?? "Location not specified",
          statusAssigned: getAssignedTalentIds(c).length > 0,
          amount: getContractAmount(c),
          createdAt: c.createdAt ?? c.updatedAt ?? null,
        }));

        // update state
        setContracts(sorted);
        setDevelopers(devs);
        setStats({
          totalContracts,
          pendingAssignments,
          availableDevelopers: availableCount,
          busyDevelopers: busyCount,
          completedProjects,
        });
        setRecent(recentContracts);

        if (DEBUG) {
          console.log("Dashboard debug:", { totalContracts, pendingAssignments, busyCount, availableCount, completedProjects, unmatchedAssigned });
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FileText} title="Total Contracts" value={stats.totalContracts} subtitle="Active projects" />
        <StatCard icon={Clock} title="Pending Assignments" value={stats.pendingAssignments} subtitle="Awaiting developer" />
        <StatCard
          icon={UserCheck}
          title=" Total Developers"
          value={developers.length}
          subtitle="Current Value"
        />
        <StatCard icon={CheckCircle} title="Completed Projects" value={stats.completedProjects} subtitle="This month" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">Recent Contracts</h2>
        </div>
        <div className="p-6">
          {recent.length > 0 ? (
            <div className="space-y-4">
              {recent.map((contract) => (
                <div
                  key={contract.id || contract.title}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <h3 className="font-medium text-black">{contract.title}</h3>
                    <p className="text-sm text-gray-600">{contract.client} • {contract.contact}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {contract.location} • {contract.createdAt ? new Date(contract.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={badge(contract.statusAssigned ? "assigned" : "pending")}>
                      {contract.statusAssigned ? "assigned" : "pending"}
                    </span>
                    <span className="font-semibold text-black">
                      ${(Number(contract.amount) || 0).toLocaleString()}
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

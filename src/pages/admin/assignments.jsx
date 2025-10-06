// src/pages/admin/assignment.jsx
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listHires, listDevelopers, assignDeveloper } from "../../utility/adminApi.js";
import { Eye, X } from "lucide-react";

/**
 * AssignmentPage (refactored)
 *
 * - Tabs: pending / assigned / completed
 * - Left: hires (contracts)
 * - Right: talent pool (available / busy)
 * - View hire (modal) + Assign developer (modal)
 */

export default function AssignmentPage() {
  const [hires, setHires] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [activeTab, setActiveTab] = useState("pending"); // pending | assigned | completed
  const [selectedHire, setSelectedHire] = useState(null); // for view modal
  const [assigningHire, setAssigningHire] = useState(null); // contract being assigned (opens assign modal)
  const [selectedTalentId, setSelectedTalentId] = useState(null); // chosen talent id in modal
  const [assigning, setAssigning] = useState(false);
  const [notice, setNotice] = useState(null); // { type, text }
  const [searchDev, setSearchDev] = useState("");

  // Load hires + devs
  useEffect(() => {
    loadAll();
  }, []);

  // close modals on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelectedHire(null);
        setAssigningHire(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [hiresRes, devsRes] = await Promise.all([listHires(), listDevelopers()]);

      const norm = (r) => {
        if (Array.isArray(r)) return r;
        if (r?.data && Array.isArray(r.data)) return r.data;
        if (r?.data?.data && Array.isArray(r.data.data)) return r.data.data;
        return [];
      };

      setHires(norm(hiresRes));
      setDevelopers(norm(devsRes));
    } catch (err) {
      console.error("Error loading assignment data:", err);
      setHires([]);
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  }

  // safe helper — supports different backend keys for assigned ids
  const getAssignedTalentIds = (item) => {
    if (!item) return [];
    const ids =
      item.talentAssignedId ||
      item.talentIds ||
      item.assignedTalent ||
      item.assignedDev ||
      item.developerId ||
      item.assignedDeveloper ||
      null;
    if (!ids) return [];
    if (Array.isArray(ids)) return ids;
    if (typeof ids === "string") return [ids];
    return [];
  };

  // Partition hires
  const pendingHires = hires.filter((h) => {
    const ids = getAssignedTalentIds(h);
    const completed = !!h.isCompleted || String(h.progress || "").toLowerCase() === "completed";
    return ids.length === 0 && !completed;
  });

  const assignedHires = hires.filter((h) => {
    const ids = getAssignedTalentIds(h);
    const completed = !!h.isCompleted || String(h.progress || "").toLowerCase() === "completed";
    return ids.length > 0 && !completed;
  });

  const completedHires = hires.filter((h) => {
    return !!h.isCompleted || String(h.progress || "").toLowerCase() === "completed" || String(h.progress || "").toLowerCase() === "signed";
  });

  // talent lookup
  const talentMap = useMemo(() => {
    const m = new Map();
    developers.forEach((d) => m.set(d._id || d.id || d.talentId || "", d));
    return m;
  }, [developers]);

  const isTalentAssigned = (talentId) => {
    if (!talentId) return false;
    return hires.some((h) => getAssignedTalentIds(h).includes(talentId));
  };

  const availableDevelopers = developers.filter((d) => {
    const id = d._id || d.id || d.talentId || "";
    return !isTalentAssigned(id);
  });

  const getAssignedDevelopersForHire = (hire) => {
    const ids = getAssignedTalentIds(hire);
    return ids.map((id) => talentMap.get(id) || { _id: id, name: id });
  };

  // Format helpers
  const formatDate = (iso) => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString();
  };

  const formatCurrency = (amt) => {
    if (amt == null || amt === "") return "Not specified";
    const num = Number(amt);
    if (isNaN(num)) return amt;
    return `$${num.toLocaleString()}`;
  };

  const getDevDisplayName = (d) =>
    [d?.firstName, d?.lastName].filter(Boolean).join(" ") || d?.name || d?.email || "Unknown";

  // Simple fit-scoring to highlight best matches (role/title & experience)
  const scoreDeveloperForHire = (dev = {}, hire = {}) => {
    let score = 0;
    const devText = `${dev.roleTitle || ""} ${dev.experienceLevel || ""} ${dev.skills ? dev.skills.join(" ") : ""}`.toLowerCase();
    const hireText = `${hire.roleTitle || hire.YourTitle || ""} ${hire.scopeOfWork || hire.explanationOfScopeOfWork || ""} ${hire.wantTalentAs || ""}`.toLowerCase();

    // word matches (cheap)
    const hireWords = Array.from(new Set(hireText.split(/\W+/).filter(Boolean).slice(0, 30)));
    hireWords.forEach((w) => {
      if (w.length > 2 && devText.includes(w)) score += 2;
    });

    // experience match preference
    const devExp = (dev.experienceLevel || "").toLowerCase();
    const hireSen = (hire.seniorityLevel || "").toLowerCase();
    if (devExp && hireSen && devExp === hireSen) score += 3;
    if (devExp.includes("senior") && (hireSen.includes("mid") || hireSen.includes("junior"))) score += 1; // overqualified gently favored

    return score;
  };

  // When assign modal opens, we sort available devs by score for that hire
  const sortedAvailableForAssign = useMemo(() => {
    const base = availableDevelopers.slice();
    if (!assigningHire) return base;
    return base
      .map((d) => ({ ...d, __score: scoreDeveloperForHire(d, assigningHire) }))
      .sort((a, b) => (b.__score || 0) - (a.__score || 0));
  }, [availableDevelopers, assigningHire]);

  // assignment flow
  const openAssignModal = (hire) => {
    setAssigningHire(hire);
    setSelectedTalentId(null);
    setSearchDev("");
  };

  const closeAssignModal = () => {
    setAssigningHire(null);
    setSelectedTalentId(null);
    setSearchDev("");
  };

  const performAssignment = async () => {
  if (!assigningHire) return setNotice({ type: "error", text: "No hire selected" });
  if (!selectedTalentId) return setNotice({ type: "error", text: "Select a developer first" });

  setAssigning(true);
  setNotice(null);

  try {
    // ✅ Ensure we send the correct talentId array
    const talentIds = [selectedTalentId];

    // Optional safety check
    const validTalentIds = developers.map(d => d.talentId);
    if (!talentIds.every(id => validTalentIds.includes(id))) {
      setNotice({ type: "error", text: "Selected developer does not exist in backend." });
      return;
    }

    const hireId = assigningHire._id || assigningHire.hireId || assigningHire.id;
    console.log("Sending assignment:", { hireId, talentIds });

    const res = await assignDeveloper(talentIds, hireId);

    // Check backend response properly
    if (res?.data?.error) {
      setNotice({ type: "error", text: res.data.message || "Assignment failed." });
    } else {
      setNotice({ type: "success", text: "Developer assigned successfully!" });
      closeAssignModal();
      await loadAll();
    }
  } catch (err) {
    console.error("Assign error:", err);
    setNotice({ type: "error", text: err?.message || "An error occurred while assigning." });
  } finally {
    setAssigning(false);
    setTimeout(() => setNotice(null), 4000);
  }
};


  // Derived visible hires
  const visibleHires = activeTab === "pending" ? pendingHires : activeTab === "assigned" ? assignedHires : completedHires;

  if (loading) {
    return (
      <AdminLayout title="Assignment Manager">
        <div className="p-6 text-center">Loading assignment data...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Assignment Manager">
      {notice && (
        <div className={`mb-4 p-3 rounded ${notice.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
          {notice.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-6">
        {[
          { key: "pending", label: "Pending", count: pendingHires.length },
          { key: "assigned", label: "Assigned", count: assignedHires.length },
          { key: "completed", label: "Completed", count: completedHires.length },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded ${activeTab === t.key ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-700"}`}
          >
            {t.label} ({t.count})
          </button>
        ))}

        <div className="ml-auto text-sm text-gray-600">Total Hires: {hires.length} · Developers: {developers.length}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Hires */}
        <div className="lg:col-span-2 space-y-4">
          {visibleHires.length === 0 ? (
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center text-gray-500">
              {activeTab === "pending" ? "No pending hires." : activeTab === "assigned" ? "No assigned hires." : "No completed hires."}
            </div>
          ) : (
            visibleHires.map((hire) => {
              const assignedList = getAssignedDevelopersForHire(hire);
              return (
                <div key={hire._id || hire.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-semibold text-black">
                        {hire.YourTitle || hire.roleTitle || (hire.contractName || "Hire / Project")}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Client: {hire.name || hire.clientName || "Unknown"} · {hire.whereYouLive || hire.state || hire.country || ""}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {hire.paymentPattern ? `${hire.paymentPattern} · ${formatCurrency(hire.minimumToPayToTalent || hire.minimum_to_pay_to_talent || hire.paymentRate)}` : `Budget: ${formatCurrency(hire.minimumToPayToTalent || hire.paymentRate)}`}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-gray-500">{formatDate(hire.createdAt)}</div>
                      <div className="flex gap-2">
                        <button title="View details" onClick={() => setSelectedHire(hire)} className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">
                          <Eye className="h-4 w-4" />
                        </button>

                        {activeTab === "pending" && (
                          <button onClick={() => openAssignModal(hire)} className="px-3 py-1 rounded bg-black text-white hover:bg-gray-900">
                            Assign
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {assignedList.length > 0 && (
                    <div className="mt-3 text-sm">
                      <div className="text-xs text-gray-500">Assigned Developers:</div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {assignedList.map((t) => (
                          <span key={t._id || t.id} className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {getDevDisplayName(t)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT: Talent pool + summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-black">Talent Pool</h4>
              <div className="text-xs text-gray-500">Available: {availableDevelopers.length}</div>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {developers.length === 0 && <div className="text-sm text-gray-500">No developers found.</div>}

              {developers.map((d) => {
                const id = d._id || d.id || d.talentId || "";
                const assigned = isTalentAssigned(id);
                return (
                  <div key={id || d.email || Math.random()} className="p-3 border border-gray-100 rounded flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-black">{getDevDisplayName(d)}</div>
                      <div className="text-xs text-gray-500">{d.roleTitle || d.experienceLevel || ""}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded ${assigned ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {assigned ? "Busy" : "Free"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Summary</div>
            <div className="mt-3 flex gap-6">
              <div>
                <div className="text-2xl font-bold text-black">{pendingHires.length}</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">{assignedHires.length}</div>
                <div className="text-xs text-gray-500">Assigned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">{completedHires.length}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW HIRE modal */}
      {selectedHire && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedHire(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{selectedHire.YourTitle || selectedHire.roleTitle || "Hire Details"}</h2>
                <p className="text-sm text-gray-500">{selectedHire.name || selectedHire.clientName || ""}</p>
              </div>
              <div>
                <button onClick={() => setSelectedHire(null)} className="p-2 rounded hover:bg-gray-100"><X /></button>
              </div>
            </div>

            <hr className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="font-medium">{selectedHire.email || "Not provided"}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="font-medium">{selectedHire.whereYouLive || selectedHire.city || selectedHire.state || selectedHire.country || "Not provided"}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Payment</div>
                  <div className="font-medium">{selectedHire.paymentPattern || formatCurrency(selectedHire.minimumToPayToTalent || selectedHire.paymentRate) }</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Dates</div>
                  <div className="font-medium">{formatDate(selectedHire.createdAt)} {selectedHire.workStartDate ? `· Start: ${selectedHire.workStartDate}` : ""}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500">Description / Scope</div>
                  <div className="font-medium whitespace-pre-wrap">{selectedHire.scopeOfWork || selectedHire.explanationOfScopeOfWork || "Not provided"}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Assigned Developers</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {getAssignedDevelopersForHire(selectedHire).length === 0 ? (
                      <span className="text-xs text-gray-500">None</span>
                    ) : (
                      getAssignedDevelopersForHire(selectedHire).map((t) => (
                        <span key={t._id || t.id} className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {getDevDisplayName(t)}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setSelectedHire(null)} className="px-4 py-2 rounded border">Close</button>
              {!getAssignedTalentIds(selectedHire).length && (
                <button onClick={() => { setSelectedHire(null); openAssignModal(selectedHire); }} className="px-4 py-2 rounded bg-black text-white">Assign</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN modal */}
      {assigningHire && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => closeAssignModal()}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">{assigningHire.YourTitle || assigningHire.roleTitle || "Assign Developer"}</h3>
                <div className="text-xs text-gray-500">Client: {assigningHire.name || assigningHire.clientName || "Unknown"}</div>
              </div>
              <button onClick={() => closeAssignModal()} className="p-2 rounded hover:bg-gray-100"><X /></button>
            </div>

            <hr className="my-4" />

            <div className="mb-3">
              <input
                value={searchDev}
                onChange={(e) => setSearchDev(e.target.value)}
                placeholder="Search available developers..."
                className="w-full border px-3 py-2 rounded focus:outline-none"
              />
            </div>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {sortedAvailableForAssign.map((d) => {
  const talentId = d.talentId; // <-- always pick talentId
  return (
    <label key={talentId} className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50 cursor-pointer">
      <input
        type="radio"
        name="selectedTalent"
        value={talentId}
        checked={selectedTalentId === talentId}
        onChange={() => setSelectedTalentId(talentId)}
      />
      <div className="flex-1">
        <div className="text-sm font-medium">{getDevDisplayName(d)}</div>
        <div className="text-xs text-gray-500">{d.roleTitle || d.experienceLevel || ""}</div>
      </div>
      <div className="text-xs text-gray-500">{d.country || d.state || ""}</div>
    </label>
  );
})}
              {sortedAvailableForAssign.length === 0 && <div className="text-sm text-gray-500">No available developers to assign.</div>}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => closeAssignModal()} className="px-4 py-2 rounded border">Cancel</button>
              <button onClick={() => performAssignment()} className="px-4 py-2 rounded bg-black text-white" disabled={assigning}>
                {assigning ? "Assigning..." : "Assign Developer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

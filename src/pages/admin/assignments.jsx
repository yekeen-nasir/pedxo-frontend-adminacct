// src/pages/admin/assignment.jsx
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listContracts, listDevelopers, assignDeveloper } from "../../utility/adminApi.js";
import { Eye, X } from "lucide-react";

/**
 * AssignmentPage
 *
 * - Tabs: Pending / Assigned / Completed
 * - Left column: contracts (based on active tab)
 * - Right column: talent pool (available / assigned status)
 * - Admin can view contract details (modal) and assign a talent (modal).
 */

export default function AssignmentPage() {
  const [contracts, setContracts] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [activeTab, setActiveTab] = useState("pending"); // pending | assigned | completed
  const [selectedContract, setSelectedContract] = useState(null); // for view modal
  const [assigningContract, setAssigningContract] = useState(null); // contract being assigned
  const [selectedTalentId, setSelectedTalentId] = useState(null); // talent chosen in assign modal
  const [assigning, setAssigning] = useState(false);
  const [notice, setNotice] = useState(null); // { type: 'success'|'error', text }

  useEffect(() => {
    loadAll();
  }, []);

  // ESC to close modals
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelectedContract(null);
        setAssigningContract(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [contractsRes, devsRes] = await Promise.all([listContracts(), listDevelopers()]);

      // Normalize response shapes:
      const normContracts = Array.isArray(contractsRes)
        ? contractsRes
        : Array.isArray(contractsRes?.data)
        ? contractsRes.data
        : Array.isArray(contractsRes?.data?.data)
        ? contractsRes.data.data
        : [];

      const normDevs = Array.isArray(devsRes)
        ? devsRes
        : Array.isArray(devsRes?.data)
        ? devsRes.data
        : Array.isArray(devsRes?.data?.data)
        ? devsRes.data.data
        : [];

      setContracts(normContracts);
      setDevelopers(normDevs);
    } catch (err) {
      console.error("Error loading assignment data:", err);
      setContracts([]);
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  };

  // Build a talent map for quick lookup (id -> talent)
  const talentMap = useMemo(() => {
    const m = new Map();
    developers.forEach((t) => {
      m.set(t._id || t.id || t.talentId || "", t);
    });
    return m;
  }, [developers]);

  // Helpers to determine assigned talent ids for a contract (support multiple backend key names)
  const getAssignedTalentIds = (contract) => {
    if (!contract) return [];
    // possible fields seen: talentAssignedId, talentIds, assignedTalent, assignedDev, developerId, assignedDeveloper
    const ids =
      contract.talentAssignedId ||
      contract.talentIds ||
      contract.assignedTalent ||
      contract.assignedDev ||
      contract.developerId ||
      contract.assignedDeveloper ||
      null;

    if (!ids) return [];
    if (Array.isArray(ids)) return ids;
    if (typeof ids === "string") return [ids];
    return [];
  };

  // Partition contracts
  const pendingContracts = contracts.filter((c) => {
    const assigned = getAssignedTalentIds(c);
    const assignedPresent = Array.isArray(assigned) && assigned.length > 0;
    const isCompleted = !!c.isCompleted || String(c.progress).toLowerCase() === "signed";
    return !assignedPresent && !isCompleted;
  });

  const assignedContracts = contracts.filter((c) => {
    const assigned = getAssignedTalentIds(c);
    const assignedPresent = Array.isArray(assigned) && assigned.length > 0;
    return assignedPresent;
  });

  const completedContracts = contracts.filter((c) => {
    return !!c.isCompleted || String(c.progress).toLowerCase() === "signed" || String(c.progress).toLowerCase() === "completed";
  });

  // Determine if a talent is currently assigned to any contract
  const isTalentAssigned = (talentId) => {
    if (!talentId) return false;
    return contracts.some((c) => {
      const ids = getAssignedTalentIds(c);
      return ids.includes(talentId);
    });
  };

  // Available developers: not assigned (but you can adjust logic to use status field)
  const availableDevelopers = developers.filter((d) => {
    const id = d._id || d.id || d.talentId || "";
    return !isTalentAssigned(id);
  });

  // Assigned developers for a contract (resolve names)
  const getAssignedDevelopersForContract = (contract) => {
    const ids = getAssignedTalentIds(contract);
    return ids.map((id) => talentMap.get(id) || { _id: id, name: id, firstName: "", lastName: "" });
  };

  // Format helpers
  const formatDate = (iso) => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString();
  };

  // Assignment flow: open assign modal for contract
  const openAssignModal = (contract) => {
    setAssigningContract(contract);
    setSelectedTalentId(null);
  };

  const closeAssignModal = () => {
    setAssigningContract(null);
    setSelectedTalentId(null);
  };

  const performAssignment = async () => {
    if (!assigningContract) return;
    if (!selectedTalentId) {
      setNotice({ type: "error", text: "Select a developer to assign." });
      setTimeout(() => setNotice(null), 3000);
      return;
    }
    setAssigning(true);
    setNotice(null);

    try {
      const res = await assignDeveloper([selectedTalentId], assigningContract._id || assigningContract.id || assigningContract.contractId || assigningContract.hireId);
      // `assignDeveloper` returns { ok: true, data } if earlier adminApi code used that pattern
      if (res?.ok || res?.status === "success" || res?.data) {
        setNotice({ type: "success", text: "Developer assigned successfully." });
        closeAssignModal();
        // refresh
        await loadAll();
      } else {
        setNotice({ type: "error", text: res?.error || res?.message || "Assignment failed" });
      }
    } catch (err) {
      console.error("Assign error:", err);
      setNotice({ type: "error", text: "An error occurred while assigning." });
    } finally {
      setAssigning(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Assignment Manager">
        <div className="p-6 text-center">Loading assignment data...</div>
      </AdminLayout>
    );
  }

  // Determine which contract list to show based on activeTab
  const visibleContracts = activeTab === "pending" ? pendingContracts : activeTab === "assigned" ? assignedContracts : completedContracts;

  return (
    <AdminLayout title="Assignment Manager">
      {/* Notices */}
      {notice && (
        <div
          className={`mb-4 p-4 rounded-lg flex items-center gap-3 ${
            notice.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span className="text-sm">{notice.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded ${activeTab === "pending" ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-700"}`}
        >
          Pending ({pendingContracts.length})
        </button>
        <button
          onClick={() => setActiveTab("assigned")}
          className={`px-4 py-2 rounded ${activeTab === "assigned" ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-700"}`}
        >
          Assigned ({assignedContracts.length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded ${activeTab === "completed" ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-700"}`}
        >
          Completed ({completedContracts.length})
        </button>
        <div className="ml-auto text-sm text-gray-600">
          Total Contracts: {contracts.length} · Developers: {developers.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Contracts list */}
        <div className="lg:col-span-2 space-y-4">
          {visibleContracts.length === 0 ? (
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center text-gray-600">
              {activeTab === "pending" ? "No pending contracts." : activeTab === "assigned" ? "No assigned contracts." : "No completed contracts."}
            </div>
          ) : (
            visibleContracts.map((contract) => {
              const assignedDevs = getAssignedDevelopersForContract(contract);
              return (
                <div key={contract._id || contract.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-black">
                        {contract.roleTitle || contract.explanationOfScopeOfWork?.slice?.(0, 60) || contract.clientName || "Contract"}
                      </div>
                      <div className="text-sm text-gray-500">
                        Client: {contract.clientName || contract.companyName || "Unknown"} · {contract.contractType || contract.progress || "—"}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Created: {formatDate(contract.createdAt)} {contract.startDate ? `· Start: ${formatDate(contract.startDate)}` : ""}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-gray-700">{formatDate(contract.endDate) !== "N/A" ? `End: ${formatDate(contract.endDate)}` : ""}</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedContract(contract)}
                          title="View"
                          className="px-3 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {/* Only allow assign on pending contracts */}
                        {activeTab === "pending" && (
                          <button
                            onClick={() => openAssignModal(contract)}
                            className="px-3 py-1 rounded bg-black text-white hover:bg-gray-900"
                          >
                            Assign
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Assigned devs (if any) */}
                  {assignedDevs && assignedDevs.length > 0 && (
                    <div className="mt-3 text-sm">
                      <div className="text-xs text-gray-500">Assigned developers</div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {assignedDevs.map((t) => (
                          <span key={t._id || t.id || t.name} className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {t.firstName || t.name || t.clientName || `${t._id?.slice?.(0, 6)}` }
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

        {/* RIGHT: Developers (talent pool) */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-black">Talent Pool</h4>
              <div className="text-xs text-gray-500">Available: {availableDevelopers.length}</div>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {developers.length === 0 && <div className="text-sm text-gray-500">No talent found.</div>}
              {developers.map((d) => {
                const id = d._id || d.id || d.talentId || "";
                const assigned = isTalentAssigned(id);
                const name = (d.firstName || d.name || d.clientName || "").toString();
                return (
                  <div key={id || name} className="p-3 border border-gray-100 rounded flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-black">{name || "Unknown"}</div>
                      <div className="text-xs text-gray-500">
                        {d.roleTitle || d.YourTitle || d.title || "Developer"} • {d.experienceLevel || d.seniorityLevel || ""}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded ${assigned ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                        {assigned ? "Assigned" : "Available"}
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
            <div className="mt-3 flex gap-4">
              <div>
                <div className="text-2xl font-bold text-black">{pendingContracts.length}</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">{assignedContracts.length}</div>
                <div className="text-xs text-gray-500">Assigned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">{completedContracts.length}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Contract Modal */}
      {selectedContract && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedContract(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{selectedContract.roleTitle || selectedContract.explanationOfScopeOfWork?.slice?.(0,60) || selectedContract.clientName}</h3>
                <div className="text-sm text-gray-500">{selectedContract.companyName || ""}</div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="text-sm text-gray-800 space-y-3">
              <div>
                <div className="text-xs text-gray-500">Client</div>
                <div className="font-medium">{selectedContract.clientName || selectedContract.companyName || "Unknown"}</div>
                <div className="text-xs text-gray-500">{selectedContract.email || "No email"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Role / Scope</div>
                <div className="font-medium whitespace-pre-wrap">{selectedContract.scopeOfWork || selectedContract.explanationOfScopeOfWork || "Not provided"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Dates</div>
                <div className="font-medium">{formatDate(selectedContract.startDate || selectedContract.createdAt)} — {selectedContract.endDate ? formatDate(selectedContract.endDate) : "—"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Payment</div>
                <div className="font-medium">
                  {selectedContract.paymentRate ? `$${Number(selectedContract.paymentRate).toLocaleString()} · ${selectedContract.paymentFrequency || "-"}` : "Not specified"}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Progress / status</div>
                <div className="font-medium">{selectedContract.progress || (selectedContract.isCompleted ? "completed" : "pending")}</div>
              </div>

              {/* Assigned developers (if any) */}
              {getAssignedDevelopersForContract(selectedContract).length > 0 && (
                <div>
                  <div className="text-xs text-gray-500">Assigned Developers</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {getAssignedDevelopersForContract(selectedContract).map((t) => (
                      <div key={t._id || t.id} className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {t.firstName ? `${t.firstName} ${t.lastName || ""}` : t.name || t._id}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelectedContract(null)} className="px-4 py-2 rounded bg-black text-white hover:bg-gray-900">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {assigningContract && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => closeAssignModal()}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">{assigningContract.roleTitle || assigningContract.clientName || "Assign contract"}</h3>
                <div className="text-xs text-gray-500">Client: {assigningContract.clientName || assigningContract.companyName || "Unknown"}</div>
              </div>
              <button onClick={() => closeAssignModal()} className="px-3 py-2 rounded bg-white border border-gray-200">Close</button>
            </div>

            <hr className="my-4" />

            <div className="text-sm text-gray-800">
              <div className="text-xs text-gray-500 mb-2">Select a developer to assign</div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                {availableDevelopers.length === 0 && <div className="text-sm text-gray-500">No available developers to assign.</div>}

                {availableDevelopers.map((t) => (
                  <label key={t._id || t.id} className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="selectedTalent"
                      value={t._id || t.id}
                      checked={selectedTalentId === (t._id || t.id)}
                      onChange={() => setSelectedTalentId(t._id || t.id)}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t.firstName ? `${t.firstName} ${t.lastName || ""}` : t.name || t.email || t._id}</div>
                      <div className="text-xs text-gray-500">{t.roleTitle || t.title || t.experienceLevel || ""}</div>
                    </div>
                    <div className="text-xs text-gray-500">{t.country || t.state || ""}</div>
                  </label>
                ))}
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => closeAssignModal()} className="px-4 py-2 rounded border border-gray-200">Cancel</button>
                <button
                  onClick={() => performAssignment()}
                  className="px-4 py-2 rounded bg-black text-white"
                  disabled={assigning}
                >
                  {assigning ? "Assigning..." : "Assign Developer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

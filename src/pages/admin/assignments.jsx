import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listContracts, listDevelopers, assignDeveloper } from "../../utility/adminApi.js";
import { Button } from "../../ui/Button";

export default function AssignmentPage() {
  const [pending, setPending] = useState([]);
  const [available, setAvailable] = useState([]);

  const load = async () => {
    const c = await listContracts();
    const d = await listDevelopers();
    setPending(c.filter((x) => x.status === "pending"));
    setAvailable(d.filter((x) => x.status === "available"));
  };

  useEffect(() => { load(); }, []);

  const onAssign = async (contractId, developerId) => {
    await assignDeveloper(contractId, developerId);
    await load();
  };

  return (
    <AdminLayout title="Assignment Manager">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-black mb-4">Pending Contracts</h3>
          <div className="space-y-3">
            {pending.map((c) => (
              <div key={c.id} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-black">{c.title}</h4>
                <p className="text-sm text-gray-600">{c.client} • ${c.budget.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Date: {c.date}</p>
              </div>
            ))}
            {pending.length === 0 && <p className="text-sm text-gray-600">No pending contracts.</p>}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-black mb-4">Available Developers</h3>
          <div className="space-y-3">
            {available.map((d) => (
              <div key={d.id} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-black">{d.name}</h4>
                <p className="text-sm text-gray-600">{d.skills.slice(0, 3).join(", ")} • Rating: {d.rating}/5</p>
                {/* Assign to first pending contract for demo; in real UI open a picker */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {pending.map((c) => (
                    <Button key={c.id} onClick={() => onAssign(c.id, d.id)} className="text-sm">
                      Assign to “{c.title}”
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            {available.length === 0 && <p className="text-sm text-gray-600">No available developers.</p>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listContracts } from "../../utility/adminApi.js";
import { Search, Filter, Plus, MoreVertical, Eye, Edit } from "lucide-react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";

export default function ContractsPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [openNew, setOpenNew] = useState(false);
  const [form, setForm] = useState({ title: "", client: "", budget: "" });

  const load = async () => setItems(await listContracts(q));
  useEffect(() => { load(); }, [q]);

  const badge = (s) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-800",
      assigned: "bg-blue-100 text-blue-800",
      "in-progress": "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${map[s] || "bg-gray-100 text-gray-800"}`;
  };

  // const submitNew = async (e) => {
  //   e.preventDefault();
  //   await addContract({ ...form, budget: Number(form.budget) || 0 });
  //   setForm({ title: "", client: "", budget: "" });
  //   setOpenNew(false);
  //   load();
  // };

  return (
    <AdminLayout title="Contract Management">
      {/* Search & actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search contracts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          {/* <button onClick={() => setOpenNew(true)} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <Plus className="h-4 w-4" />
            <span>Add Contract</span>
          </button> */}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <TH>Contract</TH>
                <TH>Client</TH>
                <TH>Status</TH>
                <TH>Budget</TH>
                <TH>Assigned Dev</TH>
                <TH align="right">Actions</TH>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <TD>
                    <div className="font-medium text-black">{c.title}</div>
                    <div className="text-sm text-gray-500">{c.date}</div>
                  </TD>
                  <TD className="text-sm text-gray-900">{c.client}</TD>
                  <TD><span className={badge(c.status)}>{c.status}</span></TD>
                  <TD className="text-sm font-medium text-black">${c.budget.toLocaleString()}</TD>
                  <TD className="text-sm text-gray-900">{c.assignedDev || "Unassigned"}</TD>
                  <TD align="right">
                    <div className="flex items-center justify-end gap-2">
                      <IconBtn><Eye className="h-4 w-4 text-gray-600" /></IconBtn>
                      <IconBtn><Edit className="h-4 w-4 text-gray-600" /></IconBtn>
                      <IconBtn><MoreVertical className="h-4 w-4 text-gray-600" /></IconBtn>
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New contract modal */}
      {openNew && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Add Contract</h3>
            <form onSubmit={submitNew} className="space-y-4">
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" required />
              <Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="Client" required />
              <Input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="Budget (USD)" type="number" required />
              <div className="flex gap-2 justify-end">
                <Button type="button" onClick={() => setOpenNew(false)} className="bg-white text-black border border-gray-300 hover:bg-gray-50">Cancel</Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function TH({ children, align = "left" }) {
  return <th className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{children}</th>;
}
function TD({ children, align = "left", className = "" }) {
  return <td className={`px-6 py-4 text-${align} ${className}`}>{children}</td>;
}
function IconBtn({ children, ...p }) {
  return <button {...p} className="p-2 hover:bg-gray-100 rounded-md">{children}</button>;
}

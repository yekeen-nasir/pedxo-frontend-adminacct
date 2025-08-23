import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { changePassword, listAdmins, approveAdmin } from "../../utility/adminApi.js";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";

export default function SettingsPage() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [admins, setAdmins] = useState([]);

  const loadAdmins = async () => setAdmins(await listAdmins());
  useEffect(() => { loadAdmins(); }, []);

  const onPassword = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirm) return alert("Passwords do not match");
    await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
    setForm({ currentPassword: "", newPassword: "", confirm: "" });
  };

  const toggleApprove = async (id, approved) => {
    await approveAdmin(id, approved);
    loadAdmins();
  };

  return (
    <AdminLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Change password */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Change Password</h3>
          <form onSubmit={onPassword} className="space-y-4">
            <Input
              type="password"
              placeholder="Current password"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="New password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
            <Button type="submit">Update Password</Button>
          </form>
        </div>

        {/* Admin approvals */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Manage Admins</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <TH>Name</TH>
                  <TH>Email</TH>
                  <TH>Role</TH>
                  <TH>Status</TH>
                  <TH align="right">Action</TH>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {admins.map((a) => (
                  <tr key={a.id}>
                    <TD>{a.name}</TD>
                    <TD>{a.email}</TD>
                    <TD className="capitalize">{a.role}</TD>
                    <TD>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${a.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {a.approved ? "approved" : "pending"}
                      </span>
                    </TD>
                    <TD align="right">
                      {a.approved ? (
                        <Button className="bg-white text-black border border-gray-300 hover:bg-gray-50" onClick={() => toggleApprove(a.id, false)}>
                          Revoke
                        </Button>
                      ) : (
                        <Button onClick={() => toggleApprove(a.id, true)}>Approve</Button>
                      )}
                    </TD>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function TH({ children, align = "left" }) {
  return <th className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 uppercase tracking-wider`}>{children}</th>;
}
function TD({ children, align = "left" }) {
  return <td className={`px-6 py-4 text-${align}`}>{children}</td>;
}

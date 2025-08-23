import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listDevelopers } from "../../utility/adminApi";
import { MoreVertical } from "lucide-react";

export default function DevelopersPage() {
  const [devs, setDevs] = useState([]);
  useEffect(() => { listDevelopers().then(setDevs); }, []);

  const badge = (s) => {
    const map = { available: "bg-green-100 text-green-800", busy: "bg-red-100 text-red-800" };
    return `px-2 py-1 text-xs font-medium rounded-full ${map[s] || "bg-gray-100 text-gray-800"}`;
  };

  return (
    <AdminLayout title="Developer Pool">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devs.map((d) => (
          <div key={d.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-black rounded-full grid place-items-center text-white font-medium">
                  {d.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-black">{d.name}</h3>
                  <span className={badge(d.status)}>{d.status}</span>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-md">
                <MoreVertical className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {d.skills.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">{s}</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rating: <span className="font-medium text-black">{d.rating}/5</span></span>
                <span className="text-gray-600">Projects: <span className="font-medium text-black">{d.projects}</span></span>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

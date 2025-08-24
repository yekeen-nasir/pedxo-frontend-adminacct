// 3. Developers Page - Fixed
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listDevelopers } from "../../utility/adminApi";
import { MoreVertical, Github, Globe, MapPin, Briefcase } from "lucide-react";

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevelopers();
  }, []);

  const loadDevelopers = async () => {
    try {
      const data = await listDevelopers();
      setDevelopers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading developers:", err);
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (firstName, lastName) => {
    const f = firstName ? firstName[0].toUpperCase() : "";
    const l = lastName ? lastName[0].toUpperCase() : "";
    return f + l || "??";
  };

  const getExperienceBadge = (level) => {
    const styles = {
      "Junior": "bg-green-100 text-green-800",
      "Intermediate": "bg-blue-100 text-blue-800",
      "Senior": "bg-purple-100 text-purple-800",
      "Expert": "bg-red-100 text-red-800"
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[level] || "bg-gray-100 text-gray-800"}`;
  };

  if (loading) {
    return (
      <AdminLayout title="Developer Pool">
        <div className="p-6 text-center">Loading developers...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Developer Pool">
      {developers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev, index) => (
            <div key={dev._id || index} className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-black rounded-full grid place-items-center text-white font-medium">
                    {getInitials(dev.firstName, dev.lastName)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">
                      {dev.firstName} {dev.lastName}
                    </h3>
                    <span className={getExperienceBadge(dev.experienceLevel)}>
                      {dev.experienceLevel || "Not specified"}
                    </span>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-md">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Developer Info */}
              <div className="space-y-3">
                {/* Role */}
                <div>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {dev.roleTitle || "Developer"}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span>{dev.city || "City"}, {dev.state || "State"}, {dev.country || "Country"}</span>
                </div>

                {/* Contact */}
                <div className="text-sm text-gray-600">
                  <p>{dev.email}</p>
                  {dev.whatsappNumber && (
                    <p className="text-xs mt-1">WhatsApp: {dev.whatsappNumber}</p>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-2">
                  {dev.githubAccount && (
                    <a 
                      href={dev.githubAccount} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      <Github className="h-4 w-4 text-gray-700" />
                    </a>
                  )}
                  {dev.portfolioLink && (
                    <a 
                      href={dev.portfolioLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      <Globe className="h-4 w-4 text-gray-700" />
                    </a>
                  )}
                </div>

                {/* Banking Info (Admin Only) */}
                {dev.bankName && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Bank: {dev.bankName} - {dev.accountNumber}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <button className="w-full mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                  View Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No developers registered yet.</p>
        </div>
      )}
    </AdminLayout>
  );
}
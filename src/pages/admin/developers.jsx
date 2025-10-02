// src/pages/admin/developers.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listDevelopers } from "../../utility/adminApi";
import {
  MoreVertical,
  Github,
  Globe,
  MapPin,
  Briefcase,
  X,
  Mail,
  Phone,
  Link as LinkIcon,
} from "lucide-react";

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDev, setSelectedDev] = useState(null);

  useEffect(() => {
    loadDevelopers();
  }, []);

  // close modal on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelectedDev(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const loadDevelopers = async () => {
    setLoading(true);
    try {
      const res = await listDevelopers();
      // normalize: array or { data: [...] } or { data: { data: [...] } }
      const arr = Array.isArray(res)
        ? res
        : res?.data && Array.isArray(res.data)
        ? res.data
        : res?.data?.data && Array.isArray(res.data.data)
        ? res.data.data
        : [];
      setDevelopers(arr);
    } catch (err) {
      console.error("Error loading developers:", err);
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (dev) => {
    // support both talent objects (firstName/lastName) or hires (name)
    if (dev?.firstName || dev?.lastName) {
      const f = dev.firstName ? dev.firstName[0].toUpperCase() : "";
      const l = dev.lastName ? dev.lastName[0].toUpperCase() : "";
      return (f + l) || "??";
    }
    if (dev?.name) {
      return dev.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
    if (dev?.email) return dev.email[0].toUpperCase();
    return "??";
  };

  const formatDate = (iso) => {
    if (!iso) return "Not set";
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString();
  };

  // Safe getters to show fields from either talent object or hire object
  const getFullName = (dev) =>
    [dev?.firstName, dev?.lastName].filter(Boolean).join(" ") ||
    dev?.name ||
    dev?.githubAccount ||
    dev?.email ||
    "Unknown";

  const getTitle = (dev) =>
    dev?.roleTitle ||
    dev?.YourTitle ||
    dev?.role ||
    dev?.title ||
    "Developer";

  const getLocation = (dev) =>
    dev?.city || dev?.whereYouLive || dev?.state || dev?.region || dev?.country || "Unknown";

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
          {developers.map((dev, idx) => (
            <div key={dev._id || dev.id || idx} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-black rounded-full grid place-items-center text-white font-medium text-sm">
                    {getInitials(dev)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{getFullName(dev)}</h3>
                    <div className="text-xs text-gray-600 mt-1">{getTitle(dev)}</div>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-md">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-gray-700 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{getTitle(dev)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{getLocation(dev)}</span>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{dev?.email || "No email"}</span>
                  </div>
                  {dev?.whatsappNumber && (
                    <div className="text-xs mt-1 flex items-center gap-2"><Phone className="h-3 w-3" /> WhatsApp: {dev.whatsappNumber}</div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {dev?.githubAccount && (
                    <a href={dev.githubAccount} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                      <Github className="h-4 w-4 text-gray-700" />
                    </a>
                  )}
                  {dev?.portfolioLink && (
                    <a href={dev.portfolioLink} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                      <Globe className="h-4 w-4 text-gray-700" />
                    </a>
                  )}
                  {dev?.website && (
                    <a href={dev.website} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                      <LinkIcon className="h-4 w-4 text-gray-700" />
                    </a>
                  )}
                </div>

                {/* small summary */}
                <div className="text-sm text-gray-800 mt-2">
                  <div><span className="text-xs text-gray-500">Title</span> <div className="font-medium">{getTitle(dev)}</div></div>
                  <div className="mt-1 text-xs text-gray-500">Joined</div>
                  <div className="text-sm">{formatDate(dev?.createdAt)}</div>
                </div>

                <button
                  onClick={() => setSelectedDev(dev)}
                  className="w-full mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  View Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No developers / hires registered yet.</p>
        </div>
      )}

      {/* VIEW MODAL */}
      {selectedDev && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedDev(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-black">{getFullName(selectedDev)}</h2>
                <p className="text-sm text-gray-600">{getTitle(selectedDev)}</p>
              </div>

              <div className="flex items-center gap-2">
              </div>
            </div>

            <hr className="my-4" />

            {/* body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="font-medium">{selectedDev?.email || "Not provided"}</div>
                  {selectedDev?.whatsappNumber && <div className="text-xs text-gray-500">WhatsApp: {selectedDev.whatsappNumber}</div>}
                </div>

                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="font-medium">{(selectedDev?.whereYouLive || selectedDev?.city || selectedDev?.state || selectedDev?.region || selectedDev?.country) || "Not set"}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Title / Role</div>
                  <div className="font-medium">{getTitle(selectedDev)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Seniority / Experience</div>
                  <div className="font-medium">{selectedDev?.experienceLevel || selectedDev?.seniorityLevel || "Not set"}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Links</div>
                  <div className="flex items-center gap-2 mt-2">
                    {selectedDev?.githubAccount && <a className="px-2 py-1 bg-gray-100 rounded" href={selectedDev.githubAccount} target="_blank" rel="noreferrer"><Github className="h-4 w-4" /></a>}
                    {selectedDev?.portfolioLink && <a className="px-2 py-1 bg-gray-100 rounded" href={selectedDev.portfolioLink} target="_blank" rel="noreferrer"><Globe className="h-4 w-4" /></a>}
                    {selectedDev?.website && <a className="px-2 py-1 bg-gray-100 rounded" href={selectedDev.website} target="_blank" rel="noreferrer"><LinkIcon className="h-4 w-4" /></a>}
                  </div>
                </div>

                {selectedDev?.bankName && (
                  <div>
                    <div className="text-xs text-gray-500">Bank</div>
                    <div className="font-medium">{selectedDev.bankName} — {selectedDev.accountNumber || "No account number"}</div>
                  </div>
                )}

                {selectedDev?.skills && Array.isArray(selectedDev.skills) && (
                  <div>
                    <div className="text-xs text-gray-500">Skills</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedDev.skills.map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* right column: hire-related / extra details */}
              <div className="space-y-3">
                {selectedDev?.haveYouBuildSomePart && (
                  <div>
                    <div className="text-xs text-gray-500">Built before?</div>
                    <div className="font-medium">{selectedDev.haveYouBuildSomePart}</div>
                  </div>
                )}

                {selectedDev?.wantTalentAs && (
                  <div>
                    <div className="text-xs text-gray-500">Want talent as</div>
                    <div className="font-medium">{selectedDev.wantTalentAs}</div>
                  </div>
                )}

                {selectedDev?.paymentPattern && (
                  <div>
                    <div className="text-xs text-gray-500">Payment pattern</div>
                    <div className="font-medium">{selectedDev.paymentPattern}</div>
                  </div>
                )}

                {selectedDev?.minimumToPayToTalent && (
                  <div>
                    <div className="text-xs text-gray-500">Min pay to talent</div>
                    <div className="font-medium">{selectedDev.minimumToPayToTalent}</div>
                  </div>
                )}

                {selectedDev?.talentAssignedId && Array.isArray(selectedDev.talentAssignedId) && (
                  <div>
                    <div className="text-xs text-gray-500">Assigned talent IDs</div>
                    <div className="font-medium">{selectedDev.talentAssignedId.join(", ")}</div>
                  </div>
                )}

                {selectedDev?.contractId && (
                  <div>
                    <div className="text-xs text-gray-500">Contract ID</div>
                    <div className="font-medium">{selectedDev.contractId}</div>
                  </div>
                )}

                <div>
                  <div className="text-xs text-gray-500">Created / Updated</div>
                  <div className="font-medium">{formatDate(selectedDev.createdAt)} — {formatDate(selectedDev.updatedAt)}</div>
                </div>

                {/* long description / bio */}
                {selectedDev?.bio && (
                  <div>
                    <div className="text-xs text-gray-500">Bio</div>
                    <div className="font-medium whitespace-pre-wrap">{selectedDev.bio}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelectedDev(null)} className="px-4 py-2 rounded bg-black text-white hover:bg-gray-900">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

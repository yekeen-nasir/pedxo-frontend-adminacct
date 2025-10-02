// src/pages/admin/developers.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listDevelopers } from "../../utility/adminApi.js";
import {
  MoreVertical,
  Github,
  Globe,
  MapPin,
  Briefcase,
  Star,
  MessageSquare,
  X,
} from "lucide-react";

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDev, setSelectedDev] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDevelopers();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedDev(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function loadDevelopers() {
    setLoading(true);
    setError(null);
    try {
      const data = await listDevelopers();
      // normalize: listDevelopers may return an array or { data: [...] }
      const arr = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
      setDevelopers(arr);
    } catch (err) {
      console.error("Failed to load developers:", err);
      setError("Could not load developers");
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  }

  // Helpers to read fields robustly
  const getFullName = (dev) =>
    [dev?.firstName, dev?.lastName].filter(Boolean).join(" ") ||
    dev?.name ||
    dev?.username ||
    "Unnamed";

  const getInitials = (dev) => {
    const name = getFullName(dev);
    if (!name) return "??";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const skillsFrom = (dev) =>
    Array.isArray(dev?.skills)
      ? dev.skills
      : Array.isArray(dev?.skillSet)
      ? dev.skillSet
      : (dev?.skillsString || dev?.skills_text || "")
          .toString()
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

  const safeValue = (v, fallback = "Not provided") => (v || v === 0 ? v : fallback);

  // Rating / projects
  const rating = (dev) => dev?.rating ?? dev?.avgRating ?? dev?.ratingScore ?? null;
  const projectsCount = (dev) => dev?.projects ?? dev?.projectCount ?? dev?.jobsCompleted ?? null;

  // UI render
  if (loading)
    return (
      <AdminLayout title="Developer Pool">
        <div className="p-6 text-center">Loading developers...</div>
      </AdminLayout>
    );

  if (error)
    return (
      <AdminLayout title="Developer Pool">
        <div className="p-6 text-center text-red-600">{error}</div>
      </AdminLayout>
    );

  return (
    <AdminLayout title="Developer Pool">
      {developers.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No developers registered yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev, i) => (
            <article
              key={dev._id || dev.id || i}
              className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedDev(dev)}
                    className="h-12 w-12 bg-black rounded-full grid place-items-center text-white font-medium text-sm"
                    title="Open profile"
                  >
                    {getInitials(dev)}
                  </button>
                  <div>
                    <button onClick={() => setSelectedDev(dev)} className="text-left">
                      <h3 className="font-semibold text-black">{getFullName(dev)}</h3>
                      <p className="text-sm text-gray-600">{dev?.roleTitle || dev?.title || "Developer"}</p>
                    </button>
                    <div className="mt-1">
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                        {dev?.experienceLevel || dev?.level || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span className="font-medium">{rating(dev) ?? "—"}</span>
                    <span className="text-xs text-gray-400"> · {projectsCount(dev) ?? "0"} projects</span>
                  </div>
                  <button className="p-1 hover:bg-gray-50 rounded-md">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="mt-4 space-y-3 flex-1">
                <div className="text-sm text-gray-700 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span>{dev?.roleTitle || dev?.title || "Developer"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>
                    {dev?.city || dev?.state || dev?.country
                      ? [dev?.city, dev?.state, dev?.country].filter(Boolean).join(", ")
                      : "Location not set"}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  <div>{dev?.email || "No email provided"}</div>
                  {dev?.whatsappNumber && <div className="text-xs text-gray-500">WhatsApp: {dev.whatsappNumber}</div>}
                </div>

                <div className="flex gap-2 pt-2">
                  {dev?.githubAccount && (
                    <a href={dev.githubAccount} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                      <Github className="h-4 w-4 text-gray-700" />
                    </a>
                  )}
                  {dev?.portfolioLink && (
                    <a href={dev.portfolioLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                      <Globe className="h-4 w-4 text-gray-700" />
                    </a>
                  )}
                </div>

                {/* Skills preview */}
                <div className="pt-2">
                  <div className="text-xs text-gray-500 mb-1">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {skillsFrom(dev).length > 0 ? (
                      skillsFrom(dev).slice(0, 6).map((s, j) => (
                        <span key={j} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No skills provided</span>
                    )}
                  </div>
                </div>

                {/* Banking info small (admin-only) */}
                {dev?.bankName && (
                  <div className="pt-3 border-t border-gray-100 text-xs text-gray-600">
                    Bank: {dev.bankName} · Account: {dev.accountNumber || "N/A"}
                  </div>
                )}
              </div>

              {/* Footer action */}
              <div className="mt-4">
                <button
                  onClick={() => setSelectedDev(dev)}
                  className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
                >
                  View Full Profile
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Developer View Modal */}
      {selectedDev && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedDev(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-black rounded-full grid place-items-center text-white text-lg font-semibold">
                  {getInitials(selectedDev)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">{getFullName(selectedDev)}</h2>
                  <p className="text-sm text-gray-600">{selectedDev?.roleTitle || selectedDev?.title || "Developer"}</p>
                  <div className="mt-2 text-sm text-gray-600 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span className="font-medium">{rating(selectedDev) ?? "—"}</span>
                    </div>
                    <div className="text-xs text-gray-400">· {projectsCount(selectedDev) ?? 0} projects</div>
                    <div className="text-xs text-gray-400">· {selectedDev?.experienceLevel || "Level not set"}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedDev(null)} className="p-2 rounded hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <hr className="my-4" />

            {/* Body grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Key info */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="font-medium">{selectedDev?.email || "Not provided"}</div>
                  {selectedDev?.whatsappNumber && <div className="text-sm text-gray-600">WhatsApp: {selectedDev.whatsappNumber}</div>}
                </div>

                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="font-medium">
                    {(selectedDev?.city || selectedDev?.state || selectedDev?.country) 
                      ? [selectedDev?.city, selectedDev?.state, selectedDev?.country].filter(Boolean).join(", ")
                      : "Not set"}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Links</div>
                  <div className="flex gap-2 mt-2">
                    {selectedDev?.githubAccount ? (
                      <a className="inline-flex items-center gap-2 px-3 py-2 border rounded" href={selectedDev.githubAccount} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    ) : null}
                    {selectedDev?.portfolioLink ? (
                      <a className="inline-flex items-center gap-2 px-3 py-2 border rounded" href={selectedDev.portfolioLink} target="_blank" rel="noreferrer">
                        <Globe className="h-4 w-4" /> Portfolio
                      </a>
                    ) : null}
                    {selectedDev?.linkedin && (
                      <a className="inline-flex items-center gap-2 px-3 py-2 border rounded" href={selectedDev.linkedin} target="_blank" rel="noreferrer">
                        <MessageSquare className="h-4 w-4" /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>

                {selectedDev?.bankName && (
                  <div>
                    <div className="text-xs text-gray-500">Bank</div>
                    <div className="font-medium">{selectedDev.bankName} — {selectedDev.accountNumber || "N/A"}</div>
                  </div>
                )}
              </div>

              {/* Middle: Skills & summary */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <div className="text-xs text-gray-500">Skills</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skillsFrom(selectedDev).length > 0 ? (
                      skillsFrom(selectedDev).map((s, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-800">{s}</span>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">No skills listed</div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Summary / Bio / Scope</div>
                  <div className="mt-2 text-sm text-gray-800">
                    {selectedDev?.bio ||
                      selectedDev?.summary ||
                      selectedDev?.about ||
                      selectedDev?.scopeOfWork ||
                      selectedDev?.experienceSummary ||
                      "No summary provided."}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Work history / Projects</div>
                  <div className="mt-2">
                    {Array.isArray(selectedDev?.projectsList) && selectedDev.projectsList.length > 0 ? (
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {selectedDev.projectsList.map((p, idx) => (
                          <li key={idx}>{p.title || p.name || p}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500">No projects listed (or only a projects count available).</div>
                    )}
                  </div>
                </div>

                {selectedDev?.cvUrl && (
                  <div>
                    <div className="text-xs text-gray-500">CV / Resume</div>
                    <a className="inline-block mt-2 px-3 py-2 bg-gray-100 rounded" href={selectedDev.cvUrl} target="_blank" rel="noreferrer">
                      View CV
                    </a>
                  </div>
                )}

                {selectedDev?.signature && (
                  <div>
                    <div className="text-xs text-gray-500">Signature / Upload</div>
                    <img src={selectedDev.signature} alt="signature" className="mt-2 max-h-40 object-contain border rounded" />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
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

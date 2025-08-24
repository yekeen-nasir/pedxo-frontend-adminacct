// 4. Assignment Page - Fixed
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listContracts, listDevelopers, assignDeveloper } from "../../utility/adminApi.js";
import { Button } from "../../ui/Button";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function AssignmentPage() {
  const [pendingContracts, setPendingContracts] = useState([]);
  const [availableDevelopers, setAvailableDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contractsData, developersData] = await Promise.all([
        listContracts(),
        listDevelopers()
      ]);

      // Filter contracts that don't have assigned talent
      const pending = contractsData.filter(contract => 
        !contract.assignedTalent && !contract.talentId && !contract.developerId
      );
      
      // For now, show all developers as available
      // In production, you'd filter based on availability status
      const available = developersData;

      setPendingContracts(Array.isArray(pending) ? pending : []);
      setAvailableDevelopers(Array.isArray(available) ? available : []);
    } catch (err) {
      console.error("Error loading assignment data:", err);
      setPendingContracts([]);
      setAvailableDevelopers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignment = async (developerId, contractId) => {
    setAssigning(true);
    setMessage({ type: "", text: "" });

    try {
      // Note: Backend expects talentIds (array) and hierId
      const result = await assignDeveloper([developerId], contractId);
      
      if (result.ok) {
        setMessage({ 
          type: "success", 
          text: "Developer successfully assigned to contract!" 
        });
        // Reload data to reflect changes
        await loadData();
      } else {
        setMessage({ 
          type: "error", 
          text: result.error || "Failed to assign developer" 
        });
      }
    } catch (err) {
      console.error("Assignment error:", err);
      setMessage({ 
        type: "error", 
        text: "An error occurred during assignment" 
      });
    } finally {
      setAssigning(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Assignment Manager">
        <div className="p-6 text-center">Loading assignment data...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Assignment Manager">
      {/* Status Message */}
      {message.text && (
        <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
          message.type === "success" 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {message.type === "success" ? 
            <CheckCircle className="h-5 w-5" /> : 
            <AlertCircle className="h-5 w-5" />
          }
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Contracts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-black mb-4">
            Pending Contracts ({pendingContracts.length})
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {pendingContracts.length > 0 ? (
              pendingContracts.map((contract, index) => (
                <div 
                  key={contract._id || index} 
                  className="p-4 border border-gray-200 rounded-lg"
                  data-contract-id={contract._id}
                >
                  <h4 className="font-medium text-black">
                    {contract.YourTitle || "Development Project"}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Client: {contract.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Budget: ${Number(contract.minimumToPayToTalent || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Type: {contract.wantTalentAs || "Not specified"} • 
                    Payment: {contract.paymentPattern || "Not specified"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Start: {contract.workStartDate || "Flexible"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No pending contracts.</p>
            )}
          </div>
        </div>

        {/* Available Developers */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-black mb-4">
            Available Developers ({availableDevelopers.length})
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {availableDevelopers.length > 0 ? (
              availableDevelopers.map((dev, index) => (
                <div 
                  key={dev._id || index} 
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h4 className="font-medium text-black">
                    {dev.firstName} {dev.lastName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {dev.roleTitle || "Developer"} • {dev.experienceLevel || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Location: {dev.city}, {dev.state}, {dev.country}
                  </p>
                  
                  {/* Assignment Actions */}
                  {pendingContracts.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Assign to:</p>
                      <div className="flex flex-wrap gap-2">
                        {pendingContracts.slice(0, 3).map((contract, cIndex) => (
                          <Button
                            key={contract._id || cIndex}
                            onClick={() => handleAssignment(dev._id, contract._id)}
                            disabled={assigning}
                            className="text-xs px-3 py-1"
                          >
                            {contract.YourTitle 
                              ? (contract.YourTitle.length > 20 
                                  ? contract.YourTitle.substring(0, 20) + "..." 
                                  : contract.YourTitle)
                              : `Contract ${cIndex + 1}`
                            }
                          </Button>
                        ))}
                        {pendingContracts.length > 3 && (
                          <span className="text-xs text-gray-500 self-center">
                            +{pendingContracts.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No available developers.</p>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-black">{pendingContracts.length}</p>
            <p className="text-sm text-gray-600">Pending Contracts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-black">{availableDevelopers.length}</p>
            <p className="text-sm text-gray-600">Available Developers</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
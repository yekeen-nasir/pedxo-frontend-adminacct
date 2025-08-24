// 2. Contracts Page - Fixed
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/common/AdminLayout";
import { listContracts } from "../../utility/adminApi.js";
import { Search, Filter, Eye, Edit, MoreVertical } from "lucide-react";

export default function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const data = await listContracts();
      setContracts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading contracts:", err);
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter contracts based on search
  const filteredContracts = contracts.filter(contract => {
    const search = searchQuery.toLowerCase();
    return (
      contract.name?.toLowerCase().includes(search) ||
      contract.email?.toLowerCase().includes(search) ||
      contract.YourTitle?.toLowerCase().includes(search) ||
      contract.whereYouLive?.toLowerCase().includes(search)
    );
  });

  const getStatusBadge = (contract) => {
    // Determine status based on whether talent is assigned
    const status = contract.assignedTalent ? "assigned" : "pending";
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      assigned: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`;
  };

  const formatPaymentPattern = (pattern) => {
    if (!pattern) return "Not specified";
    // Clean up the payment pattern for display
    return pattern.replace(/([A-Z])/g, ' $1').trim();
  };

  if (loading) {
    return (
      <AdminLayout title="Contract Management">
        <div className="p-6 text-center">Loading contracts...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Contract Management">
      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contracts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Dev
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContracts.length > 0 ? (
                filteredContracts.map((contract, index) => (
                  <tr key={contract._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-black">
                        {contract.YourTitle || "Development Project"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contract.workStartDate || "Start date not set"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{contract.name || "Unknown"}</div>
                      <div className="text-sm text-gray-500">{contract.email || "No email"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(contract)}>
                        {contract.assignedTalent ? "assigned" : "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-black">
                        ${Number(contract.minimumToPayToTalent || 0).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatPaymentPattern(contract.paymentPattern)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {contract.assignedTalent ? 
                          `Talent ID: ${contract.assignedTalent}` : 
                          "Unassigned"
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-md">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-md">
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-md">
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    {searchQuery ? "No contracts found matching your search." : "No contracts available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
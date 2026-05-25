import { useEffect, useState } from "react";
import { adminService } from "../../services/adminService";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending"); // 'pending', 'approved', 'rejected'

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Fetch ALL users so we can sort them into tabs
      const res = await adminService.getAllUsers();
      setUsers(res.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = async (id) => {
    await adminService.approveUser(id);
    loadUsers();
  };

  const handleReject = async (id) => {
    await adminService.rejectUser(id);
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This will permanently delete the user from MongoDB and Keycloak.")) {
      await adminService.deleteUser(id);
      loadUsers();
    }
  };

  // Filter users based on the currently selected tab
  const filteredUsers = users.filter((user) => user.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage network members and permissions.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 text-sm font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab === "approved" ? "Verified" : tab} ({users.filter((u) => u.status === tab).length})
          </button>
        ))}
      </div>

      {/* User Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Role</th>
              <th className="p-4 font-semibold text-gray-700">Batch/Company</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">Loading users...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">No users found in this list.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {user.batch} {user.company ? `• ${user.company}` : ""}
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    {activeTab === "pending" && (
                      <>
                        <button onClick={() => handleApprove(user._id)} className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-md text-xs font-semibold">
                          Approve
                        </button>
                        <button onClick={() => handleReject(user._id)} className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1.5 rounded-md text-xs font-semibold">
                          Reject
                        </button>
                      </>
                    )}
                    
                    {/* The Nuclear Delete Button (Available on all tabs) */}
                    <button 
                      onClick={() => handleDelete(user._id)} 
                      className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-md text-xs font-semibold ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
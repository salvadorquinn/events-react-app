import { useState } from "react";
import { Search, Filter, ChevronUp, ChevronDown, X, User, ChevronRight, AlertCircle } from "lucide-react";
import { ROLE_PERMISSIONS } from "../../constants";
import { User as UserType } from "../../types";
// import { cn } from "../../lib/utils"; // Removed this line

type UserManagementModalProps = {
  users: UserType[];
  currentUser: UserType;
  onClose: () => void;
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
  onDeleteUser: (userId: string) => void;
  onResetPassword: (email: string) => void;
  onViewDetails: (user: UserType) => void;
  usersLoading: boolean;
};

export default function UserManagementModal({
  users,
  currentUser,
  onClose,
  onUpdateRole,
  onDeleteUser,
  onResetPassword,
  onViewDetails,
  usersLoading,
}: UserManagementModalProps) {
  const [userSearch, setUserSearch] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [userSort, setUserSort] = useState<{ field: string; direction: "asc" | "desc" }>({ field: "email", direction: "asc" });
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<{ userId: string; email: string } | null>(null);


  // Brand colors
  const colors = {
    primary: "#9b1f62",       // Primary brand color
    secondary: "#682161",     // Secondary color
    tertiary: "#3e3764",      // Tertiary color
    background: "#283043",    // Background color
    lightPrimary: "rgba(155,31,98,0.12)" // Light primary for backgrounds
  };

  const handleSortUsers = (field: string) => {
    setUserSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredUsers = users
    .filter(user => {
      const searchMatch = userSearch === "" ||
        user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        (user.name && user.name.toLowerCase().includes(userSearch.toLowerCase()));
      const roleMatch = selectedUserRole === "" || user.role === selectedUserRole;
      return searchMatch && roleMatch;
    })
    .sort((a, b) => {
      const field = userSort.field;
      const direction = userSort.direction === "asc" ? 1 : -1;
      if (field === "name") return direction * (a.name || "").localeCompare(b.name || "");
      if (field === "email") return direction * a.email.localeCompare(b.email);
      if (field === "role") return direction * (a.role || "").localeCompare(b.role || "");
      return 0;
    });

  const confirmDeleteUser = (userId: string, email: string) => {
    setShowDeleteConfirmation({ userId, email });
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirmation(null);
  };


  const handleDelete = async (userId: string) => {
    if (currentUser.id === userId) {
      const userRole = users.find((u) => u.id === userId)?.role;
      if (userRole !== 'super-admin') {
        alert("Only super-admin can delete admins!");
        return;
      }
    }
    await onDeleteUser(userId);
    setShowDeleteConfirmation(null); // Close confirmation after deletion
  };

  // Replaced cn with a simple conditional class assignment.
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-5xl relative animate-fadeIn shadow-xl overflow-hidden">
        {/* Header with gradient background */}
        <div
          className="flex justify-between items-center px-6 py-4"
          style={{ background: `linear-gradient(120deg, ${colors.primary}, ${colors.tertiary})` }}
        >
          <h2 className="text-xl font-medium text-white flex items-center">
            <User size={20} className="mr-2" />
            User Management
          </h2>
          <button
            className="text-white hover:text-gray-100 rounded-full p-1 transition-colors hover:bg-white hover:bg-opacity-20"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search and filters */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center bg-white rounded-md px-4 py-2 shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-opacity-40">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users by name or email"
                className="w-full outline-none bg-transparent text-gray-800"
              />
              {userSearch && (
                <button
                  onClick={() => setUserSearch("")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="relative min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
              <select
                value={selectedUserRole}
                onChange={(e) => setSelectedUserRole(e.target.value)}
                className="appearance-none bg-white rounded-md pl-10 pr-8 py-2 w-full shadow-sm border border-gray-200 outline-none focus:ring-2 focus:ring-opacity-40 text-gray-800"
              >
                <option value="">All roles</option>
                {Object.entries(ROLE_PERMISSIONS).map(([roleKey, roleData]) => (
                  <option key={roleKey} value={roleKey}>{roleData.label}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table container */}
        <div className="p-6">
          <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
            {usersLoading ? (
              <div className="flex items-center justify-center h-64 bg-white">
                <div className="text-center text-gray-500">
                  <div className="w-8 h-8 mx-auto mb-3 border-2 border-t-primary rounded-full animate-spin" style={{ borderTopColor: colors.primary }}></div>
                  <p>Loading users...</p>
                </div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex items-center justify-center h-64 bg-white">
                <div className="text-center text-gray-500">
                  <AlertCircle size={28} className="mx-auto mb-2" />
                  <p>No users found</p>
                  {userSearch && <p className="text-sm mt-1">Try a different search term</p>}
                </div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="text-left py-3 px-4 font-medium text-xs text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortUsers("name")}
                    >
                      <div className="flex items-center">
                        Name
                        {userSort.field === "name" && (
                          <span className="ml-1 text-gray-500">
                            {userSort.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="text-left py-3 px-4 font-medium text-xs text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortUsers("email")}
                    >
                      <div className="flex items-center">
                        Email
                        {userSort.field === "email" && (
                          <span className="ml-1 text-gray-500">
                            {userSort.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="text-left py-3 px-4 font-medium text-xs text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortUsers("role")}
                    >
                      <div className="flex items-center">
                        Role
                        {userSort.field === "role" && (
                          <span className="ml-1 text-gray-500">
                            {userSort.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-xs text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => {
                    const roleData = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS];
                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{user.name || 'N/A'}</div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                        <td className="py-3 px-4">
                          {roleData && (
                            <span
                              className={`inline-block px-2 py-1 text-xs font-medium text-white rounded-full ${roleData.color}`}
                            >
                              {roleData.label}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => onViewDetails(user)}
                              className="text-white text-xs font-medium rounded-md px-3 py-1.5 flex items-center transition-colors"
                              style={{ backgroundColor: colors.tertiary }}
                            >
                              Details
                              <ChevronRight size={14} className="ml-1" />
                            </button>
                            {updatingRole === user.id ? (
                              <span className="px-3 py-1.5 text-xs text-gray-500 bg-gray-100 rounded-md">Updating...</span>
                            ) : (
                              <select
                                value={user.role}
                                onChange={async (e) => {
                                  setUpdatingRole(user.id);
                                  await onUpdateRole(user.id, e.target.value);
                                  setUpdatingRole(null);
                                }}
                                className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-700 bg-white"
                                disabled={currentUser.id === user.id}
                              >
                                {Object.entries(ROLE_PERMISSIONS).map(([roleKey, roleData]) => (
                                  <option key={roleKey} value={roleKey}>{roleData.label}</option>
                                ))}
                              </select>
                            )}
                            <button
                              onClick={() => onResetPassword(user.email)}
                              className="text-white text-xs font-medium rounded-md px-3 py-1.5 transition-colors"
                              style={{ backgroundColor: colors.secondary }}
                            >
                              Reset
                            </button>
                            <button
                              onClick={() => confirmDeleteUser(user.id, user.email)}
                              className={
                                  (currentUser.id === user.id && user.role !== 'super-admin')
                                  ? "text-white text-xs font-medium rounded-md px-3 py-1.5 transition-colors bg-red-500 hover:bg-red-600 opacity-50 cursor-not-allowed"
                                  : "text-white text-xs font-medium rounded-md px-3 py-1.5 transition-colors bg-red-500 hover:bg-red-600"
                              }
                              disabled={currentUser.id === user.id && user.role !== 'super-admin'}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer statistics */}
          {!usersLoading && (
            <div className="mt-6 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </span>
              <div
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: colors.lightPrimary, color: colors.primary }}
              >
                Total users: {users.length}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete user: <span className="font-medium">{showDeleteConfirmation.email}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDeleteUser}
                className="bg-gray-200 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirmation.userId)}
                className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


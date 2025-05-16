import { useState } from "react";
import { Search, Filter, ChevronUp, ChevronDown, X } from "lucide-react";
import { ROLE_PERMISSIONS } from "../../constants";
import { User } from "../../types";

type UserManagementModalProps = {
  users: User[];
  currentUser: User;
  onClose: () => void;
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
  onDeleteUser: (userId: string) => void;
  onResetPassword: (email: string) => void;
  onViewDetails: (user: User) => void;
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

  const handleSortUsers = (field: string) => {
    setUserSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredUsers = users
    .filter(user => {
      const searchMatch = userSearch === "" || 
        user.email.toLowerCase().includes(userSearch.toLowerCase());
      const roleMatch = selectedUserRole === "" || user.role === selectedUserRole;
      return searchMatch && roleMatch;
    })
    .sort((a, b) => {
      const field = userSort.field;
      const direction = userSort.direction === "asc" ? 1 : -1;
      if (field === "name") return direction * (a.name || "").localeCompare(b.name || "");
      if (field === "email") return direction * a.email.localeCompare(b.email);
      if (field === "role") return direction * (a.role || "").localeCompare(b.role || "");
      if (field === "created_at") return direction * ((a.created_at || "").localeCompare(b.created_at || ""));
      return 0;
    });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-5xl relative animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">User Management</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1 flex items-center border border-gray-300 rounded px-3 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search users by email"
              className="w-full outline-none"
            />
          </div>
          <div className="relative">
            <select
              value={selectedUserRole}
              onChange={(e) => setSelectedUserRole(e.target.value)}
              className="appearance-none border border-gray-300 rounded px-3 py-2 pr-8 bg-white"
            >
              <option value="">All roles</option>
              {Object.entries(ROLE_PERMISSIONS).map(([roleKey, roleData]) => (
                <option key={roleKey} value={roleKey}>{roleData.label}</option>
              ))}
            </select>
            <Filter size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          {usersLoading ? (
            <p className="text-center text-gray-500">Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500">No users found</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 border-b border-gray-200 font-semibold cursor-pointer" onClick={() => handleSortUsers("name")}>
                    <div className="flex items-center">
                      Name
                      {userSort.field === "name" && (userSort.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 font-semibold cursor-pointer" onClick={() => handleSortUsers("email")}>
                    <div className="flex items-center">
                      Email
                      {userSort.field === "email" && (userSort.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 font-semibold cursor-pointer" onClick={() => handleSortUsers("role")}>
                    <div className="flex items-center">
                      Role
                      {userSort.field === "role" && (userSort.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 font-semibold cursor-pointer" onClick={() => handleSortUsers("created_at")}>
                    <div className="flex items-center">
                      Created
                      {userSort.field === "created_at" && (userSort.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 border-b border-gray-200 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b border-gray-200">{user.name || 'N/A'}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{user.email}</td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <span className={`inline-block px-2 py-1 text-xs text-white rounded ${ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS]?.color || "bg-gray-500"}`}>
                        {ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS]?.label || user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => onViewDetails(user)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        >
                          Details
                        </button>
                        {updatingRole === user.id ? (
                          <span className="px-2 py-1 text-xs">Updating...</span>
                        ) : (
                          <select
                            value={user.role}
                            onChange={async (e) => {
                              setUpdatingRole(user.id);
                              await onUpdateRole(user.id, e.target.value);
                              setUpdatingRole(null);
                            }}
                            className="text-xs border border-gray-300 rounded px-1"
                            disabled={currentUser.id === user.id}
                          >
                            {Object.entries(ROLE_PERMISSIONS).map(([roleKey, roleData]) => (
                              <option key={roleKey} value={roleKey}>{roleData.label}</option>
                            ))}
                          </select>
                        )}
                        <button
                          onClick={() => onResetPassword(user.email)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
                        >
                          Reset
                        </button>
                        {currentUser.id !== user.id && (
                          <button
                            onClick={() => onDeleteUser(user.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!usersLoading && (
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}
      </div>
    </div>
  );
}
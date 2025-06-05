import { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  X,
  User,
  Key,
  Trash2,
  UserCog,
  AlertTriangle,
  Users,
  UserPlus,
  UserMinus,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import { ROLE_PERMISSIONS } from "../../constants";
import { User as UserType, Role } from "../../types";
import { logger } from '../../utils/logger';

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
  const [userSort] = useState({ field: "email", direction: "asc" as "asc" | "desc" });
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<{ userId: string; email: string } | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const actionMenuRef = useRef<HTMLDivElement>(null);
  const isSuperAdmin = currentUser.role === "super-admin";

  const getRoleInitials = (role: string) => role.split("-").map(part => part[0].toUpperCase()).join("");
  const getTextColor = () => "text-white";
  const getRoleColor = (role: string) => {
    const data = ROLE_PERMISSIONS[role as Role];
    if (!data) return "#6b7280";
    const map: Record<string, string> = {
      "bg-purple-600": "#8b5cf6",
      "bg-red-500": "#ef4444",
      "bg-yellow-500": "#eab308",
      "bg-blue-500": "#3b82f6",
      "bg-green-500": "#22c55e",
    };
    return map[data.color] || "#6b7280";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuOpen && actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActionMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [actionMenuOpen]);

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
      const dir = userSort.direction === "asc" ? 1 : -1;
      return dir * (a[field as keyof UserType] ?? '').toString().localeCompare((b[field as keyof UserType] ?? '').toString());
    });

  const handleDeleteUser = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (!isSuperAdmin && user.role === "admin") {
      return;
    }

    if (user.id === currentUser.id) {
      return;
    }

    // Show confirmation modal before deleting
    setShowDeleteConfirmation({ userId: user.id, email: user.email });
  };

  const confirmDeleteUser = async () => {
    if (!showDeleteConfirmation) return;

    try {
      onDeleteUser(showDeleteConfirmation.userId);
      setShowDeleteConfirmation(null);
    } catch (error) {
      logger.error('Error deleting user:', error);
    }
  };

  const canDeleteUser = (user: UserType) => {
    // Cannot delete your own account
    if (user.id === currentUser.id) return false;

    // If target user is a super-admin
    if (user.role === "super-admin") {
      // Only super-admins can delete super-admins
      if (currentUser.role !== "super-admin") return false;
      // Check if the super-admin can be modified
      if (!ROLE_PERMISSIONS[user.role].canBeModified) return false;
    }

    // If target user is an admin
    if (user.role === "admin" && currentUser.role !== "super-admin") return false;

    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur overflow-y-auto">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden my-2 sm:my-0 flex flex-col max-h-[98vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#9b1f62] to-[#3e3764] flex-shrink-0">
          <h2 className="text-white text-base sm:text-lg font-semibold">User Management</h2>
          <button onClick={onClose} className="text-white hover:opacity-80 transition-opacity p-1">
            <X size={18} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 sm:p-4 border-b flex-shrink-0">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-10 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#9b1f62] focus:border-[#9b1f62] transition-all text-gray-900 bg-white"
            />
            {userSearch && (
              <button 
                onClick={() => setUserSearch("")} 
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="relative w-full sm:w-48">
            <Filter size={16} className="absolute left-3 top-2.5 text-gray-400 z-10" />
            <select
              value={selectedUserRole}
              onChange={(e) => setSelectedUserRole(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#9b1f62] focus:border-[#9b1f62] appearance-none bg-white transition-all text-gray-900"
            >
              <option value="" className="text-gray-900">All roles</option>
              {Object.entries(ROLE_PERMISSIONS).map(([key, role]) => (
                <option key={key} value={key} className="text-gray-900">{role.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto min-h-0">
          <div className="hidden sm:block"> {/* Desktop Table */}
            <table className="min-w-full table-fixed text-sm">
              <thead className="text-left text-gray-600 bg-gray-50 sticky top-0">
                <tr>
                  <th className="py-3 px-6 font-medium w-1/2">User</th>
                  <th className="py-3 px-6 font-medium w-1/3">Email</th>
                  <th className="py-3 px-6 font-medium text-center w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-100">
                {usersLoading ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const roleData = ROLE_PERMISSIONS[user.role as Role];
                    const roleColor = getRoleColor(user.role);
                    const isCurrentUser = user.id === currentUser.id;

                    return (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 w-1/2">
                          <div className="flex items-center gap-3">
                            <div className="relative group flex-shrink-0">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm" 
                                style={{ backgroundColor: roleColor }}
                              >
                                {getRoleInitials(user.role)}
                              </div>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                {roleData?.label}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-gray-900 flex items-center gap-2">
                                <span className="truncate">{user.name || "—"}</span>
                                {isCurrentUser && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 truncate">{roleData?.label}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 w-1/3">
                          <div className="text-gray-900 truncate" title={user.email}>{user.email}</div>
                        </td>
                        <td className="py-4 px-6 w-1/6">
                          <div className="flex items-center justify-center gap-1">
                            {/* View Details */}
                            <button 
                              onClick={() => onViewDetails(user)} 
                              className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all flex-shrink-0"
                              title="View details"
                            >
                              <User size={16} />
                            </button>

                            {/* Reset Password */}
                            <button 
                              onClick={() => onResetPassword(user.email)} 
                              className="p-2 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-all flex-shrink-0"
                              title="Reset password"
                            >
                              <Key size={16} />
                            </button>

                            {/* Role Management (Super Admin Only) */}
                            {isSuperAdmin && !isCurrentUser && (
                              <div className="relative flex-shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActionMenuOpen(actionMenuOpen === user.id ? null : user.id);
                                  }}
                                  className="p-2 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all"
                                  title="Change role"
                                  disabled={updatingRole === user.id}
                                >
                                  {updatingRole === user.id ? (
                                    <div className="animate-spin w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                                  ) : (
                                    <UserCog size={16} />
                                  )}
                                </button>
                                {actionMenuOpen === user.id && (
                                  <div 
                                    ref={actionMenuRef} 
                                    className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1"
                                  >
                                    <div className="px-3 py-2 text-xs text-gray-500 font-medium border-b">
                                      Change Role
                                    </div>
                                    {Object.entries(ROLE_PERMISSIONS).map(([key, role]) => (
                                      <button
                                        key={key}
                                        onClick={async () => {
                                          if (user.role !== key) {
                                            setUpdatingRole(user.id);
                                            try {
                                              await onUpdateRole(user.id, key);
                                            } catch (error) {
                                              logger.error('Error updating role:', error);
                                              alert("Failed to update role. Please try again.");
                                            } finally {
                                              setUpdatingRole(null);
                                            }
                                          }
                                          setActionMenuOpen(null);
                                        }}
                                        className={`flex items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors text-gray-900 ${
                                          user.role === key ? "bg-gray-100 font-medium" : ""
                                        }`}
                                      >
                                        <span 
                                          className="inline-block w-2 h-2 rounded-full mr-3" 
                                          style={{ backgroundColor: getRoleColor(key) }}
                                        ></span>
                                        {role.label}
                                        {user.role === key && (
                                          <span className="ml-auto text-xs text-gray-500">Current</span>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Delete User */}
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={!canDeleteUser(user)}
                              className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                                canDeleteUser(user)
                                  ? "hover:bg-red-50 hover:text-red-600 text-gray-400"
                                  : "opacity-40 cursor-not-allowed text-gray-300"
                              }`}
                              title={
                                !canDeleteUser(user)
                                  ? isCurrentUser
                                    ? "Cannot delete your own account"
                                    : "Only super-admins can delete admins"
                                  : "Delete user"
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile List View */}
          <div className="block sm:hidden">
            {usersLoading ? (
              <div className="py-8 text-center text-gray-500">
                Loading users...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No users found
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredUsers.map((user) => {
                  const roleData = ROLE_PERMISSIONS[user.role as Role];
                  const roleColor = getRoleColor(user.role);
                  const isCurrentUser = user.id === currentUser.id;

                  return (
                    <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="relative group flex-shrink-0">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm" 
                            style={{ backgroundColor: roleColor }}
                          >
                            {getRoleInitials(user.role)}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 flex items-center gap-2 mb-0.5">
                            <span className="truncate">{user.name || "—"}</span>
                            {isCurrentUser && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 truncate mb-1">{user.email}</div>
                          <div className="text-xs text-gray-500">{roleData?.label}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 border-t pt-3">
                        {/* View Details */}
                        <button 
                          onClick={() => onViewDetails(user)} 
                          className="flex items-center justify-center gap-2 px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all text-sm text-gray-600 border border-gray-200"
                        >
                          <User size={16} />
                          <span>View Details</span>
                        </button>

                        {/* Reset Password */}
                        <button 
                          onClick={() => onResetPassword(user.email)} 
                          className="flex items-center justify-center gap-2 px-3 py-2 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-all text-sm text-gray-600 border border-gray-200"
                        >
                          <Key size={16} />
                          <span>Reset Password</span>
                        </button>

                        {/* Role Management (Super Admin Only) */}
                        {isSuperAdmin && !isCurrentUser && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionMenuOpen(actionMenuOpen === user.id ? null : user.id);
                            }}
                            className="flex items-center justify-center gap-2 px-3 py-2 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all text-sm text-gray-600 border border-gray-200"
                            disabled={updatingRole === user.id}
                          >
                            {updatingRole === user.id ? (
                              <div className="animate-spin w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                            ) : (
                              <>
                                <UserCog size={16} />
                                <span>Change Role</span>
                              </>
                            )}
                          </button>
                        )}

                        {/* Delete User */}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={!canDeleteUser(user)}
                          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all text-sm border ${
                            canDeleteUser(user)
                              ? "hover:bg-red-50 hover:text-red-600 text-gray-600 border-gray-200"
                              : "opacity-40 cursor-not-allowed text-gray-400 border-gray-100 bg-gray-50"
                          }`}
                          title={
                            !canDeleteUser(user)
                              ? isCurrentUser
                                ? "Cannot delete your own account"
                                : "Only super-admins can delete admins"
                              : "Delete user"
                          }
                        >
                          <Trash2 size={16} />
                          <span>Delete User</span>
                        </button>
                      </div>

                      {/* Role Menu Popup */}
                      {actionMenuOpen === user.id && (
                        <div 
                          ref={actionMenuRef} 
                          className="fixed inset-x-4 bottom-4 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 max-w-sm mx-auto"
                        >
                          <div className="px-3 py-2 text-xs text-gray-500 font-medium border-b flex items-center justify-between">
                            <span>Change Role</span>
                            <button 
                              onClick={() => setActionMenuOpen(null)}
                              className="p-1 hover:bg-gray-100 rounded-full"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          {Object.entries(ROLE_PERMISSIONS).map(([key, role]) => (
                            <button
                              key={key}
                              onClick={async () => {
                                if (user.role !== key) {
                                  setUpdatingRole(user.id);
                                  try {
                                    await onUpdateRole(user.id, key);
                                  } catch (error) {
                                    logger.error('Error updating role:', error);
                                    alert("Failed to update role. Please try again.");
                                  } finally {
                                    setUpdatingRole(null);
                                  }
                                }
                                setActionMenuOpen(null);
                              }}
                              className={`flex items-center w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 transition-colors text-gray-900 ${
                                user.role === key ? "bg-gray-100 font-medium" : ""
                              }`}
                            >
                              <span 
                                className="inline-block w-2 h-2 rounded-full mr-3" 
                                style={{ backgroundColor: getRoleColor(key) }}
                              ></span>
                              {role.label}
                              {user.role === key && (
                                <span className="ml-auto text-xs text-gray-500">Current</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {!usersLoading && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-xs sm:text-sm text-gray-600 flex-shrink-0">
            <span>
              {filteredUsers.length === users.length 
                ? `Showing all ${users.length} users` 
                : `Showing ${filteredUsers.length} of ${users.length} users`
              }
            </span>
            <div className="bg-[#9b1f62]/10 text-[#9b1f62] px-3 py-1 rounded-full text-xs font-medium">
              Total: {users.length}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-4 sm:p-6 m-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Delete User</h3>
                <p className="text-xs sm:text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-6">
              Are you sure you want to delete <strong>{showDeleteConfirmation.email}</strong>? 
              This will permanently remove their account and all associated data.
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirmation(null)}
                className="w-full sm:w-auto px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="w-full sm:w-auto px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
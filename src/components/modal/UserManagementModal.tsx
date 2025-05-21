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
} from "lucide-react";
import { ROLE_PERMISSIONS } from "../../constants";
import { User as UserType, Role } from "../../types";

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
  const [userSort, setUserSort] = useState({ field: "email", direction: "asc" as "asc" | "desc" });
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

  const handleDelete = async (userId: string) => {
    if (!isSuperAdmin && users.find(u => u.id === userId)?.role === "admin") {
      alert("Only super-admins can delete admins!");
      return;
    }
    await onDeleteUser(userId);
    setShowDeleteConfirmation(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#9b1f62] to-[#3e3764]">
          <h2 className="text-white text-lg font-semibold">User Management</h2>
          <button onClick={onClose} className="text-white hover:opacity-80"><X size={18} /></button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 px-6 py-4 border-b">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-md focus:ring-1 focus:ring-[#9b1f62]"
            />
            {userSearch && (
              <button onClick={() => setUserSearch("")} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="relative w-full md:w-60">
            <Filter size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <select
              value={selectedUserRole}
              onChange={(e) => setSelectedUserRole(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-sm border rounded-md focus:ring-1 focus:ring-[#9b1f62]"
            >
              <option value="">All roles</option>
              {Object.entries(ROLE_PERMISSIONS).map(([key, role]) => (
                <option key={key} value={key}>{role.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <div className="px-6 pb-6 overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2 px-4 w-1/3">User</th>
                <th className="py-2 px-4 w-1/3">Email</th>
                <th className="py-2 px-4 w-1/3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredUsers.map((user) => {
                const roleData = ROLE_PERMISSIONS[user.role as Role];
                const roleColor = getRoleColor(user.role);

                return (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="relative group">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ backgroundColor: roleColor }}>
                          {getRoleInitials(user.role)}
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs bg-black text-white rounded shadow-md hidden group-hover:block whitespace-nowrap">
                          {roleData.label}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{user.name || "—"}</div>
                        <div className="text-xs text-gray-500">{roleData.label}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 text-right flex justify-end gap-2">
                      <button onClick={() => onViewDetails(user)} className="p-1.5 hover:bg-gray-100 rounded"><User size={16} /></button>
                      <button onClick={() => onResetPassword(user.email)} className="p-1.5 hover:bg-gray-100 rounded"><Key size={16} /></button>
                      {isSuperAdmin && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionMenuOpen(actionMenuOpen === user.id ? null : user.id);
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded"
                          >
                            <UserCog size={16} />
                          </button>
                          {actionMenuOpen === user.id && (
                            <div ref={actionMenuRef} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                              {Object.entries(ROLE_PERMISSIONS).map(([key, role]) => (
                                <button
                                  key={key}
                                  onClick={async () => {
                                    if (user.role !== key) {
                                      setUpdatingRole(user.id);
                                      await onUpdateRole(user.id, key);
                                      setUpdatingRole(null);
                                    }
                                    setActionMenuOpen(null);
                                  }}
                                  disabled={currentUser.id === user.id}
                                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${user.role === key ? "bg-gray-100 font-semibold" : ""} ${currentUser.id === user.id ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                  <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: getRoleColor(key) }}></span>
                                  {role.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      <button
                        onClick={() => {
                          if (!isSuperAdmin && user.role === "admin") return;
                          setShowDeleteConfirmation({ userId: user.id, email: user.email });
                        }}
                        disabled={!isSuperAdmin && user.role === "admin"}
                        className={`p-1.5 hover:bg-red-50 rounded ${!isSuperAdmin && user.role === "admin" ? "opacity-50 cursor-not-allowed" : "text-red-500"}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!usersLoading && (
          <div className="px-6 pb-4 text-sm text-gray-500 flex justify-between items-center">
            <span>{filteredUsers.length === users.length ? `Showing all ${users.length} users` : `Showing ${filteredUsers.length} of ${users.length} users`}</span>
            <div className="bg-[#9b1f62]/10 text-[#9b1f62] px-3 py-1 rounded-full text-xs font-medium">
              Total: {users.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
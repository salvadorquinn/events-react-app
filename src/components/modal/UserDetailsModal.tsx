import { X, Shield, UserCircle, Key, Trash2, AlertTriangle, Clock } from "lucide-react";
import { ROLE_PERMISSIONS } from "../../constants";
import { User } from "../../types";
import { useState } from "react";

type UserDetailsModalProps = {
  user: User;
  currentUser: User;
  onClose: () => void;
  onResetPassword: (email: string) => void;
  onDeleteUser: (userId: string) => void;
};

const formatDateTime = (dateStr?: string) => {
  if (!dateStr || isNaN(new Date(dateStr).getTime())) {
    return 'Never';
  }

  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

export default function UserDetailsModal({
  user,
  currentUser,
  onClose,
  onResetPassword,
  onDeleteUser,
}: UserDetailsModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!user || !user.email) return null;

  const canDeleteUser = () => {
    if (user.id === currentUser.id) return false;
    if (user.role === "super-admin") {
      if (currentUser.role !== "super-admin") return false;
      if (!ROLE_PERMISSIONS[user.role].canBeModified) return false;
    }
    if (user.role === "admin" && currentUser.role !== "super-admin") return false;
    return true;
  };

  const roleData = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS];
  const roleColor = roleData?.color.replace('bg-', 'text-').replace('-600', '-700');

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden animate-fadeIn my-2 sm:my-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#9b1f62] to-[#3e3764] px-4 sm:px-6 py-4 flex justify-between items-start sm:items-center">
          <div className="flex items-start sm:items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${roleData?.color} shadow-lg`}>
              <UserCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">{user.name || user.email}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${roleColor} bg-white/10`}>
                  {roleData?.label || user.role}
                </span>
                {user.id === currentUser.id && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    You
                  </span>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(85vh-8rem)] overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Full Name</span>
                    <span className="text-base font-medium text-gray-900 mt-1">
                      {user.name || 'Not provided'}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Email Address</span>
                    <span className="text-base font-medium text-gray-900 mt-1 break-all">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Role & Permissions */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Role & Permissions
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${roleData?.color} bg-opacity-10`}>
                    <Shield className={`w-4 h-4 ${roleColor}`} />
                    <span className={`text-sm font-medium ${roleColor}`}>
                      {roleData?.label || user.role}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {roleData?.description || 'User role and associated permissions'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.role && ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] && (
                    Object.entries(ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS])
                      .filter(([key]) => key.startsWith('can'))
                      .map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            value ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {value ? '✓' : '✗'}
                          </span>
                          <span className="text-sm text-gray-700">{key.replace(/^can/, '').replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Account Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Account Created</span>
                    <span className="text-base font-medium text-gray-900 mt-1">
                      {formatDateTime(user.created_at)}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Last Sign In</span>
                    <span className="text-base font-medium text-gray-900 mt-1">
                      {formatDateTime(user.last_sign_in)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t flex flex-col-reverse sm:flex-row gap-3 sm:gap-0 justify-between items-stretch sm:items-center">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={() => onResetPassword(user.email)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <Key size={16} />
              Reset Password
            </button>
            {canDeleteUser() && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
                Delete User
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-sm m-2 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-base text-gray-700 mb-6">
              Are you sure you want to delete <strong>{user.email}</strong>? 
              This will permanently remove their account and all associated data.
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteUser(user.id);
                  setShowDeleteConfirm(false);
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
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
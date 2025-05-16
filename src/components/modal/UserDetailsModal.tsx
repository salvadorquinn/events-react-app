import { X } from "lucide-react";
import { ROLE_PERMISSIONS } from "../../constants";
import { User } from "../../types";

type UserDetailsModalProps = {
  user: User;
  currentUser: User;
  onClose: () => void;
  onResetPassword: (email: string) => void;
  onDeleteUser: (userId: string) => void;
};

export default function UserDetailsModal({
  user,
  currentUser,
  onClose,
  onResetPassword,
  onDeleteUser,
}: UserDetailsModalProps) {
  console.log('UserDetailsModal props:', { user, currentUser });
  if (!user || !user.email) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md relative animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <div className="flex items-center gap-2">
              <span className={`inline-block px-2 py-1 text-xs text-white rounded ${ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS]?.color || "bg-gray-500"}`}>
                {ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS]?.label || user.role}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Permissions</p>
            <ul className="mt-1 text-sm">
              {user.role && ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] && (
                Object.entries(ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS])
                  .filter(([key]) => key.startsWith('can'))
                  .map(([key, value]) => (
                    <li key={key} className="flex items-center gap-1 py-0.5">
                      <span className={value ? "text-green-500" : "text-red-500"}>
                        {value ? "✓" : "✗"}
                      </span>
                      <span>{key.replace(/^can/, '').replace(/([A-Z])/g, ' $1').trim()}</span>
                    </li>
                  ))
              )}
            </ul>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Information</p>
            <div className="text-sm mt-1">
              <p>
                Created: {user.created_at && !isNaN(new Date(user.created_at).getTime())
                  ? new Date(user.created_at).toLocaleString()
                  : 'Unknown'}
              </p>
              <p>
                Last sign in: {user.last_sign_in && !isNaN(new Date(user.last_sign_in).getTime())
                  ? new Date(user.last_sign_in).toLocaleString()
                  : 'Never'}
              </p>
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => onResetPassword(user.email)}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 flex-1"
            >
              Reset Password
            </button>
            {currentUser.id !== user.id && (
              <button
                onClick={() => onDeleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 flex-1"
              >
                Delete User
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
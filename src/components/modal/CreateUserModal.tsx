import { useState } from "react";
import { X } from "lucide-react";
import { ROLE_PERMISSIONS } from "../../constants";

type CreateUserModalProps = {
  onClose: () => void;
  onCreate: (email: string, role: string) => Promise<void>;
};

export default function CreateUserModal({ onClose, onCreate }: CreateUserModalProps) {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("marketing");
  const [creatingUser, setCreatingUser] = useState(false);

  const handleCreate = async () => {
    if (!newUserEmail || !newUserRole) return;
    setCreatingUser(true);
    await onCreate(newUserEmail, newUserRole);
    setCreatingUser(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center transition-opacity">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md relative animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New User</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {Object.entries(ROLE_PERMISSIONS).map(([roleKey, roleData]) => (
                <option key={roleKey} value={roleKey}>{roleData.label}</option>
              ))}
            </select>
            {newUserRole && (
              <p className="mt-1 text-sm text-gray-500">
                {ROLE_PERMISSIONS[newUserRole as keyof typeof ROLE_PERMISSIONS]?.description}
              </p>
            )}
          </div>
          <button
            onClick={handleCreate}
            disabled={creatingUser || !newUserEmail}
            className={`w-full py-2 rounded transition text-white ${
              !newUserEmail || creatingUser ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {creatingUser ? "Creating..." : "Create User"}
          </button>
          <p className="text-xs text-gray-500 text-center">
            A temporary password will be generated and the user will be prompted to change it on first login.
          </p>
        </div>
      </div>
    </div>
  );
}
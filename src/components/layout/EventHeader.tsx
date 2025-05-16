import { Shield, Users2 } from "lucide-react";
import { ROLE_PERMISSIONS } from "../../constants";

type EventHeaderProps = {
  currentUser: { name?: string; email: string };
  role: string;
  onAddEvent: () => void;
  onManageUsers: () => void;
  onCreateUser: () => void;
  onLogout: () => void;
};

export default function EventHeader({
  currentUser,
  role,
  onAddEvent,
  onManageUsers,
  onCreateUser,
  onLogout,
}: EventHeaderProps) {
  const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS];
  const isAdmin = role === "admin";

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-3xl font-bold">StudyNet Events</h1>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded">
          <Shield size={16} />
          <span>{currentUser?.name || currentUser?.email}</span>
          <span className={`px-2 py-0.5 rounded text-xs ${permissions?.color || "bg-gray-500"}`}>
            {permissions?.label || role}
          </span>
        </div>
        {(isAdmin || permissions?.canCreateEvents) && (
          <button
            onClick={onAddEvent}
            className="bg-white/20 px-4 py-2 rounded hover:bg-white/30 transition"
          >
            Add Event
          </button>
        )}
        {isAdmin && (
          <>
            <button
              onClick={onManageUsers}
              className="bg-white/20 px-4 py-2 rounded flex items-center gap-2 hover:bg-white/30"
            >
              <Users2 size={18} /> Manage Users
            </button>
            <button
              onClick={onCreateUser}
              className="bg-white/20 text-white px-3 py-1 rounded hover:bg-white/30 transition"
            >
              + New User
            </button>
          </>
        )}
        <button
          onClick={onLogout}
          className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
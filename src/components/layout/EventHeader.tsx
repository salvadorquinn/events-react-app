import { User, Role } from "../../types";
import { LogOut, Plus, Users, ChevronDown } from "lucide-react";
import { useState } from "react";

type EventHeaderProps = {
  currentUser: User;
  role: Role;
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
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdminOrSuperAdmin = role === "super-admin" || role === "admin";
  
  return (
    <header className="bg-gradient-to-r from-[#9b1f62] to-[#3e3764] rounded-xl shadow-lg mb-8">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          {/* Left side - Title and user info */}
          <div className="flex items-center">
            <div className="pr-6 border-r border-white/20">
              <h1 className="text-2xl font-light text-white tracking-wide">
                Event <span className="font-bold">Dashboard</span>
              </h1>
            </div>
            <div className="ml-6">
              <div className="text-white font-medium">{currentUser.name || currentUser.email}</div>
              <div className="text-xs text-white/70 uppercase tracking-wider font-medium">{role}</div>
            </div>
          </div>
          
          {/* Right side - Actions */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            {isAdminOrSuperAdmin && (
              <div className="relative">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-2 flex items-center transition-all duration-200"
                >
                  <span className="mr-2 font-medium">Actions</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                </button>
                
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                    <button
                      onClick={() => {
                        onAddEvent();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Plus size={16} className="mr-2 text-[#9b1f62]" />
                      Add Event
                    </button>
                    <button
                      onClick={() => {
                        onManageUsers();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Users size={16} className="mr-2 text-[#9b1f62]" />
                      Manage Users
                    </button>
                    <button
                      onClick={() => {
                        onCreateUser();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center border-t border-gray-100"
                    >
                      <Plus size={16} className="mr-2 text-[#9b1f62]" />
                      New User
                    </button>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={onLogout}
              className="bg-black/20 hover:bg-black/30 text-white rounded-lg px-4 py-2 flex items-center transition-all duration-200"
            >
              <LogOut size={16} className="mr-2" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
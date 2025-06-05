import { User, Role } from "../../types";
import { LogOut, Plus, Users, UserCircle, MessageSquare } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE_PERMISSIONS } from "../../constants";

type EventHeaderProps = {
  currentUser: User;
  role: Role;
  onAddEvent: () => void;
  onManageUsers: () => void;
  onLogout: () => void;
  onUpdateProfile?: () => void;
};

export default function EventHeader({
  currentUser,
  role,
  onAddEvent,
  onManageUsers,
  onLogout,
  onUpdateProfile,
}: EventHeaderProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const isAdminOrSuperAdmin = role === "super-admin" || role === "admin";
  const navigate = useNavigate();
  const canAccessMarketing = ROLE_PERMISSIONS[role]?.canAccessMarketing;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-10 mb-8">
      {/* Main Header */}
      <header className="bg-gradient-to-r from-[#9b1f62] to-[#3e3764] rounded-2xl shadow-xl">
        <div className="relative max-w-7xl mx-auto px-6 py-4">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
          </div>

          {/* Content */}
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left side - Title and user info */}
            <div className="flex items-center gap-6">
              {/* Logo/Title */}
              <h1 className="text-2xl font-light text-white tracking-wide flex items-center gap-2">
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Event Dashboard
                </span>
              </h1>

              {/* User Info - Hidden on mobile */}
              <div className="hidden md:block pl-6 border-l border-white/10">
                <div className="text-white/90 font-medium truncate max-w-[200px]">
                  {currentUser.name || currentUser.email}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider font-medium">
                  {role}
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              {/* Action Buttons */}
              {isAdminOrSuperAdmin && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={onAddEvent}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 text-white transition-all duration-200 
                    shadow-[0_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] 
                    hover:shadow-[0_1px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] 
                    hover:translate-y-[1px] hover:bg-white/20 active:translate-y-[2px] 
                    active:shadow-[0_0_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
                  >
                    <Plus size={18} className="transition-transform duration-200" />
                    <span className="hidden sm:block font-medium">New Event</span>
                  </button>

                  <button
                    onClick={onManageUsers}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 text-white transition-all duration-200 
                    shadow-[0_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] 
                    hover:shadow-[0_1px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] 
                    hover:translate-y-[1px] hover:bg-white/20 active:translate-y-[2px] 
                    active:shadow-[0_0_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
                  >
                    <Users size={18} className="transition-transform duration-200" />
                    <span className="hidden sm:block font-medium">Users</span>
                  </button>
                </div>
              )}

              {/* Communication Button */}
              {canAccessMarketing && (
                <button
                  onClick={() => navigate("/communication/leads")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 text-white transition-all duration-200 
                  shadow-[0_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] 
                  hover:shadow-[0_1px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] 
                  hover:translate-y-[1px] hover:bg-white/20 active:translate-y-[2px] 
                  active:shadow-[0_0_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
                >
                  <MessageSquare size={18} className="transition-transform duration-200" />
                  <span className="hidden sm:block font-medium">Communication</span>
                </button>
              )}

              {/* Profile Menu */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 text-white transition-all duration-200 
                  shadow-[0_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] 
                  hover:shadow-[0_1px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] 
                  hover:translate-y-[1px] hover:bg-white/20 active:translate-y-[2px] 
                  active:shadow-[0_0_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
                >
                  <UserCircle size={20} className="transition-transform duration-200" />
                  <span className="hidden sm:block font-medium">{currentUser.name?.split(' ')[0] || 'Profile'}</span>
                </button>

                {/* Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden transform origin-top-right transition-all duration-200 z-50">
                    {/* User Info - Mobile Only */}
                    <div className="md:hidden px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {currentUser.name || currentUser.email}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {role}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {onUpdateProfile && (
                        <button
                          onClick={() => {
                            onUpdateProfile();
                            setProfileMenuOpen(false);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors relative hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.05)] active:bg-gray-100"
                        >
                          <UserCircle size={16} />
                          <span className="font-medium">Update Profile</span>
                        </button>
                      )}
                      <button
                        onClick={onLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors relative hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.05)] active:bg-red-100"
                      >
                        <LogOut size={16} />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
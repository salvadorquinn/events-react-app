import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Mail, FileText, PenTool, Menu, X, ArrowLeft } from 'lucide-react';

const navItems = [
  {
    path: '/EventDashboard',
    icon: ArrowLeft,
    label: 'Dashboard'
  },
  {
    path: '/communication/leads',
    icon: Users,
    label: 'Leads'
  },
  {
    path: '/communication/templates',
    icon: Mail,
    label: 'Templates'
  },
  {
    path: '/communication/signatures',
    icon: PenTool,
    label: 'Signatures'
  },
  {
    path: '/communication/forms',
    icon: FileText,
    label: 'Forms'
  }
];

export default function CommunicationNav() {
  const [isOpen, setIsOpen] = useState(false);

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
            {/* Left side - Title */}
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-light text-white tracking-wide flex items-center gap-2">
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Communication
                </span>
              </h1>
            </div>

            {/* Right side - Navigation */}
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 text-white 
                    shadow-[0_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
                    hover:shadow-[0_1px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
                    hover:translate-y-[1px] hover:bg-white/20
                    active:translate-y-[2px]
                    active:shadow-[0_0_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
                    transition-all duration-200"
                >
                  {isOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:flex md:items-center md:space-x-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => `
                        nav-link inline-flex items-center px-4 py-2.5 rounded-full min-w-[130px]
                        ${isActive 
                          ? 'bg-white/25 text-white' 
                          : 'bg-white/15 text-white hover:bg-white/20'
                        }
                        shadow-[0_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
                        hover:shadow-[0_1px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
                        hover:translate-y-[1px]
                        active:translate-y-[2px]
                        active:shadow-[0_0_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
                        transition-all duration-200
                      `}
                    >
                      <div className="flex items-center justify-center w-full">
                        <Icon className="w-[18px] h-[18px] mr-2 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </NavLink>
                  );
                })}
              </div>

              {/* Mobile navigation */}
              {isOpen && (                <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-r from-[#9b1f62] to-[#3e3764] rounded-xl shadow-xl overflow-hidden md:hidden">
                  <div className="p-2 space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) => `
                            nav-link flex items-center gap-3 px-4 py-2.5 min-w-[130px]
                            ${isActive 
                              ? 'bg-white/25 text-white' 
                              : 'bg-white/15 text-white hover:bg-white/20'
                            }
                            shadow-[0_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
                            hover:shadow-[0_1px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
                            hover:translate-y-[1px]
                            active:translate-y-[2px]
                            active:shadow-[0_0_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
                            transition-all duration-200 rounded-full
                          `}
                        >
                          <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                          <span className="font-medium">{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
import { Outlet } from 'react-router-dom';
import CommunicationNav from './CommunicationNav';

export default function CommunicationLayout() {
  return (    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-10">
        <CommunicationNav />
        <main className="mt-8 transition-all duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 
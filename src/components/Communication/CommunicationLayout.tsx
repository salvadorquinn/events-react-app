import { Outlet } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunicationNav from './CommunicationNav';
import LoadingSpinner from '../common/LoadingSpinner';
import { sessionManager } from '../../utils/session';

export default function CommunicationLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await sessionManager.refreshSession();
        const user = sessionManager.getUser();
        
        if (!user) {
          navigate("/LoginPage");
          return;
        }
      } catch (error) {
        navigate("/LoginPage");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] text-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-10">
        <CommunicationNav />
        <main className="mt-8 transition-all duration-300 ease-in-out">
          <Suspense fallback={
            <div className="min-h-[200px] flex justify-center items-center">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
} 
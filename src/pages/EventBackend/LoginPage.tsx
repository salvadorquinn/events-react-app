import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../createClient";
import { notify } from "../../utils/notifications";
import { sessionManager } from "../../utils/session";
import { logger } from '../../utils/logger';

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resolvedEmail, setResolvedEmail] = useState<string | null>(null);
  const [step, setStep] = useState<"username" | "password">("username");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "username" && usernameRef.current) {
      usernameRef.current.focus();
    } else if (step === "password" && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [step]);

  const handleNextStep = () => {
    const email = emailOrUsername.includes("@")
      ? emailOrUsername
      : `${emailOrUsername}@studynetglobal.com`;

    setResolvedEmail(email);
    setStep("password");
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Sign in with auth
      logger.info('Attempting authentication...');
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: resolvedEmail!,
        password,
      });

      if (authError) {
        logger.error('Authentication error:', authError);
        setError("Invalid credentials. Please try again.");
        return;
      }

      if (!authData.user) {
        logger.error('No user data returned from auth');
        setError("An unexpected error occurred during login.");
        return;
      }

      logger.info('Authentication successful. User ID:', { userId: authData.user.id });

      // Step 2: Get user data
      logger.info('Fetching user data...');
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select()
        .eq('id', authData.user.id)
        .single();

      if (userError) {
        logger.error('Error fetching user data:', { error: userError });
        setError("Error fetching user data. Please try again.");
        return;
      }

      if (!userData) {
        logger.error('No user found in users table');
        setError("User not found in database. Please contact support.");
        return;
      }

      logger.info('User data fetched successfully:', { userData });

      // Step 3: Update last sign in
      logger.info('Updating last sign in timestamp...', { timestamp: new Date().toISOString() });
      
      const timestamp = new Date().toISOString();
      const { error: updateError } = await supabase
        .from('users')
        .update({ last_sign_in: timestamp })
        .eq('id', authData.user.id);

      if (updateError) {
        // Log the error but don't block login
        logger.error('Error updating last sign in:', { error });
        // Continue with login despite the error
      } else {
        logger.info('Last sign in updated successfully to:', { timestamp });
        // Update the userData object with the new timestamp
        userData.last_sign_in = timestamp;
      }

      // Step 4: Initialize session with user data
      logger.info('Initializing session...');
      await sessionManager.initSession(userData);
      
      // Step 5: Navigate to dashboard
      logger.info('Navigation to dashboard...');
      navigate("/EventDashboard");
      
      notify.success("Successfully logged in!");

    } catch (error: any) {
      logger.error('Unexpected error during login:', error);
      setError("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] flex items-center justify-center px-4 py-8">
      <div className="bg-white/10 backdrop-blur-md w-full max-w-md sm:max-w-lg rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
            Sign in with StudyNet Account
          </h2>
          <br />

          {step === "username" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNextStep();
              }}
              className="space-y-5"
            >
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="relative">
                <input
                  ref={usernameRef}
                  type="text"
                  placeholder="Email or Username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition text-sm sm:text-base"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}              <div className="flex flex-col sm:flex-row justify-between text-white text-sm gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep("username");
                    setPassword("");
                    setError(null);
                  }}
                  className="flex items-center gap-2 hover:underline w-fit"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Change email
                </button>
                <span className="text-white/80 break-words sm:text-right">
                  {resolvedEmail}
                </span>
              </div>

              <div className="relative">
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition text-sm sm:text-base"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                >
                  {loading ? (
                    <svg
                      className="w-5 h-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

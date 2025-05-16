import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../createClient";

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
      const { error } = await supabase.auth.signInWithPassword({
        email: resolvedEmail!,
        password,
      });

      if (error) {
        setError("Invalid credentials. Please try again.");
      } else {
        navigate("/EventDashboard");
      }
    } catch {
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
              )}

              <div className="flex items-center justify-between text-white text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep("username");
                    setPassword("");
                    setError(null);
                  }}
                  className="flex items-center gap-2 hover:underline"
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
                <span className="truncate max-w-[150px] opacity-80">
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
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
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

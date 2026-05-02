import { Mail, LogIn, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginWithGmail, loginAdmin, UserRole } from "@/lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginMode, setLoginMode] = useState<"student" | "admin">("student");

  const handleGmailLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // In production, integrate with Firebase Google OAuth
      // For now, we'll use a mock implementation
      const user = await loginWithGmail("student@gmail.com", "Student User", "https://via.placeholder.com/150");

      setSuccess(`Logged in as ${user.email}`);
      setTimeout(() => {
        navigate(user.role === UserRole.ADMIN ? "/admin-resources" : "/dashboard");
      }, 800);
    } catch (err) {
      setError("Gmail login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!adminEmail || !adminPassword) {
        setError("Please enter both email and password");
        setLoading(false);
        return;
      }

      const user = loginAdmin(adminEmail, adminPassword);

      if (!user) {
        setError("Invalid admin credentials. Please check your email and password.");
        setLoading(false);
        return;
      }

      setSuccess(`Admin access granted for ${user.email}`);
      setTimeout(() => {
        navigate("/admin-resources");
      }, 800);
    } catch (err) {
      setError("Admin login failed. Please try again.");
      console.error("Admin login error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F096448223b0e406a8a0785e611ecead3%2F5f40d12f388f4d9db63be26e6876548a?format=webp&width=200"
              alt="SDC Logo"
              className="w-20 h-20 rounded-full"
            />
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setLoginMode("student")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              loginMode === "student"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                : "glass text-gray-900 hover:bg-white/50"
            }`}
          >
            Student Login
          </button>
          <button
            onClick={() => setLoginMode("admin")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              loginMode === "admin"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                : "glass text-gray-900 hover:bg-white/50"
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 md:p-10 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {loginMode === "student" ? "Welcome to SDC" : "Admin Access"}
          </h1>
          <p className="text-muted-foreground text-center mb-8 text-sm">
            {loginMode === "student"
              ? "Login to access your dashboard, track progress, and download resources"
              : "Manage resources and student data"}
          </p>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          {loginMode === "student" ? (
            <>
              {/* Gmail Button */}
              <button
                onClick={handleGmailLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-6"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Login with Gmail
                  </>
                )}
              </button>

              <div className="text-center text-xs text-muted-foreground">
                Demo: Click Gmail button to access student dashboard
              </div>
            </>
          ) : (
            <>
              {/* Admin Login Form */}
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Admin Email</label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition disabled:bg-gray-100"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition disabled:bg-gray-100"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-900 transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Admin Login
                    </>
                  )}
                </button>
              </form>

            </>
          )}

          {/* Footer */}
          <p className="text-muted-foreground text-xs text-center mt-6">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="glass rounded-lg p-4 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-xs text-muted-foreground">Resources</p>
          </div>
          <div className="glass rounded-lg p-4 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-xs text-muted-foreground">Progress</p>
          </div>
          <div className="glass rounded-lg p-4 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
}

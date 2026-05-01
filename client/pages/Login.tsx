import { Mail, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGmailLogin = async () => {
    setLoading(true);
    try {
      // Simulate Google OAuth flow
      // In production, integrate with Google OAuth 2.0
      const mockUser = {
        id: "student_" + Math.random().toString(36).substr(2, 9),
        email: "student@gmail.com",
        name: "Student Name",
        picture: "https://via.placeholder.com/150",
        joinDate: new Date().toISOString(),
      };

      localStorage.setItem("sdcUser", JSON.stringify(mockUser));
      localStorage.setItem("userRole", "student");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
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

      <div className="relative z-10 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F096448223b0e406a8a0785e611ecead3%2F5f40d12f388f4d9db63be26e6876548a?format=webp&width=200"
              alt="SDC Logo"
              className="w-20 h-20 rounded-full"
            />
          </div>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 md:p-10 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Welcome to SDC</h1>
          <p className="text-muted-foreground text-center mb-8">
            Login to access your dashboard, track progress, and download resources
          </p>

          {/* Gmail Button */}
          <button
            onClick={handleGmailLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 mb-6"
          >
            <Mail className="w-5 h-5" />
            {loading ? "Logging in..." : "Login with Gmail"}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-muted-foreground">or</span>
            </div>
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition mb-4"
          />

          <button className="w-full border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2">
            <LogIn className="w-5 h-5" />
            Continue with Email
          </button>

          {/* Footer */}
          <p className="text-muted-foreground text-xs text-center mt-6">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>

          {/* Navigation */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground text-sm">
              Admin? <a href="/admin-login" className="text-cyan-500 hover:text-cyan-400 font-semibold transition">Login here</a>
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="glass rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-xs text-muted-foreground">Resources</p>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-xs text-muted-foreground">Progress</p>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
}

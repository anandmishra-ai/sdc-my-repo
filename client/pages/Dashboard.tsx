import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage
    navigate("/", { replace: true });
  }, [navigate]);

  // Placeholder while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-900 font-semibold">Redirecting...</p>
      </div>
    </div>
  );
}

import { LogOut, Download, FileText, Award, TrendingUp, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface StudentUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  joinDate: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  fileType: string;
  size: string;
  uploadedDate: string;
  downloads: number;
  category: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<StudentUser | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "progress">("overview");
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      title: "Financial Modeling Guide",
      description: "Complete guide to financial modeling for case competitions",
      fileType: "PDF",
      size: "4.5 MB",
      uploadedDate: "2025-01-10",
      downloads: 45,
      category: "Finance",
    },
    {
      id: "2",
      title: "Deck Making Templates",
      description: "Professional PowerPoint templates for presentations",
      fileType: "PPTX",
      size: "8.2 MB",
      uploadedDate: "2025-01-08",
      downloads: 62,
      category: "Presentation",
    },
    {
      id: "3",
      title: "Case Study Collection",
      description: "50 solved case studies from major competitions",
      fileType: "DOCX",
      size: "6.1 MB",
      uploadedDate: "2025-01-05",
      downloads: 38,
      category: "Case Studies",
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("sdcUser");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sdcUser");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  if (!user) return null;

  const progressData = [
    { skill: "Financial Modeling", progress: 75, sessions: 6 },
    { skill: "Case Analysis", progress: 60, sessions: 4 },
    { skill: "Presentation Skills", progress: 85, sessions: 8 },
    { skill: "Communication", progress: 70, sessions: 5 },
  ];

  const achievements = [
    { title: "Early Bird", desc: "Joined SDC in first month", icon: "🚀" },
    { title: "100 Hours", desc: "Completed 100 hours of training", icon: "⏰" },
    { title: "Case Master", desc: "Won a case competition", icon: "🏆" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-cyan-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F096448223b0e406a8a0785e611ecead3%2F5f40d12f388f4d9db63be26e6876548a?format=webp&width=200"
                alt="SDC Logo"
                className="h-6 w-6 rounded-full"
              />
            </div>
            <span className="font-bold text-lg text-gray-900">SDC Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-cyan-500"
              />
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
            <p className="text-muted-foreground text-lg">Track your progress and access learning resources</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-black/10">
            {["overview", "resources", "progress"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-3 font-semibold capitalize transition ${
                  activeTab === tab
                    ? "text-cyan-500 border-b-2 border-cyan-500"
                    : "text-muted-foreground hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Hours</p>
                      <p className="text-4xl font-bold text-gray-900">48</p>
                    </div>
                    <Clock className="w-8 h-8 text-cyan-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">+8 hours this week</p>
                </div>
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Sessions Attended</p>
                      <p className="text-4xl font-bold text-gray-900">23</p>
                    </div>
                    <Award className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">3 more this month</p>
                </div>
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Achievements</p>
                      <p className="text-4xl font-bold text-gray-900">7</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">Keep it up!</p>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map((ach, i) => (
                    <div key={i} className="glass rounded-xl p-6">
                      <div className="text-5xl mb-4">{ach.icon}</div>
                      <h3 className="font-bold text-lg mb-1">{ach.title}</h3>
                      <p className="text-muted-foreground text-sm">{ach.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Available Resources</h2>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="glass rounded-xl p-6 hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{resource.title}</h3>
                          <p className="text-muted-foreground text-sm">{resource.description}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold transition flex items-center gap-2 flex-shrink-0">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="px-3 py-1 rounded-full bg-white/40">{resource.fileType}</span>
                      <span>{resource.size}</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === "progress" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
              <div className="space-y-6">
                {progressData.map((item, i) => (
                  <div key={i} className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{item.skill}</h3>
                        <p className="text-muted-foreground text-sm">{item.sessions} sessions completed</p>
                      </div>
                      <span className="text-2xl font-bold text-cyan-500">{item.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

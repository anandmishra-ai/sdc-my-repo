import { LogOut, Download, FileText, Award, TrendingUp, Clock, Calendar, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSession, clearSession } from "@/lib/auth";

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

interface ProgressData {
  skill: string;
  progress: number;
  sessions: number;
  hoursSpent: number;
  lastUpdated: string;
}

interface StudentProfile {
  totalHours: number;
  sessionsAttended: number;
  achievements: number;
  downloadedResources: string[];
  progressData: ProgressData[];
  lastActivityDate: string;
}

const getStorageKey = (userId: string) => `studentProfile_${userId}`;

const initializeProfile = (userId: string): StudentProfile => {
  return {
    totalHours: 48,
    sessionsAttended: 23,
    achievements: 7,
    downloadedResources: [],
    progressData: [
      { skill: "Financial Modeling", progress: 75, sessions: 6, hoursSpent: 12, lastUpdated: new Date().toISOString() },
      { skill: "Case Analysis", progress: 60, sessions: 4, hoursSpent: 8, lastUpdated: new Date().toISOString() },
      { skill: "Presentation Skills", progress: 85, sessions: 8, hoursSpent: 16, lastUpdated: new Date().toISOString() },
      { skill: "Communication", progress: 70, sessions: 5, hoursSpent: 10, lastUpdated: new Date().toISOString() },
    ],
    lastActivityDate: new Date().toISOString(),
  };
};

const getStudentProfile = (userId: string): StudentProfile => {
  const storageKey = getStorageKey(userId);
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initializeProfile(userId);
    }
  }

  const profile = initializeProfile(userId);
  localStorage.setItem(storageKey, JSON.stringify(profile));
  return profile;
};

const saveStudentProfile = (userId: string, profile: StudentProfile): void => {
  const storageKey = getStorageKey(userId);
  localStorage.setItem(storageKey, JSON.stringify({
    ...profile,
    lastActivityDate: new Date().toISOString(),
  }));
};

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage
    navigate("/");
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

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  const handleDownloadResource = (resourceId: string) => {
    if (!session || !profile) return;

    const updatedProfile = {
      ...profile,
      downloadedResources: [...new Set([...profile.downloadedResources, resourceId])],
    };

    setProfile(updatedProfile);
    saveStudentProfile(session.user.id, updatedProfile);
  };

  if (!session || !profile) return null;

  const achievements = [
    { title: "Early Bird", desc: "Joined SDC in first month", icon: "🚀", unlocked: true },
    { title: "100 Hours", desc: "Completed 100 hours of training", icon: "⏰", unlocked: profile.totalHours >= 100 },
    { title: "Case Master", desc: "Won a case competition", icon: "🏆", unlocked: profile.achievements >= 3 },
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                {session.user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{session.user.name}</p>
                <p className="text-xs text-muted-foreground">{session.user.email}</p>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome back, {session.user.name}! 👋</h1>
            <p className="text-muted-foreground text-lg">Track your progress and access learning resources</p>
            <p className="text-sm text-cyan-600 font-semibold mt-2">Last activity: {new Date(profile.lastActivityDate).toLocaleDateString()}</p>
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
                <div className="glass rounded-2xl p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Hours</p>
                      <p className="text-4xl font-bold text-gray-900">{profile.totalHours}</p>
                    </div>
                    <Clock className="w-8 h-8 text-cyan-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">+{Math.ceil(profile.totalHours / 6)} hours per week avg</p>
                </div>
                <div className="glass rounded-2xl p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Sessions Attended</p>
                      <p className="text-4xl font-bold text-gray-900">{profile.sessionsAttended}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">Keep attending more sessions</p>
                </div>
                <div className="glass rounded-2xl p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Achievements Unlocked</p>
                      <p className="text-4xl font-bold text-gray-900">{profile.achievements}</p>
                    </div>
                    <Zap className="w-8 h-8 text-yellow-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">You're doing great!</p>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map((ach, i) => (
                    <div key={i} className={`rounded-xl p-6 transition-all ${ach.unlocked ? 'glass hover:shadow-lg' : 'bg-gray-100 opacity-60'}`}>
                      <div className="text-5xl mb-4">{ach.icon}</div>
                      <h3 className="font-bold text-lg mb-1">{ach.title}</h3>
                      <p className="text-muted-foreground text-sm">{ach.desc}</p>
                      <div className="mt-4">
                        {ach.unlocked ? (
                          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">✓ Unlocked</span>
                        ) : (
                          <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold">Locked</span>
                        )}
                      </div>
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
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-700 text-sm">You have downloaded {profile.downloadedResources.length} resources</p>
              </div>
              <div className="space-y-4">
                {resources.map((resource) => {
                  const isDownloaded = profile.downloadedResources.includes(resource.id);
                  return (
                    <div key={resource.id} className="glass rounded-xl p-6 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-4 gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg">{resource.title}</h3>
                            <p className="text-muted-foreground text-sm">{resource.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadResource(resource.id)}
                          disabled={isDownloaded}
                          className={`px-4 py-2 rounded-lg text-white font-semibold transition flex items-center gap-2 flex-shrink-0 ${
                            isDownloaded
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          {isDownloaded ? "Downloaded" : "Download"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="px-3 py-1 rounded-full bg-white/40">{resource.fileType}</span>
                        <span>{resource.size}</span>
                        <span>{resource.downloads} total downloads</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === "progress" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-cyan-500" />
                    <h3 className="font-bold text-lg">Total Study Time</h3>
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{profile.totalHours}h</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Average: {(profile.totalHours / profile.progressData.reduce((sum, p) => sum + p.sessions, 0)).toFixed(1)}h per session
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-lg">Overall Progress</h3>
                  </div>
                  <p className="text-4xl font-bold text-gray-900">
                    {Math.round(profile.progressData.reduce((sum, p) => sum + p.progress, 0) / profile.progressData.length)}%
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">Average across all skills</p>
                </div>
              </div>
              <div className="space-y-6">
                {profile.progressData.map((item, i) => (
                  <div key={i} className="glass rounded-xl p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{item.skill}</h3>
                        <p className="text-muted-foreground text-sm">{item.sessions} sessions • {item.hoursSpent} hours spent</p>
                      </div>
                      <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">{item.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Last updated: {new Date(item.lastUpdated).toLocaleDateString()}
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

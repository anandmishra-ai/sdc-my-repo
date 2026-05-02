import { Upload, Trash2, Eye, LogOut, Plus, Search, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSession, clearSession, UserRole } from "@/lib/auth";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  size: string;
  uploadedDate: string;
  downloads: number;
}

const RESOURCES_STORAGE_KEY = "sdcAdminResources";

const getResources = (): Resource[] => {
  const stored = localStorage.getItem(RESOURCES_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return getDefaultResources();
    }
  }
  return getDefaultResources();
};

const getDefaultResources = (): Resource[] => [
  {
    id: "1",
    title: "Financial Modeling Guide",
    description: "Complete guide to financial modeling for case competitions",
    category: "Finance",
    fileType: "PDF",
    size: "4.5 MB",
    uploadedDate: "2025-01-10",
    downloads: 45,
  },
  {
    id: "2",
    title: "Deck Making Templates",
    description: "Professional PowerPoint templates for presentations",
    category: "Presentation",
    fileType: "PPTX",
    size: "8.2 MB",
    uploadedDate: "2025-01-08",
    downloads: 62,
  },
  {
    id: "3",
    title: "Case Study Collection",
    description: "50 solved case studies from major competitions",
    category: "Case Studies",
    fileType: "DOCX",
    size: "6.1 MB",
    uploadedDate: "2025-01-05",
    downloads: 38,
  },
];

const saveResources = (resources: Resource[]): void => {
  localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(resources));
};

export default function AdminResources() {
  const navigate = useNavigate();
  const [session, setSession] = useState(getSession());
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resources, setResources] = useState<Resource[]>(getResources());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Finance",
    fileType: "PDF",
    size: "0 MB",
  });

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession || currentSession.user.role !== UserRole.ADMIN) {
      navigate("/login");
      return;
    }
    setSession(currentSession);
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  const handleDelete = (id: string) => {
    const updated = resources.filter((r) => r.id !== id);
    setResources(updated);
    saveResources(updated);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category || !formData.fileType) {
      alert("Please fill in all fields");
      return;
    }

    const newResource: Resource = {
      id: `resource_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      fileType: formData.fileType,
      size: formData.size,
      uploadedDate: new Date().toISOString().split("T")[0],
      downloads: 0,
    };

    const updated = [newResource, ...resources];
    setResources(updated);
    saveResources(updated);

    setFormData({
      title: "",
      description: "",
      category: "Finance",
      fileType: "PDF",
      size: "0 MB",
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadModal(false);
    }, 1500);
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(resources.map((r) => r.category))];

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
            <span className="font-bold text-lg text-gray-900">SDC Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Resources Management</h1>
              <p className="text-muted-foreground text-lg">Upload and manage study resources for students</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Upload Resource
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass rounded-2xl p-6">
              <p className="text-muted-foreground text-sm">Total Resources</p>
              <p className="text-4xl font-bold text-gray-900">{resources.length}</p>
            </div>
            <div className="glass rounded-2xl p-6">
              <p className="text-muted-foreground text-sm">Total Downloads</p>
              <p className="text-4xl font-bold text-gray-900">{resources.reduce((sum, r) => sum + r.downloads, 0)}</p>
            </div>
            <div className="glass rounded-2xl p-6">
              <p className="text-muted-foreground text-sm">Categories</p>
              <p className="text-4xl font-bold text-gray-900">{new Set(resources.map((r) => r.category)).size}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Resources Table */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/10 bg-gradient-to-r from-cyan-50 to-blue-50">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Downloads</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Uploaded</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map((resource) => (
                    <tr key={resource.id} className="border-b border-black/5 hover:bg-white/40 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{resource.title}</p>
                          <p className="text-muted-foreground text-sm">{resource.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
                          {resource.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-semibold">{resource.fileType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-semibold">{resource.downloads}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(resource.uploadedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="p-2 rounded-lg hover:bg-white/40 transition" title="View">
                            <Eye className="w-5 h-5 text-cyan-500" />
                          </button>
                          <button
                            onClick={() => handleDelete(resource.id)}
                            className="p-2 rounded-lg hover:bg-white/40 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="glass rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Upload Resource</h2>

            {uploadSuccess && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-700 text-sm font-semibold">Resource uploaded successfully!</p>
                  <p className="text-green-600 text-xs">It's now available for students to download</p>
                </div>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Resource Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Financial Modeling Guide"
                  className="w-full px-4 py-2 rounded-lg border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition resize-none"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
                    <option>Finance</option>
                    <option>Presentation</option>
                    <option>Case Studies</option>
                    <option>Communication</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">File Type</label>
                  <select
                    value={formData.fileType}
                    onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
                    <option>PDF</option>
                    <option>PPTX</option>
                    <option>DOCX</option>
                    <option>ZIP</option>
                    <option>MP4</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">File Size</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., 5.2 MB"
                  className="w-full px-4 py-2 rounded-lg border border-black/10 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-black/10 text-gray-900 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

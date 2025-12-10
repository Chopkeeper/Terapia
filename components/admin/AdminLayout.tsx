import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Newspaper, LogOut, Lock, Home, Menu, X, ChevronRight, Bell, Search, User, Activity, FileText, Download } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Credentials (Try: admin / password)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  // --- Login Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border border-white/20">
          <div className="text-center mb-10">
            <div className="bg-gradient-to-tr from-primary to-teal-400 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Enter your credentials to access the workspace</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="admin"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="password"
              />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-teal-700 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              Sign In to Dashboard
            </button>
          </form>
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Admin Layout ---
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="p-8 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Terapia<span className="text-primary">.</span></h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-semibold">Admin Workspace</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">Main Menu</p>
            
            <NavLink 
              to="/admin" 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Overview" 
              active={location.pathname === '/admin'}
            />
            <NavLink 
              to="/admin/news" 
              icon={<Newspaper className="w-5 h-5" />} 
              label="News Management" 
              active={location.pathname === '/admin/news'}
            />
            
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-8">System</p>
            <a href="/" target="_blank" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all group">
              <Home className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="font-medium">Live Website</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 px-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center text-white font-bold shadow-lg">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-white">Administrator</p>
                <p className="text-xs text-slate-500">admin@terapia.com</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-slate-800 text-red-400 hover:bg-red-500/10 hover:text-red-400 transition-all border border-slate-700/50 hover:border-red-500/30 text-sm font-medium">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
              {location.pathname === '/admin' ? 'Dashboard Overview' : 'News Management'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-full text-sm w-64 transition-all outline-none"
              />
            </div>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

// Helper Component for Nav Links
const NavLink = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-primary text-white shadow-lg shadow-primary/30' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <div className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-primary transition-colors'}`}>
      {icon}
    </div>
    <span className="font-medium">{label}</span>
    {active && <ChevronRight className="w-4 h-4 ml-auto" />}
  </Link>
);

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Greeting Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-2">Good Morning, Admin! 👋</h2>
          <p className="text-slate-300 max-w-xl">Here is what's happening with your clinic website today. You have 3 pending updates to review.</p>
          <div className="mt-6 flex gap-4">
            <Link to="/admin/news" className="bg-primary hover:bg-white hover:text-primary text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg flex items-center gap-2">
              <Newspaper className="w-4 h-4" /> Manage News
            </Link>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full font-semibold transition-all backdrop-blur-md">
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total News" 
          value="12" 
          change="+2 this week" 
          icon={<Newspaper className="w-6 h-6 text-white" />} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Documents" 
          value="45" 
          change="+12% from last month" 
          icon={<FileText className="w-6 h-6 text-white" />} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Site Visitors" 
          value="1.2k" 
          change="+5% today" 
          icon={<Activity className="w-6 h-6 text-white" />} 
          color="bg-teal-500" 
        />
        <StatCard 
          title="Downloads" 
          value="320" 
          change="New record!" 
          icon={<Download className="w-6 h-6 text-white" />} 
          color="bg-orange-500" 
        />
      </div>

      {/* Recent Activity Section (Placeholder) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Recent System Activity</h3>
          <button className="text-sm text-primary font-semibold hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">System Backup Completed</p>
                <p className="text-xs text-gray-500">Database backup executed successfully.</p>
              </div>
              <span className="text-xs text-gray-400">2h ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon, color }: { title: string, value: string, change: string, icon: React.ReactNode, color: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 mb-2">{value}</h3>
        <p className={`text-xs font-medium ${change.includes('+') ? 'text-green-500' : 'text-gray-400'}`}>{change}</p>
      </div>
      <div className={`p-3 rounded-xl shadow-lg ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);
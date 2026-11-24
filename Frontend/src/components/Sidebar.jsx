import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Code2,
  BarChart3,
  Settings,
  LogOut,
  Layers,
  ChevronDown,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar({ onCloseMobile }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", to: "/projects", icon: FolderKanban },
    { label: "Tasks", to: "/tasks", icon: ListTodo },
    { label: "DSA Tracker", to: "/dsa", icon: Code2 },
    { label: "Analytics", to: "/analytics", icon: BarChart3 },
  ];

  const getInitials = (name) => {
    if (!name) return "C";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 1).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    if (onCloseMobile) onCloseMobile();
  };

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between p-5 lg:p-6 bg-gradient-to-b from-pink-100/90 via-pink-50/95 to-pink-100/90 dark:from-pink-950/80 dark:via-[#1e0b17] dark:to-pink-950/80 backdrop-blur-2xl border-r border-pink-200/90 dark:border-pink-900/60 select-none h-full transition-colors duration-300">
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-pink-500/30">
              <Layers className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
              TrackPort
            </span>
          </div>

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-xl text-pink-400 hover:text-pink-700 dark:hover:text-pink-200 hover:bg-pink-200/50 dark:hover:bg-pink-900/40 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md shadow-pink-500/25"
                    : "text-slate-700 dark:text-pink-100/80 hover:bg-pink-200/60 dark:hover:bg-pink-900/40 hover:text-pink-600 dark:hover:text-pink-300"
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Actions & User Profile */}
      <div className="space-y-4 pt-4 border-t border-pink-200/80 dark:border-pink-900/60">
        <nav className="space-y-1">
          <NavLink
            to="/settings"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md shadow-pink-500/25"
                  : "text-slate-700 dark:text-pink-100/80 hover:bg-pink-200/60 dark:hover:bg-pink-900/40 hover:text-pink-600 dark:hover:text-pink-300"
              }`
            }
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span>Settings</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium text-slate-700 dark:text-pink-100/80 hover:bg-rose-100/70 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-all text-left"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </button>
        </nav>

        {/* Profile Pill matching Image 2 */}
        <div
          onClick={() => {
            navigate("/settings");
            if (onCloseMobile) onCloseMobile();
          }}
          className="flex items-center gap-2.5 p-2 rounded-2xl bg-white/80 dark:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/50 shadow-xs cursor-pointer hover:bg-white dark:hover:bg-pink-900/50 transition-all"
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs shadow-pink-500/25">
            {getInitials(user?.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
              {user?.name || "Chirag"}
            </p>
            <p className="text-[10px] text-pink-900/60 dark:text-pink-200/60 truncate">
              {user?.email || "chirag@example.com"}
            </p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-pink-400 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
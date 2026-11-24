import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Code2,
  BarChart3,
  Github,
  Settings,
  Activity,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', to: '/projects', icon: FolderKanban, badge: '12' },
  { label: 'Tasks', to: '/tasks', icon: CheckSquare, badge: '8' },
  { label: 'DSA Tracker', to: '/dsa', icon: Code2 },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'GitHub', to: '/github', icon: Github },
  { label: 'Settings', to: '/settings', icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-pink-200/80 dark:border-pink-900/60 bg-gradient-to-b from-pink-100/90 via-pink-50/95 to-pink-100/90 dark:from-pink-950/80 dark:via-[#1e0b17] dark:to-pink-950/80 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-pink-200/80 dark:border-pink-900/60 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30">
              <Activity className="h-4.5 w-4.5" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">TrackPort</span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-pink-600/70 dark:text-pink-400">
                Dev Hub
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900/40" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-thin px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-pink-700/60 dark:text-pink-300/60">
            Workspace
          </p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md shadow-pink-500/25'
                    : 'text-slate-700 dark:text-pink-100/80 hover:bg-pink-200/60 dark:hover:bg-pink-900/40 hover:text-pink-600 dark:hover:text-pink-300'
                )}
              >
                <Icon
                  className={cn(
                    'h-4.5 w-4.5 shrink-0 transition-colors',
                    isActive ? 'text-white' : 'text-slate-500 dark:text-pink-300/70 group-hover:text-pink-600 dark:group-hover:text-pink-300'
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      'rounded-md px-1.5 py-0.5 text-[10px] font-semibold',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-pink-200/60 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-pink-200/80 dark:border-pink-900/60 p-3">
          <div className="rounded-lg bg-white/80 dark:bg-pink-950/50 border border-pink-200/80 dark:border-pink-900/50 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-xs font-semibold text-white shadow-sm shadow-pink-500/20">
                AK
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">Alex Kim</p>
                <p className="truncate text-[10px] text-pink-600/70 dark:text-pink-300/70">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShieldCheck,
  Activity,
  Smartphone,
  AlertTriangle,
  KeyRound,
  Users,
  Cpu,
  Radio,
  Bell,
  UserCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  PanelLeft,
  Brain,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Brain, label: 'AI Trust Center', path: '/trust-center' },
  { icon: Activity, label: 'Behavioral Analytics', path: '/behavioral-analytics' },
  { icon: Smartphone, label: 'Device Trust', path: '/device-trust' },
  { icon: AlertTriangle, label: 'Fraud Detection', path: '/fraud-detection' },
  { icon: KeyRound, label: 'Account Recovery', path: '/account-recovery' },
  { icon: Users, label: 'Insider Threats', path: '/insider-threats' },
  { icon: ShieldCheck, label: 'Adaptive Verification', path: '/adaptive-verification' },
  { icon: Radio, label: 'SOC', path: '/soc' },
  { icon: Bell, label: 'Alerts', path: '/alerts' },
  { icon: UserCircle, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden rounded-full bg-blue-600 p-3 text-white shadow-lg"
      >
        <PanelLeft className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] border-r border-slate-800/50 bg-slate-950/95 backdrop-blur-xl transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-3 py-3">
            {!collapsed && <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3">Navigation</span>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-hide">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", active && "text-blue-400")} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {active && !collapsed && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-800/50 p-2">
            <button
              onClick={logout}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all w-full",
                collapsed && "justify-center"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

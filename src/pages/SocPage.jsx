import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, AlertTriangle, Shield, Activity, Clock, Server, Zap, Globe, Flame, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardLayout } from '../components/DashboardLayout';
import { alerts, heatmapData } from '../data/demoData';
import { cn } from '../lib/utils';

const liveFeed = [
  { id: 1, type: 'Fraud', severity: 'High', message: 'Suspicious transaction of ₹2,50,000 detected', time: 'Just now', source: 'TXN-2026012345' },
  { id: 2, type: 'Device', severity: 'Medium', message: 'New device login from Mumbai', time: '2 min ago', source: 'DEV-100452' },
  { id: 3, type: 'Insider', severity: 'Critical', message: 'Bulk data download by admin user', time: '5 min ago', source: 'EMP-1023' },
  { id: 4, type: 'Security', severity: 'Low', message: 'Failed login attempt from unknown IP', time: '8 min ago', source: '192.168.45.102' },
  { id: 5, type: 'Recovery', severity: 'Medium', message: 'Password reset request from unusual location', time: '12 min ago', source: 'CUST-1045' },
  { id: 6, type: 'Fraud', severity: 'High', message: 'UPI transaction flagged for review', time: '15 min ago', source: 'TXN-2026012340' },
  { id: 7, type: 'Device', severity: 'Low', message: 'Browser version mismatch detected', time: '18 min ago', source: 'DEV-100389' },
  { id: 8, type: 'Security', severity: 'Critical', message: 'Multiple failed MFA attempts', time: '22 min ago', source: 'CUST-1123' },
];

const systemHealth = [
  { name: 'API Gateway', status: 'healthy', uptime: 99.99, latency: 45 },
  { name: 'Auth Service', status: 'healthy', uptime: 99.97, latency: 32 },
  { name: 'Risk Engine', status: 'healthy', uptime: 99.95, latency: 78 },
  { name: 'ML Pipeline', status: 'degraded', uptime: 99.82, latency: 245 },
  { name: 'Database', status: 'healthy', uptime: 99.99, latency: 12 },
  { name: 'Notification', status: 'healthy', uptime: 99.96, latency: 28 },
];

const investigationData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  alerts: Math.floor(Math.random() * 20) + 2,
  investigations: Math.floor(Math.random() * 8) + 1,
  resolved: Math.floor(Math.random() * 6),
}));

export function SocPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveFeedState, setLiveFeedState] = useState(liveFeed);
  const [activeFeed, setActiveFeed] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!activeFeed) return;
    const interval = setInterval(() => {
      const types = ['Fraud', 'Device', 'Insider', 'Security', 'Recovery'];
      const severities = ['Low', 'Medium', 'High', 'Critical'];
      const newEntry = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        message: 'New security event detected in real-time monitoring',
        time: 'Just now',
        source: `SRC-${Math.floor(Math.random() * 1000000)}`,
      };
      setLiveFeedState(prev => [newEntry, ...prev.slice(0, 7)]);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeFeed]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Security Operations Center</h1>
            <p className="text-sm text-slate-400">Real-time threat monitoring and incident response</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-300">{currentTime.toLocaleTimeString('en-IN')}</span>
            </div>
            <button
              onClick={() => setActiveFeed(!activeFeed)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                activeFeed
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              {activeFeed ? 'Pause Feed' : 'Resume Feed'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Threat Feed */}
          <div className="lg:col-span-2 glass-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="h-5 w-5 text-red-400 animate-pulse" />
              <h3 className="text-lg font-semibold text-white">Live Threat Feed</h3>
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-400 animate-pulse">LIVE</span>
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
              <AnimatePresence>
                {liveFeedState.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-3",
                      entry.severity === 'Critical' ? 'bg-red-500/5 border border-red-500/10' :
                      entry.severity === 'High' ? 'bg-orange-500/5 border border-orange-500/10' :
                      entry.severity === 'Medium' ? 'bg-amber-500/5 border border-amber-500/10' : 'bg-blue-500/5 border border-blue-500/10'
                    )}
                  >
                    <div className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      entry.severity === 'Critical' ? 'bg-red-400' :
                      entry.severity === 'High' ? 'bg-orange-400' :
                      entry.severity === 'Medium' ? 'bg-amber-400' : 'bg-blue-400'
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{entry.type}</span>
                        <span className={cn(
                          "rounded-full px-1.5 py-0 text-[10px] font-medium",
                          entry.severity === 'Critical' ? 'bg-red-500/10 text-red-400' :
                          entry.severity === 'High' ? 'bg-orange-500/10 text-orange-400' :
                          entry.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                        )}>
                          {entry.severity}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 truncate">{entry.message}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-slate-500">{entry.time}</div>
                      <div className="text-[10px] text-slate-600 font-mono">{entry.source}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* System Health */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <Server className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">System Health</h3>
            </div>
            <div className="space-y-3">
              {systemHealth.map((system) => (
                <div key={system.name} className="rounded-lg bg-slate-800/30 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        system.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'
                      )} />
                      <span className="text-sm text-white">{system.name}</span>
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium rounded-full px-2 py-0.5",
                      system.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    )}>
                      {system.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Uptime: {system.uptime}%</span>
                    <span className={cn(
                      "font-medium",
                      system.latency > 200 ? 'text-amber-400' : 'text-slate-400'
                    )}>
                      {system.latency}ms
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Heatmap */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Risk Heatmap (7 Days x 24 Hours)</h3>
          </div>
          <div className="grid grid-cols-24 gap-0.5">
            {Array.from({ length: 7 }, (_, day) => (
              <div key={day} className="contents">
                <div className="text-[10px] text-slate-500 w-8 text-right pr-2 py-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]}
                </div>
                {Array.from({ length: 24 }, (_, hour) => {
                  const value = Math.floor(Math.random() * 100);
                  return (
                    <div
                      key={hour}
                      className="h-6 rounded-sm"
                      style={{
                        backgroundColor: value > 70 ? 'rgba(239,68,68,0.7)' :
                          value > 40 ? 'rgba(234,179,8,0.7)' :
                          value > 20 ? 'rgba(59,130,246,0.5)' : 'rgba(34,197,94,0.3)',
                      }}
                      title={`${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]} ${String(hour).padStart(2, '0')}:00 - Risk: ${value}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-emerald-500/30" /> Low
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-blue-500/50" /> Medium
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-amber-500/70" /> High
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-red-500/70" /> Critical
            </div>
          </div>
        </div>

        {/* Investigation Chart */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Fraud Investigations (24h)</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={investigationData}>
                <defs>
                  <linearGradient id="alertsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '8px', color: '#f1f5f9' }} />
                <Area type="monotone" dataKey="alerts" name="Alerts" stroke="#ef4444" fill="url(#alertsGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="investigations" name="Investigations" stroke="#3b82f6" fill="none" strokeWidth={2} strokeDasharray="4 4" />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#22c55e" fill="none" strokeWidth={2} strokeDasharray="2 2" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

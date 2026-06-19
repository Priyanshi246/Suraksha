import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, MousePointer, Keyboard, Clock, AlertTriangle, TrendingUp, Brain, Eye, FileText } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';

const typingData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  wpm: 40 + Math.floor(Math.random() * 30),
  accuracy: 85 + Math.floor(Math.random() * 15),
  deviation: Math.floor(Math.random() * 20),
}));

const mouseData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  speed: 100 + Math.floor(Math.random() * 200),
  clicks: 50 + Math.floor(Math.random() * 100),
  hesitations: Math.floor(Math.random() * 10),
}));

const sessionData = Array.from({ length: 7 }, (_, i) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return {
    day: days[i],
    duration: 10 + Math.floor(Math.random() * 50),
    pages: 5 + Math.floor(Math.random() * 20),
    actions: 20 + Math.floor(Math.random() * 80),
  };
});

const riskIndicators = [
  { id: 1, type: 'Unusual Typing Pattern', severity: 'Medium', time: '2 min ago', score: 65, details: 'Typing speed deviated by 35% from baseline' },
  { id: 2, type: 'Mouse Movement Anomaly', severity: 'Low', time: '15 min ago', score: 45, details: 'Erratic cursor movement detected during login' },
  { id: 3, type: 'Session Duration Spike', severity: 'High', time: '1 hour ago', score: 82, details: 'Session 3.2x longer than user average' },
  { id: 4, type: 'Navigation Pattern Change', severity: 'Medium', time: '3 hours ago', score: 58, details: 'User accessing unusual menu sections' },
  { id: 5, type: 'After Hours Activity', severity: 'Low', time: '5 hours ago', score: 38, details: 'Login at 02:30 AM outside normal hours' },
];

export function BehavioralAnalyticsPage() {
  const [selectedTab, setSelectedTab] = useState('typing');
  const [currentTyping, setCurrentTyping] = useState({ wpm: 62, accuracy: 94, deviation: 8 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTyping(prev => ({
        wpm: Math.max(20, Math.min(90, prev.wpm + Math.floor(Math.random() * 5) - 2)),
        accuracy: Math.max(70, Math.min(99, prev.accuracy + Math.floor(Math.random() * 3) - 1)),
        deviation: Math.max(0, Math.min(30, prev.deviation + Math.floor(Math.random() * 3) - 1)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Behavioral Analytics</h1>
          <p className="text-sm text-slate-400">AI-powered user behavior analysis and anomaly detection</p>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Keyboard className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-sm font-semibold text-white">Typing Dynamics</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-white">{currentTyping.wpm}</div>
                <div className="text-[10px] text-slate-400">WPM</div>
              </div>
              <div>
                <div className="text-xl font-bold text-emerald-400">{currentTyping.accuracy}%</div>
                <div className="text-[10px] text-slate-400">Accuracy</div>
              </div>
              <div>
                <div className="text-xl font-bold text-amber-400">{currentTyping.deviation}</div>
                <div className="text-[10px] text-slate-400">Deviation</div>
              </div>
            </div>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <MousePointer className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-sm font-semibold text-white">Mouse Analysis</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-white">245</div>
                <div className="text-[10px] text-slate-400">px/sec</div>
              </div>
              <div>
                <div className="text-xl font-bold text-emerald-400">87</div>
                <div className="text-[10px] text-slate-400">Clicks</div>
              </div>
              <div>
                <div className="text-xl font-bold text-amber-400">3</div>
                <div className="text-[10px] text-slate-400">Hesitations</div>
              </div>
            </div>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <Clock className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-sm font-semibold text-white">Current Session</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-white">18m</div>
                <div className="text-[10px] text-slate-400">Duration</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-400">12</div>
                <div className="text-[10px] text-slate-400">Pages</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-400">45</div>
                <div className="text-[10px] text-slate-400">Actions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { key: 'typing', label: 'Typing Dynamics', icon: Keyboard },
            { key: 'mouse', label: 'Mouse Movement', icon: MousePointer },
            { key: 'session', label: 'Session Activity', icon: Activity },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                selectedTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-card p-5">
          {selectedTab === 'typing' && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">24-Hour Typing Analysis</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={typingData}>
                    <defs>
                      <linearGradient id="wpmGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '8px', color: '#f1f5f9' }} />
                    <Area type="monotone" dataKey="wpm" name="WPM" stroke="#3b82f6" fill="url(#wpmGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#22c55e" fill="none" strokeWidth={2} strokeDasharray="4 4" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {selectedTab === 'mouse' && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Mouse Movement Analysis</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mouseData}>
                    <defs>
                      <linearGradient id="mouseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '8px', color: '#f1f5f9' }} />
                    <Area type="monotone" dataKey="speed" name="Speed (px/sec)" stroke="#8b5cf6" fill="url(#mouseGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="clicks" name="Clicks" stroke="#06b6d4" fill="none" strokeWidth={2} strokeDasharray="4 4" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {selectedTab === 'session' && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Weekly Session Activity</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sessionData}>
                    <defs>
                      <linearGradient id="sessGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '8px', color: '#f1f5f9' }} />
                    <Area type="monotone" dataKey="duration" name="Duration (min)" stroke="#22c55e" fill="url(#sessGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="pages" name="Pages Visited" stroke="#eab308" fill="none" strokeWidth={2} strokeDasharray="4 4" />
                    <Area type="monotone" dataKey="actions" name="Actions" stroke="#f43f5e" fill="none" strokeWidth={2} strokeDasharray="2 2" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Risk Indicators */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">AI Anomaly Detection Insights</h3>
          </div>
          <div className="space-y-2">
            {riskIndicators.map((indicator) => (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 rounded-lg bg-slate-800/50 p-4"
              >
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                  indicator.severity === 'High' ? 'bg-red-500/10' :
                  indicator.severity === 'Medium' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                )}>
                  <AlertTriangle className={cn(
                    "h-5 w-5",
                    indicator.severity === 'High' ? 'text-red-400' :
                    indicator.severity === 'Medium' ? 'text-amber-400' : 'text-blue-400'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{indicator.type}</span>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      indicator.severity === 'High' ? 'bg-red-500/10 text-red-400' :
                      indicator.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                    )}>
                      {indicator.severity}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{indicator.details}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-white">{indicator.score}</div>
                  <div className="text-[10px] text-slate-500">{indicator.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Behavior Timeline */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">User Behavior Timeline</h3>
          </div>
          <div className="space-y-0">
            {[
              { time: '09:00:23', event: 'Login Success', type: 'Normal', icon: FileText },
              { time: '09:01:45', event: 'Dashboard Access', type: 'Normal', icon: FileText },
              { time: '09:05:12', event: 'Transaction Initiated', type: 'Normal', icon: FileText },
              { time: '09:08:33', event: 'Unusual Typing Detected', type: 'Warning', icon: AlertTriangle },
              { time: '09:12:00', event: 'OTP Verification', type: 'Action', icon: TrendingUp },
              { time: '09:15:22', event: 'Transaction Completed', type: 'Normal', icon: FileText },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-4 py-3 relative">
                <div className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-800" />
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center shrink-0 z-10",
                  event.type === 'Normal' ? 'bg-slate-800 text-slate-400' :
                  event.type === 'Warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                )}>
                  <event.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{event.event}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{event.time}</div>
                </div>
                <div className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  event.type === 'Normal' ? 'bg-slate-800 text-slate-400' :
                  event.type === 'Warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                )}>
                  {event.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

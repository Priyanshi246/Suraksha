import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Smartphone, KeyRound, Eye, Shield, CheckCircle, Search, Filter } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { alerts } from '../data/demoData';
import { cn } from '../lib/utils';

export function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');

  const filtered = alerts.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || a.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || a.severity === severityFilter;
    const matchesRead = readFilter === 'all' || (readFilter === 'read' ? a.read : !a.read);
    return matchesSearch && matchesType && matchesSeverity && matchesRead;
  });

  const unread = alerts.filter(a => !a.read).length;

  const typeIcons = {
    'Fraud Alert': AlertTriangle,
    'Device Alert': Smartphone,
    'Recovery Alert': KeyRound,
    'Insider Alert': Eye,
    'Security Alert': Shield,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Alerts & Notifications</h1>
            <p className="text-sm text-slate-400">{unread} unread alerts</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <Bell className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-white font-medium">{unread} Unread</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search alerts..."
              className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="Fraud Alert">Fraud Alert</option>
            <option value="Device Alert">Device Alert</option>
            <option value="Recovery Alert">Recovery Alert</option>
            <option value="Insider Alert">Insider Alert</option>
            <option value="Security Alert">Security Alert</option>
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={readFilter}
            onChange={(e) => setReadFilter(e.target.value)}
            className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        {/* Alert List */}
        <div className="space-y-2">
          {filtered.map((alert, i) => {
            const AlertIcon = typeIcons[alert.type] || Shield;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  "glass-card p-4 flex items-start gap-4 transition-colors",
                  !alert.read && "border-l-2 border-l-blue-500 bg-slate-800/30"
                )}
              >
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                  alert.severity === 'Critical' ? 'bg-red-500/10' :
                  alert.severity === 'High' ? 'bg-orange-500/10' :
                  alert.severity === 'Medium' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                )}>
                  <AlertIcon className={cn(
                    "h-5 w-5",
                    alert.severity === 'Critical' ? 'text-red-400' :
                    alert.severity === 'High' ? 'text-orange-400' :
                    alert.severity === 'Medium' ? 'text-amber-400' : 'text-blue-400'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-white">{alert.title}</span>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      alert.severity === 'Critical' ? 'bg-red-500/10 text-red-400' :
                      alert.severity === 'High' ? 'bg-orange-500/10 text-orange-400' :
                      alert.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                    )}>
                      {alert.severity}
                    </span>
                    {!alert.read && (
                      <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">NEW</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{alert.description}</div>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                    <span>{alert.type}</span>
                    <span>{alert.customerId}</span>
                    <span>{new Date(alert.timestamp).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    alert.status === 'Active' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                  )}>
                    {alert.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

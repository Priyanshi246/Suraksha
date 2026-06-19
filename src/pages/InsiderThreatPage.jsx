import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, AlertTriangle, Shield, Clock, Search, Activity, FileText, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { insiderThreats } from '../data/demoData';
import { cn } from '../lib/utils';

export function InsiderThreatPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filtered = insiderThreats.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesRisk = riskFilter === 'all' || t.riskLevel === riskFilter;
    return matchesSearch && matchesType && matchesRisk;
  });

  const stats = {
    total: insiderThreats.length,
    high: insiderThreats.filter(t => t.riskLevel === 'High').length,
    active: insiderThreats.filter(t => t.status === 'Active').length,
    resolved: insiderThreats.filter(t => t.status === 'Resolved').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Insider Threat Detection</h1>
          <p className="text-sm text-slate-400">Enterprise SOC-style employee activity monitoring and risk assessment</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Alerts', value: stats.total, icon: Eye, color: 'blue' },
            { label: 'High Risk', value: stats.high, icon: AlertTriangle, color: 'red' },
            { label: 'Active', value: stats.active, icon: Activity, color: 'amber' },
            { label: 'Resolved', value: stats.resolved, icon: Shield, color: 'emerald' },
          ].map(stat => (
            <div key={stat.label} className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("rounded-lg p-1.5", stat.color === 'blue' && 'bg-blue-500/10', stat.color === 'emerald' && 'bg-emerald-500/10', stat.color === 'amber' && 'bg-amber-500/10', stat.color === 'red' && 'bg-red-500/10')}>
                  <stat.icon className={cn("h-4 w-4", stat.color === 'blue' && 'text-blue-400', stat.color === 'emerald' && 'text-emerald-400', stat.color === 'amber' && 'text-amber-400', stat.color === 'red' && 'text-red-400')} />
                </div>
                <span className="text-xs text-slate-400">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employees or threats..."
              className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="Data Exfiltration">Data Exfiltration</option>
            <option value="Privilege Escalation">Privilege Escalation</option>
            <option value="Unauthorized Access">Unauthorized Access</option>
            <option value="Policy Violation">Policy Violation</option>
            <option value="Suspicious Query Pattern">Suspicious Query Pattern</option>
          </select>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Risk Levels</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Threat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((threat, i) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "glass-card p-5",
                threat.riskLevel === 'High' && "border-red-500/20"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    threat.riskLevel === 'High' ? 'bg-red-500/10' :
                    threat.riskLevel === 'Medium' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                  )}>
                    <Users className={cn(
                      "h-5 w-5",
                      threat.riskLevel === 'High' ? 'text-red-400' :
                      threat.riskLevel === 'Medium' ? 'text-amber-400' : 'text-blue-400'
                    )} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{threat.employeeName}</div>
                    <div className="text-xs text-slate-400">{threat.employeeId} | {threat.department}</div>
                  </div>
                </div>
                <div className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  threat.riskLevel === 'High' ? 'bg-red-500/10 text-red-400' :
                  threat.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                )}>
                  {threat.riskLevel} Risk
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Threat Type</span>
                  <span className="text-xs text-white font-medium">{threat.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Risk Score</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          threat.riskScore > 70 ? 'bg-red-500' :
                          threat.riskScore > 40 ? 'bg-amber-500' : 'bg-blue-500'
                        )}
                        style={{ width: `${threat.riskScore}%` }}
                      />
                    </div>
                    <span className={cn(
                      "text-xs font-bold",
                      threat.riskScore > 70 ? 'text-red-400' :
                      threat.riskScore > 40 ? 'text-amber-400' : 'text-blue-400'
                    )}>
                      {threat.riskScore}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Data Accessed</span>
                  <span className="text-xs text-white">{threat.dataAccessed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Detected</span>
                  <span className="text-xs text-slate-400">{new Date(threat.detectedAt).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 mb-4">{threat.description}</div>

              <div className="flex items-center gap-2">
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  threat.status === 'Active' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                )}>
                  {threat.status}
                </span>
                <div className="flex-1" />
                <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
                  Investigate
                </button>
                <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors">
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

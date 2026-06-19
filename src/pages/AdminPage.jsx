import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, FileText, Settings, Search, CheckCircle, XCircle, AlertTriangle, Clock, Activity, BarChart3, Download, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { customers, fraudCases, auditLogs } from '../data/demoData';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCase, setExpandedCase] = useState(null);

  const filteredUsers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 30);

  const filteredLogs = auditLogs.filter(l =>
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.actorId.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 30);

  const adminTabs = [
    { key: 'users', label: 'User Management', icon: Users },
    { key: 'cases', label: 'Fraud Cases', icon: Shield },
    { key: 'rules', label: 'Risk Rules', icon: Settings },
    { key: 'audit', label: 'Audit Logs', icon: FileText },
    { key: 'reports', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-400">Enterprise administration and risk management panel</p>
        </div>

        <div className="flex gap-2">
          {adminTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* User Management */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                  className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800/50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Customer ID</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Name</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Email</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">City</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Trust Score</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Risk Level</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((c, i) => (
                      <motion.tr
                        key={c.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-4 py-3 text-white font-mono">{c.id}</td>
                        <td className="px-4 py-3 text-white">{c.name}</td>
                        <td className="px-4 py-3 text-slate-400">{c.email}</td>
                        <td className="px-4 py-3 text-slate-400">{c.city}</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "text-sm font-bold",
                            c.trustScore >= 80 ? 'text-emerald-400' :
                            c.trustScore >= 60 ? 'text-amber-400' : 'text-red-400'
                          )}>
                            {c.trustScore}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            c.riskLevel === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                            c.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                            c.riskLevel === 'High' ? 'bg-orange-500/10 text-orange-400' : 'bg-red-500/10 text-red-400'
                          )}>
                            {c.riskLevel}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                            c.status === 'Flagged' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                          )}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="rounded p-1 text-slate-400 hover:text-blue-400 transition-colors">
                              <Settings className="h-4 w-4" />
                            </button>
                            <button className="rounded p-1 text-slate-400 hover:text-red-400 transition-colors">
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Fraud Cases */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search cases..."
                  className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors">
                <Filter className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {fraudCases.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center",
                        c.priority === 'Critical' ? 'bg-red-500/10' :
                        c.priority === 'High' ? 'bg-orange-500/10' : 'bg-amber-500/10'
                      )}>
                        <AlertTriangle className={cn(
                          "h-4 w-4",
                          c.priority === 'Critical' ? 'text-red-400' :
                          c.priority === 'High' ? 'text-orange-400' : 'text-amber-400'
                        )} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{c.id} - {c.type}</div>
                        <div className="text-xs text-slate-400">{c.customerId} | {c.assignedTo}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        c.status === 'Open' ? 'bg-blue-500/10 text-blue-400' :
                        c.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400' :
                        c.status === 'Escalated' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                      )}>
                        {c.status}
                      </span>
                      <button
                        onClick={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
                        className="rounded p-1 text-slate-400 hover:text-white transition-colors"
                      >
                        {expandedCase === c.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {expandedCase === c.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-slate-800/50"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <div className="text-slate-500">Detected</div>
                          <div className="text-white">{new Date(c.detectedAt).toLocaleString('en-IN')}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Priority</div>
                          <div className="text-white">{c.priority}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Potential Loss</div>
                          <div className="text-white">₹{c.lossAmount.toLocaleString('en-IN')}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Description</div>
                          <div className="text-white">{c.description}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
                          Assign
                        </button>
                        <button className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                          Resolve
                        </button>
                        <button className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors">
                          Escalate
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Risk Rules */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Risk Scoring Rules</h3>
              <div className="space-y-3">
                {[
                  { name: 'Transaction Velocity', threshold: 10, weight: 25, status: 'Active', desc: 'Flag users with >10 transactions per hour' },
                  { name: 'Device Mismatch', threshold: 1, weight: 20, status: 'Active', desc: 'Alert on new device without history' },
                  { name: 'Geolocation Anomaly', threshold: 500, weight: 15, status: 'Active', desc: 'Login >500km from last location' },
                  { name: 'After-Hours Access', threshold: 22, weight: 10, status: 'Active', desc: 'Access between 22:00 - 06:00' },
                  { name: 'Bulk Data Download', threshold: 100, weight: 20, status: 'Active', desc: 'Download >100 records in one session' },
                  { name: 'Multiple Failed Logins', threshold: 3, weight: 10, status: 'Paused', desc: '3+ failed login attempts in 5 minutes' },
                ].map((rule, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-slate-800/30 p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{rule.name}</span>
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          rule.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                        )}>
                          {rule.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{rule.desc}</div>
                    </div>
                    <div className="flex items-center gap-6 text-xs">
                      <div className="text-center">
                        <div className="text-slate-500">Threshold</div>
                        <div className="text-white font-medium">{rule.threshold}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-500">Weight</div>
                        <div className="text-white font-medium">{rule.weight}%</div>
                      </div>
                      <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search audit logs..."
                  className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800/50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Log ID</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Action</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Actor</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Severity</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Timestamp</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log, i) => (
                      <motion.tr
                        key={log.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-4 py-3 text-white font-mono">{log.id}</td>
                        <td className="px-4 py-3 text-white">{log.action}</td>
                        <td className="px-4 py-3 text-slate-400 font-mono">{log.actorId}</td>
                        <td className="px-4 py-3 text-slate-400">{log.actorType}</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            log.severity === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                          )}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs">{new Date(log.timestamp).toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-slate-400 font-mono text-xs">{log.ipAddress}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Monthly Fraud Report', date: 'Dec 2026', type: 'PDF', size: '2.4 MB' },
                { title: 'Risk Assessment Q4', date: 'Q4 2026', type: 'PDF', size: '5.1 MB' },
                { title: 'Device Trust Analysis', date: 'Nov 2026', type: 'PDF', size: '1.8 MB' },
                { title: 'Insider Threat Summary', date: 'Oct 2026', type: 'PDF', size: '3.2 MB' },
                { title: 'Compliance Audit Report', date: 'Sep 2026', type: 'PDF', size: '4.5 MB' },
                { title: 'User Behavior Analytics', date: 'Aug 2026', type: 'PDF', size: '2.9 MB' },
              ].map((report, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  className="glass-card p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-lg bg-blue-500/10 p-2">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{report.title}</div>
                      <div className="text-xs text-slate-400">{report.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{report.type} | {report.size}</span>
                    <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors">
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

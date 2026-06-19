import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Search, Filter, Eye, CheckCircle, XCircle, Clock, ArrowUpDown, FileText } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { fraudCases, transactions } from '../data/demoData';
import { cn } from '../lib/utils';

export function FraudDetectionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);
  const [tab, setTab] = useState('cases');

  const filteredCases = fraudCases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const filteredTransactions = transactions.filter(t =>
    t.status === 'Flagged' || t.riskScore > 60
  ).filter(t =>
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.type.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 30);

  const caseStats = {
    total: fraudCases.length,
    open: fraudCases.filter(c => c.status === 'Open').length,
    resolved: fraudCases.filter(c => c.status === 'Resolved').length,
    critical: fraudCases.filter(c => c.priority === 'Critical').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Fraud Detection Center</h1>
          <p className="text-sm text-slate-400">Enterprise fraud operations and case management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Cases', value: caseStats.total, icon: FileText, color: 'blue' },
            { label: 'Open Cases', value: caseStats.open, icon: Clock, color: 'amber' },
            { label: 'Resolved', value: caseStats.resolved, icon: CheckCircle, color: 'emerald' },
            { label: 'Critical', value: caseStats.critical, icon: AlertTriangle, color: 'red' },
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

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { key: 'cases', label: 'Fraud Cases' },
            { key: 'transactions', label: 'Suspicious Transactions' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                tab === t.key
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              {t.label}
            </button>
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
              placeholder="Search cases, transactions..."
              className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          {tab === 'cases' && (
            <>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="Investigating">Investigating</option>
                <option value="Resolved">Resolved</option>
                <option value="Escalated">Escalated</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </>
          )}
        </div>

        {/* Cases Table */}
        {tab === 'cases' && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800/50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Case ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Priority</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Assigned</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Loss</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => setSelectedCase(c)}
                      className="border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-white font-mono">{c.id}</td>
                      <td className="px-4 py-3 text-slate-300">{c.type}</td>
                      <td className="px-4 py-3 text-slate-300 font-mono">{c.customerId}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          c.priority === 'Critical' ? 'bg-red-500/10 text-red-400' :
                          c.priority === 'High' ? 'bg-orange-500/10 text-orange-400' :
                          c.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                        )}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          c.status === 'Open' ? 'bg-blue-500/10 text-blue-400' :
                          c.status === 'Investigating' ? 'bg-amber-500/10 text-amber-400' :
                          c.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        )}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{c.assignedTo}</td>
                      <td className="px-4 py-3 text-slate-300">₹{c.lossAmount.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <button className="rounded p-1 text-slate-400 hover:text-blue-400 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        {tab === 'transactions' && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800/50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Txn ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Risk</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t, i) => (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-white font-mono">{t.id}</td>
                      <td className="px-4 py-3 text-slate-300">{t.type}</td>
                      <td className="px-4 py-3 text-white font-medium">₹{t.amount.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-slate-300 font-mono">{t.customerId}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          t.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' :
                          t.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' :
                          t.status === 'Flagged' ? 'bg-red-500/10 text-red-400' : 'bg-slate-500/10 text-slate-400'
                        )}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                t.riskScore > 70 ? 'bg-red-500' :
                                t.riskScore > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                              )}
                              style={{ width: `${t.riskScore}%` }}
                            />
                          </div>
                          <span className={cn(
                            "text-xs font-medium",
                            t.riskScore > 70 ? 'text-red-400' :
                            t.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'
                          )}>
                            {t.riskScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{new Date(t.timestamp).toLocaleString('en-IN')}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Case Detail Modal */}
        {selectedCase && tab === 'cases' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card w-full max-w-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Case Details</h3>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="rounded p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-xs text-slate-400">Case ID</span>
                  <span className="text-sm text-white font-mono">{selectedCase.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-xs text-slate-400">Type</span>
                  <span className="text-sm text-white">{selectedCase.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-xs text-slate-400">Customer</span>
                  <span className="text-sm text-white font-mono">{selectedCase.customerId}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-xs text-slate-400">Priority</span>
                  <span className={cn(
                    "text-sm font-medium",
                    selectedCase.priority === 'Critical' ? 'text-red-400' :
                    selectedCase.priority === 'High' ? 'text-orange-400' :
                    selectedCase.priority === 'Medium' ? 'text-amber-400' : 'text-blue-400'
                  )}>
                    {selectedCase.priority}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-xs text-slate-400">Status</span>
                  <span className="text-sm text-white">{selectedCase.status}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-xs text-slate-400">Assigned To</span>
                  <span className="text-sm text-white">{selectedCase.assignedTo}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-xs text-slate-400">Potential Loss</span>
                  <span className="text-sm text-white">₹{selectedCase.lossAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-xs text-slate-400">Detected</span>
                  <span className="text-sm text-white">{new Date(selectedCase.detectedAt).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
                  Start Investigation
                </button>
                <button className="flex-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                  Mark Resolved
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

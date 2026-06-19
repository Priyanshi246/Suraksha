import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, RefreshCw, Mail, Phone, AlertTriangle, Shield, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { recoveryAttempts } from '../data/demoData';
import { cn } from '../lib/utils';

export function AccountRecoveryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = recoveryAttempts.filter(r => {
    const matchesSearch = r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: recoveryAttempts.length,
    passwordReset: recoveryAttempts.filter(r => r.type === 'Password Reset').length,
    suspicious: recoveryAttempts.filter(r => r.suspicious).length,
    blocked: recoveryAttempts.filter(r => r.status === 'Blocked').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Account Recovery Security</h1>
          <p className="text-sm text-slate-400">Monitor recovery attempts and detect suspicious activity</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Requests', value: stats.total, icon: RefreshCw, color: 'blue' },
            { label: 'Password Resets', value: stats.passwordReset, icon: KeyRound, color: 'amber' },
            { label: 'Suspicious', value: stats.suspicious, icon: AlertTriangle, color: 'red' },
            { label: 'Blocked', value: stats.blocked, icon: Shield, color: 'rose' },
          ].map(stat => (
            <div key={stat.label} className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("rounded-lg p-1.5", stat.color === 'blue' && 'bg-blue-500/10', stat.color === 'emerald' && 'bg-emerald-500/10', stat.color === 'amber' && 'bg-amber-500/10', stat.color === 'rose' && 'bg-red-500/10')}>
                  <stat.icon className={cn("h-4 w-4", stat.color === 'blue' && 'text-blue-400', stat.color === 'emerald' && 'text-emerald-400', stat.color === 'amber' && 'text-amber-400', stat.color === 'rose' && 'text-red-400')} />
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
              placeholder="Search recovery attempts..."
              className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="Password Reset">Password Reset</option>
            <option value="Email Change">Email Change</option>
            <option value="Mobile Change">Mobile Change</option>
            <option value="Account Recovery">Account Recovery</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        {/* Recovery Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Request ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Suspicious</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">IP Address</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "border-b border-slate-800/30 transition-colors",
                      r.suspicious ? "bg-red-500/5 hover:bg-red-500/10" : "hover:bg-slate-800/30"
                    )}
                  >
                    <td className="px-4 py-3 text-white font-mono">{r.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {r.type === 'Password Reset' && <KeyRound className="h-3.5 w-3.5 text-slate-400" />}
                        {r.type === 'Email Change' && <Mail className="h-3.5 w-3.5 text-slate-400" />}
                        {r.type === 'Mobile Change' && <Phone className="h-3.5 w-3.5 text-slate-400" />}
                        {r.type === 'Account Recovery' && <RefreshCw className="h-3.5 w-3.5 text-slate-400" />}
                        <span className="text-slate-300">{r.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono">{r.customerId}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        r.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' :
                        r.status === 'Failed' ? 'bg-red-500/10 text-red-400' :
                        r.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                      )}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.suspicious ? (
                        <span className="flex items-center gap-1 text-red-400 text-xs">
                          <AlertTriangle className="h-3.5 w-3.5" /> Yes
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-400 text-xs">
                          <CheckCircle className="h-3.5 w-3.5" /> No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{r.ipAddress}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{new Date(r.timestamp).toLocaleString('en-IN')}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

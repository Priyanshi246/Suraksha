import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, Activity, Shield, AlertTriangle, Brain,
  TrendingUp, TrendingDown, Smartphone, ArrowUpRight, ArrowDownRight,
  Clock, Globe, Lock, CreditCard, Radio
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
  Legend
} from 'recharts';
import { DashboardLayout } from '../components/DashboardLayout';
import {
  dashboardMetrics, fraudTrendData, riskDistributionData,
  deviceTrustData, authActivityData, hourlyFraudData, alerts
} from '../data/demoData';
import { cn } from '../lib/utils';

const COLORS = {
  trusted: '#22c55e',
  medium: '#eab308',
  high: '#ef4444',
  critical: '#b91c1c',
  blue: '#3b82f6',
  cyan: '#06b6d4',
  purple: '#8b5cf6',
  slate: '#64748b',
};

const pieColors = [COLORS.trusted, COLORS.medium, COLORS.high, COLORS.critical];
const authColors = [COLORS.trusted, COLORS.blue, COLORS.cyan, COLORS.high];

function StatCard({ icon: Icon, title, value, change, changeType, onClick, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "glass-card p-5 cursor-pointer transition-all hover:border-opacity-40",
        onClick && "hover:border-blue-500/30"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("rounded-lg p-2.5 border", colorClasses[color])}>
          <Icon className="h-5 w-5" />
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium",
            changeType === 'up' ? 'text-emerald-400' : 'text-red-400'
          )}>
            {changeType === 'up' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {change}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-slate-400">{title}</div>
    </motion.div>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadAlerts = alerts.filter(a => !a.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Security Dashboard</h1>
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              {currentTime.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'medium' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-300">System Operational</span>
            </div>
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs text-slate-300">Live Monitoring</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            title="Total Users Protected"
            value={dashboardMetrics.totalUsersProtected.toLocaleString('en-IN')}
            change="+12.5%"
            changeType="up"
            color="blue"
            onClick={() => navigate('/trust-center')}
          />
          <StatCard
            icon={Activity}
            title="Active Sessions"
            value={dashboardMetrics.activeSessions.toLocaleString('en-IN')}
            change="+8.3%"
            changeType="up"
            color="green"
          />
          <StatCard
            icon={Shield}
            title="Fraud Attempts Prevented"
            value={dashboardMetrics.fraudAttemptsPrevented.toLocaleString('en-IN')}
            change="+24.1%"
            changeType="up"
            color="purple"
            onClick={() => navigate('/fraud-detection')}
          />
          <StatCard
            icon={AlertTriangle}
            title="High Risk Events"
            value={dashboardMetrics.highRiskEvents}
            change="-15.2%"
            changeType="down"
            color="red"
            onClick={() => navigate('/alerts')}
          />
        </div>

        {/* Second Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={Brain}
            title="Trust Score Average"
            value={`${dashboardMetrics.trustScoreAverage}%`}
            change="+3.2%"
            changeType="up"
            color="green"
            onClick={() => navigate('/trust-center')}
          />
          <StatCard
            icon={Smartphone}
            title="New Devices Today"
            value={dashboardMetrics.newDevicesToday}
            change="+5"
            changeType="up"
            color="amber"
            onClick={() => navigate('/device-trust')}
          />
          <StatCard
            icon={Lock}
            title="Blocked Transactions"
            value={dashboardMetrics.blockedTransactions}
            change="-8.1%"
            changeType="down"
            color="red"
            onClick={() => navigate('/fraud-detection')}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fraud Trend Chart */}
          <div className="glass-card p-5">
            <SectionHeader
              title="Fraud Trend Analysis"
              subtitle="Monthly fraud detection vs prevention"
            />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fraudTrendData}>
                  <defs>
                    <linearGradient id="fraudDetected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.red} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.red} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fraudPrevented" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="fraudDetected" name="Detected" stroke={COLORS.red} fill="url(#fraudDetected)" strokeWidth={2} />
                  <Area type="monotone" dataKey="fraudPrevented" name="Prevented" stroke={COLORS.blue} fill="url(#fraudPrevented)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="glass-card p-5">
            <SectionHeader
              title="Risk Distribution"
              subtitle="User population by risk level"
            />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelStyle={{ fill: '#94a3b8', fontSize: 12 }}
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Second Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Trust Overview */}
          <div className="glass-card p-5">
            <SectionHeader
              title="Device Trust Overview"
              subtitle="Device categorization by trust level"
            />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceTrustData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis type="number" stroke="#64748b" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {deviceTrustData.map((entry, index) => (
                      <Cell key={entry.name} fill={[COLORS.trusted, COLORS.blue, COLORS.medium, COLORS.high][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Authentication Activity */}
          <div className="glass-card p-5">
            <SectionHeader
              title="Authentication Activity"
              subtitle="Authentication outcomes distribution"
            />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={authActivityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelStyle={{ fill: '#94a3b8', fontSize: 12 }}
                  >
                    {authActivityData.map((entry, index) => (
                      <Cell key={entry.name} fill={authColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hourly Fraud Chart */}
        <div className="glass-card p-5">
          <SectionHeader
            title="Hourly Fraud Activity (24h)"
            subtitle="Fraud attempts and prevention by hour"
          />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyFraudData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
                <Legend />
                <Bar dataKey="attempts" name="Attempts" fill={COLORS.red} radius={[4, 4, 0, 0]} />
                <Bar dataKey="prevented" name="Prevented" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="glass-card p-5">
          <SectionHeader
            title="Recent Alerts"
            subtitle={`${unreadAlerts} unread alerts`}
            action={
              <button
                onClick={() => navigate('/alerts')}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                View All
              </button>
            }
          />
          <div className="space-y-2">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                onClick={() => navigate('/alerts')}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors",
                  alert.read ? "bg-slate-800/30" : "bg-slate-800/50 border border-slate-700/50"
                )}
              >
                <div className={cn(
                  "h-2 w-2 rounded-full shrink-0",
                  alert.severity === 'Critical' ? 'bg-red-400' :
                  alert.severity === 'High' ? 'bg-orange-400' :
                  alert.severity === 'Medium' ? 'bg-amber-400' : 'bg-blue-400'
                )} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{alert.title}</div>
                  <div className="text-xs text-slate-400">{alert.type} - {new Date(alert.timestamp).toLocaleString('en-IN')}</div>
                </div>
                <div className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  alert.severity === 'Critical' ? 'bg-red-500/10 text-red-400' :
                  alert.severity === 'High' ? 'bg-orange-500/10 text-orange-400' :
                  alert.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                )}>
                  {alert.severity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Smartphone, Activity, Lock, Eye, RefreshCw, UserCheck } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { customers } from '../data/demoData';
import { cn } from '../lib/utils';

const scoreCategories = [
  { key: 'behavioral', label: 'Behavioral Score', icon: Activity, color: 'blue', weight: 25 },
  { key: 'device', label: 'Device Score', icon: Smartphone, color: 'emerald', weight: 20 },
  { key: 'transaction', label: 'Transaction Score', icon: Shield, color: 'amber', weight: 25 },
  { key: 'recovery', label: 'Recovery Score', icon: RefreshCw, color: 'purple', weight: 15 },
  { key: 'insider', label: 'Insider Risk Score', icon: Eye, color: 'rose', weight: 15 },
];

function ScoreGauge({ value, label, color, size = 120 }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const colorMap = {
    blue: '#3b82f6',
    emerald: '#22c55e',
    amber: '#eab308',
    purple: '#8b5cf6',
    rose: '#f43f5e',
  };
  const strokeColor = colorMap[color] || '#3b82f6';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={45} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth={8} />
          <motion.circle
            cx={size/2}
            cy={size/2}
            r={45}
            fill="none"
            stroke={strokeColor}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white">{value}</span>
          <span className="text-[10px] text-slate-500">/100</span>
        </div>
      </div>
      <span className="text-xs text-slate-400 mt-2">{label}</span>
    </div>
  );
}

function TrustScoreRing({ score, size = 200 }) {
  const circumference = 2 * Math.PI * 85;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const getColor = () => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };
  const color = getColor();

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={85} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth={12} />
        <motion.circle
          cx={size/2}
          cy={size/2}
          r={85}
          fill="none"
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-xs text-slate-500 mt-1">Trust Score</span>
        <span className={cn(
          "mt-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
          score >= 80 ? 'bg-emerald-500/10 text-emerald-400' :
          score >= 60 ? 'bg-amber-500/10 text-amber-400' :
          score >= 40 ? 'bg-orange-500/10 text-orange-400' : 'bg-red-500/10 text-red-400'
        )}>
          {score >= 80 ? 'TRUSTED' : score >= 60 ? 'MEDIUM RISK' : score >= 40 ? 'HIGH RISK' : 'CRITICAL'}
        </span>
      </div>
    </div>
  );
}

export function TrustCenterPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [scores, setScores] = useState({
    behavioral: 78,
    device: 85,
    transaction: 72,
    recovery: 90,
    insider: 88,
  });
  const [overallScore, setOverallScore] = useState(0);
  const [liveMode, setLiveMode] = useState(false);

  const computeOverall = (s) => {
    return Math.round(
      (s.behavioral * 0.25 + s.device * 0.20 + s.transaction * 0.25 + s.recovery * 0.15 + s.insider * 0.15)
    );
  };

  useEffect(() => {
    setOverallScore(computeOverall(scores));
  }, [scores]);

  useEffect(() => {
    if (!liveMode) return;
    const interval = setInterval(() => {
      setScores(prev => {
        const newScores = {
          behavioral: Math.max(20, Math.min(98, prev.behavioral + Math.floor(Math.random() * 7) - 3)),
          device: Math.max(20, Math.min(98, prev.device + Math.floor(Math.random() * 7) - 3)),
          transaction: Math.max(20, Math.min(98, prev.transaction + Math.floor(Math.random() * 7) - 3)),
          recovery: Math.max(20, Math.min(98, prev.recovery + Math.floor(Math.random() * 7) - 3)),
          insider: Math.max(20, Math.min(98, prev.insider + Math.floor(Math.random() * 7) - 3)),
        };
        return newScores;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [liveMode]);

  const handleCustomerChange = (cust) => {
    setSelectedCustomer(cust);
    const newScores = {
      behavioral: Math.max(30, Math.min(98, cust.trustScore + Math.floor(Math.random() * 20) - 10)),
      device: Math.max(30, Math.min(98, cust.trustScore + Math.floor(Math.random() * 20) - 10)),
      transaction: Math.max(30, Math.min(98, cust.trustScore + Math.floor(Math.random() * 20) - 10)),
      recovery: Math.max(30, Math.min(98, cust.trustScore + Math.floor(Math.random() * 20) - 10)),
      insider: Math.max(30, Math.min(98, cust.trustScore + Math.floor(Math.random() * 20) - 10)),
    };
    setScores(newScores);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">AI Trust Center</h1>
            <p className="text-sm text-slate-400">Continuous identity trust evaluation across all dimensions</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedCustomer.id}
              onChange={(e) => handleCustomerChange(customers.find(c => c.id === e.target.value))}
              className="rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              {customers.slice(0, 20).map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
              ))}
            </select>
            <button
              onClick={() => setLiveMode(!liveMode)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                liveMode
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              )}
            >
              {liveMode ? 'Live: ON' : 'Live Mode'}
            </button>
          </div>
        </div>

        {/* Overall Score */}
        <div className="glass-card p-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex flex-col items-center">
              <TrustScoreRing score={overallScore} />
              <div className="mt-4 flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-300">{selectedCustomer.name}</span>
                <span className="text-xs text-slate-500">{selectedCustomer.id}</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {scoreCategories.map((cat) => (
                <ScoreGauge
                  key={cat.key}
                  value={scores[cat.key]}
                  label={cat.label}
                  color={cat.color}
                  size={100}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Score Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scoreCategories.map((cat) => (
            <motion.div
              key={cat.key}
              whileHover={{ y: -2 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "rounded-lg p-2",
                  cat.color === 'blue' && 'bg-blue-500/10 text-blue-400',
                  cat.color === 'emerald' && 'bg-emerald-500/10 text-emerald-400',
                  cat.color === 'amber' && 'bg-amber-500/10 text-amber-400',
                  cat.color === 'purple' && 'bg-purple-500/10 text-purple-400',
                  cat.color === 'rose' && 'bg-rose-500/10 text-rose-400'
                )}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{cat.label}</div>
                  <div className="text-xs text-slate-400">Weight: {cat.weight}%</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Current Score</span>
                  <span className={cn(
                    "text-sm font-bold",
                    scores[cat.key] >= 80 ? 'text-emerald-400' :
                    scores[cat.key] >= 60 ? 'text-amber-400' :
                    scores[cat.key] >= 40 ? 'text-orange-400' : 'text-red-400'
                  )}>
                    {scores[cat.key]}/100
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      scores[cat.key] >= 80 ? 'bg-emerald-500' :
                      scores[cat.key] >= 60 ? 'bg-amber-500' :
                      scores[cat.key] >= 40 ? 'bg-orange-500' : 'bg-red-500'
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${scores[cat.key]}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  {cat.key === 'behavioral' && 'Analysis of typing patterns, session activity, and navigation behavior'}
                  {cat.key === 'device' && 'Device fingerprint, browser info, OS version, and IP reputation'}
                  {cat.key === 'transaction' && 'Transaction velocity, amount patterns, and beneficiary analysis'}
                  {cat.key === 'recovery' && 'Password reset frequency, email changes, and account recovery attempts'}
                  {cat.key === 'insider' && 'Privileged access patterns, data download behavior, and after-hours activity'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Risk Assessment Summary */}
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg bg-slate-800/50 p-4">
              <div className="text-xs text-slate-400 mb-1">Risk Level</div>
              <div className={cn(
                "text-lg font-bold",
                overallScore >= 80 ? 'text-emerald-400' :
                overallScore >= 60 ? 'text-amber-400' :
                overallScore >= 40 ? 'text-orange-400' : 'text-red-400'
              )}>
                {overallScore >= 80 ? 'LOW RISK' : overallScore >= 60 ? 'MEDIUM RISK' : overallScore >= 40 ? 'HIGH RISK' : 'CRITICAL RISK'}
              </div>
            </div>
            <div className="rounded-lg bg-slate-800/50 p-4">
              <div className="text-xs text-slate-400 mb-1">Authentication Required</div>
              <div className="text-lg font-bold text-white">
                {overallScore >= 80 ? 'Standard Login' : overallScore >= 60 ? 'OTP + MFA' : overallScore >= 40 ? 'Biometric + OTP' : 'Block & Review'}
              </div>
            </div>
            <div className="rounded-lg bg-slate-800/50 p-4">
              <div className="text-xs text-slate-400 mb-1">Last Updated</div>
              <div className="text-lg font-bold text-white">Just now</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

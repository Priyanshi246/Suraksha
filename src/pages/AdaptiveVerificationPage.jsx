import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Fingerprint, KeyRound, XCircle, CheckCircle, Brain, ArrowRight } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { cn } from '../lib/utils';

const scenarios = [
  {
    range: '80-100',
    minScore: 80,
    title: 'Access Granted',
    description: 'User trust score exceeds 80. Full access granted with minimal friction.',
    icon: CheckCircle,
    color: 'emerald',
    action: 'Standard Authentication',
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  {
    range: '50-79',
    minScore: 50,
    title: 'OTP Verification',
    description: 'Medium trust score detected. Additional OTP verification required.',
    icon: KeyRound,
    color: 'blue',
    action: 'OTP + MFA',
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  {
    range: '30-49',
    minScore: 30,
    title: 'Face Verification',
    description: 'Lower trust score requires biometric face verification for access.',
    icon: Fingerprint,
    color: 'amber',
    action: 'Biometric + OTP',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  {
    range: '0-29',
    minScore: 0,
    title: 'Session Blocked',
    description: 'Critical risk detected. Access denied and session blocked.',
    icon: XCircle,
    color: 'red',
    action: 'Block & Alert',
    iconBg: 'bg-red-500/10',
    iconText: 'text-red-400',
    border: 'border-red-500/20',
  },
];

export function AdaptiveVerificationPage() {
  const [trustScore, setTrustScore] = useState(65);
  const [activeScenario, setActiveScenario] = useState(1);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    if (simulating) {
      const interval = setInterval(() => {
        setTrustScore(prev => {
          const newScore = Math.max(10, Math.min(98, prev + Math.floor(Math.random() * 15) - 7));
          if (newScore >= 80) setActiveScenario(0);
          else if (newScore >= 50) setActiveScenario(1);
          else if (newScore >= 30) setActiveScenario(2);
          else setActiveScenario(3);
          return newScore;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [simulating]);

  const active = scenarios[activeScenario];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Adaptive Verification Engine</h1>
            <p className="text-sm text-slate-400">Dynamic authentication based on real-time trust scores</p>
          </div>
          <button
            onClick={() => setSimulating(!simulating)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              simulating
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            {simulating ? 'Stop Simulation' : 'Start Simulation'}
          </button>
        </div>

        {/* Score Display */}
        <div className="glass-card p-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="h-48 w-48 rounded-full border-8 border-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    key={trustScore}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "text-5xl font-bold",
                      trustScore >= 80 ? 'text-emerald-400' :
                      trustScore >= 50 ? 'text-blue-400' :
                      trustScore >= 30 ? 'text-amber-400' : 'text-red-400'
                    )}
                  >
                    {trustScore}
                  </motion.div>
                  <div className="text-xs text-slate-500 mt-1">Trust Score</div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-8 border-transparent"
                style={{
                  borderTopColor: trustScore >= 80 ? '#22c55e' : trustScore >= 50 ? '#3b82f6' : trustScore >= 30 ? '#eab308' : '#ef4444',
                  transform: `rotate(${(trustScore / 100) * 360 - 90}deg)`,
                  transition: 'transform 0.5s ease-out',
                }}
              />
            </div>
            <div className={cn(
              "rounded-full px-4 py-1.5 text-sm font-bold",
              trustScore >= 80 ? 'bg-emerald-500/10 text-emerald-400' :
              trustScore >= 50 ? 'bg-blue-500/10 text-blue-400' :
              trustScore >= 30 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
            )}>
              {active.title}
            </div>
          </div>
        </div>

        {/* Decision Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenarios.map((scenario, i) => (
            <motion.div
              key={scenario.range}
              whileHover={{ y: -2 }}
              className={cn(
                "glass-card p-5 transition-all",
                activeScenario === i ? scenario.border : "",
                activeScenario === i ? "ring-1 ring-opacity-50" : ""
              )}
              style={activeScenario === i ? {
                ringColor: scenario.color === 'emerald' ? '#22c55e' :
                  scenario.color === 'blue' ? '#3b82f6' :
                  scenario.color === 'amber' ? '#eab308' : '#ef4444'
              } : {}}
            >
              <div className={cn("rounded-lg p-3 w-fit mb-3", scenario.iconBg)}>
                <scenario.icon className={cn("h-6 w-6", scenario.iconText)} />
              </div>
              <div className="text-xs text-slate-400 mb-1">Score Range: {scenario.range}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{scenario.title}</h3>
              <p className="text-xs text-slate-400 mb-3">{scenario.description}</p>
              <div className="flex items-center gap-2">
                <Brain className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-xs text-slate-300">{scenario.action}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workflow */}
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Verification Workflow</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {[
              { label: 'User Login', icon: Lock },
              { label: 'Trust Score', icon: Brain },
              { label: 'Risk Analysis', icon: Shield },
              { label: active.action, icon: active.icon },
              { label: 'Access Decision', icon: CheckCircle },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2",
                  i === 3 ? active.iconBg : 'bg-slate-800/50',
                  i === 3 ? active.border : ''
                )}>
                  <step.icon className={cn("h-4 w-4", i === 3 ? active.iconText : 'text-slate-400')} />
                  <span className={cn("text-xs font-medium", i === 3 ? 'text-white' : 'text-slate-400')}>{step.label}</span>
                </div>
                {i < 4 && <ArrowRight className="h-4 w-4 text-slate-600 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

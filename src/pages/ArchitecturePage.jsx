import { motion } from 'framer-motion';
import { User, Lock, Brain, Smartphone, BarChart3, Shield, CheckCircle, Server, ArrowDown, Zap, Globe, Database, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

const architectureSteps = [
  {
    icon: User,
    title: 'Customer',
    subtitle: 'Digital Banking User',
    description: 'End-user accessing banking services via mobile app, web portal, or ATM. All interactions are continuously monitored.',
    color: 'blue',
    details: ['Mobile App', 'Web Portal', 'ATM', 'USSD'],
  },
  {
    icon: Lock,
    title: 'Authentication',
    subtitle: 'Identity Verification Layer',
    description: 'Multi-factor authentication with biometric, OTP, and password validation. Initial trust establishment.',
    color: 'purple',
    details: ['Password Auth', 'OTP/SMS', 'Biometric', 'Hardware Token'],
  },
  {
    icon: Brain,
    title: 'Behavior Analytics Engine',
    subtitle: 'AI Behavioral Analysis',
    description: 'Machine learning models analyze typing patterns, mouse movements, session duration, and navigation behavior.',
    color: 'amber',
    details: ['Typing Dynamics', 'Mouse Analysis', 'Session Tracking', 'Anomaly Detection'],
  },
  {
    icon: Smartphone,
    title: 'Device Trust Engine',
    subtitle: 'Device Intelligence',
    description: 'Device fingerprinting, browser analysis, IP intelligence, and geolocation verification for every access.',
    color: 'emerald',
    details: ['Fingerprinting', 'Browser Analysis', 'IP Intelligence', 'Geolocation'],
  },
  {
    icon: BarChart3,
    title: 'Risk Scoring Engine',
    subtitle: 'Dynamic Risk Assessment',
    description: 'Real-time risk score calculation across behavioral, device, transaction, recovery, and insider dimensions.',
    color: 'orange',
    details: ['Trust Score Calc', 'Risk Aggregation', 'Threat Modeling', 'ML Classification'],
  },
  {
    icon: Shield,
    title: 'Adaptive Verification Engine',
    subtitle: 'Intelligent Authentication',
    description: 'Dynamic verification requirements based on real-time risk scores: standard, OTP, biometric, or block.',
    color: 'rose',
    details: ['Score > 80: Access', 'Score 50-80: OTP', 'Score 30-50: Face', 'Score < 30: Block'],
  },
  {
    icon: CheckCircle,
    title: 'Secure Banking Access',
    subtitle: 'Protected Transaction Layer',
    description: 'Secure access to banking services with full audit trail and compliance monitoring.',
    color: 'cyan',
    details: ['Transaction Auth', 'Audit Logging', 'Compliance', 'Data Encryption'],
  },
];

export function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 mb-4">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">System Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Suraksha AI Architecture
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Continuous Identity Trust Platform: End-to-end flow from customer interaction to secure banking access
          </p>
        </div>

        <div className="space-y-4">
          {architectureSteps.map((step, i) => (
            <div key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 hover:border-blue-500/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className={cn(
                    "h-14 w-14 rounded-xl flex items-center justify-center shrink-0",
                    step.color === 'blue' && 'bg-blue-500/10',
                    step.color === 'purple' && 'bg-purple-500/10',
                    step.color === 'amber' && 'bg-amber-500/10',
                    step.color === 'emerald' && 'bg-emerald-500/10',
                    step.color === 'orange' && 'bg-orange-500/10',
                    step.color === 'rose' && 'bg-rose-500/10',
                    step.color === 'cyan' && 'bg-cyan-500/10'
                  )}>
                    <step.icon className={cn(
                      "h-7 w-7",
                      step.color === 'blue' && 'text-blue-400',
                      step.color === 'purple' && 'text-purple-400',
                      step.color === 'amber' && 'text-amber-400',
                      step.color === 'emerald' && 'text-emerald-400',
                      step.color === 'orange' && 'text-orange-400',
                      step.color === 'rose' && 'text-rose-400',
                      step.color === 'cyan' && 'text-cyan-400'
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <span className="text-xs text-slate-500">{step.subtitle}</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.details.map((detail, j) => (
                        <span
                          key={j}
                          className="rounded-full bg-slate-800/50 px-3 py-1 text-xs text-slate-300 border border-slate-700/50"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
                    <span className="rounded-full bg-slate-800 px-2 py-1 font-mono">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              </motion.div>
              {i < architectureSteps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-6 w-6 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Technical Infrastructure */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Technical Infrastructure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Globe, title: 'API Gateway', desc: 'Rate limiting, routing, SSL termination', color: 'blue' },
              { icon: Database, title: 'Data Lake', desc: 'Behavioral data, device fingerprints, transactions', color: 'purple' },
              { icon: Activity, title: 'ML Pipeline', desc: 'Real-time inference, model training, feature store', color: 'emerald' },
              { icon: Server, title: 'Event Bus', desc: 'Kafka for streaming analytics and alerts', color: 'amber' },
            ].map((infra, i) => (
              <motion.div
                key={infra.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 text-center"
              >
                <div className={cn(
                  "h-12 w-12 rounded-lg flex items-center justify-center mx-auto mb-3",
                  infra.color === 'blue' && 'bg-blue-500/10',
                  infra.color === 'purple' && 'bg-purple-500/10',
                  infra.color === 'emerald' && 'bg-emerald-500/10',
                  infra.color === 'amber' && 'bg-amber-500/10'
                )}>
                  <infra.icon className={cn(
                    "h-6 w-6",
                    infra.color === 'blue' && 'text-blue-400',
                    infra.color === 'purple' && 'text-purple-400',
                    infra.color === 'emerald' && 'text-emerald-400',
                    infra.color === 'amber' && 'text-amber-400'
                  )} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{infra.title}</h3>
                <p className="text-xs text-slate-400">{infra.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

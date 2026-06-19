import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, ArrowRight, Fingerprint, Smartphone, Brain,
  AlertTriangle, Lock, Eye, CreditCard, Server,
  Activity, CheckCircle, ChevronRight, Globe, Zap,
  BarChart3, Scan, Radio, UserCheck, Layers
} from 'lucide-react';
import { testimonials } from '../data/demoData';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />;
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <ParticleBackground />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 mb-8">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Bank of Baroda Hackathon 2026</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-16 w-16 text-blue-500" />
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              Suraksha <span className="gradient-text">AI</span>
            </h1>
          </div>

          <p className="text-xl sm:text-2xl font-medium text-slate-400 font-hindi mb-4">
            सुरक्षित पहचान, सुरक्षित बैंकिंग
          </p>

          <p className="mx-auto max-w-3xl text-lg text-slate-400 mb-10">
            AI-Powered Continuous Identity Trust Platform for Secure Digital Banking.
            Continuously validates digital identities using behavioral analytics, device intelligence,
            and adaptive authentication.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-lg font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition-all"
            >
              View Dashboard
              <BarChart3 className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: 'Users Protected', value: '12,450+', icon: UserCheck },
            { label: 'Fraud Prevented', value: '1,289+', icon: Shield },
            { label: 'Trust Score', value: '87%', icon: Activity },
            { label: 'Uptime', value: '99.99%', icon: Globe },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <stat.icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const threats = [
    { icon: Fingerprint, title: 'Identity Theft', desc: 'Unauthorized use of stolen credentials to impersonate legitimate customers and access accounts.', color: 'text-red-400' },
    { icon: Lock, title: 'Account Takeover', desc: 'Criminals gaining control of customer accounts through credential stuffing and brute force.', color: 'text-orange-400' },
    { icon: CreditCard, title: 'KYC Fraud', desc: 'Synthetic identities and forged documents used to bypass Know Your Customer verification.', color: 'text-yellow-400' },
    { icon: Smartphone, title: 'Device Spoofing', desc: 'Malicious actors mimicking trusted devices to bypass device-based security checks.', color: 'text-purple-400' },
    { icon: Eye, title: 'Insider Threats', desc: 'Malicious or negligent employees misusing privileged access to sensitive banking data.', color: 'text-pink-400' },
  ];

  return (
    <section id="problems" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 mb-6">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-sm font-medium text-red-300">Critical Threats</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Banking Threats We Address
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
            The financial sector faces increasingly sophisticated cyber threats. Suraksha AI provides comprehensive protection against these critical risks.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {threats.map((threat, i) => (
            <motion.div
              key={threat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:border-red-500/20 transition-all duration-300 group"
            >
              <div className={`rounded-lg bg-slate-800/50 p-3 w-fit mb-4 group-hover:bg-slate-800 transition-colors`}>
                <threat.icon className={`h-6 w-6 ${threat.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{threat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{threat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: Brain, title: 'Behavioral Analytics', desc: 'AI-powered analysis of user behavior patterns including typing dynamics, mouse movements, and session activity to detect anomalies in real-time.' },
    { icon: Smartphone, title: 'Device Trust Intelligence', desc: 'Comprehensive device fingerprinting and trust scoring that evaluates every device accessing your banking systems for risk assessment.' },
    { icon: BarChart3, title: 'Risk Scoring Engine', desc: 'Dynamic risk scoring algorithm that continuously evaluates user identity trust across multiple dimensions with real-time updates.' },
    { icon: Scan, title: 'Fraud Detection', desc: 'Advanced fraud detection powered by machine learning that identifies suspicious transactions, account takeover attempts, and financial crimes.' },
    { icon: Shield, title: 'Adaptive Authentication', desc: 'Intelligent multi-factor authentication that adapts verification requirements based on real-time risk scores and behavioral signals.' },
    { icon: Eye, title: 'Insider Threat Monitoring', desc: 'Enterprise-grade employee activity monitoring that detects privileged access misuse, data exfiltration, and suspicious internal behavior.' },
  ];

  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 mb-6">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Platform Features</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Enterprise-Grade Security Features
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive suite of AI-powered security modules designed to protect every aspect of digital banking identity.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:border-blue-500/20 transition-all duration-300 group"
            >
              <div className="rounded-lg bg-blue-500/10 p-3 w-fit mb-4 group-hover:bg-blue-500/20 transition-colors">
                <feature.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: UserCheck, title: 'User Activity', desc: 'Every user interaction is captured across channels' },
    { icon: Brain, title: 'AI Monitoring', desc: 'Machine learning models analyze behavior in real-time' },
    { icon: Activity, title: 'Trust Score Generation', desc: 'Dynamic trust scores calculated across all dimensions' },
    { icon: AlertTriangle, title: 'Risk Assessment', desc: 'Anomalies flagged and risk levels determined' },
    { icon: Shield, title: 'Adaptive Verification', desc: 'Verification steps adjusted based on risk score' },
    { icon: Lock, title: 'Secure Banking Access', desc: 'Only trusted users granted appropriate access levels' },
  ];

  return (
    <section id="how-it-works" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 mb-6">
            <Layers className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">Workflow</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How Suraksha AI Works
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
            Continuous identity trust validation that protects users throughout their entire banking session.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 relative"
            >
              <div className="absolute -top-3 -left-3 rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="rounded-lg bg-emerald-500/10 p-3 w-fit mb-4">
                <step.icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 text-slate-600">
                  <ChevronRight className="h-6 w-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 mb-6">
            <CheckCircle className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Testimonials</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by Leading Banks
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
            Enterprise banking leaders rely on Suraksha AI to protect their customers and digital assets.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Zap key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}, {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-slate-400 mb-8">
              Ready to secure your banking infrastructure? Contact our team for a demo or partnership inquiry.
            </p>
            <div className="space-y-4">
              {[
                { icon: Globe, label: 'Website', value: 'www.surakshaai.in' },
                { icon: Server, label: 'Enterprise Support', value: 'enterprise@surakshaai.in' },
                { icon: Radio, label: 'SOC Hotline', value: '+91 80 1234 5678' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <item.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                    <div className="text-sm font-medium text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1 block">Full Name</label>
                  <input type="text" className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1 block">Email</label>
                  <input type="email" className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" placeholder="you@company.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Organization</label>
                <input type="text" className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" placeholder="Bank of Baroda" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Message</label>
                <textarea rows={4} className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" placeholder="Tell us about your requirements..." />
              </div>
              <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-bold text-white">Suraksha AI</span>
            </div>
            <p className="text-sm text-slate-400">
              AI-Powered Continuous Identity Trust Platform for Secure Digital Banking.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/architecture" className="hover:text-white transition-colors">Architecture</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Security</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/trust-center" className="hover:text-white transition-colors">Trust Center</Link></li>
              <li><Link to="/fraud-detection" className="hover:text-white transition-colors">Fraud Detection</Link></li>
              <li><Link to="/soc" className="hover:text-white transition-colors">SOC</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span>About</span></li>
              <li><span>Contact</span></li>
              <li><span>Privacy</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800/50 pt-8 text-center text-sm text-slate-500">
          <p>Suraksha AI - Bank of Baroda Hackathon 2026. All rights reserved.</p>
          <p className="mt-1 font-hindi">सुरक्षित पहचान, सुरक्षित बैंकिंग</p>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

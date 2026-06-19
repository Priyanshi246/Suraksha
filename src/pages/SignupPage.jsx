import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      return 'All fields are required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Please enter a valid email address';
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      return 'Please enter a valid 10-digit mobile number';
    }
    if (form.password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signup({ email: form.email, name: form.name, phone: form.phone });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
      setLoading(false);
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative text-center glass-card p-8 max-w-md w-full">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Account Created!</h2>
          <p className="text-slate-400 mb-4">Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-10 w-10 text-blue-500" />
              <span className="text-2xl font-bold text-white">Suraksha AI</span>
            </div>
            <h1 className="text-xl font-semibold text-white mb-1">Create Account</h1>
            <p className="text-sm text-slate-400">Join the secure banking identity platform</p>
          </div>
          {error && <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" placeholder="Ramesh Kumar" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" placeholder="ramesh@bankofbaroda.co.in" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" placeholder="98765 43210" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" placeholder="Min 8 characters" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full rounded-lg bg-slate-800/50 border border-slate-700 pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none" placeholder="Re-enter password" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">{showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <>Create Account<ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Sign in</Link></p>
        </div>
      </motion.div>
    </div>
  );
}

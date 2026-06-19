import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Smartphone, Bell, Globe, Lock, CheckCircle, Save, KeyRound } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Ramesh Kumar',
    email: user?.email || 'ramesh.kumar@bankofbaroda.co.in',
    phone: user?.phone || '+91 98765 43210',
    role: 'Security Analyst',
    department: 'IT Security',
    location: 'Mumbai, India',
  });
  const [mfa, setMfa] = useState({
    sms: true,
    email: true,
    authenticator: false,
    biometric: true,
  });
  const [notifications, setNotifications] = useState({
    fraud: true,
    device: true,
    recovery: false,
    insider: true,
    security: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">User Profile</h1>
          <p className="text-sm text-slate-400">Manage your profile information and security settings</p>
        </div>

        <div className="flex gap-2">
          {[
            { key: 'profile', label: 'Profile', icon: User },
            { key: 'security', label: 'Security', icon: Shield },
            { key: 'mfa', label: 'MFA Settings', icon: KeyRound },
            { key: 'notifications', label: 'Notifications', icon: Bell },
          ].map(tab => (
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
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
                <p className="text-sm text-slate-400">{profile.role} | {profile.department}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Full Name</label>
                <input
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <input
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                    className="flex-1 rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Phone</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <input
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    className="flex-1 rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Location</label>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-slate-500" />
                  <input
                    value={profile.location}
                    onChange={e => setProfile({ ...profile, location: e.target.value })}
                    className="flex-1 rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Role</label>
                <input value={profile.role} disabled className="w-full rounded-lg bg-slate-800/30 border border-slate-700 px-3 py-2 text-sm text-slate-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Department</label>
                <input value={profile.department} disabled className="w-full rounded-lg bg-slate-800/30 border border-slate-700 px-3 py-2 text-sm text-slate-400 cursor-not-allowed" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={handleSave} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
              {saved && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1 text-sm text-emerald-400">
                  <CheckCircle className="h-4 w-4" /> Saved
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Password</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Current Password</label>
                  <input type="password" className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Enter current password" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">New Password</label>
                    <input type="password" className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Confirm Password</label>
                    <input type="password" className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Confirm new password" />
                  </div>
                </div>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Trusted Devices</h3>
              <div className="space-y-2">
                {[
                  { name: 'Chrome on Windows', device: 'Windows Laptop', last: 'Just now', active: true },
                  { name: 'Safari on iPhone', device: 'iPhone 15', last: '2 hours ago', active: false },
                  { name: 'Firefox on macOS', device: 'MacBook Pro', last: '1 day ago', active: false },
                ].map((device, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-slate-800/30 p-3">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-4 w-4 text-slate-400" />
                      <div>
                        <div className="text-sm text-white">{device.name}</div>
                        <div className="text-xs text-slate-400">{device.device} | {device.last}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {device.active && <span className="text-xs text-emerald-400">Active</span>}
                      <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MFA Tab */}
        {activeTab === 'mfa' && (
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Multi-Factor Authentication</h3>
            <div className="space-y-3">
              {[
                { key: 'sms', label: 'SMS Verification', desc: 'Receive OTP via SMS', icon: Smartphone },
                { key: 'email', label: 'Email Verification', desc: 'Receive OTP via email', icon: Mail },
                { key: 'authenticator', label: 'Authenticator App', desc: 'Use Google Authenticator or similar', icon: Lock },
                { key: 'biometric', label: 'Biometric Authentication', desc: 'Face ID or fingerprint', icon: Shield },
              ].map((method) => (
                <div key={method.key} className="flex items-center justify-between rounded-lg bg-slate-800/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-700/50 p-2">
                      <method.icon className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{method.label}</div>
                      <div className="text-xs text-slate-400">{method.desc}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMfa(prev => ({ ...prev, [method.key]: !prev[method.key] }))}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition-colors",
                      mfa[method.key] ? 'bg-blue-600' : 'bg-slate-700'
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                      mfa[method.key] ? 'translate-x-6' : 'translate-x-1'
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { key: 'fraud', label: 'Fraud Alerts', desc: 'Notifications for suspicious transactions' },
                { key: 'device', label: 'Device Alerts', desc: 'New device or suspicious device activity' },
                { key: 'recovery', label: 'Recovery Alerts', desc: 'Password reset and account recovery attempts' },
                { key: 'insider', label: 'Insider Alerts', desc: 'Employee activity anomalies' },
                { key: 'security', label: 'Security Alerts', desc: 'System security and policy violations' },
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between rounded-lg bg-slate-800/30 p-4">
                  <div>
                    <div className="text-sm font-medium text-white">{pref.label}</div>
                    <div className="text-xs text-slate-400">{pref.desc}</div>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition-colors",
                      notifications[pref.key] ? 'bg-blue-600' : 'bg-slate-700'
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                      notifications[pref.key] ? 'translate-x-6' : 'translate-x-1'
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

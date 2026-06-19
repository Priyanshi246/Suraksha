import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Globe, Bell, Database, Server, Clock, Save, CheckCircle, Moon, Sun, Palette, Monitor, Fingerprint, AlertTriangle, Activity, Eye, RefreshCw, Lock } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    sessionTimeout: 30,
  });
  const [securitySettings, setSecuritySettings] = useState({
    autoLock: true,
    lockDuration: 15,
    passwordExpiry: 90,
    mfaRequired: true,
    ipWhitelist: false,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushAlerts: true,
    digestMode: 'realtime',
  });
  const [systemSettings, setSystemSettings] = useState({
    retentionPeriod: 365,
    logLevel: 'info',
    backupEnabled: true,
    backupFrequency: 'daily',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { key: 'general', label: 'General', icon: Settings },
    { key: 'security', label: 'Security', icon: Shield },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'system', label: 'System', icon: Server },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-sm text-slate-400">Configure platform preferences and system settings</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 text-sm text-emerald-400"
              >
                <CheckCircle className="h-4 w-4" /> Saved
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {tabs.map(tab => (
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

        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Palette className="h-4 w-4 text-blue-400" />
                Appearance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white">Theme</div>
                    <div className="text-xs text-slate-400">Choose your preferred color scheme</div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                      theme === 'dark'
                        ? "bg-slate-800 text-white border border-slate-700"
                        : "bg-slate-800 text-white border border-slate-700"
                    )}
                  >
                    {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-400" />
                Regional Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Language</label>
                  <select
                    value={generalSettings.language}
                    onChange={e => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                    <option value="gu">Gujarati</option>
                    <option value="ta">Tamil</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Timezone</label>
                  <select
                    value={generalSettings.timezone}
                    onChange={e => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                    <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Date Format</label>
                  <select
                    value={generalSettings.dateFormat}
                    onChange={e => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })}
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={generalSettings.sessionTimeout}
                    onChange={e => setGeneralSettings({ ...generalSettings, sessionTimeout: parseInt(e.target.value) })}
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-400" />
                Security Policy
              </h3>
              <div className="space-y-4">
                {[
                  { key: 'autoLock', label: 'Auto Lock', desc: 'Automatically lock screen after inactivity', icon: Monitor },
                  { key: 'mfaRequired', label: 'MFA Required', desc: 'Require multi-factor authentication for all users', icon: Fingerprint },
                  { key: 'ipWhitelist', label: 'IP Whitelist', desc: 'Restrict access to whitelisted IP addresses', icon: Globe },
                ].map(setting => (
                  <div key={setting.key} className="flex items-center justify-between rounded-lg bg-slate-800/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-700/50 p-2">
                        <setting.icon className="h-4 w-4 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{setting.label}</div>
                        <div className="text-xs text-slate-400">{setting.desc}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        securitySettings[setting.key] ? 'bg-blue-600' : 'bg-slate-700'
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                        securitySettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Auto Lock Duration (minutes)</label>
                  <input
                    type="number"
                    value={securitySettings.lockDuration}
                    onChange={e => setSecuritySettings({ ...securitySettings, lockDuration: parseInt(e.target.value) })}
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Password Expiry (days)</label>
                  <input
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={e => setSecuritySettings({ ...securitySettings, passwordExpiry: parseInt(e.target.value) })}
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-400" />
                Alert Channels
              </h3>
              <div className="space-y-4">
                {[
                  { key: 'emailAlerts', label: 'Email Alerts', desc: 'Send security alerts via email', icon: Monitor },
                  { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Send critical alerts via SMS', icon: Monitor },
                  { key: 'pushAlerts', label: 'Push Notifications', desc: 'Browser push notifications for real-time alerts', icon: Monitor },
                ].map(setting => (
                  <div key={setting.key} className="flex items-center justify-between rounded-lg bg-slate-800/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-700/50 p-2">
                        <Bell className="h-4 w-4 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{setting.label}</div>
                        <div className="text-xs text-slate-400">{setting.desc}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotificationSettings(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        notificationSettings[setting.key] ? 'bg-blue-600' : 'bg-slate-700'
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                        notificationSettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="text-xs text-slate-400 mb-1.5 block">Digest Mode</label>
                <select
                  value={notificationSettings.digestMode}
                  onChange={e => setNotificationSettings({ ...notificationSettings, digestMode: e.target.value })}
                  className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="realtime">Real-time</option>
                  <option value="hourly">Hourly Digest</option>
                  <option value="daily">Daily Digest</option>
                  <option value="weekly">Weekly Digest</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-400" />
                Data Management
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Data Retention (days)</label>
                  <input
                    type="number"
                    value={systemSettings.retentionPeriod}
                    onChange={e => setSystemSettings({ ...systemSettings, retentionPeriod: parseInt(e.target.value) })}
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Log Level</label>
                  <select
                    value={systemSettings.logLevel}
                    onChange={e => setSystemSettings({ ...systemSettings, logLevel: e.target.value })}
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="debug">Debug</option>
                    <option value="info">Info</option>
                    <option value="warn">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-400" />
                Backup & Recovery
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-slate-800/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-700/50 p-2">
                      <Database className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Automatic Backup</div>
                      <div className="text-xs text-slate-400">Enable automated database backups</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSystemSettings(prev => ({ ...prev, backupEnabled: !prev.backupEnabled }))}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition-colors",
                      systemSettings.backupEnabled ? 'bg-blue-600' : 'bg-slate-700'
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                      systemSettings.backupEnabled ? 'translate-x-6' : 'translate-x-1'
                    )} />
                  </button>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Backup Frequency</label>
                  <select
                    value={systemSettings.backupFrequency}
                    onChange={e => setSystemSettings({ ...systemSettings, backupFrequency: e.target.value })}
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

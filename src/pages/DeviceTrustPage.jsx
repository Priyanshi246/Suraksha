import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Wifi, Fingerprint, MapPin, Clock, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { devices } from '../data/demoData';
import { cn } from '../lib/utils';

export function DeviceTrustPage() {
  const [filter, setFilter] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = devices.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'new') return d.isNew;
    if (filter === 'trusted') return d.riskLevel === 'Trusted';
    if (filter === 'suspicious') return d.riskLevel === 'High Risk';
    return true;
  }).filter(d =>
    d.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.customerId.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 50);

  const deviceStats = {
    total: devices.length,
    trusted: devices.filter(d => d.riskLevel === 'Trusted').length,
    new: devices.filter(d => d.isNew).length,
    suspicious: devices.filter(d => d.riskLevel === 'High Risk').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Device Trust Intelligence</h1>
          <p className="text-sm text-slate-400">Comprehensive device fingerprinting and trust scoring</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Devices', value: deviceStats.total, icon: Smartphone, color: 'blue' },
            { label: 'Trusted', value: deviceStats.trusted, icon: CheckCircle, color: 'emerald' },
            { label: 'New Devices', value: deviceStats.new, icon: Clock, color: 'amber' },
            { label: 'Suspicious', value: deviceStats.suspicious, icon: AlertTriangle, color: 'red' },
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            {['all', 'trusted', 'new', 'suspicious'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search devices..."
            className="flex-1 rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Device List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-2">
            {filteredDevices.map((device, i) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => setSelectedDevice(device)}
                className={cn(
                  "glass-card p-4 cursor-pointer transition-all hover:border-blue-500/30",
                  selectedDevice?.id === device.id && "border-blue-500/30"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                    device.riskLevel === 'Trusted' ? 'bg-emerald-500/10' :
                    device.riskLevel === 'Medium' ? 'bg-amber-500/10' : 'bg-red-500/10'
                  )}>
                    <Smartphone className={cn(
                      "h-5 w-5",
                      device.riskLevel === 'Trusted' ? 'text-emerald-400' :
                      device.riskLevel === 'Medium' ? 'text-amber-400' : 'text-red-400'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">{device.deviceName}</span>
                      {device.isNew && (
                        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">NEW</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>{device.os}</span>
                      <span>{device.browser}</span>
                      <span>{device.city}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={cn(
                      "text-sm font-bold",
                      device.trustScore >= 80 ? 'text-emerald-400' :
                      device.trustScore >= 50 ? 'text-amber-400' : 'text-red-400'
                    )}>
                      {device.trustScore}
                    </div>
                    <div className={cn(
                      "text-[10px] rounded-full px-2 py-0.5 font-medium",
                      device.riskLevel === 'Trusted' ? 'bg-emerald-500/10 text-emerald-400' :
                      device.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                    )}>
                      {device.riskLevel}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Device Detail */}
          <div>
            {selectedDevice ? (
              <div className="glass-card p-5 sticky top-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className={cn(
                    "h-12 w-12 rounded-lg flex items-center justify-center",
                    selectedDevice.riskLevel === 'Trusted' ? 'bg-emerald-500/10' :
                    selectedDevice.riskLevel === 'Medium' ? 'bg-amber-500/10' : 'bg-red-500/10'
                  )}>
                    <Smartphone className={cn(
                      "h-6 w-6",
                      selectedDevice.riskLevel === 'Trusted' ? 'text-emerald-400' :
                      selectedDevice.riskLevel === 'Medium' ? 'text-amber-400' : 'text-red-400'
                    )} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{selectedDevice.deviceName}</div>
                    <div className="text-xs text-slate-400">{selectedDevice.id}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Fingerprint className="h-3.5 w-3.5" /> Fingerprint
                    </div>
                    <div className="text-xs text-white font-mono">{selectedDevice.fingerprint.slice(0, 16)}...</div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Wifi className="h-3.5 w-3.5" /> IP Address
                    </div>
                    <div className="text-xs text-white font-mono">{selectedDevice.ipAddress}</div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5" /> Location
                    </div>
                    <div className="text-xs text-white">{selectedDevice.city}, {selectedDevice.country}</div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Globe className="h-3.5 w-3.5" /> Browser
                    </div>
                    <div className="text-xs text-white">{selectedDevice.browser} v{selectedDevice.browserVersion}</div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" /> Last Seen
                    </div>
                    <div className="text-xs text-white">{new Date(selectedDevice.lastSeen).toLocaleString('en-IN')}</div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Shield className="h-3.5 w-3.5" /> Registered
                    </div>
                    <div className="text-xs text-white">{new Date(selectedDevice.registeredAt).toLocaleDateString('en-IN')}</div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <AlertTriangle className="h-3.5 w-3.5" /> Trust Score
                    </div>
                    <div className={cn(
                      "text-xs font-bold",
                      selectedDevice.trustScore >= 80 ? 'text-emerald-400' :
                      selectedDevice.trustScore >= 50 ? 'text-amber-400' : 'text-red-400'
                    )}>
                      {selectedDevice.trustScore}/100
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        selectedDevice.trustScore >= 80 ? 'bg-emerald-500' :
                        selectedDevice.trustScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      )}
                      style={{ width: `${selectedDevice.trustScore}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
                    Trust Device
                  </button>
                  <button className="flex-1 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors">
                    Block Device
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card p-8 text-center text-slate-500">
                <Smartphone className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Select a device to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

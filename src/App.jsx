import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { TrustCenterPage } from './pages/TrustCenterPage';
import { BehavioralAnalyticsPage } from './pages/BehavioralAnalyticsPage';
import { DeviceTrustPage } from './pages/DeviceTrustPage';
import { FraudDetectionPage } from './pages/FraudDetectionPage';
import { AccountRecoveryPage } from './pages/AccountRecoveryPage';
import { InsiderThreatPage } from './pages/InsiderThreatPage';
import { AdaptiveVerificationPage } from './pages/AdaptiveVerificationPage';
import { SocPage } from './pages/SocPage';
import { AlertsPage } from './pages/AlertsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { SettingsPage } from './pages/SettingsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/trust-center" element={<ProtectedRoute><TrustCenterPage /></ProtectedRoute>} />
            <Route path="/behavioral-analytics" element={<ProtectedRoute><BehavioralAnalyticsPage /></ProtectedRoute>} />
            <Route path="/device-trust" element={<ProtectedRoute><DeviceTrustPage /></ProtectedRoute>} />
            <Route path="/fraud-detection" element={<ProtectedRoute><FraudDetectionPage /></ProtectedRoute>} />
            <Route path="/account-recovery" element={<ProtectedRoute><AccountRecoveryPage /></ProtectedRoute>} />
            <Route path="/insider-threats" element={<ProtectedRoute><InsiderThreatPage /></ProtectedRoute>} />
            <Route path="/adaptive-verification" element={<ProtectedRoute><AdaptiveVerificationPage /></ProtectedRoute>} />
            <Route path="/soc" element={<ProtectedRoute><SocPage /></ProtectedRoute>} />
            <Route path="/alerts" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute admin><AdminPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

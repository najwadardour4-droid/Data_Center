
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { ReservationForm } from './components/dashboard/ReservationForm';
import { ReservationHistory } from './components/dashboard/ReservationHistory';
import { ManageResources } from './components/dashboard/ManageResources';
import { CreateResourceForm } from './components/dashboard/CreateResourceForm';
import { CategoryManager } from './components/dashboard/CategoryManager';
import { Approvals } from './components/dashboard/Approvals';
import { UserManagement } from './components/dashboard/UserManagement';
import { AuditLogs } from './components/dashboard/AuditLogs';
import { Settings } from './components/dashboard/Settings';
import { LandingPage } from './Pages/LandingPage';
import { useTheme } from './Context/ThemeContext';

export interface Category {
  id: string;
  name: string;
  specs: string[];
}

type View = 'hero' | 'dashboard' | 'new-reservation' | 'history' | 'manage-resources' | 'create-resource' | 'edit-resource' | 'categories' | 'approvals' | 'users' | 'logs' | 'settings';

const App: React.FC = ({ resources, auth, isLoggedIn, reservations }) => {


  const [view, setView] = useState<View>(isLoggedIn ? 'manage-resources' : 'hero');
  const [userRole, setUserRole] = useState(auth.role);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const { theme, toggleTheme, setTheme } = useTheme();


  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Compute', specs: ['CPU Model', 'Core Count', 'RAM (GB)', 'U-Size'] },
    { id: '2', name: 'AI Lab', specs: ['GPU Model', 'GPU Count', 'VRAM (GB)', 'Interconnect'] },
    { id: '3', name: 'Storage', specs: ['Capacity (TB)', 'Drive Type', 'Protocol', 'IOPS'] },
    { id: '4', name: 'Network', specs: ['Throughput', 'Port Count', 'Layer', 'Form Factor'] }
  ]);

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainContent = document.querySelector('main > div');
    if (mainContent) mainContent.scrollTo({ top: 0 });
  }, [view]);

  //const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleEditResource = (resource: any) => {
    setSelectedResource(resource);
    setView('edit-resource');
  };

  const handleBackToManage = () => {
    setSelectedResource(null);
    setView('manage-resources');
  };

  const renderContent = () => {
    switch (view) {
      case 'hero':
        return <LandingPage onStart={() => location.href = 'auth/signup'} onLogin={() => location.href = '/auth'} theme={theme} toggleTheme={toggleTheme} />;
      default:
        return (
          <DashboardLayout
            currentView={view}
            setView={setView}
            userName={auth.user.name}
            userEmail={auth.user.email}
            userRole={userRole}
            setUserRole={setUserRole}
            theme={theme}
            toggleTheme={toggleTheme}
          >
            {view === 'dashboard' && <DashboardHome resources={resources} auth={auth} onNavigate={setView} userRole={userRole} theme={theme} />}
            {view === 'new-reservation' && <ReservationForm onSuccess={() => setView('history')} selectedResource={selectedResource} onBack={() => setView('manage-resources')} theme={theme} />}
            {view === 'history' && <ReservationHistory onNew={() => setView('manage-resources')} theme={theme} />}
            {view === 'manage-resources' && (
              <ManageResources
                onAdd={() => setView('create-resource')}
                onEdit={handleEditResource}
                onReserve={(res) => {
                  setSelectedResource(res);
                  setView('new-reservation');
                }}
                userRole={userRole}
                theme={theme}
              />
            )}
            {view === 'create-resource' && <CreateResourceForm onBack={handleBackToManage} categories={categories} theme={theme} />}
            {view === 'edit-resource' && <CreateResourceForm onBack={handleBackToManage} initialData={selectedResource} categories={categories} theme={theme} />}
            {view === 'categories' && <CategoryManager categories={categories} setCategories={setCategories} theme={theme} />}
            {view === 'approvals' && <Approvals theme={theme} />}
            {view === 'users' && <UserManagement theme={theme} />}
            {view === 'logs' && <AuditLogs theme={theme} />}
            {view === 'settings' && <Settings userName={auth.user.name} userRole={userRole} theme={theme} setTheme={setTheme} />}
          </DashboardLayout>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-[#fcfcfc] text-slate-900'}`}>
      {renderContent()}
    </div>
  );
};

export default App;

import React, { useState, useMemo, useEffect } from 'react';

// --- ICONS ENGINE ---
function Icon({ name, size = 18, className = '' }) {
  const icons = {
    dashboard: <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 15h2v2H7v-2zm4-4h2v6h-2v-6zm4-4h2v10h-2V7z" />,
    needs: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />,
    contributions: <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2 0v8h8c-.5-4.25-3.75-7.5-8-8zm0 10v10c4.25-.5 7.5-3.75 8-8h-8z" />,
    users: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />,
    sun: <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8 8h-2v3h2v-3zm-7.45-3.91l1.41 1.41 1.79-1.79-1.41-1.41-1.79 1.79zM12 6.5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />,
    moon: <path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z" />,
    plus: <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />,
    download: <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />,
    trash: <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />,
    close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />,
    edit: <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />,
    history: <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />,
    logout: <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />,
    lock: <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      {icons[name] || null}
    </svg>
  );
}

// --- CONSTANTS & STRUCTS ---
const OFFICES = [
  'Regional Office', 'Baybay City', 'Biliran', 'Borongan City', 'Calbayog City',
  'Catbalogan City', 'Eastern Samar', 'Leyte', 'Maasin City', 'Northern Samar',
  'Ormoc City', 'Samar', 'Southern Leyte', 'Tacloban City'
];

const STRUCTURE = {
  'Regional Office': {
    'Office of the Regional Director': ['Proper', 'Legal Unit', 'ICT Unit', 'Public Affairs Unit', 'Delivery Unit'],
    'Office of the Assistant Regional Director': ['Proper'],
    'Curriculum and Learning Management Division': ['Proper', 'Learning Resource Management Section'],
    'Education Support Services Division': ['Proper', 'School Health Section', 'Special Programs and Projects Section', 'Physical Facilities Section'],
    'Human Resource Development Division': ['Proper', 'NEAP - Region VIII'],
    'Policy, Planning and Research Division': ['Proper'],
    'Quality Assurance Division': ['Proper'],
    'Field Technical Assistance Division': ['Proper'],
    'Administrative Division': ['Proper', 'Asset Management Section', 'Procurement Unit', 'Cash Section', 'Personnel Section', 'Records Section', 'General Services Unit'],
    'Finance Division': ['Proper', 'Accounting Section', 'Budget Section']
  },
  'SDO': {
    'OSDS (Office of the Schools Division Superintendent)': ['Proper', 'Legal Unit', 'ICT Unit', 'Personnel Section', 'Records Section', 'Cash Section', 'Supply Unit'],
    'CID (Curriculum Implementation Division)': ['Proper', 'Instructional Management Section', 'Learning Resource Management Section'],
    'SGOD (School Governance and Operations Division)': ['Proper', 'Social Mobilization & Networking Section', 'Planning & Research Unit', 'School Health Section', 'Physical Facilities Unit']
  }
};

const CATEGORIES = {
  'Advocacy / Policy Support': ['Advocacy Campaign', 'Policy Consultation', 'Policy Development Assistance', 'Others (Specify)'],
  'Appliances and Equipment': ['Air Conditioner', 'Electric Fan', 'Refrigerator', 'Projector', 'Sound System', 'Others (Specify)'],
  'Furniture': ['Chair', 'Table', "Teacher's Desk", 'Office Desk', 'Cabinet', 'Filing Cabinet', 'Others (Specify)'],
  'ICT Equipment and Technology': ['Laptop', 'Desktop Computer', 'Printer', 'Scanner', 'Smart TV', 'Tablet', 'Internet Subscription', 'Others (Specify)'],
  'Infrastructure': ['Classroom Construction', 'Classroom Repair', 'Building Repair', 'Handwashing Facility', 'Water System', 'Others (Specify)'],
  'Learner School Supplies and Uniforms': ['School Bag', 'Notebook', 'Ballpen', 'Pencil', 'Uniform', 'Shoes', 'Others (Specify)'],
  'Learner Wellness, Health, and Nutrition': ['Feeding Program Support', 'Vitamins', 'Nutritional Supplements', 'Medical Supplies', 'Others (Specify)'],
  'Technical Assistance': ['Resource Speaker', 'Consultancy Services', 'System Development', 'Training Facilitation', 'Others (Specify)']
};

const UOM_LIST = ['Lot', 'Unit', 'Piece (pc)', 'Set', 'Pack', 'Box', 'Roll', 'Bundle', 'Kilogram (kg)', 'Liter (L)', 'Hour', 'Trip', 'Day', 'Pax', 'Session'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const SYSTEM_ROLES = {
  SUPERADMIN: 'Superadmin',
  ICT_USER: 'ICT Unit user',
  FOCAL: 'Partnerships Focal',
  PARTNER: 'External Partner',
  MONITORING: 'Monitoring'
};

const initialNeeds = [
  { id: 'N1', dateLogged: '2026-06-15', office: 'Regional Office', fd: 'Office of the Regional Director', section: 'ICT Unit', category: 'ICT Equipment and Technology', specificItem: 'Laptop', value: 850000, qty: 20, uom: 'Piece (pc)', status: 'Partially Fulfilled', history: [{ timestamp: '2026-06-15 09:00', user: 'System', action: 'Initial baseline requirement logged.' }] },
  { id: 'N2', dateLogged: '2026-06-10', office: 'Leyte', fd: 'SGOD (School Governance and Operations Division)', section: 'Social Mobilization & Networking Section', category: 'Infrastructure', specificItem: 'Classroom Repair', value: 2400000, qty: 4, uom: 'Lot', status: 'Unfulfilled', history: [{ timestamp: '2026-06-10 10:30', user: 'System', action: 'Initial baseline requirement logged.' }] },
  { id: 'N3', dateLogged: '2026-05-20', office: 'Tacloban City', fd: 'CID (Curriculum Implementation Division)', section: 'Learning Resource Management Section', category: 'Furniture', specificItem: 'Office Desk', value: 350000, qty: 50, uom: 'Piece (pc)', status: 'Fulfilled', history: [{ timestamp: '2026-05-20 14:15', user: 'System', action: 'Initial baseline requirement logged.' }] },
  { id: 'N4', dateLogged: '2026-03-01', office: 'Samar', fd: 'OSDS (Office of the Schools Division Superintendent)', section: 'Supply Unit', category: 'Appliances and Equipment', specificItem: 'Air Conditioner', value: 150000, qty: 3, uom: 'Unit', status: 'Unfulfilled', history: [{ timestamp: '2026-03-01 11:30', user: 'System', action: 'Initial baseline requirement logged.' }] },
];

const initialContributions = [
  { id: 'C1', dateLogged: '2026-06-16', partner: 'TechCorp Foundation', office: 'Regional Office', fd: 'Office of the Regional Director', section: 'ICT Unit', category: 'ICT Equipment and Technology', specificItem: 'Laptop', value: 500000, qty: 12, uom: 'Piece (pc)', history: [{ timestamp: '2026-06-16 11:00', user: 'System', action: 'Turnover collection recorded.' }] },
  { id: 'C2', dateLogged: '2026-05-25', partner: 'SaveTheChildren', office: 'Tacloban City', fd: 'CID (Curriculum Implementation Division)', section: 'Learning Resource Management Section', category: 'Furniture', specificItem: 'Office Desk', value: 350000, qty: 50, uom: 'Piece (pc)', history: [{ timestamp: '2026-05-25 15:30', user: 'System', action: 'Turnover collection recorded.' }] },
  { id: 'C3', dateLogged: '2026-03-15', partner: 'Alumni Association', office: 'Samar', fd: 'OSDS (Office of the Schools Division Superintendent)', section: 'Supply Unit', category: 'Appliances and Equipment', specificItem: 'Air Conditioner', value: 100000, qty: 2, uom: 'Unit', history: [{ timestamp: '2026-03-15 09:10', user: 'System', action: 'Turnover collection recorded.' }] },
];

const initialUsers = [
  { id: 1, name: 'Regional Chief', username: 'ro.chief', email: 'chief@deped.gov.ph', role: SYSTEM_ROLES.SUPERADMIN, position: 'Chief Admin Officer', office: 'Regional Office', password: 'password123' },
  { id: 2, name: 'Samar Focal', username: 'samar.focal', email: 'focal.samar@deped.gov.ph', role: SYSTEM_ROLES.FOCAL, position: 'PDO II', office: 'Samar', password: 'password123' },
  { id: 3, name: 'Leyte ICT', username: 'leyte.ict', email: 'ict.leyte@deped.gov.ph', role: SYSTEM_ROLES.ICT_USER, position: 'ITO I', office: 'Leyte', password: 'password123' },
  { id: 4, name: 'Region Monitor', username: 'ro.monitor', email: 'mon.ro@deped.gov.ph', role: SYSTEM_ROLES.MONITORING, position: 'Auditor III', office: 'Regional Office', password: 'password123' },
  { id: 5, name: 'Tacloban Focal', username: 'tac.focal', email: 'focal.tac@deped.gov.ph', role: SYSTEM_ROLES.FOCAL, position: 'PDO I', office: 'Tacloban City', password: 'password123' },
];

const exportToCSV = (data, filename) => {
  if (!data.length) return;
  const clone = data.map(item => {
    const { history, ...rest } = item;
    return rest;
  });
  const headers = Object.keys(clone[0]).join(',');
  const rows = clone.map(row => 
    Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
  );
  const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- MAIN WRAPPER COMPONENT ---
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [needs, setNeeds] = useState(initialNeeds);
  const [contributions, setContributions] = useState(initialContributions);
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen 
        users={users} 
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }} 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col md:flex-row transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} role={currentUser.role} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          currentUser={currentUser} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onLogout={handleLogout} 
        />
        
        <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && <Dashboard needs={needs} contributions={contributions} userContext={currentUser} darkMode={darkMode} />}
          {activeTab === 'needs' && <NeedsWorkspace needs={needs} setNeeds={setNeeds} userContext={currentUser} darkMode={darkMode} />}
          {activeTab === 'contributions' && <ContributionsWorkspace contributions={contributions} setContributions={setContributions} userContext={currentUser} darkMode={darkMode} />}
          {activeTab === 'users' && <UserWorkspace users={users} setUsers={setUsers} userContext={currentUser} darkMode={darkMode} />}
        </main>
      </div>
    </div>
  );
}

// --- LOGIN GATEWAY ---
function LoginScreen({ users, onLoginSuccess, darkMode, setDarkMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    const targetUser = users.find(u => u.username.toLowerCase() === username.toLowerCase().trim());
    if (targetUser && (password === 'password123' || u.password === password)) {
      onLoginSuccess(targetUser);
    } else {
      setError('Invalid alignment credentials. Try simulationquick select keys below.');
    }
  };

  const handleQuickSelect = (user) => {
    setUsername(user.username);
    setPassword('password123');
    onLoginSuccess(user);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      <div className="absolute top-4 right-4">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-200 shadow-sm text-slate-700 dark:text-amber-400 transition">
          <Icon name={darkMode ? 'sun' : 'moon'} size={16} />
        </button>
      </div>
      <div className={`w-full max-w-md p-8 rounded-2xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center text-2xl font-black shadow-md mb-3">R8</div>
          <h1 className="text-xl font-black tracking-tight text-emerald-900 dark:text-amber-400">DepEd Region VIII</h1>
          <p className="text-xs uppercase font-bold tracking-widest text-slate-400 mt-1">Partnerships & Resource Grid</p>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {error && <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-semibold rounded-lg text-center">{error}</div>}
          <div>
            <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400 mb-1">Username / Identifier</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. juan.super" className="w-full p-2.5 text-xs rounded-lg border outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 focus:border-amber-500 transition" required />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400 mb-1">Security Token Key</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-2.5 text-xs rounded-lg border outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 focus:border-amber-500 transition" required />
          </div>
          <button type="submit" className="w-full py-3 bg-emerald-900 hover:bg-emerald-850 text-amber-400 font-bold rounded-lg text-xs tracking-wider uppercase shadow-md transition duration-150">Secure Entry Authorization</button>
        </form>
        <div className="mt-8 border-t dark:border-slate-800 pt-5">
          <span className="block text-[10px] uppercase font-black text-slate-400 tracking-widest text-center mb-3">Simulation Role Emulator Bypasses</span>
          <div className="grid grid-cols-2 gap-2">
            {users.map((u) => (
              <button key={u.id} onClick={() => handleQuickSelect(u)} className="p-2 text-left text-[10px] font-semibold border dark:border-slate-800 rounded-lg hover:border-amber-500 hover:bg-slate-50 dark:hover:bg-slate-950 transition flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                <div className="truncate">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{u.name}</p>
                  <p className="opacity-50 text-[9px] truncate">{u.role} ({u.office})</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab, darkMode, role }) {
  const allTabs = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: 'dashboard', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.FOCAL, SYSTEM_ROLES.PARTNER, SYSTEM_ROLES.MONITORING] },
    { id: 'needs', label: 'Needs Inventory', icon: 'needs', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.FOCAL, SYSTEM_ROLES.PARTNER, SYSTEM_ROLES.MONITORING] },
    { id: 'contributions', label: 'Contributions Ledger', icon: 'contributions', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.FOCAL, SYSTEM_ROLES.PARTNER, SYSTEM_ROLES.MONITORING] },
    { id: 'users', label: 'User Management', icon: 'users', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.ICT_USER] }
  ];
  const filteredTabs = allTabs.filter(t => t.roles.includes(role));

  return (
    <aside className={`w-full md:w-64 border-b md:border-b-0 md:border-r transition-all ${darkMode ? 'bg-emerald-950 border-emerald-900/40 text-emerald-100' : 'bg-emerald-900 border-emerald-950 text-white'} flex flex-col`}>
      <div className="p-5 flex items-center gap-3 border-b border-emerald-800/60">
        <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-emerald-950 font-black shadow-md">R8</div>
        <div>
          <h1 className="font-bold text-sm tracking-tight text-amber-400">DepEd Region VIII</h1>
          <p className="text-[10px] uppercase tracking-wider opacity-75 font-medium">Partnership Grid</p>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-1 flex md:flex-col overflow-x-auto">
        {filteredTabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-amber-500 text-emerald-950 font-bold shadow-md' : 'hover:bg-emerald-800/50 text-emerald-100/90'}`}>
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function Header({ currentUser, darkMode, setDarkMode, onLogout }) {
  return (
    <header className="px-6 py-4 border-b dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex justify-between items-center gap-4">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 dark:text-amber-400">Security Clearance Area</span>
        <h2 className="text-xs font-bold text-slate-500 mt-0.5">{currentUser.office} Terminal Scope</h2>
      </div>
      <div className="flex items-center gap-4 justify-end">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-amber-400 transition" title="Toggle Appearance Mode">
          <Icon name={darkMode ? 'sun' : 'moon'} size={16} />
        </button>
        <div className="flex items-center gap-3 border-l pl-4 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">{currentUser.role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-800 text-amber-400 flex items-center justify-center font-bold text-sm">{currentUser.name.split(' ').map(n=>n[0]).join('')}</div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition ml-2">
          <Icon name="logout" size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}

// --- SYSTEM FILTERS COMPONENT: MODIFIED ---
function SystemFilters({ filters, setFilters, darkMode, includeCategoryFilters = false, userContext }) {
  const updateF = (k, v) => {
    setFilters(prev => {
      const state = { ...prev, [k]: v };
      if (k === 'office') { state.fd = ''; state.section = ''; }
      if (k === 'fd') { state.section = ''; }
      if (k === 'category') { state.specificItem = ''; }
      return state;
    });
  };

  const isConstrained = useMemo(() => {
    return userContext.office !== 'Regional Office';
  }, [userContext]);

  const css = `w-full p-2 text-[11px] font-medium rounded-md border outline-none transition ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'} focus:border-amber-500`;
  
  return (
    <div className={`p-4 rounded-xl border mb-6 shadow-sm ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className={`grid grid-cols-2 sm:grid-cols-4 ${includeCategoryFilters ? 'lg:grid-cols-5' : 'lg:grid-cols-7'} gap-3`}>
        
        {/* OFFICE FILTER: MODIFIED & ENFORCED RLS */}
        <select 
          value={filters.office} 
          onChange={e=>updateF('office', e.target.value)} 
          className={`${css} ${isConstrained ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}`}
          disabled={isConstrained} // Security Enforcement: Lock down for non-RO users
        >
          <option value="">Region VIII (All Offices)</option>
          {OFFICES.map(o =>
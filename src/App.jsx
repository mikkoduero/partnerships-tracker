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
    'Education Support Services Division': ['Proper', 'School Health Section', 'Special Programs and Projects Section', 'Education Facilities Section'],
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
    'SGOD (School Governance and Operations Division)': ['Proper', 'Social Mobilization & Networking Section', 'Planning & Research Unit', 'School Health Section', 'Education Facilities Unit']
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
  { id: 'N1', dateLogged: '2026-06-15', office: 'Regional Office', fd: 'Office of the Regional Director', section: 'ICT Unit', category: 'ICT Equipment and Technology', specificItem: 'Laptop', value: 850000, qty: 20, uom: 'Piece (pc)', status: 'Partially Fulfilled', remarks: '', history: [{ timestamp: '2026-06-15 09:00', user: 'System', action: 'Initial baseline requirement logged.' }] },
  { id: 'N2', dateLogged: '2026-06-10', office: 'Leyte', fd: 'SGOD (School Governance and Operations Division)', section: 'Social Mobilization & Networking Section', category: 'Infrastructure', specificItem: 'Classroom Repair', value: 2400000, qty: 4, uom: 'Lot', status: 'Unfulfilled', remarks: '', history: [{ timestamp: '2026-06-10 10:30', user: 'System', action: 'Initial baseline requirement logged.' }] },
  { id: 'N3', dateLogged: '2026-05-20', office: 'Tacloban City', fd: 'CID (Curriculum Implementation Division)', section: 'Learning Resource Management Section', category: 'Furniture', specificItem: 'Office Desk', value: 350000, qty: 50, uom: 'Piece (pc)', status: 'Fulfilled', remarks: '', history: [{ timestamp: '2026-05-20 14:15', user: 'System', action: 'Initial baseline requirement logged.' }] },
  { id: 'N4', dateLogged: '2026-03-01', office: 'Samar', fd: 'OSDS (Office of the Schools Division Superintendent)', section: 'Supply Unit', category: 'Appliances and Equipment', specificItem: 'Air Conditioner', value: 150000, qty: 3, uom: 'Unit', status: 'Unfulfilled', remarks: '', history: [{ timestamp: '2026-03-01 11:30', user: 'System', action: 'Initial baseline requirement logged.' }] },
];

const initialContributions = [
  { id: 'C1', dateLogged: '2026-06-16', partner: 'TechCorp Foundation', office: 'Regional Office', fd: 'Office of the Regional Director', section: 'ICT Unit', category: 'ICT Equipment and Technology', specificItem: 'Laptop', value: 500000, qty: 12, uom: 'Piece (pc)', remarks: '', history: [{ timestamp: '2026-06-16 11:00', user: 'System', action: 'Turnover collection recorded.' }] },
  { id: 'C2', dateLogged: '2026-05-25', partner: 'SaveTheChildren', office: 'Tacloban City', fd: 'CID (Curriculum Implementation Division)', section: 'Learning Resource Management Section', category: 'Furniture', specificItem: 'Office Desk', value: 350000, qty: 50, uom: 'Piece (pc)', remarks: '', history: [{ timestamp: '2026-05-25 15:30', user: 'System', action: 'Turnover collection recorded.' }] },
  { id: 'C3', dateLogged: '2026-03-15', partner: 'Alumni Association', office: 'Samar', fd: 'OSDS (Office of the Schools Division Superintendent)', section: 'Supply Unit', category: 'Appliances and Equipment', specificItem: 'Air Conditioner', value: 100000, qty: 2, uom: 'Unit', remarks: '', history: [{ timestamp: '2026-03-15 09:10', user: 'System', action: 'Turnover collection recorded.' }] },
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
    if (targetUser && (password === 'password123' || targetUser.password === password)) {
      onLoginSuccess(targetUser);
    } else {
      setError('Invalid alignment credentials. Try simulation quick select keys below.');
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
          <p className="text-xs uppercase font-bold tracking-widest text-slate-400 mt-1">Partnerships Tracker</p>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {error && <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-semibold rounded-lg text-center">{error}</div>}
          <div>
            <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400 mb-1">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. juan.super" className="w-full p-2.5 text-xs rounded-lg border outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 focus:border-amber-500 transition" required />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-2.5 text-xs rounded-lg border outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 focus:border-amber-500 transition" required />
          </div>
          <button type="submit" className="w-full py-3 bg-emerald-900 hover:bg-emerald-850 text-amber-400 font-bold rounded-lg text-xs tracking-wider uppercase shadow-md transition duration-150">Sign In</button>
        </form>
        <div className="mt-8 border-t dark:border-slate-800 pt-5">
          <span className="block text-[10px] uppercase font-black text-slate-400 tracking-widest text-center mb-3">Simulation User Accounts</span>
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
    { id: 'needs', label: 'Needs', icon: 'needs', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.FOCAL, SYSTEM_ROLES.PARTNER, SYSTEM_ROLES.MONITORING] },
    { id: 'contributions', label: 'Contributions', icon: 'contributions', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.FOCAL, SYSTEM_ROLES.PARTNER, SYSTEM_ROLES.MONITORING] },
    { id: 'users', label: 'User Management', icon: 'users', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.ICT_USER] }
  ];
  const filteredTabs = allTabs.filter(t => t.roles.includes(role));

  return (
    <aside className={`w-full md:w-64 border-b md:border-b-0 md:border-r transition-all ${darkMode ? 'bg-emerald-950 border-emerald-900/40 text-emerald-100' : 'bg-emerald-900 border-emerald-950 text-white'} flex flex-col`}>
      <div className="p-5 flex items-center gap-3 border-b border-emerald-800/60">
        <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-emerald-950 font-black shadow-md">R8</div>
        <div>
          <h1 className="font-bold text-sm tracking-tight text-amber-400">DepEd Region VIII</h1>
          <p className="text-[10px] uppercase tracking-wider opacity-75 font-medium">Partnerships Tracker</p>
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
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 dark:text-amber-400">Office</span>
        <h2 className="text-xs font-bold text-slate-500 mt-0.5">{currentUser.office}</h2>
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

// --- SYSTEM FILTERS COMPONENT ---
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
      <div className={`grid grid-cols-2 sm:grid-cols-4 ${includeCategoryFilters ? 'lg:grid-cols-8' : 'lg:grid-cols-7'} gap-3`}>
        
        <select 
          value={filters.office} 
          onChange={e=>updateF('office', e.target.value)} 
          className={`${css} ${isConstrained ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}`}
          disabled={isConstrained}
        >
          <option value="">Region VIII (All Offices)</option>
          {OFFICES.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        
        <select value={filters.fd} onChange={e=>updateF('fd', e.target.value)} className={css} disabled={!filters.office}>
          <option value="">Functional Division</option>
          {Object.keys(STRUCTURE[filters.office === 'Regional Office' ? 'Regional Office' : 'SDO'] || {}).map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        
        <select value={filters.section} onChange={e=>updateF('section', e.target.value)} className={css} disabled={!filters.fd}>
          <option value="">Section/Unit</option>
          {(STRUCTURE[filters.office === 'Regional Office' ? 'Regional Office' : 'SDO']?.[filters.fd] || []).map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select value={filters.year} onChange={e=>updateF('year', e.target.value)} className={css}>
          <option value="All">Year</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
        <select value={filters.quarter} onChange={e=>updateF('quarter', e.target.value)} className={css}>
          <option value="All">Quarter</option>
          <option value="Q1">Q1</option> 
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>
        <select value={filters.month} onChange={e=>updateF('month', e.target.value)} className={css}>
          <option value="All">Month</option>
          {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        {includeCategoryFilters && (
          <>
            <select value={filters.category} onChange={e=>updateF('category', e.target.value)} className={css}>
              <option value="">Category</option>
              {Object.keys(CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filters.specificItem} onChange={e=>updateF('specificItem', e.target.value)} className={css} disabled={!filters.category}>
              <option value="">Line Item</option>
              {(CATEGORIES[filters.category] || []).map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </>
        )}
      </div>
    </div>
  );
}

// --- FUEL GAUGE GRAPHIC ---
function FuelGaugeChart({ totalNeeds, totalContributions, darkMode }) {
  const percent = totalNeeds > 0 ? Math.min((totalContributions / totalNeeds) * 100, 100) : 0;
  const needleRotation = -90 + (percent * 1.8);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[140px] relative">
      <svg width="160" height="95" viewBox="0 0 120 70" className="overflow-visible">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke={darkMode ? '#334155' : '#e2e8f0'} strokeWidth="12" strokeLinecap="round" />
        <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="url(#gaugeGrad)" strokeWidth="12" strokeLinecap="round" strokeDasharray="157" strokeDashoffset={157 - (157 * percent) / 100} style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
        <g style={{ transform: `rotate(${needleRotation}deg)`, transformOrigin: '60px 60px', transition: 'transform 1s ease-out' }}>
          <path d="M 58 60 L 60 15 L 62 60 Z" fill={darkMode ? '#f8fafc' : '#0f172a'} />
          <circle cx="60" cy="60" r="4" fill={darkMode ? '#f8fafc' : '#0f172a'} />
        </g>
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-xl font-black text-slate-800 dark:text-slate-100">{percent.toFixed(1)}%</span>
        <span className="text-[10px] uppercase font-bold text-slate-400">Fulfilled</span>
      </div>
    </div>
  );
}

// --- DASHBOARD ---
function Dashboard({ needs, contributions, userContext, darkMode }) {
  const [filters, setFilters] = useState({ office: '', fd: '', section: '', year: 'All', quarter: 'All', month: 'All' });

  const { filteredNeeds, filteredConts } = useMemo(() => {
    const filterRecordSet = (list) => list.filter(item => {
      const d = new Date(item.dateLogged);
      if (filters.office && item.office !== filters.office) return false;
      if (filters.fd && item.fd !== filters.fd) return false;
      if (filters.section && item.section !== filters.section) return false;
      if (filters.year !== 'All' && d.getFullYear().toString() !== filters.year) return false;
      if (filters.month !== 'All' && MONTHS[d.getMonth()] !== filters.month) return false;
      if (filters.quarter !== 'All' && `Q${Math.floor(d.getMonth() / 3) + 1}` !== filters.quarter) return false;
      return true;
    });
    
    const scopeConts = userContext.role === SYSTEM_ROLES.PARTNER ? contributions.filter(c => c.partner.toLowerCase() === userContext.name.toLowerCase()) : contributions;
    
    return { filteredNeeds: filterRecordSet(needs), filteredConts: filterRecordSet(scopeConts) };
  }, [needs, contributions, filters, userContext]);

  const totalNeedsValue = filteredNeeds.reduce((a, b) => a + Number(b.value), 0);
  const totalContsValue = filteredConts.reduce((a, b) => a + Number(b.value), 0);

  // --- FEATURE ACCOMPLISHMENTS RANKING COMPUTATION ---
  const officeRankings = useMemo(() => {
    return OFFICES.map(off => {
      const officeNeeds = filteredNeeds.filter(n => n.office === off).reduce((a, b) => a + Number(b.value), 0);
      const officeConts = filteredConts.filter(c => c.office === off).reduce((a, b) => a + Number(b.value), 0);
      const accomplishmentPct = officeNeeds > 0 ? (officeConts / officeNeeds) * 100 : 0;
      return { office: off, needs: officeNeeds, contributions: officeConts, percentage: accomplishmentPct };
    }).sort((a, b) => b.percentage - a.percentage);
  }, [filteredNeeds, filteredConts]);

  const topDonors = useMemo(() => {
    const groups = filteredConts.reduce((acc, c) => {
      acc[c.partner] = (acc[c.partner] || 0) + Number(c.value);
      return acc;
    }, {});
    return Object.entries(groups).sort((a,b)=>b[1]-a[1]).slice(0, 10);
  }, [filteredConts]);

  const priorityNeeds = useMemo(() => {
    const groups = filteredNeeds.reduce((acc, n) => {
      acc[n.specificItem] = (acc[n.specificItem] || 0) + Number(n.value);
      return acc;
    }, {});
    return Object.entries(groups).sort((a,b)=>b[1]-a[1]).slice(0, 10);
  }, [filteredNeeds]);

  const containerStyle = `p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`;

  return (
    <div className="space-y-6">
      <SystemFilters filters={filters} setFilters={setFilters} darkMode={darkMode} userContext={userContext} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={containerStyle}>
          <span className="text-[10px] uppercase font-black tracking-widest text-emerald-800 dark:text-emerald-400">Total Validated Needs (Value)</span>
          <p className="text-3xl font-black text-slate-800 dark:text-slate-100 mt-2">₱ {totalNeedsValue.toLocaleString()}</p>
        </div>
        <div className={containerStyle}>
          <span className="text-[10px] uppercase font-black tracking-widest text-amber-600 dark:text-amber-500">Total Validated Contributions (Value)</span>
          <p className="text-3xl font-black text-amber-500 mt-2">₱ {totalContsValue.toLocaleString()}</p>
        </div>
        <div className={`${containerStyle} flex flex-col items-center justify-center p-4`}>
          <FuelGaugeChart totalNeeds={totalNeedsValue} totalContributions={totalContsValue} darkMode={darkMode} />
        </div>
      </div>

      {/* --- FEATURE: SDO ACCOMPLISHMENTS RANKING LAYOUT --- */}
      <div className={containerStyle}>
        <div className="border-b dark:border-slate-800 pb-3 mb-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-amber-400">Accomplishment Rankings (RO & SDO Matrix)</h3>
          <p className="text-[11px] opacity-60">Comparative matrix tracking cumulative resource injection matching current active metrics.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-2 pl-2">Rank</th>
                <th className="pb-2">Office Name</th>
                <th className="pb-2 text-right">Target Needs</th>
                <th className="pb-2 text-right">Received Contributions</th>
                <th className="pb-2 text-center w-40">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800/60">
              {officeRankings.map((node, index) => (
                <tr key={node.office} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-2.5 pl-2 font-bold text-slate-400">#{index + 1}</td>
                  <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">{node.office}</td>
                  <td className="py-2.5 text-right font-medium text-slate-600 dark:text-slate-400">₱{node.needs.toLocaleString()}</td>
                  <td className="py-2.5 text-right font-bold text-emerald-700 dark:text-amber-500">₱{node.contributions.toLocaleString()}</td>
                  <td className="py-2.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(node.percentage, 100)}%` }}></div>
                      </div>
                      <span className="font-black text-[11px] min-w-10 text-right">{node.percentage.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={containerStyle}>
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Top 10 Donors</h3>
          <div className="space-y-3">
            {topDonors.map(([name, val], idx) => {
              const max = topDonors[0]?.[1] || 1;
              const pct = (val / max) * 100;
              return (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="truncate max-w-[200px]"><span className="opacity-40 font-bold mr-1">#{idx+1}</span>{name}</span>
                    <span className="text-amber-500">₱{val.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={containerStyle}>
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Priority Needs</h3>
          <div className="space-y-3">
            {priorityNeeds.map(([name, val], idx) => {
              const max = priorityNeeds[0]?.[1] || 1;
              const pct = (val / max) * 100;
              return (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="truncate max-w-[200px]"><span className="opacity-40 font-bold mr-1">#{idx+1}</span>{name}</span>
                    <span className="text-amber-500">₱{val.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- TAB: NEEDS WORKSPACE ---
function NeedsWorkspace({ needs, setNeeds, userContext, darkMode }) {
  const isReadOnly = userContext.role === SYSTEM_ROLES.MONITORING || userContext.role === SYSTEM_ROLES.PARTNER;
  const isConstrained = userContext.office !== 'Regional Office';
  
  const [filters, setFilters] = useState({ 
    office: isConstrained ? userContext.office : '', 
    fd: '', section: '', category: '', specificItem: '',
    year: 'All', quarter: 'All', month: 'All'
  });
  
  const [meta, setMeta] = useState({ office: isConstrained ? userContext.office : '', fd: '', section: '' });
  const [lines, setLines] = useState([]);
  
  const [workingItem, setWorkingItem] = useState({ 
    specificItem: '', category: '', qty: '', uom: 'Piece (pc)', value: '', remarks: '' 
  });
  
  const activeFds = useMemo(() => meta.office ? Object.keys(STRUCTURE[meta.office === 'Regional Office' ? 'Regional Office' : 'SDO'] || {}) : [], [meta.office]);
  const activeSections = useMemo(() => (meta.office && meta.fd) ? STRUCTURE[meta.office === 'Regional Office' ? 'Regional Office' : 'SDO']?.[meta.fd] || [] : [], [meta.office, meta.fd]);
  
  const currentFilteredView = useMemo(() => {
    return needs.filter(n => {
      if (isConstrained && n.office !== userContext.office) return false;
      if (filters.office && n.office !== filters.office) return false;
      if (filters.fd && n.fd !== filters.fd) return false;
      if (filters.section && n.section !== filters.section) return false;
      if (filters.category && n.category !== filters.category) return false;
      if (filters.specificItem && n.specificItem !== filters.specificItem) return false;
      
      const d = new Date(n.dateLogged);
      if (filters.year !== 'All' && d.getFullYear().toString() !== filters.year) return false;
      if (filters.month !== 'All' && MONTHS[d.getMonth()] !== filters.month) return false;
      if (filters.quarter !== 'All' && `Q${Math.floor(d.getMonth() / 3) + 1}` !== filters.quarter) return false;
      
      return true;
    });
  }, [needs, filters, isConstrained, userContext]);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [trailModal, setTrailModal] = useState(null);

  const handlePushLine = () => {
    if (!workingItem.specificItem || !workingItem.category || !workingItem.qty || !workingItem.value) return;
    setLines([...lines, { ...workingItem, id: crypto.randomUUID() }]);
    setWorkingItem({ specificItem: '', category: '', qty: '', uom: 'Piece (pc)', value: '', remarks: '' });
  };

  const handleCommitBatch = (e) => {
    e.preventDefault();
    if (!meta.office || !meta.fd || !meta.section || !lines.length) return;
    
    const timestamp = new Date().toLocaleString();
    const formatted = lines.map((l, i) => ({
      id: 'N-GEN-' + (needs.length + i + 1),
      dateLogged: new Date().toISOString().split('T')[0],
      ...meta,
      category: l.category,
      specificItem: l.specificItem,
      qty: Number(l.qty),
      uom: l.uom,
      value: Number(l.value),
      status: 'Unfulfilled',
      remarks: l.remarks,
      history: [{ timestamp, user: userContext.name, action: 'Initial baseline requirement logged.' }]
    }));
    
    setNeeds([...formatted, ...needs]);
    setLines([]);
    setMeta({ office: isConstrained ? userContext.office : '', fd: '', section: '' });
    setAddModal(false);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    setNeeds(needs.map(n => {
      if (n.id === editModal.id) {
        const changes = [];
        if (n.qty !== Number(editModal.qty)) changes.push(`Quantity changed from ${n.qty} to ${editModal.qty}`);
        if (n.value !== Number(editModal.value)) changes.push(`Valuation changed from ₱${n.value} to ₱${editModal.value}`);
        if (n.status !== editModal.status) changes.push(`Status updated from ${n.status} to ${editModal.status}`);
        
        return { 
          ...n, 
          qty: Number(editModal.qty), 
          value: Number(editModal.value), 
          status: editModal.status, 
          history: [
            ...n.history, 
            { timestamp, user: userContext.name, action: changes.length ? `Updated metrics: ${changes.join(', ')}.` : 'Saved without variable changes.' }
          ] 
        };
      }
      return n;
    }));
    setEditModal(null);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Purge this requirement ledger entry? This action is absolute.")) {
      setNeeds(needs.filter(n => n.id !== id));
    }
  };

  const inp = `w-full p-2 text-xs rounded border outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100`;

  return (
    <div className="space-y-6">
      <SystemFilters filters={filters} setFilters={setFilters} darkMode={darkMode} includeCategoryFilters={true} userContext={userContext} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 border dark:border-slate-800 rounded-xl shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-emerald-800 dark:text-amber-400">Needs Inventory</h2>
          <p className="text-[11px] opacity-60">Scoped scope items: {currentFilteredView.length}</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!isReadOnly && (
            <button onClick={()=>setAddModal(true)} className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500 text-emerald-950 rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
              <Icon name="plus" size={14} /><span>Add Needs</span>
            </button>
          )}
          <button onClick={() => exportToCSV(currentFilteredView, 'DEPED8_NEEDS_EXPORT')} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-emerald-850">
            <Icon name="download" size={14} /><span>Export Matrix</span>
          </button>
        </div>
      </div>

      <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-2">Date</th>
              <th className="pb-2">Office</th>
              <th className="pb-2">Functional Division</th>
              <th className="pb-2">Section/Unit</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Line Item</th>
              <th className="pb-2 text-right">Quantity</th>
              <th className="pb-2 text-right">Value</th>
              <th className="pb-2">Remarks</th>
              <th className="pb-2">Status</th>
              <th className="pb-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800/60">
            {currentFilteredView.map(n => (
              <tr key={n.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                <td className="py-2.5 text-slate-500">{n.dateLogged}</td>
                <td className="py-2.5 font-bold">{n.office}</td>
                <td className="py-2.5 truncate max-w-[130px] text-slate-600 dark:text-slate-400">{n.fd}</td>
                <td className="py-2.5 text-slate-500">{n.section}</td>
                <td className="py-2.5 text-slate-400 text-[11px]">{n.category}</td>
                <td className="py-2.5 font-semibold">{n.specificItem}</td>
                <td className="py-2.5 text-right font-medium">{n.qty} <span className="text-[10px] opacity-50">{n.uom}</span></td>
                <td className="py-2.5 text-right font-black text-emerald-700 dark:text-amber-500">₱ {Number(n.value).toLocaleString()}</td>
                <td className="py-2.5 text-slate-500 text-[11px] truncate max-w-[150px]" title={n.remarks}>{n.remarks || '-'}</td>
                <td className="py-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    n.status === 'Fulfilled' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    n.status === 'Partially Fulfilled' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>{n.status}</span>
                </td>
                <td className="py-2.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {!isReadOnly && (
                      <>
                        <button onClick={() => setEditModal(n)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-500 transition" title="Modify Record">
                          <Icon name="edit" size={14} />
                        </button>
                        <button onClick={() => handleDeleteItem(n.id)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-red-500 transition" title="Purge Record">
                          <Icon name="trash" size={14} />
                        </button>
                      </>
                    )}
                    <button onClick={() => setTrailModal(n)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-amber-500 transition" title="Audit Trail">
                      <Icon name="history" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b dark:border-slate-800 pb-3 mb-4">
              <h3 className="font-black text-sm uppercase tracking-wider text-emerald-800 dark:text-amber-400">Record Requirement Allocation</h3>
              <button onClick={() => setAddModal(false)} className="text-slate-400 hover:text-slate-200"><Icon name="close" size={18} /></button>
            </div>
            <div className="space-y-4">
              <select value={meta.office} onChange={e=>setMeta({...meta, office:e.target.value, fd:'', section:''})} className={inp} disabled={isConstrained}>
                <option value="">Office</option>
                {OFFICES.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <select value={meta.fd} onChange={e=>setMeta({...meta, fd:e.target.value, section:''})} className={inp} disabled={!meta.office}><option value="">Functional Division</option>{activeFds.map(f=><option key={f} value={f}>{f}</option>)}</select>
                <select value={meta.section} onChange={e=>setMeta({...meta, section:e.target.value})} className={inp} disabled={!meta.fd}><option value="">Section/Unit</option>{activeSections.map(s=><option key={s} value={s}>{s}</option>)}</select>
              </div>
              
              <div className="border-t dark:border-slate-800 pt-3 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Line Item</span>
                <select value={workingItem.category} onChange={e=>setWorkingItem({...workingItem, category:e.target.value, specificItem: ''})} className={inp}>
                  <option value="">Select Category</option>
                  {Object.keys(CATEGORIES).map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <select value={workingItem.specificItem} onChange={e=>setWorkingItem({...workingItem, specificItem:e.target.value})} className={inp} disabled={!workingItem.category}>
                  <option value="">Select Specific Item</option>
                  {(CATEGORIES[workingItem.category] || []).map(i=><option key={i} value={i}>{i}</option>)}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" value={workingItem.qty} onChange={e=>setWorkingItem({...workingItem, qty:e.target.value})} className={inp} placeholder="Quantity"/>
                  <select value={workingItem.uom} onChange={e=>setWorkingItem({...workingItem, uom:e.target.value})} className={inp}>{UOM_LIST.map(u=><option key={u} value={u}>{u}</option>)}</select>
                </div>
                <input type="number" value={workingItem.value} onChange={e=>setWorkingItem({...workingItem, value:e.target.value})} className={inp} placeholder="Estimated Valuation (₱)"/>
                <input type="text" value={workingItem.remarks} onChange={e=>setWorkingItem({...workingItem, remarks:e.target.value})} className={inp} placeholder="Remarks (Optional)"/>
                <button type="button" onClick={handlePushLine} className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded border dark:border-slate-700 hover:bg-slate-200 text-amber-500 transition"><Icon name="plus" size={14} /> Add Line Item</button>
              </div>
              
              {lines.length > 0 && (
                <div className="border-t dark:border-slate-800 pt-3 space-y-2">
                  {lines.map(l => (
                    <div key={l.id} className="flex justify-between items-center text-[11px] p-2 bg-slate-50 dark:bg-slate-900/40 border dark:border-slate-800 rounded">
                      <span>{l.specificItem} x{l.qty} - ₱{Number(l.value).toLocaleString()} {l.remarks ? `(${l.remarks})` : ''}</span>
                    </div>
                  ))}
                  <button onClick={handleCommitBatch} className="w-full py-2 bg-emerald-800 hover:bg-emerald-850 text-white font-bold rounded text-xs transition">Submit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <form onSubmit={handleUpdateItem} className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-amber-500">Modify Specification</h3>
              <button type="button" onClick={() => setEditModal(null)} className="text-slate-400"><Icon name="close" size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Requirement Vol.</label>
                <input type="number" value={editModal.qty} onChange={e=>setEditModal({...editModal, qty: e.target.value})} className={inp} required />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Estimated Overhead Cost (₱)</label>
              <input type="number" value={editModal.value} onChange={e=>setEditModal({...editModal, value: e.target.value})} className={inp} required />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Fulfillment Status Tier</label>
              <select value={editModal.status} onChange={e=>setEditModal({...editModal, status: e.target.value})} className={inp}>
                <option value="Unfulfilled">Unfulfilled</option>
                <option value="Partially Fulfilled">Partially Fulfilled</option>
                <option value="Fulfilled">Fulfilled</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xs rounded transition shadow-md"> Save Verification Changes</button>
          </form>
        </div>
      )}

      {trailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-500">System Change Audit Trail Log</h3>
              <button onClick={() => setTrailModal(null)} className="text-slate-400"><Icon name="close" size={16} /></button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {trailModal.history?.map((t, i) => (
                <div key={i} className="text-xs p-3 rounded bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>{t.timestamp}</span>
                    <span className="font-bold text-amber-500">{t.user}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{t.action}</p>
                </div>
              )) || <p className="text-xs text-center opacity-40 py-4">No logged validation adjustments.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- TAB: CONTRIBUTIONS WORKSPACE ---
function ContributionsWorkspace({ contributions, setContributions, userContext, darkMode }) {
  const isReadOnly = userContext.role === SYSTEM_ROLES.MONITORING;
  const isConstrained = userContext.office !== 'Regional Office';
  const isIctUser = userContext.role === SYSTEM_ROLES.ICT_USER;
  
  // --- SUB-TAB ROUTING ARCHITECTURE ---
  const [subTab, setSubTab] = useState('ledger'); // 'ledger' or 'partners'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [filters, setFilters] = useState({ 
    office: isConstrained ? userContext.office : '', 
    fd: '', section: '', category: '', specificItem: '',
    year: 'All', quarter: 'All', month: 'All'
  });
  
  const [meta, setMeta] = useState({ partner: '', office: isConstrained ? userContext.office : '', fd: '', section: '' });
  const [lines, setLines] = useState([]);
  
  const [workingItem, setWorkingItem] = useState({ 
    specificItem: '', category: '', qty: '', uom: 'Piece (pc)', value: '', remarks: '' 
  });
  
  const activeFds = useMemo(() => meta.office ? Object.keys(STRUCTURE[meta.office === 'Regional Office' ? 'Regional Office' : 'SDO'] || {}) : [], [meta.office]);
  const activeSections = useMemo(() => (meta.office && meta.fd) ? STRUCTURE[meta.office === 'Regional Office' ? 'Regional Office' : 'SDO']?.[meta.fd] || [] : [], [meta.office, meta.fd]);

  const currentFilteredView = useMemo(() => {
    return contributions.filter(c => {
      if (isConstrained && c.office !== userContext.office) return false;
      if (filters.office && c.office !== filters.office) return false;
      if (filters.fd && c.fd !== filters.fd) return false;
      if (filters.section && c.section !== filters.section) return false;
      if (filters.category && c.category !== filters.category) return false;
      if (filters.specificItem && c.specificItem !== filters.specificItem) return false;
      
      const d = new Date(c.dateLogged);
      if (filters.year !== 'All' && d.getFullYear().toString() !== filters.year) return false;
      if (filters.month !== 'All' && MONTHS[d.getMonth()] !== filters.month) return false;
      if (filters.quarter !== 'All' && `Q${Math.floor(d.getMonth() / 3) + 1}` !== filters.quarter) return false;

      return true;
    });
  }, [contributions, filters, userContext, isConstrained]);

  // --- FEATURE: PARTNERS COMPUTATION GRID ---
  const partnersSummary = useMemo(() => {
    const registry = {};
    currentFilteredView.forEach(item => {
      if (!registry[item.partner]) {
        registry[item.partner] = { name: item.partner, totalValuation: 0, aggregateLogs: [] };
      }
      registry[item.partner].totalValuation += Number(item.value);
      registry[item.partner].aggregateLogs.push(item);
    });

    const list = Object.values(registry);
    if (!searchQuery.trim()) return list;
    return list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()));
  }, [currentFilteredView, searchQuery]);

  // --- AUTOMATIC AUTOCOMPLETE HINTS FOR INTERACTIVE BAR ---
  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const allUniqueNames = Array.from(new Set(currentFilteredView.map(c => c.partner)));
    return allUniqueNames.filter(name => 
      name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      name.toLowerCase() !== searchQuery.toLowerCase()
    ).slice(0, 5);
  }, [currentFilteredView, searchQuery]);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [trailModal, setTrailModal] = useState(null);

  const handlePushLine = () => {
    if (!workingItem.specificItem || !workingItem.category || !workingItem.qty || !workingItem.value) return;
    setLines([...lines, { ...workingItem, id: crypto.randomUUID() }]);
    setWorkingItem({ specificItem: '', category: '', qty: '', uom: 'Piece (pc)', value: '', remarks: '' });
  };

  const handleCommitBatch = (e) => {
    e.preventDefault();
    if (!meta.partner || !meta.office || !meta.fd || !meta.section || !lines.length) return;
    
    const timestamp = new Date().toLocaleString();
    const formatted = lines.map((l, i) => ({
      id: 'C-GEN-' + (contributions.length + i + 1),
      dateLogged: new Date().toISOString().split('T')[0],
      ...meta,
      category: l.category,
      specificItem: l.specificItem,
      qty: Number(l.qty),
      uom: l.uom,
      value: Number(l.value),
      remarks: l.remarks,
      history: [{ timestamp, user: userContext.name, action: `Logged asset provision: ${l.specificItem}.` }]
    }));
    
    setContributions([...formatted, ...contributions]);
    setLines([]);
    setMeta({ partner: '', office: isConstrained ? userContext.office : '', fd: '', section: '' });
    setAddModal(false);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    setContributions(contributions.map(c => {
      if (c.id === editModal.id) {
        const changes = [];
        if (c.qty !== Number(editModal.qty)) changes.push(`Quantity changed from ${c.qty} to ${editModal.qty}`);
        if (c.value !== Number(editModal.value)) changes.push(`Valuation changed from ₱${c.value} to ₱${editModal.value}`);
        return { 
          ...c, 
          qty: Number(editModal.qty), 
          value: Number(editModal.value),
          history: [
            ...c.history, 
            { timestamp, user: userContext.name, action: changes.length ? `Updated metrics: ${changes.join(', ')}.` : 'Saved without variable changes.' }
          ] 
        };
      }
      return c;
    }));
    setEditModal(null);
  };

  const inp = `w-full p-2 text-xs rounded border outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100`;

  return (
    <div className="space-y-6">
      <SystemFilters filters={filters} setFilters={setFilters} darkMode={darkMode} includeCategoryFilters={true} userContext={userContext} />
      
      {/* --- SUB-TAB HEADERS SWITCHER BAR (SECURED AGAINST ICT USERS) --- */}
      {!isIctUser && (
        <div className="flex border-b dark:border-slate-800 gap-2">
          <button 
            onClick={() => setSubTab('ledger')} 
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${subTab === 'ledger' ? 'border-amber-500 text-emerald-800 dark:text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            Contributions
          </button>
          <button 
            onClick={() => setSubTab('partners')} 
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${subTab === 'partners' ? 'border-amber-500 text-emerald-800 dark:text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            Partners
          </button>
        </div>
      )}

      {/* --- ROUTE VIEW 1: RENDER STANDARD CONTRIBUTIONS CONTROLLER --- */}
      {(subTab === 'ledger' || isIctUser) && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 border dark:border-slate-800 rounded-xl shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-emerald-800 dark:text-amber-400">Contributions Ledger</h2>
              <p className="text-[11px] opacity-60">Verified Records: {currentFilteredView.length}</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!isReadOnly && (
                <button onClick={()=>setAddModal(true)} className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500 text-emerald-950 rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
                  <Icon name="plus" size={14} /><span>Record Donations</span>
                </button>
              )}
              <button onClick={() => exportToCSV(currentFilteredView, 'DEPED8_CONTRIBUTIONS_EXPORT')} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-emerald-850">
                <Icon name="download" size={14} /><span>Export Matrix</span>
              </button>
            </div>
          </div>

          <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-2">Partner</th>
                  <th className="pb-2">Recipient</th>
                  <th className="pb-2">Functional Division</th>
                  <th className="pb-2">Section/Unit</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Line Item</th>
                  <th className="pb-2 text-right">Quantity</th>
                  <th className="pb-2 text-right">Value</th>
                  <th className="pb-2">Remarks</th>
                  <th className="pb-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-800/60">
                {currentFilteredView.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 font-bold text-emerald-800 dark:text-amber-400">{c.partner}</td>
                    <td className="py-2.5 font-bold">{c.office}</td>
                    <td className="py-2.5 truncate max-w-[130px] text-slate-600 dark:text-slate-400">{c.fd}</td>
                    <td className="py-2.5 text-slate-500">{c.section}</td>
                    <td className="py-2.5 text-slate-400 text-[11px]">{c.category}</td>
                    <td className="py-2.5 font-semibold">{c.specificItem}</td>
                    <td className="py-2.5 text-right font-medium">{c.qty} <span className="text-[10px] opacity-50">{c.uom}</span></td>
                    <td className="py-2.5 text-right font-black text-emerald-700 dark:text-amber-500">₱ {Number(c.value).toLocaleString()}</td>
                    <td className="py-2.5 text-slate-500 text-[11px] truncate max-w-[150px]" title={c.remarks}>{c.remarks || '-'}</td>
                    <td className="py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {!isReadOnly && (
                          <button onClick={() => setEditModal(c)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-500 transition" title="Modify Record">
                            <Icon name="edit" size={14} />
                          </button>
                        )}
                        <button onClick={() => setTrailModal(c)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-amber-500 transition" title="Audit Trail">
                          <Icon name="history" size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* --- ROUTE VIEW 2: NEW PARTNERS SUB-TAB (CRITICAL LAYER EXCLUSIVITY ENFORCED) --- */}
      {subTab === 'partners' && !isIctUser && (
        <div className="space-y-4">
          {/* INTERACTIVE COMPONENT: PARTNERS HEADER & CONTROLS */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 border dark:border-slate-800 rounded-xl shadow-sm">
            
            {/* SEARCH ENGINE INPUT CONTAINER */}
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search specific partner identity..." 
                className="w-full p-2.5 pl-3 pr-8 text-xs font-semibold rounded-lg border shadow-sm outline-none transition focus:border-amber-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 text-slate-800"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-200">
                  <Icon name="close" size={14} />
                </button>
              )}
              
              {/* INTERACTIVE INTELLISENSE AUTOCAMP SYSTEM */}
              {autocompleteSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 border rounded-lg shadow-xl z-30 overflow-hidden divide-y bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 divide-slate-100 dark:divide-slate-800/60">
                  {autocompleteSuggestions.map(itemHint => (
                    <button 
                      key={itemHint} 
                      onClick={() => setSearchQuery(itemHint)}
                      className="w-full text-left p-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 transition"
                    >
                      {itemHint}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ACTION CONTROLS: PRINT AND EXPORT */}
            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button onClick={() => {
                const sortedList = [...partnersSummary].sort((a, b) => a.name.localeCompare(b.name));
                const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
                const printWindow = window.open('', '_blank');
                
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>List of Partners</title>
                      <style>
                        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #1e293b; line-height: 1.5; }
                        .header-img { width: 100%; max-width: 750px; display: block; margin: 0 auto 20px auto; }
                        .date-note { text-align: right; font-size: 12px; font-weight: bold; margin-bottom: 20px; color: #64748b; }
                        h2 { text-align: center; margin-bottom: 25px; font-size: 18px; text-transform: uppercase; font-weight: 800; color: #0f172a; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: left; font-size: 13px; }
                        th { background-color: #f8fafc; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #475569; }
                        .text-right { text-align: right; }
                        .text-center { text-align: center; }
                      </style>
                    </head>
                    <body>
                      <div class="date-note">DATA AS OF ${todayFormatted}</div>
                      <img src="header_3.png" alt="Document Header" class="header-img" />
                      <h2>Alphabetical List of Partners</h2>
                      <table>
                        <thead>
                          <tr>
                            <th>Partner Name</th>
                            <th class="text-center">No. of Contributions</th>
                            <th class="text-right">Total Value (PHP)</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${sortedList.map(p => `
                            <tr>
                              <td><strong>${p.name}</strong></td>
                              <td class="text-center">${p.aggregateLogs.length} transactions</td>
                              <td class="text-right">P ${Number(p.totalValuation).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                
                // Allow a brief delay for the header image to fully load in the new window before triggering print
                setTimeout(() => {
                  printWindow.print();
                  printWindow.close();
                }, 750);
              }} className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500 text-emerald-950 rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
                <span>Print List</span>
              </button>
              
              <button onClick={() => {
                const exportPayload = partnersSummary.map(p => ({
                  'Partner Name': p.name,
                  'Total Transactions': p.aggregateLogs.length,
                  'Total Valuation (PHP)': p.totalValuation
                }));
                exportToCSV(exportPayload, 'DEPED8_PARTNERS_MATRIX_EXPORT');
              }} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-emerald-850 transition">
                <Icon name="download" size={14} /><span>Export Matrix</span>
              </button>
            </div>
          </div>

          {/* DATAGRID MATRIX FRAMEWORK TABLE */}
          <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-2 pl-2">Partner</th>
                  <th className="pb-2 text-center">No. of Contributions</th>
                  <th className="pb-2 text-right pr-4">Total Value</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-800/60">
                {partnersSummary.map(rowNode => (
                  <tr 
                    key={rowNode.name} 
                    onClick={() => setSelectedPartner(rowNode)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition"
                  >
                    <td className="py-3 pl-2 font-black text-emerald-800 dark:text-amber-400 text-xs">{rowNode.name}</td>
                    <td className="py-3 text-center font-bold text-slate-600 dark:text-slate-300">{rowNode.aggregateLogs.length} transactions</td>
                    <td className="py-3 text-right pr-4 font-black text-emerald-700 dark:text-amber-500">₱ {rowNode.totalValuation.toLocaleString()}</td>
                  </tr>
                ))}
                {partnersSummary.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-6 text-center text-slate-500 italic">No partners match the applied structural/temporal parameter sets.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- MODAL DIALOG DISPLAYING LOGGED TRANSACTIONS PER ENTRANT NODE --- */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className={`w-full max-w-4xl p-6 rounded-2xl border shadow-2xl flex flex-col max-h-[85vh] ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center border-b dark:border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-black text-amber-500">Resource Summary Ledger</span>
                <h3 className="font-black text-base text-emerald-800 dark:text-amber-400">{selectedPartner.name}</h3>
              </div>
              <button onClick={() => setSelectedPartner(null)} className="text-slate-400 hover:text-slate-200 transition">
                <Icon name="close" size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 border dark:border-slate-800/80 rounded-lg">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="sticky top-0 bg-slate-100 dark:bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b dark:border-slate-800">
                  <tr>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Office</th>
                    <th className="p-2.5">Functional Division</th>
                    <th className="p-2.5">Section/Unit</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Line Item</th>
                    <th className="p-2.5 text-right">Qty</th>
                    <th className="p-2.5 text-right pr-3">Valuation</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-slate-800/60">
                  {selectedPartner.aggregateLogs.map(itemLog => (
                    <tr key={itemLog.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 text-[11px]">
                      <td className="p-2.5 text-slate-500">{itemLog.dateLogged}</td>
                      <td className="p-2.5 font-bold">{itemLog.office}</td>
                      <td className="p-2.5 truncate max-w-[120px] text-slate-400">{itemLog.fd}</td>
                      <td className="p-2.5 text-slate-500">{itemLog.section}</td>
                      <td className="p-2.5 text-slate-500">{itemLog.category}</td>
                      <td className="p-2.5 font-semibold text-slate-700 dark:text-slate-300">{itemLog.specificItem}</td>
                      <td className="p-2.5 text-right font-medium">{itemLog.qty} <span className="text-[10px] opacity-40">{itemLog.uom}</span></td>
                      <td className="p-2.5 text-right pr-3 font-black text-emerald-600 dark:text-amber-500">₱{itemLog.value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-3 border-t dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400">Total Pipeline Records: {selectedPartner.aggregateLogs.length}</span>
              <span className="text-sm font-black text-emerald-800 dark:text-amber-400">Total Contribution: ₱{selectedPartner.totalValuation.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b dark:border-slate-800 pb-3 mb-4">
              <h3 className="font-black text-sm uppercase tracking-wider text-emerald-800 dark:text-amber-400">Record Resource Turnover</h3>
              <button onClick={() => setAddModal(false)} className="text-slate-400 hover:text-slate-200"><Icon name="close" size={18} /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={meta.partner} onChange={e=>setMeta({...meta, partner:e.target.value})} className={inp} placeholder="Sponsoring Partner / Entity" />
              <select value={meta.office} onChange={e=>setMeta({...meta, office:e.target.value, fd:'', section:''})} className={inp} disabled={isConstrained}>
                <option value="">Recipient Office</option>
                {OFFICES.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <select value={meta.fd} onChange={e=>setMeta({...meta, fd:e.target.value, section:''})} className={inp} disabled={!meta.office}><option value="">Functional Division</option>{activeFds.map(f=><option key={f} value={f}>{f}</option>)}</select>
                <select value={meta.section} onChange={e=>setMeta({...meta, section:e.target.value})} className={inp} disabled={!meta.fd}><option value="">Section/Unit</option>{activeSections.map(s=><option key={s} value={s}>{s}</option>)}</select>
              </div>
              
              <div className="border-t dark:border-slate-800 pt-3 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Line Item</span>
                <select value={workingItem.category} onChange={e=>setWorkingItem({...workingItem, category:e.target.value, specificItem: ''})} className={inp}>
                  <option value="">Select Category</option>
                  {Object.keys(CATEGORIES).map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <select value={workingItem.specificItem} onChange={e=>setWorkingItem({...workingItem, specificItem:e.target.value})} className={inp} disabled={!workingItem.category}>
                  <option value="">Select Specific Item</option>
                  {(CATEGORIES[workingItem.category] || []).map(i=><option key={i} value={i}>{i}</option>)}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" value={workingItem.qty} onChange={e=>setWorkingItem({...workingItem, qty:e.target.value})} className={inp} placeholder="Quantity"/>
                  <select value={workingItem.uom} onChange={e=>setWorkingItem({...workingItem, uom:e.target.value})} className={inp}>{UOM_LIST.map(u=><option key={u} value={u}>{u}</option>)}</select>
                </div>
                <input type="number" value={workingItem.value} onChange={e=>setWorkingItem({...workingItem, value:e.target.value})} className={inp} placeholder="Value of Item(s) (₱)"/>
                <input type="text" value={workingItem.remarks} onChange={e=>setWorkingItem({...workingItem, remarks:e.target.value})} className={inp} placeholder="Remarks (Optional)"/>
                
                <button type="button" onClick={handlePushLine} className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded border dark:border-slate-700 hover:bg-slate-200 text-amber-500 transition"><Icon name="plus" size={14} /> Add Line Item</button>
              </div>
              
              {lines.length > 0 && (
                <div className="border-t dark:border-slate-800 pt-3 space-y-2">
                  {lines.map(l => (
                    <div key={l.id} className="flex justify-between items-center text-[11px] p-2 bg-slate-50 dark:bg-slate-900/40 border dark:border-slate-800 rounded">
                      <span>{l.specificItem} x{l.qty} - ₱{Number(l.value).toLocaleString()} {l.remarks ? `(${l.remarks})` : ''}</span>
                    </div>
                  ))}
                  <button onClick={handleCommitBatch} className="w-full py-2 bg-emerald-800 hover:bg-emerald-850 text-white font-bold rounded text-xs transition">Submit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <form onSubmit={handleUpdateItem} className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-amber-500">Modify Specification</h3>
              <button type="button" onClick={() => setEditModal(null)} className="text-slate-400"><Icon name="close" size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Quantity Provided</label>
                <input type="number" value={editModal.qty} onChange={e=>setEditModal({...editModal, qty: e.target.value})} className={inp} required />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Declared Value (₱)</label>
              <input type="number" value={editModal.value} onChange={e=>setEditModal({...editModal, value: e.target.value})} className={inp} required />
            </div>
            <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xs rounded transition shadow-md"> Save Verification Changes</button>
          </form>
        </div>
      )}

      {trailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-500">System Change Audit Trail Log</h3>
              <button onClick={() => setTrailModal(null)} className="text-slate-400"><Icon name="close" size={16} /></button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {trailModal.history?.map((t, i) => (
                <div key={i} className="text-xs p-3 rounded bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>{t.timestamp}</span>
                    <span className="font-bold text-amber-500">{t.user}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{t.action}</p>
                </div>
              )) || <p className="text-xs text-center opacity-40 py-4">No logged validation adjustments.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- TAB: USER MANAGEMENT ---
function UserWorkspace({ users, setUsers, userContext, darkMode }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const isSuperAdminOrRoIct = userContext.role === SYSTEM_ROLES.SUPERADMIN || (userContext.role === SYSTEM_ROLES.ICT_USER && userContext.office === 'Regional Office');
  const hasWriteClearance = userContext.role === SYSTEM_ROLES.SUPERADMIN || userContext.role === SYSTEM_ROLES.ICT_USER; 
  
  const canManageUser = (targetOffice) => isSuperAdminOrRoIct || (hasWriteClearance && userContext.office === targetOffice);
  
  const displayedUsers = users.filter(u => isSuperAdminOrRoIct || u.office === userContext.office);

  const [form, setForm] = useState({ 
    name: '', username: '', email: '', role: SYSTEM_ROLES.FOCAL, position: '', 
    office: isSuperAdminOrRoIct ? 'Regional Office' : userContext.office 
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.email) return;
    setUsers([...users, { ...form, id: users.length + 1 }]);
    setForm({ 
      name: '', username: '', email: '', role: SYSTEM_ROLES.FOCAL, position: '', 
      office: isSuperAdminOrRoIct ? 'Regional Office' : userContext.office 
    });
    setIsAddOpen(false);
  };

  const handleEditClick = (u) => {
    setEditingUser(u);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    if (id === userContext.id) {
      alert("Security constraint: Core context scope profile cannot request self-destruction.");
      return;
    }
    if (window.confirm("Purge authentication parameters for this identity user node?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const inp = `w-full p-2 text-xs rounded border outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 border dark:border-slate-800 rounded-xl shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-emerald-800 dark:text-amber-400">User Management Directory</h2>
          <p className="text-[11px] opacity-60">Verified Access Profiles: {displayedUsers.length}</p>
        </div>
        {hasWriteClearance && (
          <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 px-4 py-1.5 bg-amber-500 text-emerald-950 rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
            <Icon name="plus" size={14} /><span>Add Account</span>
          </button>
        )}
      </div>

      <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-2">Name</th>
              <th className="pb-2">Username</th>
              <th className="pb-2">Designation/Position</th>
              <th className="pb-2">Access Level</th>
              <th className="pb-2">Office</th>
              {hasWriteClearance && <th className="pb-2 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800/60">
            {displayedUsers.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                <td className="py-2.5">
                  <p className="font-bold text-slate-800 dark:text-slate-200">{u.name}</p>
                  <p className="text-[10px] opacity-60">{u.email}</p>
                </td>
                <td className="py-2.5 text-slate-500">{u.username}</td>
                <td className="py-2.5 text-slate-500">{u.position}</td>
                <td className="py-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">{u.role}</span>
                </td>
                <td className="py-2.5 font-semibold text-slate-700 dark:text-slate-300">{u.office}</td>
                {hasWriteClearance && canManageUser(u.office) && (
                  <td className="py-2.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleEditClick(u)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-400 transition" title="Modify Permissions">
                        <Icon name="edit" size={14} />
                      </button>
                      <button onClick={() => handleDeleteUser(u.id)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-red-500 transition" title="Revoke Credentials">
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <form onSubmit={handleAddUser} className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b dark:border-slate-800 pb-2 mb-2">
              <h3 className="font-bold text-sm text-emerald-800 dark:text-amber-400">Initialize Identity Record</h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-slate-400"><Icon name="close" size={16} /></button>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Full Legal Name</label>
              <input type="text" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className={inp} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Username</label>
                <input type="text" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} className={inp} required />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">User Type</label>
                <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className={inp}>
                  {Object.values(SYSTEM_ROLES).map(r=><option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Email Address</label>
              <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className={inp} required />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Position/Designation</label>
              <input type="text" value={form.position} onChange={e=>setForm({...form, position:e.target.value})} className={inp} required />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Office</label>
              <select 
                value={form.office} 
                onChange={e=>setForm({...form, office:e.target.value})} 
                className={`${inp} ${!isSuperAdminOrRoIct ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}`} 
                disabled={!isSuperAdminOrRoIct}
              >
                {OFFICES.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full mt-2 py-2 bg-emerald-800 hover:bg-emerald-850 text-amber-400 font-bold text-xs rounded transition shadow-md">Submit</button>
          </form>
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <form onSubmit={handleUpdateUser} className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b dark:border-slate-800 pb-2 mb-2">
              <h3 className="font-bold text-sm text-amber-500">Modify Identity Parameters</h3>
              <button type="button" onClick={() => setEditingUser(null)} className="text-slate-400"><Icon name="close" size={16} /></button>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Full Legal Name</label>
              <input type="text" value={editingUser.name} onChange={e=>setEditingUser({...editingUser, name:e.target.value})} className={inp} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Auth Alias</label>
                <input type="text" value={editingUser.username} onChange={e=>setEditingUser({...editingUser, username:e.target.value})} className={inp} required />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">System clearance</label>
                <select value={editingUser.role} onChange={e=>setEditingUser({...editingUser, role:e.target.value})} className={inp}>
                  {Object.values(SYSTEM_ROLES).map(r=><option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Email Address</label>
              <input type="email" value={editingUser.email} onChange={e=>setEditingUser({...editingUser, email:e.target.value})} className={inp} required />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Position/Designation</label>
              <input type="text" value={editingUser.position} onChange={e=>setEditingUser({...editingUser, position:e.target.value})} className={inp} required />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Office</label>
              <select 
                value={editingUser.office} 
                onChange={e=>setEditingUser({...editingUser, office:e.target.value})} 
                className={`${inp} ${!isSuperAdminOrRoIct ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}`} 
                disabled={!isSuperAdminOrRoIct}
              >
                {OFFICES.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full mt-2 py-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold text-xs rounded transition shadow-md">Execute Parameter Changes</button>
          </form>
        </div>
      )}
    </div>
  );
}
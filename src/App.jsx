//[cite: 7]
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
    print: <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2-9H7v4h10V3z" />,
    trash: <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />,
    close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />,
    edit: <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />,
    history: <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />,
    logout: <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />,
    lock: <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>,
    info: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />,
    key: <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />,
    eye: <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />,
    eyeOff: <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
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
const QUARTER_MONTHS = {
  Q1: ['January', 'February', 'March'],
  Q2: ['April', 'May', 'June'],
  Q3: ['July', 'August', 'September'],
  Q4: ['October', 'November', 'December']
};

const SYSTEM_ROLES = {
  SUPERADMIN: 'Superadmin',
  ICT_USER: 'User Manager',
  FOCAL: 'Partnerships Focal',
  PARTNER: 'External Partner',
  MONITORING: 'Monitoring',
  END_USER: 'End User'
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
  { id: 3, name: 'Leyte ICT', username: 'leyte.usermgr', email: 'ict.leyte@deped.gov.ph', role: SYSTEM_ROLES.ICT_USER, position: 'ITO I', office: 'Leyte', password: 'password123' },
  { id: 4, name: 'Region Monitor', username: 'ro.monitor', email: 'mon.ro@deped.gov.ph', role: SYSTEM_ROLES.MONITORING, position: 'Auditor III', office: 'Regional Office', password: 'password123' },
  { id: 5, name: 'Tacloban Focal', username: 'tac.focal', email: 'focal.tac@deped.gov.ph', role: SYSTEM_ROLES.FOCAL, position: 'PDO I', office: 'Tacloban City', password: 'password123' },
  { id: 6, name: 'Leyte End User', username: 'leyte.enduser', email: 'enduser.leyte@deped.gov.ph', role: SYSTEM_ROLES.END_USER, position: 'Administrative Aide III', office: 'Leyte', password: 'password123' },
  { id: 7, name: 'TechCorp Foundation', username: 'techcorp.partner', email: 'partner@techcorp.example', role: SYSTEM_ROLES.PARTNER, position: 'Partner Representative', office: 'Regional Office', password: 'password123' },
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

// --- SHARED DEPED DOCUMENT HEADER FOR PRINT OUTPUTS ---
const PRINT_HEADER_STYLES = `
  .print-header { text-align: center; margin-bottom: 6px; }
  .print-seal { width: 0.76in; height: 0.76in; display: block; margin: 0 auto 6px; }
  .print-header-old-eng { font-family: 'Old English Text MT', 'Blackletter686 BT', 'UnifrakturMaguntia', serif; }
  .print-header-line1 { font-size: 12pt; }
  .print-header-line2 { font-size: 18pt; }
  .print-header-line3 { font-family: 'Trajan Pro', 'Times New Roman', serif; font-size: 13pt; letter-spacing: 0.04em; margin-top: 2px; }
  .print-header-rule { border: none; border-top: 1px solid #000; margin: 8px 0 18px; }
  .print-meta-row { display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: bold; margin-bottom: 16px; color: #333; }
  tfoot td { border-top: 2px solid #000 !important; font-weight: 800; background-color: #f9f9f9; }
`;

const buildPrintHeaderHtml = (officeFilterValue, isPartnerRole) => {
  const isRegional = isPartnerRole || !officeFilterValue || officeFilterValue === 'Regional Office';
  const officeLine = isRegional
    ? `<div class="print-header-line3">Region VIII &ndash; Eastern Visayas</div>`
    : `<div class="print-header-line3">Region VIII</div><div class="print-header-line3">Schools Division of ${officeFilterValue}</div>`;
  return `
    <div class="print-header">
      <img src="/logo.png" class="print-seal" onerror="this.style.display='none'" />
      <div class="print-header-old-eng print-header-line1">Republic of the Philippines</div>
      <div class="print-header-old-eng print-header-line2">Department of Education</div>
      ${officeLine}
    </div>
    <hr class="print-header-rule" />
  `;
};

const buildPrintMetaRow = (officeFilterValue, todayFormatted) => `
  <div class="print-meta-row">
    <span>Office: ${officeFilterValue || 'Region VIII (All Offices)'}</span>
    <span>DATA AS OF ${todayFormatted}</span>
  </div>
`;

// --- SORTING ENGINE HOOK ---
function useSortableData(items, config = null) {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'transactions') {
          aValue = a.aggregateLogs?.length || 0;
          bValue = b.aggregateLogs?.length || 0;
        }

        if (aValue === undefined || aValue === null) aValue = '';
        if (bValue === undefined || bValue === null) bValue = '';

        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();

        if (['value', 'qty', 'totalValuation'].includes(sortConfig.key)) {
          aValue = Number(aValue) || 0;
          bValue = Number(bValue) || 0;
        }

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
}

const SortIndicator = ({ sortConfig, sortKey, darkMode }) => {
  if (!sortConfig || sortConfig.key !== sortKey) return <span className={`ml-1 ${darkMode ? 'text-white' : 'text-black'} opacity-40 dark:opacity-40 text-[10px]`}>↕</span>;
  return <span className="ml-1 text-[10px] text-amber-500">{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>;
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

  const handleUpdateProfile = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen 
        users={users} 
        setUsers={setUsers}
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
      darkMode ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-black'
    }`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} role={currentUser.role} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          currentUser={currentUser} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onLogout={handleLogout} 
          onUpdateProfile={handleUpdateProfile}
        />
        
        <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && <Dashboard needs={needs} contributions={contributions} userContext={currentUser} darkMode={darkMode} />}
          {activeTab === 'needs' && <NeedsWorkspace needs={needs} setNeeds={setNeeds} userContext={currentUser} darkMode={darkMode} />}
          {activeTab === 'contributions' && <ContributionsWorkspace contributions={contributions} setContributions={setContributions} userContext={currentUser} darkMode={darkMode} />}
          {activeTab === 'users' && <UserWorkspace users={users} setUsers={setUsers} userContext={currentUser} darkMode={darkMode} />}
          {activeTab === 'about' && <AboutWorkspace darkMode={darkMode} />}
        </main>
      </div>
    </div>
  );
}

// --- LOGIN GATEWAY ---
function LoginScreen({ users, setUsers, onLoginSuccess, darkMode, setDarkMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [resetUser, setResetUser] = useState(null);
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetError, setResetError] = useState('');

  const attemptLogin = (targetUser) => {
    if (targetUser.passwordResetRequired) {
      setResetUser(targetUser);
      setResetError('');
      return;
    }
    onLoginSuccess(targetUser);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    const targetUser = users.find(u => u.username.toLowerCase() === username.toLowerCase().trim());
    if (targetUser && (targetUser.passwordResetRequired || password === 'password123' || targetUser.password === password)) {
      attemptLogin(targetUser);
    } else {
      setError('Invalid alignment credentials. Try simulation quick select keys below.');
    }
  };

  const handleQuickSelect = (user) => {
    setUsername(user.username);
    setPassword('password123');
    attemptLogin(user);
  };

  const handleSetNewPassword = (e) => {
    e.preventDefault();
    if (!newPassword1 || !newPassword2) {
      setResetError('Please fill in both fields.');
      return;
    }
    if (newPassword1 !== newPassword2) {
      setResetError('The two passwords do not match.');
      return;
    }
    if (newPassword1.length < 6) {
      setResetError('Password must be at least 6 characters.');
      return;
    }
    const updatedUser = { ...resetUser, password: newPassword1, passwordResetRequired: false };
    setUsers(users.map(u => u.id === resetUser.id ? updatedUser : u));
    onLoginSuccess(updatedUser);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-200 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-slate-100 text-black'}`}>
      <div className="absolute top-4 right-4">
        <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-slate-200 shadow-sm ${darkMode ? 'text-amber-400' : 'text-black'} transition`}>
          <Icon name={darkMode ? 'sun' : 'moon'} size={16} />
        </button>
      </div>
      <div className={`w-full max-w-md rounded-2xl border shadow-xl overflow-hidden ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-300'}`}>
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-blue-800"></div>
          <div className="flex-1 bg-amber-500"></div>
        </div>
        <div className="p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-amber-500 text-black flex items-center justify-center text-2xl font-black shadow-md mb-3 overflow-hidden ring-2 ring-blue-800 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900">
             <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
             <span className="hidden">R8</span>
          </div>
          <p className={`text-[9px] uppercase tracking-widest font-bold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-1`}>Republic of the Philippines · Department of Education</p>
          <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-amber-400' : 'text-black'}`}>Project UGNAY</h1>
          <p className={`text-xs uppercase font-bold tracking-widest ${darkMode ? 'text-white' : 'text-black'} mt-1`}>by DepEd Region VIII</p>
        </div>

        {resetUser ? (
          <form onSubmit={handleSetNewPassword} className="space-y-4">
            <div className={`p-3 text-xs bg-amber-500/10 border border-amber-500/20 ${darkMode ? 'text-amber-400' : 'text-amber-700'} font-semibold rounded-lg text-center`}>
              Your password was reset by an administrator. Please set a new password for <strong>{resetUser.username}</strong> to continue.
            </div>
            {resetError && <div className={`p-3 text-xs bg-red-500/10 border border-red-500/20 ${darkMode ? 'text-red-400' : 'text-red-600'} font-semibold rounded-lg text-center`}>{resetError}</div>}
            <div>
              <label className={`block text-[10px] uppercase font-black tracking-wider ${darkMode ? 'text-white' : 'text-black'} mb-1`}>New Password</label>
              <div className="relative">
                <input type={showResetPassword ? 'text' : 'password'} value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} placeholder="••••••••" className={`w-full p-2.5 pr-9 text-xs rounded-lg border outline-none transition focus:border-amber-500 ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-slate-300 text-black'}`} required />
                <button type="button" onClick={() => setShowResetPassword(!showResetPassword)} className={`absolute right-2.5 top-2.5 ${darkMode ? 'text-white' : 'text-black'} opacity-50 hover:opacity-100`}>
                  <Icon name={showResetPassword ? 'eyeOff' : 'eye'} size={14} />
                </button>
              </div>
            </div>
            <div>
              <label className={`block text-[10px] uppercase font-black tracking-wider ${darkMode ? 'text-white' : 'text-black'} mb-1`}>Confirm New Password</label>
              <div className="relative">
                <input type={showResetPassword ? 'text' : 'password'} value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} placeholder="••••••••" className={`w-full p-2.5 pr-9 text-xs rounded-lg border outline-none transition focus:border-amber-500 ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-slate-300 text-black'}`} required />
                <button type="button" onClick={() => setShowResetPassword(!showResetPassword)} className={`absolute right-2.5 top-2.5 ${darkMode ? 'text-white' : 'text-black'} opacity-50 hover:opacity-100`}>
                  <Icon name={showResetPassword ? 'eyeOff' : 'eye'} size={14} />
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-zinc-900 hover:bg-black text-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-black font-bold rounded-lg text-xs tracking-wider uppercase shadow-md transition duration-150">Set New Password &amp; Continue</button>
            <button type="button" onClick={() => { setResetUser(null); setNewPassword1(''); setNewPassword2(''); setResetError(''); }} className={`w-full text-[11px] font-semibold ${darkMode ? 'text-white' : 'text-black'} opacity-60 hover:opacity-100`}>Cancel</button>
          </form>
        ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {error && <div className={`p-3 text-xs bg-red-500/10 border border-red-500/20 ${darkMode ? 'text-red-400' : 'text-red-600'} font-semibold rounded-lg text-center`}>{error}</div>}
          <div>
            <label className={`block text-[10px] uppercase font-black tracking-wider ${darkMode ? 'text-white' : 'text-black'} mb-1`}>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. juan.super" className={`w-full p-2.5 text-xs rounded-lg border outline-none transition focus:border-amber-500 ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-slate-300 text-black'}`} required />
          </div>
          <div>
            <label className={`block text-[10px] uppercase font-black tracking-wider ${darkMode ? 'text-white' : 'text-black'} mb-1`}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={`w-full p-2.5 text-xs rounded-lg border outline-none transition focus:border-amber-500 ${darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-slate-300 text-black'}`} required />
          </div>
          <button type="submit" className="w-full py-3 bg-zinc-900 hover:bg-black text-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-black font-bold rounded-lg text-xs tracking-wider uppercase shadow-md transition duration-150">Sign In</button>
        </form>
        )}

        {!resetUser && (
        <div className="mt-8 border-t border-slate-200 dark:border-zinc-800 pt-5">
          <span className={`block text-[10px] uppercase font-black ${darkMode ? 'text-white' : 'text-black'} tracking-widest text-center mb-3`}>Simulation User Accounts</span>
          <div className="grid grid-cols-2 gap-2">
            {users.map((u) => (
              <button key={u.id} onClick={() => handleQuickSelect(u)} className="p-2 text-left text-[10px] font-semibold border border-slate-200 dark:border-zinc-800 rounded-lg hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-zinc-950 transition flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="truncate">
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-black'} truncate`}>{u.name}</p>
                  <p className={`${darkMode ? 'text-white' : 'text-black'} opacity-80 text-[9px] truncate`}>{u.role} ({u.office})</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        )}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab, darkMode, role }) {
  const allTabs = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: 'dashboard', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.FOCAL, SYSTEM_ROLES.PARTNER, SYSTEM_ROLES.MONITORING, SYSTEM_ROLES.END_USER] },
    { id: 'needs', label: 'Needs', icon: 'needs', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.FOCAL, SYSTEM_ROLES.PARTNER, SYSTEM_ROLES.MONITORING, SYSTEM_ROLES.END_USER] },
    { id: 'contributions', label: 'Contributions', icon: 'contributions', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.FOCAL, SYSTEM_ROLES.PARTNER, SYSTEM_ROLES.MONITORING, SYSTEM_ROLES.END_USER] },
    { id: 'users', label: 'User Management', icon: 'users', roles: [SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.ICT_USER] },
    { id: 'about', label: 'About', icon: 'info', roles: Object.values(SYSTEM_ROLES) }
  ];
  const filteredTabs = allTabs.filter(t => t.roles.includes(role));

  return (
    <aside className={`w-full md:w-64 border-b md:border-b-0 md:border-r transition-all ${darkMode ? 'bg-black border-zinc-900 text-zinc-100' : 'bg-zinc-900 border-zinc-950 text-white'} flex flex-col`}>
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-blue-800"></div>
        <div className="flex-1 bg-amber-500"></div>
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-zinc-800">
        <div className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center text-black font-black shadow-md overflow-hidden ring-2 ring-blue-800 ring-offset-2 ring-offset-zinc-900">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
          <span className="hidden">R8</span>
        </div>
        <div>
          <p className="text-[8px] uppercase tracking-wider text-blue-400 font-bold leading-none mb-0.5">Republic of the Philippines · Dep. of Education</p>
          <h1 className="font-bold text-sm tracking-tight text-amber-400">Project UGNAY</h1>
          <p className="text-[10px] uppercase tracking-wider text-white opacity-80 font-medium">DepEd Region VIII</p>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-1 flex md:flex-col overflow-x-auto">
        {filteredTabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg whitespace-nowrap transition-all border-l-2 ${activeTab === tab.id ? 'bg-amber-500 text-black font-bold shadow-md border-blue-800' : 'hover:bg-zinc-800 text-white border-transparent'}`}>
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function EditProfileModal({ currentUser, onSave, onClose, darkMode }) {
  const [form, setForm] = useState({ name: currentUser.name, email: currentUser.email, position: currentUser.position || '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const inp = `w-full p-2 text-xs rounded border outline-none transition ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-slate-300 text-black'} focus:border-amber-500`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setError("New password and confirmation do not match.");
        return;
      }
      if (newPassword.length < 6) {
        setError("New password must be at least 6 characters.");
        return;
      }
    }
    setError('');
    onSave({
      ...currentUser,
      name: form.name,
      email: form.email,
      position: form.position,
      ...(newPassword ? { password: newPassword } : {})
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-2">
          <h3 className={`font-bold text-sm ${darkMode ? 'text-amber-400' : 'text-black'}`}>Edit My Profile</h3>
          <button type="button" onClick={onClose} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}><Icon name="close" size={16} /></button>
        </div>

        <div>
          <label className={`block text-[10px] uppercase font-black tracking-wider ${darkMode ? 'text-white' : 'text-black'} mb-1 opacity-60`}>Username (cannot be changed)</label>
          <input type="text" value={currentUser.username} disabled className={`${inp} opacity-50 cursor-not-allowed`} />
        </div>
        <input type="text" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className={inp} required />
        <input type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className={inp} required />
        <input type="text" placeholder="Position / Title" value={form.position} onChange={e=>setForm({...form, position: e.target.value})} className={inp} />

        <div className="border-t border-slate-200 dark:border-zinc-800 pt-3 space-y-2">
          <p className={`text-[10px] uppercase font-black tracking-wider ${darkMode ? 'text-white' : 'text-black'} opacity-60`}>Change Password (optional)</p>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} placeholder="New Password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className={`${inp} pr-9`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-2.5 top-2 ${darkMode ? 'text-white' : 'text-black'} opacity-50 hover:opacity-100`}>
              <Icon name={showPassword ? 'eyeOff' : 'eye'} size={14} />
            </button>
          </div>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} placeholder="Confirm New Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className={`${inp} pr-9`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-2.5 top-2 ${darkMode ? 'text-white' : 'text-black'} opacity-50 hover:opacity-100`}>
              <Icon name={showPassword ? 'eyeOff' : 'eye'} size={14} />
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-[11px] font-semibold">{error}</p>}

        <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black font-black text-xs rounded transition shadow-md">Save Changes</button>
      </form>
    </div>
  );
}

function Header({ currentUser, darkMode, setDarkMode, onLogout, onUpdateProfile }) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  return (
    <div>
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-blue-800"></div>
        <div className="flex-1 bg-amber-500"></div>
      </div>
      <header className="px-6 py-4 border-b border-zinc-800 bg-zinc-900 shadow-sm flex justify-between items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">Office</span>
          <h2 className="text-xs font-bold text-white mt-0.5">{currentUser.office}</h2>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 transition" title="Toggle Appearance Mode">
          <Icon name={darkMode ? 'sun' : 'moon'} size={16} />
        </button>
        <button onClick={() => setShowEditProfile(true)} className="flex items-center gap-3 border-l border-zinc-700 pl-4 hover:opacity-80 transition" title="Edit My Profile">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white">{currentUser.name}</p>
            <p className="text-[10px] text-amber-400 font-medium">{currentUser.role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-zinc-800 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/20">{currentUser.name.split(' ').map(n=>n[0]).join('')}</div>
        </button>
        <button onClick={onLogout} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition ml-2">
          <Icon name="logout" size={14} />
          <span>Sign Out</span>
        </button>
      </div>
      {showEditProfile && (
        <EditProfileModal 
          currentUser={currentUser} 
          darkMode={darkMode} 
          onClose={() => setShowEditProfile(false)} 
          onSave={(updated) => { onUpdateProfile(updated); setShowEditProfile(false); }} 
        />
      )}
      </header>
    </div>
  );
}

function SystemFilters({ filters, setFilters, darkMode, includeCategoryFilters = false, userContext }) {
  const updateF = (k, v) => {
    setFilters(prev => {
      const state = { ...prev, [k]: v };
      if (k === 'office') { state.fd = ''; state.section = ''; }
      if (k === 'fd') { state.section = ''; }
      if (k === 'category') { state.specificItem = ''; }
      if (k === 'quarter') { state.month = 'All'; }
      return state;
    });
  };

  const isConstrained = useMemo(() => {
    return userContext.office !== 'Regional Office' && userContext.role !== SYSTEM_ROLES.PARTNER;
  }, [userContext]);

  const css = `w-full p-2 text-[11px] font-medium rounded-md border outline-none transition ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-slate-300 text-black'} focus:border-amber-500`;
  
  return (
    <div className={`p-4 rounded-xl border mb-6 shadow-sm ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-slate-300'}`}>
      <div className={`grid grid-cols-2 sm:grid-cols-4 ${includeCategoryFilters ? 'lg:grid-cols-8' : 'lg:grid-cols-7'} gap-3`}>
        <select value={filters.office} onChange={e=>updateF('office', e.target.value)} className={`${css} ${darkMode ? 'text-white' : 'text-black'} ${isConstrained ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={isConstrained}>
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
          {(filters.quarter && filters.quarter !== 'All' ? QUARTER_MONTHS[filters.quarter] : MONTHS).map(m => <option key={m} value={m}>{m}</option>)}
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
        <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke={darkMode ? '#27272a' : '#cbd5e1'} strokeWidth="12" strokeLinecap="round" />
        <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="url(#gaugeGrad)" strokeWidth="12" strokeLinecap="round" strokeDasharray="157" strokeDashoffset={157 - (157 * percent) / 100} style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
        <g style={{ transform: `rotate(${needleRotation}deg)`, transformOrigin: '60px 60px', transition: 'transform 1s ease-out' }}>
          <path d="M 58 60 L 60 15 L 62 60 Z" fill={darkMode ? '#f8fafc' : '#0f172a'} />
          <circle cx="60" cy="60" r="4" fill={darkMode ? '#f8fafc' : '#0f172a'} />
        </g>
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className={`text-xl font-black ${darkMode ? 'text-amber-400' : 'text-black'}`}>{percent.toFixed(1)}%</span>
        <span className={`text-[10px] uppercase font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Fulfilled</span>
      </div>
    </div>
  );
}

function TrendLineChart({ needs, contributions, darkMode }) {
  const series = useMemo(() => {
    const byMonth = {};
    needs.forEach(n => {
      const d = new Date(n.dateLogged);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!byMonth[key]) byMonth[key] = { key, needsValue: 0, contsValue: 0 };
      byMonth[key].needsValue += Number(n.value);
    });
    contributions.forEach(c => {
      const d = new Date(c.dateLogged);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!byMonth[key]) byMonth[key] = { key, needsValue: 0, contsValue: 0 };
      byMonth[key].contsValue += Number(c.value);
    });

    return Object.values(byMonth).sort((a, b) => a.key.localeCompare(b.key)).map(p => ({
      ...p,
      label: `${MONTHS[parseInt(p.key.split('-')[1], 10) - 1].slice(0, 3)} '${p.key.split('-')[0].slice(2)}`
    }));
  }, [needs, contributions]);

  const width = 480, height = 170, padding = { top: 10, right: 10, bottom: 24, left: 10 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const maxVal = Math.max(1, ...series.map(p => Math.max(p.needsValue, p.contsValue)));
  const xStep = series.length > 1 ? innerW / (series.length - 1) : 0;
  const scaleY = (v) => padding.top + innerH - (v / maxVal) * innerH;
  const scaleX = (i) => padding.left + (series.length > 1 ? i * xStep : innerW / 2);
  const needsPoints = series.map((p, i) => `${scaleX(i)},${scaleY(p.needsValue)}`).join(' ');
  const contsPoints = series.map((p, i) => `${scaleX(i)},${scaleY(p.contsValue)}`).join(' ');
  const labelStep = series.length > 8 ? Math.ceil(series.length / 8) : 1;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h3 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-black'}`}>Needs vs. Contributions Trend</h3>
      </div>

      {series.length === 0 ? (
        <div className={`flex items-center justify-center h-32 text-xs ${darkMode ? 'text-white' : 'text-black'} opacity-60 italic`}>No data points for the selected period.</div>
      ) : (
        <>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
            {[0, 0.25, 0.5, 0.75, 1].map(t => (
              <line key={t} x1={padding.left} x2={width - padding.right} y1={padding.top + innerH * (1 - t)} y2={padding.top + innerH * (1 - t)} stroke={darkMode ? '#27272a' : '#e2e8f0'} strokeWidth="1" />
            ))}
            <polyline points={needsPoints} fill="none" stroke={darkMode ? '#f8fafc' : '#0f172a'} strokeWidth="2" />
            <polyline points={contsPoints} fill="none" stroke="#f59e0b" strokeWidth="2" />
            {series.map((p, i) => <circle key={'n' + i} cx={scaleX(i)} cy={scaleY(p.needsValue)} r="2.5" fill={darkMode ? '#f8fafc' : '#0f172a'} />)}
            {series.map((p, i) => <circle key={'c' + i} cx={scaleX(i)} cy={scaleY(p.contsValue)} r="2.5" fill="#f59e0b" />)}
            {series.map((p, i) => (
              i % labelStep === 0 && (
                <text key={'t' + i} x={scaleX(i)} y={height - 6} fontSize="8" textAnchor="middle" fill={darkMode ? '#a1a1aa' : '#64748b'}>{p.label}</text>
              )
            ))}
          </svg>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5">
              <span className={`w-3 h-0.5 ${darkMode ? 'bg-white' : 'bg-black'} inline-block`}></span>
              <span className={`text-[10px] font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Needs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-500 inline-block"></span>
              <span className={`text-[10px] font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Contributions</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Dashboard({ needs, contributions, userContext, darkMode }) {
  const [filters, setFilters] = useState({ office: '', fd: '', section: '', year: 'All', quarter: 'All', month: 'All' });

  const scopedContributions = useMemo(() => {
    return userContext.role === SYSTEM_ROLES.PARTNER ? contributions.filter(c => c.partner.toLowerCase() === userContext.name.toLowerCase()) : contributions;
  }, [contributions, userContext]);

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
    
    return { filteredNeeds: filterRecordSet(needs), filteredConts: filterRecordSet(scopedContributions) };
  }, [needs, scopedContributions, filters]);

  const totalNeedsValue = filteredNeeds.reduce((a, b) => a + Number(b.value), 0);
  const totalContsValue = filteredConts.reduce((a, b) => a + Number(b.value), 0);
  const totalPartners = new Set(filteredConts.map(c => c.partner)).size;
  const totalContsCount = filteredConts.length;

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

  const containerStyle = `p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`;

  return (
    <div className="space-y-6">
      <SystemFilters filters={filters} setFilters={setFilters} darkMode={darkMode} userContext={userContext} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={containerStyle}>
          <span className={`text-[10px] uppercase font-black tracking-widest ${darkMode ? 'text-white' : 'text-black'}`}>Total Validated Needs (Value)</span>
          <p className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'} mt-2`}>₱ {totalNeedsValue.toLocaleString()}</p>
        </div>
        <div className={containerStyle}>
          <span className={`text-[10px] uppercase font-black tracking-widest ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>Total Validated Contributions (Value)</span>
          <p className={`text-3xl font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'} mt-2`}>₱ {totalContsValue.toLocaleString()}</p>
        </div>
        <div className={`${containerStyle} flex flex-col items-center justify-center p-4`}>
          <FuelGaugeChart totalNeeds={totalNeedsValue} totalContributions={totalContsValue} darkMode={darkMode} />
        </div>
        <div className={containerStyle}>
          <span className={`text-[10px] uppercase font-black tracking-widest ${darkMode ? 'text-white' : 'text-black'}`}>No. of Partners</span>
          <p className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'} mt-2`}>{totalPartners}</p>
        </div>
        <div className={containerStyle}>
          <span className={`text-[10px] uppercase font-black tracking-widest ${darkMode ? 'text-white' : 'text-black'}`}>No. of Contributions</span>
          <p className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'} mt-2`}>{totalContsCount}</p>
        </div>
        <div className={`${containerStyle} lg:col-span-3`}>
          <TrendLineChart needs={filteredNeeds} contributions={filteredConts} darkMode={darkMode} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={containerStyle}>
          <h3 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-black'} mb-4`}>Top Donors</h3>
          <div className="space-y-3">
            {topDonors.map(([name, val], idx) => {
              const max = topDonors[0]?.[1] || 1;
              const pct = (val / max) * 100;
              return (
                <div key={name} className="space-y-1">
                  <div className={`flex justify-between text-xs font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                    <span className="truncate max-w-[200px]"><span className={`${darkMode ? 'text-white' : 'text-black'} opacity-60 font-bold mr-1`}>#{idx+1}</span>{name}</span>
                    <span className={`${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>₱{val.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-zinc-800/80 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={containerStyle}>
          <h3 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-black'} mb-4`}>Priority Needs</h3>
          <div className="space-y-3">
            {priorityNeeds.map(([name, val], idx) => {
              const max = priorityNeeds[0]?.[1] || 1;
              const pct = (val / max) * 100;
              return (
                <div key={name} className="space-y-1">
                  <div className={`flex justify-between text-xs font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                    <span className="truncate max-w-[200px]"><span className={`${darkMode ? 'text-white' : 'text-black'} opacity-60 font-bold mr-1`}>#{idx+1}</span>{name}</span>
                    <span className={`${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>₱{val.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-zinc-800/80 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={containerStyle}>
        <div className="border-b border-slate-200 dark:border-zinc-800 pb-3 mb-4">
          <h3 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-amber-400' : 'text-black'}`}>Accomplishment Rankings (RO & SDO Matrix)</h3>
          <p className={`text-[11px] ${darkMode ? 'text-white' : 'text-black'} opacity-80`}>Comparative matrix.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className={`border-b border-slate-200 dark:border-zinc-800 ${darkMode ? 'text-white' : 'text-black'} font-bold uppercase tracking-wider`}>
                <th className="pb-2 pl-2">Rank</th>
                <th className="pb-2">Office Name</th>
                <th className="pb-2 text-right">Target Needs</th>
                <th className="pb-2 text-right">Received Contributions</th>
                <th className="pb-2 text-center w-40">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-zinc-800/60">
              {officeRankings.map((node, index) => (
                <tr key={node.office} className={`hover:bg-slate-50 dark:hover:bg-zinc-800/30 ${darkMode ? 'text-white' : 'text-black'}`}>
                  <td className={`py-2.5 pl-2 font-bold ${darkMode ? 'text-white' : 'text-black'}`}>#{index + 1}</td>
                  <td className="py-2.5 font-bold">{node.office}</td>
                  <td className="py-2.5 text-right font-medium">₱{node.needs.toLocaleString()}</td>
                  <td className={`py-2.5 text-right font-bold ${darkMode ? 'text-amber-400' : 'text-black'}`}>₱{node.contributions.toLocaleString()}</td>
                  <td className="py-2.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-slate-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(node.percentage, 100)}%` }}></div>
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
    </div>
  );
}

function NeedsWorkspace({ needs, setNeeds, userContext, darkMode }) {
  const canAddNeeds = userContext.role !== SYSTEM_ROLES.MONITORING && userContext.role !== SYSTEM_ROLES.PARTNER;
  const canEditDeleteNeeds = canAddNeeds && userContext.role !== SYSTEM_ROLES.END_USER;
  const isConstrained = userContext.office !== 'Regional Office' && userContext.role !== SYSTEM_ROLES.PARTNER;
  
  const [filters, setFilters] = useState({ 
    office: isConstrained ? userContext.office : '', 
    fd: '', section: '', category: '', specificItem: '',
    year: 'All', quarter: 'All', month: 'All'
  });
  
  const [meta, setMeta] = useState({ dateLogged: new Date().toISOString().split('T')[0], office: isConstrained ? userContext.office : '', fd: '', section: '' });
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

  const { items: sortedFilteredView, requestSort, sortConfig } = useSortableData(currentFilteredView);

  const [subTab, setSubTab] = useState('inventory');

  const [needsSummarySearch, setNeedsSummarySearch] = useState('');
  const [expandedNeedsCategories, setExpandedNeedsCategories] = useState({});
  const toggleNeedsCategory = (cat) => setExpandedNeedsCategories(prev => ({ ...prev, [cat]: !prev[cat] }));

  const needsCategorySummary = useMemo(() => {
    const byCategory = {};
    currentFilteredView.forEach(item => {
      if (!byCategory[item.category]) {
        byCategory[item.category] = { category: item.category, qty: 0, value: 0, offices: new Set(), types: {} };
      }
      const catNode = byCategory[item.category];
      catNode.qty += Number(item.qty);
      catNode.value += Number(item.value);
      catNode.offices.add(item.office);

      if (!catNode.types[item.specificItem]) {
        catNode.types[item.specificItem] = { specificItem: item.specificItem, qty: 0, value: 0, offices: new Set() };
      }
      const typeNode = catNode.types[item.specificItem];
      typeNode.qty += Number(item.qty);
      typeNode.value += Number(item.value);
      typeNode.offices.add(item.office);
    });

    return Object.values(byCategory).map(cat => ({
      category: cat.category,
      qty: cat.qty,
      value: cat.value,
      offices: cat.offices.size,
      types: Object.values(cat.types).map(t => ({
        specificItem: t.specificItem, qty: t.qty, value: t.value, offices: t.offices.size
      })).sort((a, b) => b.value - a.value)
    })).sort((a, b) => b.value - a.value);
  }, [currentFilteredView]);

  const filteredNeedsCategorySummary = useMemo(() => {
    if (!needsSummarySearch.trim()) return needsCategorySummary;
    const q = needsSummarySearch.toLowerCase().trim();
    return needsCategorySummary.map(cat => {
      const catMatches = cat.category.toLowerCase().includes(q);
      const matchingTypes = cat.types.filter(t => t.specificItem.toLowerCase().includes(q));
      if (catMatches) return cat;
      if (matchingTypes.length > 0) return { ...cat, types: matchingTypes };
      return null;
    }).filter(Boolean);
  }, [needsCategorySummary, needsSummarySearch]);

  const { items: sortedNeedsCategorySummary, requestSort: requestSortNeedsCategory, sortConfig: sortConfigNeedsCategory } = useSortableData(filteredNeedsCategorySummary);

  const needsSummarySuggestions = useMemo(() => {
    if (!needsSummarySearch.trim()) return [];
    const q = needsSummarySearch.toLowerCase().trim();
    const names = new Set();
    currentFilteredView.forEach(item => {
      if (item.category.toLowerCase().includes(q)) names.add(item.category);
      if (item.specificItem.toLowerCase().includes(q)) names.add(item.specificItem);
    });
    return Array.from(names).filter(n => n.toLowerCase() !== q).slice(0, 5);
  }, [currentFilteredView, needsSummarySearch]);

  const [officeSearch, setOfficeSearch] = useState('');
  const [expandedOffices, setExpandedOffices] = useState({});
  const toggleOffice = (off) => setExpandedOffices(prev => ({ ...prev, [off]: !prev[off] }));
  const [expandedDivisions, setExpandedDivisions] = useState({});
  const toggleDivision = (key) => setExpandedDivisions(prev => ({ ...prev, [key]: !prev[key] }));

  const officesSummary = useMemo(() => {
    const byOffice = {};
    currentFilteredView.forEach(item => {
      if (!byOffice[item.office]) {
        byOffice[item.office] = { office: item.office, needsCount: 0, value: 0, divisions: {} };
      }
      const officeNode = byOffice[item.office];
      officeNode.needsCount += 1;
      officeNode.value += Number(item.value);

      if (!officeNode.divisions[item.fd]) {
        officeNode.divisions[item.fd] = { fd: item.fd, needsCount: 0, value: 0, sections: {} };
      }
      const fdNode = officeNode.divisions[item.fd];
      fdNode.needsCount += 1;
      fdNode.value += Number(item.value);

      const sectionKey = item.section || '(No Section/Unit Specified)';
      if (!fdNode.sections[sectionKey]) {
        fdNode.sections[sectionKey] = { section: sectionKey, needsCount: 0, value: 0 };
      }
      fdNode.sections[sectionKey].needsCount += 1;
      fdNode.sections[sectionKey].value += Number(item.value);
    });

    return OFFICES.filter(off => byOffice[off]).map(off => ({
      office: byOffice[off].office,
      needsCount: byOffice[off].needsCount,
      value: byOffice[off].value,
      divisions: Object.values(byOffice[off].divisions).sort((a, b) => b.value - a.value).map(d => ({
        ...d,
        sections: Object.values(d.sections).sort((a, b) => b.value - a.value)
      }))
    }));
  }, [currentFilteredView]);

  const filteredOfficesSummary = useMemo(() => {
    if (!officeSearch.trim()) return officesSummary;
    const q = officeSearch.toLowerCase().trim();
    return officesSummary.filter(o => o.office.toLowerCase().includes(q));
  }, [officesSummary, officeSearch]);

  const { items: sortedOfficesSummary, requestSort: requestSortOffices, sortConfig: sortConfigOffices } = useSortableData(filteredOfficesSummary);

  const officeSuggestions = useMemo(() => {
    if (!officeSearch.trim()) return [];
    const q = officeSearch.toLowerCase().trim();
    return OFFICES.filter(o => o.toLowerCase().includes(q) && o.toLowerCase() !== q).slice(0, 5);
  }, [officeSearch]);

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
    if (!meta.dateLogged || !meta.office || !meta.fd || !meta.section || !lines.length) return;
    
    const timestamp = new Date().toLocaleString();
    const formatted = lines.map((l, i) => ({
      id: 'N-GEN-' + (needs.length + i + 1),
      dateLogged: meta.dateLogged,
      office: meta.office,
      fd: meta.fd,
      section: meta.section,
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
    setMeta({ dateLogged: new Date().toISOString().split('T')[0], office: isConstrained ? userContext.office : '', fd: '', section: '' });
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

  const handlePrintNeeds = () => {
    const printWindow = window.open('', '_blank');
    const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Needs Matrix</title>
          <style>
            ${PRINT_HEADER_STYLES}
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #000; line-height: 1.5; }
            .date-note { text-align: right; font-size: 12px; font-weight: bold; margin-bottom: 20px; color: #333; }
            h2 { text-align: center; margin-bottom: 25px; font-size: 18px; text-transform: uppercase; font-weight: 800; color: #000; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 10px 12px; text-align: left; font-size: 13px; }
            th { background-color: #f4f4f4; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #000; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
          </style>
        </head>
        <body>
          ${buildPrintHeaderHtml(filters.office, userContext.role === SYSTEM_ROLES.PARTNER)}
          ${buildPrintMetaRow(filters.office, todayFormatted)}
          <h2>Needs Ledger</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Office</th>
                <th>Functional Division</th>
                <th>Line Item</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Value (PHP)</th>
                <th class="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              ${sortedFilteredView.map(n => `
                <tr>
                  <td>${n.dateLogged}</td>
                  <td><strong>${n.office}</strong></td>
                  <td>${n.fd}</td>
                  <td>${n.specificItem}</td>
                  <td class="text-right">${n.qty} ${n.uom}</td>
                  <td class="text-right">P ${Number(n.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td class="text-center">${n.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 200);
  };

  const handlePrintNeedsSummary = () => {
    const printWindow = window.open('', '_blank');
    const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
    printWindow.document.write(`
      <html>
        <head>
          <title>Summary of Needs</title>
          <style>
            ${PRINT_HEADER_STYLES}
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #000; line-height: 1.5; }
            .date-note { text-align: right; font-size: 12px; font-weight: bold; margin-bottom: 20px; color: #333; }
            h2 { text-align: center; margin-bottom: 25px; font-size: 18px; text-transform: uppercase; font-weight: 800; color: #000; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 10px 12px; text-align: left; font-size: 13px; }
            th { background-color: #f4f4f4; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #000; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .type-row td { padding-left: 28px; font-size: 12px; color: #444; }
          </style>
        </head>
        <body>
          ${buildPrintHeaderHtml(filters.office, userContext.role === SYSTEM_ROLES.PARTNER)}
          ${buildPrintMetaRow(filters.office, todayFormatted)}
          <h2>Summary of Needs</h2>
          <table>
            <thead>
              <tr>
                <th>Category / Specific Item</th>
                <th class="text-right">Quantity</th>
                <th class="text-right">Estimated Value (PHP)</th>
                <th class="text-center">Req'g Offices</th>
              </tr>
            </thead>
            <tbody>
              ${sortedNeedsCategorySummary.map(cat => `
                <tr>
                  <td><strong>${cat.category}</strong></td>
                  <td class="text-right">${cat.qty}</td>
                  <td class="text-right">P ${Number(cat.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td class="text-center">${cat.offices}</td>
                </tr>
                ${cat.types.map(t => `
                  <tr class="type-row">
                    <td>${t.specificItem}</td>
                    <td class="text-right">${t.qty}</td>
                    <td class="text-right">P ${Number(t.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td class="text-center">${t.offices}</td>
                  </tr>
                `).join('')}
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 200);
  };

  const handleExportNeedsSummary = () => {
    const exportPayload = [];
    sortedNeedsCategorySummary.forEach(cat => {
      exportPayload.push({ 'Category': cat.category, 'Specific Item': '(All Types)', 'Quantity': cat.qty, 'Estimated Value (PHP)': cat.value, "Req'g Offices": cat.offices });
      cat.types.forEach(t => {
        exportPayload.push({ 'Category': cat.category, 'Specific Item': t.specificItem, 'Quantity': t.qty, 'Estimated Value (PHP)': t.value, "Req'g Offices": t.offices });
      });
    });
    exportToCSV(exportPayload, 'PROJECT_UGNAY_NEEDS_SUMMARY_EXPORT');
  };

  const handlePrintOffices = () => {
    const printWindow = window.open('', '_blank');
    const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
    printWindow.document.write(`
      <html>
        <head>
          <title>Offices Matrix</title>
          <style>
            ${PRINT_HEADER_STYLES}
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #000; line-height: 1.5; }
            .date-note { text-align: right; font-size: 12px; font-weight: bold; margin-bottom: 20px; color: #333; }
            h2 { text-align: center; margin-bottom: 25px; font-size: 18px; text-transform: uppercase; font-weight: 800; color: #000; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 10px 12px; text-align: left; font-size: 13px; }
            th { background-color: #f4f4f4; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #000; }
            .text-right { text-align: right; }
            .div-row td { padding-left: 28px; font-size: 12px; color: #444; }
          </style>
        </head>
        <body>
          ${buildPrintHeaderHtml(filters.office, userContext.role === SYSTEM_ROLES.PARTNER)}
          ${buildPrintMetaRow(filters.office, todayFormatted)}
          <h2>Offices Matrix</h2>
          <table>
            <thead>
              <tr>
                <th>Office / Division</th>
                <th class="text-right">No. of Needs</th>
                <th class="text-right">Total Estimated Value (PHP)</th>
              </tr>
            </thead>
            <tbody>
              ${sortedOfficesSummary.map(o => `
                <tr>
                  <td><strong>${o.office}</strong></td>
                  <td class="text-right">${o.needsCount}</td>
                  <td class="text-right">P ${Number(o.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
                ${o.divisions.map(d => `
                  <tr class="div-row">
                    <td>${d.fd}</td>
                    <td class="text-right">${d.needsCount}</td>
                    <td class="text-right">P ${Number(d.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  </tr>
                `).join('')}
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 200);
  };

  const handleExportOffices = () => {
    const exportPayload = [];
    sortedOfficesSummary.forEach(o => {
      exportPayload.push({ 'Office': o.office, 'Division/Section/Unit': '(All Divisions)', 'No. of Needs': o.needsCount, 'Total Estimated Value (PHP)': o.value });
      o.divisions.forEach(d => {
        exportPayload.push({ 'Office': o.office, 'Division/Section/Unit': d.fd, 'No. of Needs': d.needsCount, 'Total Estimated Value (PHP)': d.value });
      });
    });
    exportToCSV(exportPayload, 'PROJECT_UGNAY_OFFICES_EXPORT');
  };

  const inp = `w-full p-2 text-xs rounded border outline-none transition ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-slate-300 text-black'} focus:border-amber-500`;

  return (
    <div className="space-y-6">
      <SystemFilters filters={filters} setFilters={setFilters} darkMode={darkMode} includeCategoryFilters={true} userContext={userContext} />

      <div className="flex border-b border-slate-200 dark:border-zinc-800">
        <button 
          onClick={() => setSubTab('inventory')} 
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${subTab === 'inventory' ? `border-amber-500 ${darkMode ? 'text-amber-400' : 'text-black'}` : `border-transparent ${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}`}
        >
          Inventory
        </button>
        <button 
          onClick={() => setSubTab('summary')} 
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${subTab === 'summary' ? `border-amber-500 ${darkMode ? 'text-amber-400' : 'text-black'}` : `border-transparent ${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}`}
        >
          Summary
        </button>
        <button 
          onClick={() => setSubTab('offices')} 
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${subTab === 'offices' ? `border-amber-500 ${darkMode ? 'text-amber-400' : 'text-black'}` : `border-transparent ${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}`}
        >
          Offices
        </button>
      </div>

      {subTab === 'inventory' && (
      <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-xl shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-amber-400">Needs Inventory</h2>
          <p className="text-[11px] text-white opacity-80">Scoped items: {currentFilteredView.length}</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {canAddNeeds && (
            <button onClick={()=>setAddModal(true)} className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
              <Icon name="plus" size={14} /><span>Add Needs</span>
            </button>
          )}
          <button onClick={handlePrintNeeds} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-zinc-700">
            <Icon name="print" size={14} /><span>Print</span>
          </button>
          <button onClick={() => exportToCSV(currentFilteredView, 'PROJECT_UGNAY_NEEDS_EXPORT')} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-zinc-700">
            <Icon name="download" size={14} /><span>Export Matrix</span>
          </button>
        </div>
      </div>

      <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-slate-200'}`}>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className={`border-b border-slate-200 dark:border-zinc-800 ${darkMode ? 'text-white' : 'text-black'} font-bold uppercase tracking-wider`}>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('dateLogged')}>Date <SortIndicator sortConfig={sortConfig} sortKey="dateLogged" darkMode={darkMode} /></th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('office')}>Office <SortIndicator sortConfig={sortConfig} sortKey="office" darkMode={darkMode} /></th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('fd')}>Functional Division <SortIndicator sortConfig={sortConfig} sortKey="fd" darkMode={darkMode} /></th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('section')}>Section/Unit <SortIndicator sortConfig={sortConfig} sortKey="section" darkMode={darkMode} /></th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('category')}>Category <SortIndicator sortConfig={sortConfig} sortKey="category" darkMode={darkMode} /></th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('specificItem')}>Line Item <SortIndicator sortConfig={sortConfig} sortKey="specificItem" darkMode={darkMode} /></th>
              <th className={`pb-2 text-right cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('qty')}>Quantity <SortIndicator sortConfig={sortConfig} sortKey="qty" darkMode={darkMode} /></th>
              <th className={`pb-2 text-right cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('value')}>Value <SortIndicator sortConfig={sortConfig} sortKey="value" darkMode={darkMode} /></th>
              <th className={`pb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Remarks</th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('status')}>Status <SortIndicator sortConfig={sortConfig} sortKey="status" darkMode={darkMode} /></th>
              <th className={`pb-2 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
            {sortedFilteredView.map(n => (
              <tr key={n.id} className={`hover:bg-slate-50 dark:hover:bg-zinc-800/30 ${darkMode ? 'text-white' : 'text-black'}`}>
                <td className="py-2.5">{n.dateLogged}</td>
                <td className="py-2.5 font-bold">{n.office}</td>
                <td className="py-2.5 truncate max-w-[130px]">{n.fd}</td>
                <td className="py-2.5">{n.section}</td>
                <td className="py-2.5 text-[11px]">{n.category}</td>
                <td className="py-2.5 font-semibold">{n.specificItem}</td>
                <td className="py-2.5 text-right font-medium">{n.qty} <span className={`text-[10px] ${darkMode ? 'text-white' : 'text-black'} opacity-80 dark:opacity-60`}>{n.uom}</span></td>
                <td className={`py-2.5 text-right font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>₱ {Number(n.value).toLocaleString()}</td>
                <td className="py-2.5 text-[11px] truncate max-w-[150px]" title={n.remarks}>{n.remarks || '-'}</td>
                <td className="py-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    n.status === 'Fulfilled' ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-400' :
                    n.status === 'Partially Fulfilled' ? 'bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-400' :
                    'bg-slate-200 text-black dark:bg-zinc-800 dark:text-white'
                  }`}>{n.status}</span>
                </td>
                <td className="py-2.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {canEditDeleteNeeds && (
                      <>
                        <button onClick={() => setEditModal(n)} className={`p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded ${darkMode ? 'text-white' : 'text-black'} hover:text-amber-600 dark:hover:text-amber-500 transition`} title="Modify Record">
                          <Icon name="edit" size={14} />
                        </button>
                        <button onClick={() => handleDeleteItem(n.id)} className={`p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded ${darkMode ? 'text-white' : 'text-black'} hover:text-red-600 dark:hover:text-red-500 transition`} title="Purge Record">
                          <Icon name="trash" size={14} />
                        </button>
                      </>
                    )}
                    <button onClick={() => setTrailModal(n)} className={`p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded ${darkMode ? 'text-white' : 'text-black'} hover:text-amber-600 dark:hover:text-amber-500 transition`} title="Audit Trail">
                      <Icon name="history" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {sortedFilteredView.length > 0 && (
            <tfoot>
              <tr className={`border-t-2 border-slate-300 dark:border-zinc-700 font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                <td className="py-2.5" colSpan="6">TOTAL</td>
                <td className="py-2.5 text-right">{sortedFilteredView.reduce((a, n) => a + Number(n.qty), 0)}</td>
                <td className="py-2.5 text-right">₱ {sortedFilteredView.reduce((a, n) => a + Number(n.value), 0).toLocaleString()}</td>
                <td colSpan="3"></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      </>
      )}

      {subTab === 'summary' && (
        <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-xl shadow-sm mb-4">
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                value={needsSummarySearch}
                onChange={e => setNeedsSummarySearch(e.target.value)}
                placeholder="Search Category or Specific Item..." 
                className="w-full p-2.5 pl-3 pr-8 text-xs font-semibold rounded-lg border border-zinc-800 shadow-sm outline-none transition focus:border-amber-500 bg-zinc-900 text-white"
              />
              {needsSummarySearch && (
                <button onClick={() => setNeedsSummarySearch('')} className="absolute right-2.5 top-3 text-white opacity-50 hover:opacity-100">
                  <Icon name="close" size={14} />
                </button>
              )}
              {needsSummarySuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 border rounded-lg shadow-xl z-30 overflow-hidden divide-y bg-zinc-900 border-zinc-800 divide-zinc-800/60">
                  {needsSummarySuggestions.map(itemHint => (
                    <button key={itemHint} onClick={() => setNeedsSummarySearch(itemHint)} className="w-full text-left p-2 text-xs font-semibold hover:bg-zinc-800/40 text-white transition">
                      {itemHint}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button onClick={handlePrintNeedsSummary} className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
                <Icon name="print" size={14} /><span>Print</span>
              </button>
              <button onClick={handleExportNeedsSummary} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-zinc-700 transition">
                <Icon name="download" size={14} /><span>Export Matrix</span>
              </button>
            </div>
          </div>
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className={`border-b border-slate-200 dark:border-zinc-800 ${darkMode ? 'text-white' : 'text-black'} font-bold uppercase tracking-wider`}>
                <th className={`pb-2 pl-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortNeedsCategory('category')}>Category <SortIndicator sortConfig={sortConfigNeedsCategory} sortKey="category" darkMode={darkMode} /></th>
                <th className={`pb-2 text-right cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortNeedsCategory('qty')}>Quantity <SortIndicator sortConfig={sortConfigNeedsCategory} sortKey="qty" darkMode={darkMode} /></th>
                <th className={`pb-2 text-right cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortNeedsCategory('value')}>Estimated Value (₱) <SortIndicator sortConfig={sortConfigNeedsCategory} sortKey="value" darkMode={darkMode} /></th>
                <th className={`pb-2 text-right pr-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortNeedsCategory('offices')}>Req'g Offices <SortIndicator sortConfig={sortConfigNeedsCategory} sortKey="offices" darkMode={darkMode} /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
              {sortedNeedsCategorySummary.map(cat => (
                <React.Fragment key={cat.category}>
                  <tr onClick={() => toggleNeedsCategory(cat.category)} className={`cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/30 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <td className="py-2.5 pl-2 font-bold">
                      <span className={`inline-block mr-1.5 text-[9px] transition-transform ${(needsSummarySearch.trim() || expandedNeedsCategories[cat.category]) ? 'rotate-90' : ''}`}>▶</span>
                      {cat.category}
                    </td>
                    <td className="py-2.5 text-right font-bold">{cat.qty}</td>
                    <td className={`py-2.5 text-right font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>₱ {cat.value.toLocaleString()}</td>
                    <td className="py-2.5 text-right pr-2 font-bold">{cat.offices}</td>
                  </tr>
                  {(needsSummarySearch.trim() || expandedNeedsCategories[cat.category]) && cat.types.map(t => (
                    <tr key={t.specificItem} className={`text-[11px] ${darkMode ? 'bg-zinc-950/40 text-white' : 'bg-slate-50 text-black'} opacity-90`}>
                      <td className="py-2 pl-8">{t.specificItem}</td>
                      <td className="py-2 text-right">{t.qty}</td>
                      <td className="py-2 text-right">₱ {t.value.toLocaleString()}</td>
                      <td className="py-2 text-right pr-2">{t.offices}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              {sortedNeedsCategorySummary.length === 0 && (
                <tr><td colSpan="4" className={`py-6 text-center ${darkMode ? 'text-white' : 'text-black'} opacity-60 italic`}>No needs records match the applied parameter sets.</td></tr>
              )}
            </tbody>
            {sortedNeedsCategorySummary.length > 0 && (
              <tfoot>
                <tr className={`border-t-2 border-slate-300 dark:border-zinc-700 font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  <td className="py-2.5 pl-2">TOTAL</td>
                  <td className="py-2.5 text-right">{sortedNeedsCategorySummary.reduce((a, c) => a + c.qty, 0)}</td>
                  <td className="py-2.5 text-right">₱ {sortedNeedsCategorySummary.reduce((a, c) => a + c.value, 0).toLocaleString()}</td>
                  <td className="py-2.5 text-right pr-2"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}

      {subTab === 'offices' && (
        <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-xl shadow-sm mb-4">
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                value={officeSearch}
                onChange={e => setOfficeSearch(e.target.value)}
                placeholder="Search Office..." 
                className="w-full p-2.5 pl-3 pr-8 text-xs font-semibold rounded-lg border border-zinc-800 shadow-sm outline-none transition focus:border-amber-500 bg-zinc-900 text-white"
              />
              {officeSearch && (
                <button onClick={() => setOfficeSearch('')} className="absolute right-2.5 top-3 text-white opacity-50 hover:opacity-100">
                  <Icon name="close" size={14} />
                </button>
              )}
              {officeSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 border rounded-lg shadow-xl z-30 overflow-hidden divide-y bg-zinc-900 border-zinc-800 divide-zinc-800/60">
                  {officeSuggestions.map(itemHint => (
                    <button key={itemHint} onClick={() => setOfficeSearch(itemHint)} className="w-full text-left p-2 text-xs font-semibold hover:bg-zinc-800/40 text-white transition">
                      {itemHint}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button onClick={handlePrintOffices} className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
                <Icon name="print" size={14} /><span>Print</span>
              </button>
              <button onClick={handleExportOffices} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-zinc-700 transition">
                <Icon name="download" size={14} /><span>Export Matrix</span>
              </button>
            </div>
          </div>
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className={`border-b border-slate-200 dark:border-zinc-800 ${darkMode ? 'text-white' : 'text-black'} font-bold uppercase tracking-wider`}>
                <th className={`pb-2 pl-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortOffices('office')}>Office <SortIndicator sortConfig={sortConfigOffices} sortKey="office" darkMode={darkMode} /></th>
                <th className={`pb-2 text-right cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortOffices('needsCount')}>No. of Needs <SortIndicator sortConfig={sortConfigOffices} sortKey="needsCount" darkMode={darkMode} /></th>
                <th className={`pb-2 text-right pr-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortOffices('value')}>Total Estimated Value (₱) <SortIndicator sortConfig={sortConfigOffices} sortKey="value" darkMode={darkMode} /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
              {sortedOfficesSummary.map(o => (
                <React.Fragment key={o.office}>
                  <tr onClick={() => toggleOffice(o.office)} className={`cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/30 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <td className="py-2.5 pl-2 font-bold">
                      <span className={`inline-block mr-1.5 text-[9px] transition-transform ${(officeSearch.trim() || expandedOffices[o.office]) ? 'rotate-90' : ''}`}>▶</span>
                      {o.office}
                    </td>
                    <td className="py-2.5 text-right font-bold">{o.needsCount}</td>
                    <td className={`py-2.5 text-right pr-2 font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>₱ {o.value.toLocaleString()}</td>
                  </tr>
                  {(officeSearch.trim() || expandedOffices[o.office]) && o.divisions.map(d => {
                    const divKey = `${o.office}::${d.fd}`;
                    return (
                      <React.Fragment key={divKey}>
                        <tr onClick={() => toggleDivision(divKey)} className={`text-[11px] cursor-pointer ${darkMode ? 'bg-zinc-950/40 text-white hover:bg-zinc-900' : 'bg-slate-50 text-black hover:bg-slate-100'}`}>
                          <td className="py-2 pl-8">
                            <span className={`inline-block mr-1.5 text-[8px] transition-transform ${expandedDivisions[divKey] ? 'rotate-90' : ''}`}>▶</span>
                            {d.fd}
                          </td>
                          <td className="py-2 text-right">{d.needsCount}</td>
                          <td className="py-2 text-right pr-2">₱ {d.value.toLocaleString()}</td>
                        </tr>
                        {expandedDivisions[divKey] && d.sections.map(s => (
                          <tr key={s.section} className={`text-[10px] ${darkMode ? 'bg-zinc-950/70 text-white' : 'bg-slate-100 text-black'} opacity-90`}>
                            <td className="py-1.5 pl-14">{s.section}</td>
                            <td className="py-1.5 text-right">{s.needsCount}</td>
                            <td className="py-1.5 text-right pr-2">₱ {s.value.toLocaleString()}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              ))}
              {sortedOfficesSummary.length === 0 && (
                <tr><td colSpan="3" className={`py-6 text-center ${darkMode ? 'text-white' : 'text-black'} opacity-60 italic`}>No offices match the applied parameter sets.</td></tr>
              )}
            </tbody>
            {sortedOfficesSummary.length > 0 && (
              <tfoot>
                <tr className={`border-t-2 border-slate-300 dark:border-zinc-700 font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  <td className="py-2.5 pl-2">TOTAL</td>
                  <td className="py-2.5 text-right">{sortedOfficesSummary.reduce((a, o) => a + o.needsCount, 0)}</td>
                  <td className="py-2.5 text-right pr-2">₱ {sortedOfficesSummary.reduce((a, o) => a + o.value, 0).toLocaleString()}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}

      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-3 mb-4">
              <h3 className={`font-black text-sm uppercase tracking-wider ${darkMode ? 'text-amber-400' : 'text-black'}`}>Record Requirements</h3>
              <button onClick={() => setAddModal(false)} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white`}><Icon name="close" size={18} /></button>
            </div>
            <div className="space-y-4">
              <input type="date" value={meta.dateLogged} onChange={e=>setMeta({...meta, dateLogged: e.target.value})} className={inp} title="Date Logged" />
              <select value={meta.office} onChange={e=>setMeta({...meta, office:e.target.value, fd:'', section:''})} className={inp} disabled={isConstrained}>
                <option value="">Office</option>
                {OFFICES.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <select value={meta.fd} onChange={e=>setMeta({...meta, fd:e.target.value, section:''})} className={inp} disabled={!meta.office}><option value="">Functional Division</option>{activeFds.map(f=><option key={f} value={f}>{f}</option>)}</select>
                <select value={meta.section} onChange={e=>setMeta({...meta, section:e.target.value})} className={inp} disabled={!meta.fd}><option value="">Section/Unit</option>{activeSections.map(s=><option key={s} value={s}>{s}</option>)}</select>
              </div>
              
              <div className="border-t border-slate-200 dark:border-zinc-800 pt-3 space-y-2">
                <span className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>Line Item</span>
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
                <button type="button" onClick={handlePushLine} className={`w-full py-2 text-xs font-bold rounded border transition ${darkMode ? 'bg-zinc-800 border-zinc-700 text-amber-500 hover:bg-zinc-700' : 'bg-slate-100 border-slate-200 text-amber-600 hover:bg-slate-200'}`}><Icon name="plus" size={14} /> Add Line Item</button>
              </div>
              
              {lines.length > 0 && (
                <div className="border-t border-slate-200 dark:border-zinc-800 pt-3 space-y-2">
                  {lines.map(l => (
                    <div key={l.id} className={`flex justify-between items-center text-[11px] p-2 border rounded ${darkMode ? 'bg-zinc-900/40 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}>
                      <span>{l.specificItem} x{l.qty} - ₱{Number(l.value).toLocaleString()} {l.remarks ? `(${l.remarks})` : ''}</span>
                    </div>
                  ))}
                  <button onClick={handleCommitBatch} className="w-full py-2 bg-zinc-900 hover:bg-black text-amber-500 font-bold rounded text-xs transition">Submit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <form onSubmit={handleUpdateItem} className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-2">
              <h3 className={`font-bold text-sm ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>Modify Specification</h3>
              <button type="button" onClick={() => setEditModal(null)} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white`}><Icon name="close" size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-[10px] uppercase font-bold ${darkMode ? 'text-white' : 'text-black'} mb-1`}>Requirement Vol.</label>
                <input type="number" value={editModal.qty} onChange={e=>setEditModal({...editModal, qty: e.target.value})} className={inp} required />
              </div>
            </div>
            <div>
              <label className={`block text-[10px] uppercase font-bold ${darkMode ? 'text-white' : 'text-black'} mb-1`}>Estimated Overhead Cost (₱)</label>
              <input type="number" value={editModal.value} onChange={e=>setEditModal({...editModal, value: e.target.value})} className={inp} required />
            </div>
            <div>
              <label className={`block text-[10px] uppercase font-bold ${darkMode ? 'text-white' : 'text-black'} mb-1`}>Fulfillment Status Tier</label>
              <select value={editModal.status} onChange={e=>setEditModal({...editModal, status: e.target.value})} className={inp}>
                <option value="Unfulfilled">Unfulfilled</option>
                <option value="Partially Fulfilled">Partially Fulfilled</option>
                <option value="Fulfilled">Fulfilled</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black font-black text-xs rounded transition shadow-md"> Save Verification Changes</button>
          </form>
        </div>
      )}

      {trailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-2">
              <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-black'}`}>System Change Audit Trail Log</h3>
              <button onClick={() => setTrailModal(null)} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white`}><Icon name="close" size={16} /></button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {trailModal.history?.map((t, i) => (
                <div key={i} className={`text-xs p-3 rounded border ${darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`flex justify-between text-[10px] ${darkMode ? 'text-white' : 'text-black'} mb-1`}>
                    <span>{t.timestamp}</span>
                    <span className={`font-bold ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>{t.user}</span>
                  </div>
                  <p className={`${darkMode ? 'text-white' : 'text-black'} font-medium`}>{t.action}</p>
                </div>
              )) || <p className={`text-xs text-center ${darkMode ? 'text-white' : 'text-black'} opacity-60 py-4`}>No logged validation adjustments.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContributionsWorkspace({ contributions, setContributions, userContext, darkMode }) {
  const isReadOnly = userContext.role === SYSTEM_ROLES.MONITORING || userContext.role === SYSTEM_ROLES.PARTNER || userContext.role === SYSTEM_ROLES.END_USER;
  const isConstrained = userContext.office !== 'Regional Office' && userContext.role !== SYSTEM_ROLES.PARTNER;
  const isIctUser = userContext.role === SYSTEM_ROLES.ICT_USER;
  const isPartnerScoped = userContext.role === SYSTEM_ROLES.PARTNER;
  
  const [subTab, setSubTab] = useState('ledger'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [filters, setFilters] = useState({ 
    office: isConstrained ? userContext.office : '', 
    fd: '', section: '', category: '', specificItem: '',
    year: 'All', quarter: 'All', month: 'All'
  });
  
  const [meta, setMeta] = useState({ dateLogged: new Date().toISOString().split('T')[0], partner: '', office: isConstrained ? userContext.office : '', fd: '', section: '' });
  const [lines, setLines] = useState([]);
  
  const [workingItem, setWorkingItem] = useState({ 
    specificItem: '', category: '', qty: '', uom: 'Piece (pc)', value: '', remarks: '' 
  });
  
  const activeFds = useMemo(() => meta.office ? Object.keys(STRUCTURE[meta.office === 'Regional Office' ? 'Regional Office' : 'SDO'] || {}) : [], [meta.office]);
  const activeSections = useMemo(() => (meta.office && meta.fd) ? STRUCTURE[meta.office === 'Regional Office' ? 'Regional Office' : 'SDO']?.[meta.fd] || [] : [], [meta.office, meta.fd]);

  const currentFilteredView = useMemo(() => {
    return contributions.filter(c => {
      if (isPartnerScoped && c.partner.toLowerCase() !== userContext.name.toLowerCase()) return false;
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

  const { items: sortedFilteredView, requestSort, sortConfig } = useSortableData(currentFilteredView);

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

  const { items: sortedPartnersSummary, requestSort: requestSortPartners, sortConfig: sortConfigPartners } = useSortableData(partnersSummary);
  const { items: sortedPartnerLogs, requestSort: requestSortPartnerLogs, sortConfig: sortConfigPartnerLogs } = useSortableData(selectedPartner?.aggregateLogs || []);

  const handlePrintPartnerLedger = () => {
    if (!selectedPartner) return;
    const printWindow = window.open('', '_blank');
    const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
    printWindow.document.write(`
      <html>
        <head>
          <title>Resource Summary Ledger - ${selectedPartner.name}</title>
          <style>
            ${PRINT_HEADER_STYLES}
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #000; line-height: 1.5; }
            h2 { text-align: center; margin-bottom: 4px; font-size: 18px; text-transform: uppercase; font-weight: 800; color: #000; }
            h3 { text-align: center; margin-bottom: 25px; font-size: 13px; font-weight: 600; color: #444; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 10px 12px; text-align: left; font-size: 13px; }
            th { background-color: #f4f4f4; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #000; }
            .text-right { text-align: right; }
          </style>
        </head>
        <body>
          ${buildPrintHeaderHtml(filters.office, userContext.role === SYSTEM_ROLES.PARTNER)}
          ${buildPrintMetaRow(filters.office, todayFormatted)}
          <h2>Resource Summary Ledger</h2>
          <h3>${selectedPartner.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Office</th>
                <th>Functional Division</th>
                <th>Section/Unit</th>
                <th>Category</th>
                <th>Line Item</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Valuation (PHP)</th>
              </tr>
            </thead>
            <tbody>
              ${sortedPartnerLogs.map(l => `
                <tr>
                  <td>${l.dateLogged}</td>
                  <td><strong>${l.office}</strong></td>
                  <td>${l.fd}</td>
                  <td>${l.section}</td>
                  <td>${l.category}</td>
                  <td>${l.specificItem}</td>
                  <td class="text-right">${l.qty} ${l.uom}</td>
                  <td class="text-right">P ${Number(l.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="6" style="text-align:right;"><strong>TOTAL</strong></td>
                <td class="text-right"><strong>${sortedPartnerLogs.reduce((a, l) => a + Number(l.qty), 0)}</strong></td>
                <td class="text-right"><strong>P ${sortedPartnerLogs.reduce((a, l) => a + Number(l.value), 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 200);
  };

  const [expandedCategories, setExpandedCategories] = useState({});
  const toggleCategory = (cat) => setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));

  const categorySummary = useMemo(() => {
    const byCategory = {};
    currentFilteredView.forEach(item => {
      if (!byCategory[item.category]) {
        byCategory[item.category] = { category: item.category, partners: new Set(), value: 0, offices: new Set(), types: {} };
      }
      const catNode = byCategory[item.category];
      catNode.partners.add(item.partner);
      catNode.value += Number(item.value);
      catNode.offices.add(item.office);

      if (!catNode.types[item.specificItem]) {
        catNode.types[item.specificItem] = { specificItem: item.specificItem, partners: new Set(), value: 0, offices: new Set() };
      }
      const typeNode = catNode.types[item.specificItem];
      typeNode.partners.add(item.partner);
      typeNode.value += Number(item.value);
      typeNode.offices.add(item.office);
    });

    return Object.values(byCategory).map(cat => ({
      category: cat.category,
      partners: cat.partners.size,
      value: cat.value,
      offices: cat.offices.size,
      types: Object.values(cat.types).map(t => ({
        specificItem: t.specificItem,
        partners: t.partners.size,
        value: t.value,
        offices: t.offices.size
      })).sort((a, b) => b.value - a.value)
    })).sort((a, b) => b.value - a.value);
  }, [currentFilteredView]);

  const [summarySearchQuery, setSummarySearchQuery] = useState('');

  const filteredCategorySummary = useMemo(() => {
    if (!summarySearchQuery.trim()) return categorySummary;
    const q = summarySearchQuery.toLowerCase().trim();
    return categorySummary.map(cat => {
      const catMatches = cat.category.toLowerCase().includes(q);
      const matchingTypes = cat.types.filter(t => t.specificItem.toLowerCase().includes(q));
      if (catMatches) return cat;
      if (matchingTypes.length > 0) return { ...cat, types: matchingTypes };
      return null;
    }).filter(Boolean);
  }, [categorySummary, summarySearchQuery]);

  const { items: sortedCategorySummary, requestSort: requestSortCategory, sortConfig: sortConfigCategory } = useSortableData(filteredCategorySummary);

  const summarySuggestions = useMemo(() => {
    if (!summarySearchQuery.trim()) return [];
    const q = summarySearchQuery.toLowerCase().trim();
    const names = new Set();
    currentFilteredView.forEach(item => {
      if (item.category.toLowerCase().includes(q)) names.add(item.category);
      if (item.specificItem.toLowerCase().includes(q)) names.add(item.specificItem);
    });
    return Array.from(names).filter(n => n.toLowerCase() !== q).slice(0, 5);
  }, [currentFilteredView, summarySearchQuery]);

  const handlePrintSummary = () => {
    const printWindow = window.open('', '_blank');
    const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
    printWindow.document.write(`
      <html>
        <head>
          <title>Summary of Contributions</title>
          <style>
            ${PRINT_HEADER_STYLES}
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #000; line-height: 1.5; }
            .date-note { text-align: right; font-size: 12px; font-weight: bold; margin-bottom: 20px; color: #333; }
            h2 { text-align: center; margin-bottom: 25px; font-size: 18px; text-transform: uppercase; font-weight: 800; color: #000; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 10px 12px; text-align: left; font-size: 13px; }
            th { background-color: #f4f4f4; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #000; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .type-row td { padding-left: 28px; font-size: 12px; color: #444; }
          </style>
        </head>
        <body>
          ${buildPrintHeaderHtml(filters.office, userContext.role === SYSTEM_ROLES.PARTNER)}
          ${buildPrintMetaRow(filters.office, todayFormatted)}
          <h2>Summary of Contributions</h2>
          <table>
            <thead>
              <tr>
                <th>Category / Specific Item</th>
                <th class="text-center">No. of Partners (Donors)</th>
                <th class="text-right">Amount/Value (PHP)</th>
                <th class="text-center">No. of Offices (RO/SDO)</th>
              </tr>
            </thead>
            <tbody>
              ${sortedCategorySummary.map(cat => `
                <tr>
                  <td><strong>${cat.category}</strong></td>
                  <td class="text-center">${cat.partners}</td>
                  <td class="text-right">P ${Number(cat.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td class="text-center">${cat.offices}</td>
                </tr>
                ${cat.types.map(t => `
                  <tr class="type-row">
                    <td>${t.specificItem}</td>
                    <td class="text-center">${t.partners}</td>
                    <td class="text-right">P ${Number(t.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td class="text-center">${t.offices}</td>
                  </tr>
                `).join('')}
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 200);
  };

  const handleExportSummary = () => {
    const exportPayload = [];
    sortedCategorySummary.forEach(cat => {
      exportPayload.push({ 'Category': cat.category, 'Specific Item': '(All Types)', 'No. of Partners (Donors)': cat.partners, 'Amount/Value (PHP)': cat.value, 'No. of Offices (RO/SDO)': cat.offices });
      cat.types.forEach(t => {
        exportPayload.push({ 'Category': cat.category, 'Specific Item': t.specificItem, 'No. of Partners (Donors)': t.partners, 'Amount/Value (PHP)': t.value, 'No. of Offices (RO/SDO)': t.offices });
      });
    });
    exportToCSV(exportPayload, 'PROJECT_UGNAY_CONTRIBUTIONS_SUMMARY_EXPORT');
  };

  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const allUniqueNames = Array.from(new Set(currentFilteredView.map(c => c.partner)));
    return allUniqueNames.filter(name => 
      name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      name.toLowerCase() !== searchQuery.toLowerCase()
    ).slice(0, 5);
  }, [currentFilteredView, searchQuery]);

  const partnerModalSuggestions = useMemo(() => {
    if (!meta.partner.trim()) return [];
    const allUniqueNames = Array.from(new Set(contributions.map(c => c.partner)));
    return allUniqueNames.filter(name => 
      name.toLowerCase().includes(meta.partner.toLowerCase()) && 
      name.toLowerCase() !== meta.partner.toLowerCase()
    ).slice(0, 5);
  }, [contributions, meta.partner]);

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
    if (!meta.partner || !meta.dateLogged || !meta.office || !meta.fd || !meta.section || !lines.length) return;
    
    const timestamp = new Date().toLocaleString();
    const formatted = lines.map((l, i) => ({
      id: 'C-GEN-' + (contributions.length + i + 1),
      dateLogged: meta.dateLogged,
      partner: meta.partner,
      office: meta.office,
      fd: meta.fd,
      section: meta.section,
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
    setMeta({ dateLogged: new Date().toISOString().split('T')[0], partner: '', office: isConstrained ? userContext.office : '', fd: '', section: '' });
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

  const handlePrintContributionsLedger = () => {
    const printWindow = window.open('', '_blank');
    const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Contributions Ledger Matrix</title>
          <style>
            ${PRINT_HEADER_STYLES}
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #000; line-height: 1.5; }
            .date-note { text-align: right; font-size: 12px; font-weight: bold; margin-bottom: 20px; color: #333; }
            h2 { text-align: center; margin-bottom: 25px; font-size: 18px; text-transform: uppercase; font-weight: 800; color: #000; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 10px 12px; text-align: left; font-size: 13px; }
            th { background-color: #f4f4f4; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #000; }
            .text-right { text-align: right; }
          </style>
        </head>
        <body>
          ${buildPrintHeaderHtml(filters.office, userContext.role === SYSTEM_ROLES.PARTNER)}
          ${buildPrintMetaRow(filters.office, todayFormatted)}
          <h2>Contributions Ledger</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Partner</th>
                <th>Recipient Office</th>
                <th>Line Item</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Value (PHP)</th>
              </tr>
            </thead>
            <tbody>
              ${sortedFilteredView.map(c => `
                <tr>
                  <td>${c.dateLogged}</td>
                  <td><strong>${c.partner}</strong></td>
                  <td>${c.office}</td>
                  <td>${c.specificItem}</td>
                  <td class="text-right">${c.qty} ${c.uom}</td>
                  <td class="text-right">P ${Number(c.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 200);
  };

  const inp = `w-full p-2 text-xs rounded border outline-none transition ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-slate-300 text-black'} focus:border-amber-500`;

  return (
    <div className="space-y-6">
      <SystemFilters filters={filters} setFilters={setFilters} darkMode={darkMode} includeCategoryFilters={true} userContext={userContext} />
      
      {!isIctUser && (
        <div className="flex border-b border-slate-200 dark:border-zinc-800 gap-2">
          <button 
            onClick={() => setSubTab('ledger')} 
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${subTab === 'ledger' ? `border-amber-500 ${darkMode ? 'text-amber-400' : 'text-black'}` : `border-transparent ${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}`}
          >
            Contributions
          </button>
          <button 
            onClick={() => setSubTab('partners')} 
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${subTab === 'partners' ? `border-amber-500 ${darkMode ? 'text-amber-400' : 'text-black'}` : `border-transparent ${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}`}
          >
            Partners
          </button>
          <button 
            onClick={() => setSubTab('summary')} 
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${subTab === 'summary' ? `border-amber-500 ${darkMode ? 'text-amber-400' : 'text-black'}` : `border-transparent ${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}`}
          >
            Summary
          </button>
        </div>
      )}

      {(subTab === 'ledger' || isIctUser) && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-xl shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-amber-400">Contributions Ledger</h2>
              <p className="text-[11px] text-white opacity-80">Verified Records: {currentFilteredView.length}</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!isReadOnly && (
                <button onClick={()=>setAddModal(true)} className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
                  <Icon name="plus" size={14} /><span>Record Donations</span>
                </button>
              )}
              <button onClick={handlePrintContributionsLedger} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-zinc-700">
                <Icon name="print" size={14} /><span>Print</span>
              </button>
              <button onClick={() => exportToCSV(currentFilteredView, 'PROJECT_UGNAY_CONTRIBUTIONS_EXPORT')} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-zinc-700">
                <Icon name="download" size={14} /><span>Export Matrix</span>
              </button>
            </div>
          </div>

          <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className={`border-b border-slate-200 dark:border-zinc-800 ${darkMode ? 'text-white' : 'text-black'} font-bold uppercase tracking-wider`}>
                  <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('dateLogged')}>Date <SortIndicator sortConfig={sortConfig} sortKey="dateLogged" darkMode={darkMode} /></th>
                  <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('partner')}>Partner <SortIndicator sortConfig={sortConfig} sortKey="partner" darkMode={darkMode} /></th>
                  <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('office')}>Recipient <SortIndicator sortConfig={sortConfig} sortKey="office" darkMode={darkMode} /></th>
                  <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('fd')}>Functional Division <SortIndicator sortConfig={sortConfig} sortKey="fd" darkMode={darkMode} /></th>
                  <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('section')}>Section/Unit <SortIndicator sortConfig={sortConfig} sortKey="section" darkMode={darkMode} /></th>
                  <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('category')}>Category <SortIndicator sortConfig={sortConfig} sortKey="category" darkMode={darkMode} /></th>
                  <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('specificItem')}>Line Item <SortIndicator sortConfig={sortConfig} sortKey="specificItem" darkMode={darkMode} /></th>
                  <th className={`pb-2 text-right cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('qty')}>Quantity <SortIndicator sortConfig={sortConfig} sortKey="qty" darkMode={darkMode} /></th>
                  <th className={`pb-2 text-right cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('value')}>Value <SortIndicator sortConfig={sortConfig} sortKey="value" darkMode={darkMode} /></th>
                  <th className={`pb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Remarks</th>
                  <th className={`pb-2 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                {sortedFilteredView.map(c => (
                  <tr key={c.id} className={`hover:bg-slate-50 dark:hover:bg-zinc-800/30 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <td className="py-2.5">{c.dateLogged}</td>
                    <td className={`py-2.5 font-bold ${darkMode ? 'text-amber-400' : 'text-black'}`}>{c.partner}</td>
                    <td className="py-2.5 font-bold">{c.office}</td>
                    <td className="py-2.5 truncate max-w-[130px]">{c.fd}</td>
                    <td className="py-2.5">{c.section}</td>
                    <td className="py-2.5 text-[11px]">{c.category}</td>
                    <td className="py-2.5 font-semibold">{c.specificItem}</td>
                    <td className="py-2.5 text-right font-medium">{c.qty} <span className={`text-[10px] ${darkMode ? 'text-white' : 'text-black'} opacity-80 dark:opacity-60`}>{c.uom}</span></td>
                    <td className={`py-2.5 text-right font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>₱ {Number(c.value).toLocaleString()}</td>
                    <td className="py-2.5 text-[11px] truncate max-w-[150px]" title={c.remarks}>{c.remarks || '-'}</td>
                    <td className="py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {!isReadOnly && (
                          <button onClick={() => setEditModal(c)} className={`p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded ${darkMode ? 'text-white' : 'text-black'} hover:text-amber-600 dark:hover:text-amber-500 transition`} title="Modify Record">
                            <Icon name="edit" size={14} />
                          </button>
                        )}
                        <button onClick={() => setTrailModal(c)} className={`p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded ${darkMode ? 'text-white' : 'text-black'} hover:text-amber-600 dark:hover:text-amber-500 transition`} title="Audit Trail">
                          <Icon name="history" size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {sortedFilteredView.length > 0 && (
                <tfoot>
                  <tr className={`border-t-2 border-slate-300 dark:border-zinc-700 font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                    <td className="py-2.5" colSpan="7">TOTAL</td>
                    <td className="py-2.5 text-right">{sortedFilteredView.reduce((a, c) => a + Number(c.qty), 0)}</td>
                    <td className="py-2.5 text-right">₱ {sortedFilteredView.reduce((a, c) => a + Number(c.value), 0).toLocaleString()}</td>
                    <td colSpan="2"></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </>
      )}

      {subTab === 'partners' && !isIctUser && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-xl shadow-sm">
            
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search specific partner identity..." 
                className="w-full p-2.5 pl-3 pr-8 text-xs font-semibold rounded-lg border border-zinc-800 shadow-sm outline-none transition focus:border-amber-500 bg-zinc-900 text-white"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-3 text-white opacity-50 hover:opacity-100">
                  <Icon name="close" size={14} />
                </button>
              )}
              
              {autocompleteSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 border rounded-lg shadow-xl z-30 overflow-hidden divide-y bg-zinc-900 border-zinc-800 divide-zinc-800/60">
                  {autocompleteSuggestions.map(itemHint => (
                    <button 
                      key={itemHint} 
                      onClick={() => setSearchQuery(itemHint)}
                      className="w-full text-left p-2 text-xs font-semibold hover:bg-zinc-800/40 text-white transition"
                    >
                      {itemHint}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button onClick={() => {
                const sortedList = sortedPartnersSummary;
                const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
                const printWindow = window.open('', '_blank');
                
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>List of Partners</title>
                      <style>
            ${PRINT_HEADER_STYLES}
                        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #000; line-height: 1.5; }
                        .date-note { text-align: right; font-size: 12px; font-weight: bold; margin-bottom: 20px; color: #333; }
                        h2 { text-align: center; margin-bottom: 25px; font-size: 18px; text-transform: uppercase; font-weight: 800; color: #000; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #ccc; padding: 10px 12px; text-align: left; font-size: 13px; }
                        th { background-color: #f4f4f4; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; color: #000; }
                        .text-right { text-align: right; }
                        .text-center { text-align: center; }
                      </style>
                    </head>
                    <body>
                      ${buildPrintHeaderHtml(filters.office, userContext.role === SYSTEM_ROLES.PARTNER)}
          ${buildPrintMetaRow(filters.office, todayFormatted)}
                      <h2>List of Partners</h2>
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
                
                setTimeout(() => {
                  printWindow.print();
                  printWindow.close();
                }, 200);
              }} className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
                <Icon name="print" size={14} /><span>Print List</span>
              </button>
              
              <button onClick={() => {
                const exportPayload = sortedPartnersSummary.map(p => ({
                  'Partner Name': p.name,
                  'Total Transactions': p.aggregateLogs.length,
                  'Total Valuation (PHP)': p.totalValuation
                }));
                exportToCSV(exportPayload, 'PROJECT_UGNAY_PARTNERS_MATRIX_EXPORT');
              }} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-zinc-700 transition">
                <Icon name="download" size={14} /><span>Export Matrix</span>
              </button>
            </div>
          </div>

          <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className={`border-b border-slate-200 dark:border-zinc-800 ${darkMode ? 'text-white' : 'text-black'} font-bold uppercase tracking-wider`}>
                  <th className={`pb-2 pl-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortPartners('name')}>Partner <SortIndicator sortConfig={sortConfigPartners} sortKey="name" darkMode={darkMode} /></th>
                  <th className={`pb-2 text-center cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortPartners('transactions')}>No. of Contributions <SortIndicator sortConfig={sortConfigPartners} sortKey="transactions" darkMode={darkMode} /></th>
                  <th className={`pb-2 text-right pr-4 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortPartners('totalValuation')}>Total Value <SortIndicator sortConfig={sortConfigPartners} sortKey="totalValuation" darkMode={darkMode} /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                {sortedPartnersSummary.map(rowNode => (
                  <tr 
                    key={rowNode.name} 
                    onClick={() => setSelectedPartner(rowNode)}
                    className={`hover:bg-slate-50 dark:hover:bg-zinc-800/40 cursor-pointer transition ${darkMode ? 'text-white' : 'text-black'}`}
                  >
                    <td className={`py-3 pl-2 font-black ${darkMode ? 'text-amber-400' : 'text-black'} text-xs`}>{rowNode.name}</td>
                    <td className="py-3 text-center font-bold">{rowNode.aggregateLogs.length} transactions</td>
                    <td className={`py-3 text-right pr-4 font-black ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>₱ {rowNode.totalValuation.toLocaleString()}</td>
                  </tr>
                ))}
                {sortedPartnersSummary.length === 0 && (
                  <tr>
                    <td colSpan="3" className={`py-6 text-center ${darkMode ? 'text-white' : 'text-black'} opacity-60 italic`}>No partners match the applied structural/temporal parameter sets.</td>
                  </tr>
                )}
              </tbody>
              {sortedPartnersSummary.length > 0 && (
                <tfoot>
                  <tr className={`border-t-2 border-slate-300 dark:border-zinc-700 font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                    <td className="py-3 pl-2">TOTAL</td>
                    <td className="py-3 text-center">{sortedPartnersSummary.reduce((a, p) => a + p.aggregateLogs.length, 0)} transactions</td>
                    <td className="py-3 text-right pr-4">₱ {sortedPartnersSummary.reduce((a, p) => a + p.totalValuation, 0).toLocaleString()}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}

      {subTab === 'summary' && !isIctUser && (
        <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-xl shadow-sm mb-4">
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                value={summarySearchQuery}
                onChange={e => setSummarySearchQuery(e.target.value)}
                placeholder="Search Category or Specific Item..." 
                className="w-full p-2.5 pl-3 pr-8 text-xs font-semibold rounded-lg border border-zinc-800 shadow-sm outline-none transition focus:border-amber-500 bg-zinc-900 text-white"
              />
              {summarySearchQuery && (
                <button onClick={() => setSummarySearchQuery('')} className="absolute right-2.5 top-3 text-white opacity-50 hover:opacity-100">
                  <Icon name="close" size={14} />
                </button>
              )}
              {summarySuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 border rounded-lg shadow-xl z-30 overflow-hidden divide-y bg-zinc-900 border-zinc-800 divide-zinc-800/60">
                  {summarySuggestions.map(itemHint => (
                    <button key={itemHint} onClick={() => setSummarySearchQuery(itemHint)} className="w-full text-left p-2 text-xs font-semibold hover:bg-zinc-800/40 text-white transition">
                      {itemHint}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button onClick={handlePrintSummary} className="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
                <Icon name="print" size={14} /><span>Print</span>
              </button>
              <button onClick={handleExportSummary} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-800 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20 hover:bg-zinc-700 transition">
                <Icon name="download" size={14} /><span>Export Matrix</span>
              </button>
            </div>
          </div>
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className={`border-b border-slate-200 dark:border-zinc-800 ${darkMode ? 'text-white' : 'text-black'} font-bold uppercase tracking-wider`}>
                <th className={`pb-2 pl-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortCategory('category')}>Category <SortIndicator sortConfig={sortConfigCategory} sortKey="category" darkMode={darkMode} /></th>
                <th className={`pb-2 text-center cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortCategory('partners')}>No. of Partners (Donors) <SortIndicator sortConfig={sortConfigCategory} sortKey="partners" darkMode={darkMode} /></th>
                <th className={`pb-2 text-right cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortCategory('value')}>Amount/Value (₱) <SortIndicator sortConfig={sortConfigCategory} sortKey="value" darkMode={darkMode} /></th>
                <th className={`pb-2 text-right pr-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSortCategory('offices')}>No. of Offices (RO/SDO) <SortIndicator sortConfig={sortConfigCategory} sortKey="offices" darkMode={darkMode} /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
              {sortedCategorySummary.map(cat => (
                <React.Fragment key={cat.category}>
                  <tr onClick={() => toggleCategory(cat.category)} className={`cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/30 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <td className="py-2.5 pl-2 font-bold">
                      <span className={`inline-block mr-1.5 text-[9px] transition-transform ${(summarySearchQuery.trim() || expandedCategories[cat.category]) ? 'rotate-90' : ''}`}>▶</span>
                      {cat.category}
                    </td>
                    <td className="py-2.5 text-center font-bold">{cat.partners}</td>
                    <td className={`py-2.5 text-right font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>₱ {cat.value.toLocaleString()}</td>
                    <td className="py-2.5 text-right pr-2 font-bold">{cat.offices}</td>
                  </tr>
                  {(summarySearchQuery.trim() || expandedCategories[cat.category]) && cat.types.map(t => (
                    <tr key={t.specificItem} className={`text-[11px] ${darkMode ? 'bg-zinc-950/40 text-white' : 'bg-slate-50 text-black'} opacity-90`}>
                      <td className="py-2 pl-8">{t.specificItem}</td>
                      <td className="py-2 text-center">{t.partners}</td>
                      <td className="py-2 text-right">₱ {t.value.toLocaleString()}</td>
                      <td className="py-2 text-right pr-2">{t.offices}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              {sortedCategorySummary.length === 0 && (
                <tr>
                  <td colSpan="4" className={`py-6 text-center ${darkMode ? 'text-white' : 'text-black'} opacity-60 italic`}>No contribution records match the applied parameter sets.</td>
                </tr>
              )}
            </tbody>
            {sortedCategorySummary.length > 0 && (
              <tfoot>
                <tr className={`border-t-2 border-slate-300 dark:border-zinc-700 font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  <td className="py-2.5 pl-2">TOTAL</td>
                  <td className="py-2.5 text-center"></td>
                  <td className="py-2.5 text-right">₱ {sortedCategorySummary.reduce((a, c) => a + c.value, 0).toLocaleString()}</td>
                  <td className="py-2.5 text-right pr-2"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}

      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm">
          <div className={`w-full max-w-4xl p-6 rounded-2xl border shadow-2xl flex flex-col max-h-[85vh] ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-3 mb-4">
              <div>
                <span className={`text-[10px] tracking-wider uppercase font-black ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>Resource Summary Ledger</span>
                <h3 className={`font-black text-base ${darkMode ? 'text-amber-400' : 'text-black'}`}>{selectedPartner.name}</h3>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handlePrintPartnerLedger} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
                  <Icon name="print" size={14} /><span>Print</span>
                </button>
                <button onClick={() => setSelectedPartner(null)} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white transition opacity-60 hover:opacity-100`}>
                  <Icon name="close" size={20} />
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1 border border-slate-200 dark:border-zinc-800/80 rounded-lg">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className={`sticky top-0 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-zinc-800 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-slate-100 text-black'}`}>
                  <tr>
                    <th className="p-2.5 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none" onClick={() => requestSortPartnerLogs('dateLogged')}>Date <SortIndicator sortConfig={sortConfigPartnerLogs} sortKey="dateLogged" darkMode={darkMode} /></th>
                    <th className="p-2.5 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none" onClick={() => requestSortPartnerLogs('office')}>Office <SortIndicator sortConfig={sortConfigPartnerLogs} sortKey="office" darkMode={darkMode} /></th>
                    <th className="p-2.5 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none" onClick={() => requestSortPartnerLogs('fd')}>Functional Division <SortIndicator sortConfig={sortConfigPartnerLogs} sortKey="fd" darkMode={darkMode} /></th>
                    <th className="p-2.5 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none" onClick={() => requestSortPartnerLogs('section')}>Section/Unit <SortIndicator sortConfig={sortConfigPartnerLogs} sortKey="section" darkMode={darkMode} /></th>
                    <th className="p-2.5 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none" onClick={() => requestSortPartnerLogs('category')}>Category <SortIndicator sortConfig={sortConfigPartnerLogs} sortKey="category" darkMode={darkMode} /></th>
                    <th className="p-2.5 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none" onClick={() => requestSortPartnerLogs('specificItem')}>Line Item <SortIndicator sortConfig={sortConfigPartnerLogs} sortKey="specificItem" darkMode={darkMode} /></th>
                    <th className="p-2.5 text-right cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none" onClick={() => requestSortPartnerLogs('qty')}>Qty <SortIndicator sortConfig={sortConfigPartnerLogs} sortKey="qty" darkMode={darkMode} /></th>
                    <th className="p-2.5 text-right pr-3 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none" onClick={() => requestSortPartnerLogs('value')}>Valuation <SortIndicator sortConfig={sortConfigPartnerLogs} sortKey="value" darkMode={darkMode} /></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                  {sortedPartnerLogs.map(itemLog => (
                    <tr key={itemLog.id} className={`hover:bg-slate-50 dark:hover:bg-zinc-800/30 text-[11px] ${darkMode ? 'text-white' : 'text-black'}`}>
                      <td className="p-2.5">{itemLog.dateLogged}</td>
                      <td className="p-2.5 font-bold">{itemLog.office}</td>
                      <td className="p-2.5 truncate max-w-[120px]">{itemLog.fd}</td>
                      <td className="p-2.5">{itemLog.section}</td>
                      <td className="p-2.5">{itemLog.category}</td>
                      <td className="p-2.5 font-semibold">{itemLog.specificItem}</td>
                      <td className="p-2.5 text-right font-medium">{itemLog.qty} <span className={`text-[10px] ${darkMode ? 'text-white' : 'text-black'} opacity-80 dark:opacity-60`}>{itemLog.uom}</span></td>
                      <td className={`p-2.5 text-right pr-3 font-black ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>₱{itemLog.value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                {sortedPartnerLogs.length > 0 && (
                  <tfoot>
                    <tr className={`border-t-2 border-slate-300 dark:border-zinc-700 font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                      <td className="p-2.5" colSpan="6">TOTAL</td>
                      <td className="p-2.5 text-right">{sortedPartnerLogs.reduce((a, l) => a + Number(l.qty), 0)}</td>
                      <td className="p-2.5 text-right pr-3">₱{sortedPartnerLogs.reduce((a, l) => a + Number(l.value), 0).toLocaleString()}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-center">
              <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Total Pipeline Records: {selectedPartner.aggregateLogs.length}</span>
              <span className={`text-sm font-black ${darkMode ? 'text-amber-400' : 'text-black'}`}>Total Contribution: ₱{selectedPartner.totalValuation.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-3 mb-4">
              <h3 className={`font-black text-sm uppercase tracking-wider ${darkMode ? 'text-amber-400' : 'text-black'}`}>Record Donations</h3>
              <button onClick={() => setAddModal(false)} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}><Icon name="close" size={18} /></button>
            </div>
            <div className="space-y-4">
              
              <input type="date" value={meta.dateLogged} onChange={e=>setMeta({...meta, dateLogged: e.target.value})} className={inp} title="Date Logged" />

              <div className="relative w-full">
                <input 
                  type="text" 
                  value={meta.partner} 
                  onChange={e=>setMeta({...meta, partner:e.target.value})} 
                  className={inp} 
                  placeholder="Sponsoring Partner / Entity" 
                />
                {partnerModalSuggestions.length > 0 && (
                  <div className={`absolute top-full left-0 w-full mt-1 border rounded-lg shadow-xl z-30 overflow-hidden divide-y ${darkMode ? 'bg-zinc-900 border-zinc-800 divide-zinc-800/60' : 'bg-white border-slate-200 divide-slate-100'}`}>
                    {partnerModalSuggestions.map(itemHint => (
                      <button 
                        key={itemHint}
                        type="button"
                        onClick={() => setMeta({...meta, partner: itemHint})}
                        className={`w-full text-left p-2 text-xs font-semibold transition ${darkMode ? 'hover:bg-zinc-800/40 text-white' : 'hover:bg-slate-100 text-black'}`}
                      >
                        {itemHint}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <select value={meta.office} onChange={e=>setMeta({...meta, office:e.target.value, fd:'', section:''})} className={inp} disabled={isConstrained}>
                <option value="">Recipient Office</option>
                {OFFICES.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <select value={meta.fd} onChange={e=>setMeta({...meta, fd:e.target.value, section:''})} className={inp} disabled={!meta.office}><option value="">Functional Division</option>{activeFds.map(f=><option key={f} value={f}>{f}</option>)}</select>
                <select value={meta.section} onChange={e=>setMeta({...meta, section:e.target.value})} className={inp} disabled={!meta.fd}><option value="">Section/Unit</option>{activeSections.map(s=><option key={s} value={s}>{s}</option>)}</select>
              </div>
              
              <div className="border-t border-slate-200 dark:border-zinc-800 pt-3 space-y-2">
                <span className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>Line Item</span>
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
                
                <button type="button" onClick={handlePushLine} className={`w-full py-2 text-xs font-bold rounded border transition ${darkMode ? 'bg-zinc-800 border-zinc-700 text-amber-500 hover:bg-zinc-700' : 'bg-slate-100 border-slate-200 text-amber-600 hover:bg-slate-200'}`}><Icon name="plus" size={14} /> Add Line Item</button>
              </div>
              
              {lines.length > 0 && (
                <div className="border-t border-slate-200 dark:border-zinc-800 pt-3 space-y-2">
                  {lines.map(l => (
                    <div key={l.id} className={`flex justify-between items-center text-[11px] p-2 border rounded ${darkMode ? 'bg-zinc-900/40 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}>
                      <span>{l.specificItem} x{l.qty} - ₱{Number(l.value).toLocaleString()} {l.remarks ? `(${l.remarks})` : ''}</span>
                    </div>
                  ))}
                  <button onClick={handleCommitBatch} className="w-full py-2 bg-zinc-900 hover:bg-black text-amber-500 font-bold rounded text-xs transition">Submit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <form onSubmit={handleUpdateItem} className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-2">
              <h3 className={`font-bold text-sm ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>Modify Specification</h3>
              <button type="button" onClick={() => setEditModal(null)} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}><Icon name="close" size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-[10px] uppercase font-bold ${darkMode ? 'text-white' : 'text-black'} mb-1`}>Quantity Provided</label>
                <input type="number" value={editModal.qty} onChange={e=>setEditModal({...editModal, qty: e.target.value})} className={inp} required />
              </div>
            </div>
            <div>
              <label className={`block text-[10px] uppercase font-bold ${darkMode ? 'text-white' : 'text-black'} mb-1`}>Declared Value (₱)</label>
              <input type="number" value={editModal.value} onChange={e=>setEditModal({...editModal, value: e.target.value})} className={inp} required />
            </div>
            <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black font-black text-xs rounded transition shadow-md"> Save Verification Changes</button>
          </form>
        </div>
      )}

      {trailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-2">
              <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-black'}`}>System Change Audit Trail Log</h3>
              <button onClick={() => setTrailModal(null)} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}><Icon name="close" size={16} /></button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {trailModal.history?.map((t, i) => (
                <div key={i} className={`text-xs p-3 rounded border ${darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`flex justify-between text-[10px] ${darkMode ? 'text-white' : 'text-black'} mb-1`}>
                    <span>{t.timestamp}</span>
                    <span className={`font-bold ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>{t.user}</span>
                  </div>
                  <p className={`${darkMode ? 'text-white' : 'text-black'} font-medium`}>{t.action}</p>
                </div>
              )) || <p className={`text-xs text-center ${darkMode ? 'text-white' : 'text-black'} opacity-60 py-4`}>No logged validation adjustments.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- TAB: USER MANAGEMENT ---
const MANAGEABLE_ROLES_FOR_ICT = [SYSTEM_ROLES.FOCAL, SYSTEM_ROLES.MONITORING, SYSTEM_ROLES.END_USER, SYSTEM_ROLES.PARTNER];

function UserWorkspace({ users, setUsers, userContext, darkMode }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [officeFilter, setOfficeFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const isSuperAdmin = userContext.role === SYSTEM_ROLES.SUPERADMIN;
  const isSuperAdminOrRoIct = userContext.role === SYSTEM_ROLES.SUPERADMIN || (userContext.role === SYSTEM_ROLES.ICT_USER && userContext.office === 'Regional Office');
  const hasWriteClearance = userContext.role === SYSTEM_ROLES.SUPERADMIN || userContext.role === SYSTEM_ROLES.ICT_USER; 

  const assignableRoles = isSuperAdmin ? Object.values(SYSTEM_ROLES) : (hasWriteClearance ? MANAGEABLE_ROLES_FOR_ICT : []);

  const canManageTarget = (target) => {
    if (isSuperAdmin) return true;
    if (userContext.role === SYSTEM_ROLES.ICT_USER) {
      if (!MANAGEABLE_ROLES_FOR_ICT.includes(target.role)) return false;
      if (target.role === SYSTEM_ROLES.PARTNER) return true;
      return target.office === userContext.office;
    }
    return false;
  };

  const defaultOfficeForRole = (role) => {
    if (isSuperAdmin) return 'Regional Office';
    if (role === SYSTEM_ROLES.PARTNER) return 'Regional Office';
    return userContext.office;
  };
  
  const displayedUsers = users.filter(u => {
    if (!(isSuperAdminOrRoIct || u.office === userContext.office)) return false;
    if (officeFilter && u.office !== officeFilter) return false;
    if (roleFilter && u.role !== roleFilter) return false;
    return true;
  });
  const { items: sortedUsers, requestSort, sortConfig } = useSortableData(displayedUsers);

  const [form, setForm] = useState({ 
    name: '', username: '', email: '', role: assignableRoles[0] || SYSTEM_ROLES.FOCAL, position: '', 
    office: defaultOfficeForRole(assignableRoles[0] || SYSTEM_ROLES.FOCAL)
  });

  const handleRoleChange = (newRole) => {
    setForm({ ...form, role: newRole, office: defaultOfficeForRole(newRole) });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.email) return;
    if (!assignableRoles.includes(form.role)) return;
    setUsers([...users, { ...form, id: users.length + 1, password: 'password123' }]);
    setForm({ 
      name: '', username: '', email: '', role: assignableRoles[0] || SYSTEM_ROLES.FOCAL, position: '', 
      office: defaultOfficeForRole(assignableRoles[0] || SYSTEM_ROLES.FOCAL)
    });
    setIsAddOpen(false);
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

  const handleResetPassword = (target) => {
    if (window.confirm(`Reset password for ${target.name}? Their current password will stop working, and they'll be asked to set a new one the next time they log in.`)) {
      setUsers(users.map(u => u.id === target.id ? { ...u, passwordResetRequired: true } : u));
    }
  };

  const inp = `w-full p-2 text-xs rounded border outline-none transition ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-slate-300 text-black'} focus:border-amber-500`;
  const filterCls = `text-xs px-3 py-1.5 rounded-lg border outline-none transition ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-100 border-slate-200 text-black'}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-xl shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-amber-400">User Management Directory</h2>
          <p className="text-[11px] text-white opacity-80">Verified Access Profiles: {displayedUsers.length}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select value={officeFilter} onChange={e => setOfficeFilter(e.target.value)} className={filterCls}>
            <option value="">All Offices</option>
            {OFFICES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className={filterCls}>
            <option value="">All Access Levels</option>
            {Object.values(SYSTEM_ROLES).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {hasWriteClearance && (
            <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 px-4 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition">
              <Icon name="plus" size={14} /><span>Add Account</span>
            </button>
          )}
        </div>
      </div>

      <div className={`p-5 rounded-xl border shadow-sm overflow-x-auto ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-slate-200'}`}>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className={`border-b border-slate-200 dark:border-zinc-800 ${darkMode ? 'text-white' : 'text-black'} font-bold uppercase tracking-wider`}>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('name')}>Name <SortIndicator sortConfig={sortConfig} sortKey="name" darkMode={darkMode} /></th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('username')}>Username <SortIndicator sortConfig={sortConfig} sortKey="username" darkMode={darkMode} /></th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('position')}>Designation/Position <SortIndicator sortConfig={sortConfig} sortKey="position" darkMode={darkMode} /></th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('role')}>Access Level <SortIndicator sortConfig={sortConfig} sortKey="role" darkMode={darkMode} /></th>
              <th className={`pb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 select-none ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => requestSort('office')}>Office <SortIndicator sortConfig={sortConfig} sortKey="office" darkMode={darkMode} /></th>
              {hasWriteClearance && <th className={`pb-2 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
            {sortedUsers.map(u => (
              <tr key={u.id} className={`hover:bg-slate-50 dark:hover:bg-zinc-800/30 ${darkMode ? 'text-white' : 'text-black'}`}>
                <td className="py-2.5">
                  <p className="font-bold">{u.name}</p>
                  <p className={`text-[10px] ${darkMode ? 'text-white' : 'text-black'} opacity-80`}>{u.email}</p>
                </td>
                <td className={`py-2.5 font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                  {u.username}
                  {u.passwordResetRequired && (
                    <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/15 text-red-500">Reset Pending</span>
                  )}
                </td>
                <td className="py-2.5">{u.position || '-'}</td>
                <td className="py-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-900/30 text-amber-400">
                    {u.role}
                  </span>
                </td>
                <td className="py-2.5 font-bold">{u.office}</td>
                {hasWriteClearance && (
                  <td className="py-2.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {canManageTarget(u) ? (
                        <>
                          <button onClick={() => setEditingUser(u)} className={`p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded ${darkMode ? 'text-white' : 'text-black'} hover:text-amber-600 dark:hover:text-amber-500 transition`} title="Modify Access">
                            <Icon name="edit" size={14} />
                          </button>
                          {u.id !== userContext.id && (
                            <button onClick={() => handleResetPassword(u)} className={`p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded ${darkMode ? 'text-white' : 'text-black'} hover:text-amber-600 dark:hover:text-amber-500 transition`} title="Reset Password">
                              <Icon name="key" size={14} />
                            </button>
                          )}
                          <button onClick={() => handleDeleteUser(u.id)} className={`p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded ${darkMode ? 'text-white' : 'text-black'} hover:text-red-600 dark:hover:text-red-500 transition`} title="Purge Record">
                            <Icon name="trash" size={14} />
                          </button>
                        </>
                      ) : (
                        <span className={`text-[10px] ${darkMode ? 'text-white' : 'text-black'} opacity-40 italic`}>Restricted</span>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-3 mb-4">
              <h3 className={`font-black text-sm ${darkMode ? 'text-amber-400' : 'text-black'}`}>New User Identity</h3>
              <button onClick={() => setIsAddOpen(false)} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}><Icon name="close" size={18} /></button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input type="text" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className={inp} required />
              <input type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className={inp} required />
              <input type="text" placeholder="Username" value={form.username} onChange={e=>setForm({...form, username: e.target.value})} className={inp} required />
              <input type="text" placeholder="Position / Title" value={form.position} onChange={e=>setForm({...form, position: e.target.value})} className={inp} required />
              <select value={form.role} onChange={e=>handleRoleChange(e.target.value)} className={inp}>
                {assignableRoles.map(r=><option key={r} value={r}>{r}</option>)}
              </select>
              <select value={form.office} onChange={e=>setForm({...form, office: e.target.value})} className={inp} disabled={!isSuperAdmin && form.role !== SYSTEM_ROLES.PARTNER}>
                {OFFICES.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
              <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black font-black text-xs rounded transition shadow-md">Create Profile</button>
            </form>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <form onSubmit={handleUpdateUser} className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-2">
              <h3 className={`font-bold text-sm ${darkMode ? 'text-amber-400' : 'text-black'}`}>Modify Identity Access</h3>
              <button type="button" onClick={() => setEditingUser(null)} className={`${darkMode ? 'text-white' : 'text-black'} hover:text-black dark:hover:text-white opacity-60 hover:opacity-100`}><Icon name="close" size={16} /></button>
            </div>
            <input type="text" placeholder="Full Name" value={editingUser.name} onChange={e=>setEditingUser({...editingUser, name: e.target.value})} className={inp} required />
            <input type="text" placeholder="Position / Title" value={editingUser.position} onChange={e=>setEditingUser({...editingUser, position: e.target.value})} className={inp} required />
            <select value={editingUser.role} onChange={e=>setEditingUser({...editingUser, role: e.target.value})} className={inp} disabled={!isSuperAdmin}>
              {(isSuperAdmin ? Object.values(SYSTEM_ROLES) : MANAGEABLE_ROLES_FOR_ICT).map(r=><option key={r} value={r}>{r}</option>)}
            </select>
            <select value={editingUser.office} onChange={e=>setEditingUser({...editingUser, office: e.target.value})} className={inp} disabled={!isSuperAdmin && editingUser.role !== SYSTEM_ROLES.PARTNER}>
              {OFFICES.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
            <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black font-black text-xs rounded transition shadow-md">Update Credentials</button>
          </form>
        </div>
      )}
    </div>
  );
}

function AboutWorkspace({ darkMode }) {
  return (
    <div className={`p-8 rounded-2xl border shadow-sm max-w-3xl mx-auto ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-zinc-800">
        <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg text-black overflow-hidden">
           <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
           <span className="hidden">R8</span>
        </div>
        <div>
          <h1 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>Project UGNAY</h1>
          <p className={`text-sm ${darkMode ? 'text-white' : 'text-black'} font-medium opacity-80`}>Unified Gateway for Needs and Assistance Yields</p>
        </div>
      </div>
      <div className={`space-y-4 text-sm ${darkMode ? 'text-white' : 'text-black'} opacity-90 leading-relaxed`}>
      <p><strong>Project UGNAY</strong> (Unified Gateway for Needs and Assistance Yields) is the official partnership management and resource coordination platform of DepEd Region VIII. Inspired by the Filipino word <strong>"ugnay,"</strong> which means <em>connection, linkage, or coordination</em>, the project embodies the Department's commitment to strengthening collaboration among schools, offices, stakeholders, and development partners. It serves as a unified gateway where identified needs are matched with available assistance, fostering meaningful partnerships that contribute to improved educational outcomes across the region.</p>
<p>Anchored on the Filipino value of <strong>ugnayan</strong> or working together toward a common purpose, Project UGNAY promotes a culture of cooperation, transparency, and shared responsibility. It enables DepEd Region VIII to effectively coordinate with government agencies, local government units, private organizations, non-government organizations, alumni associations, civic groups, and other education partners by providing a centralized, data-driven system for identifying priorities and aligning partner support with actual institutional needs.</p>
<p>The project was developed in response to the growing need for a streamlined and equitable mechanism for managing partnership initiatives and external assistance. Traditionally, partner interventions were often coordinated through separate channels, making it challenging to consolidate needs, monitor commitments, and ensure that resources reached the offices and schools that needed them most. Project UGNAY addresses these challenges by providing a single, integrated platform that enhances planning, coordination, accountability, and monitoring of partnership programs.</p>
<p>This localized system bridges the gap between identified office needs and the resources provided by external partners, ensuring transparent, data-driven, needs-based, and equitable distribution of support across all offices in DepEd Region VIII. Through real-time monitoring, centralized records, and informed decision-making, Project UGNAY empowers both DepEd offices and partners to maximize the impact of every contribution while promoting accountability, efficiency, and sustainability in partnership initiatives.</p>
<p>Beyond serving as a repository of requests and assistance, Project UGNAY functions as a strategic decision-support tool that enables regional leaders and partner organizations to identify priority areas, monitor resource allocation, evaluate partnership outcomes, and strengthen collaborative governance. By aligning partner contributions with validated needs, the system helps ensure that every intervention creates meaningful and measurable impact for learners, schools, and communities.</p>
<p>Project UGNAY is conceptualized and realized through the visionary leadership of <strong>Regional Director Salustiano T. Jimenez, JD, EdD, CESO III</strong>, and <strong>Assistant Regional Director Marilyn B. Siao, PhD, CESO IV</strong>. The initiative is implemented through the <strong>Special Programs and Projects Section</strong> of the <strong>Education Support Services Division (ESSD)</strong>, the designated focal unit for Partnerships in DepEd Region VIII, reinforcing the Region's commitment to innovation, collaboration, and responsive governance in advancing quality basic education.</p>
        <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="block opacity-60 font-bold uppercase mb-1">Version</span>
            <span className={`font-black ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>v1.0.0 (Beta)</span>
          </div>
          <div>
            <span className="block opacity-60 font-bold uppercase mb-1">Developed By</span>
            <span className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>ORD-ICT Unit - Region VIII</span>
          </div>
        </div>
      </div>
    </div>
  );
}
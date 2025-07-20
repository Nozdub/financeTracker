import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import OverviewContent from './OverviewContent';
import InvestmentsContent from './InvestmentsContent';
import BudgetPlannerContent from './BudgetPlannerContent';
import TransactionsContent from './TransactionsContent';
import NavTab from './NavTab';

function BaseLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'Overview', path: '/' },
    { label: 'Transactions', path: '/transactions' },
    { label: 'Budget Planner', path: '/budget' },
    { label: 'Investments', path: '/investments' },
  ];

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <div style={{ fontSize: '28px', fontWeight: '400', lineHeight: '0.4', textShadow: '2px 2px 3px rgba(0,0,0.4,0.4)' }}>FINANCE</div>
            <div style={{ fontSize: '32px', fontWeight: '700', textShadow: '2px 2px 3px rgba(0,0,0.4,0.4)' }}>TRACKER</div>
          </div>
          <div className="burger" onClick={() => navigate('/')}>☰</div>
        </div>

        <nav className="nav-bar">
          {tabs.map(tab => (
            <NavTab
              key={tab.label}
              label={tab.label}
              isActive={location.pathname === tab.path}
              onClick={() => navigate(tab.path)}
            />
          ))}
        </nav>
      </header>

      <main className="app-main">
        <div className="card">
          <Routes>
            <Route path="/" element={<OverviewContent />} />
            <Route path="/transactions" element={<TransactionsContent />} />
            <Route path="/budget" element={<BudgetPlannerContent />} />
            <Route path="/investments" element={<InvestmentsContent />} />
            <Route path="*" element={<p style={{ textAlign: 'center' }}>Page not found.</p>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default BaseLayout;

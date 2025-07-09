import { useState } from 'react'
import NavTab from './NavTab'
import OverviewContent from './OverviewContent'
import InvestmentsContent from './InvestmentsContent'
import BudgetPlannerContent from './BudgetPlannerContent'

function BaseLayout() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [showMobileNav, setShowMobileNav] = useState(false)

  const tabs = [
    'Overview',
    'Add Transactions',
    'Transactions',
    'Budget Planner',
    'Investments'
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewContent />
      case 'Investments':
        return <InvestmentsContent />
      case 'Budget Planner':
          return <BudgetPlannerContent />
      default:
        return <div style={{ textAlign: 'center', padding: '2rem' }}><p>Page not implemented yet.</p></div>
    }
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <div style={{ fontSize: '28px', fontWeight: '400', lineHeight: '0.4', textShadow: '2px 2px 3px rgba(0,0,0.4,0.4)' }}>FINANCE</div>
            <div style={{ fontSize: '32px', fontWeight: '700', textShadow: '2px 2px 3px rgba(0,0,0.4,0.4)' }}>TRACKER</div>
          </div>
          <div className="burger" onClick={() => setShowMobileNav(!showMobileNav)}>☰</div>
        </div>

        <nav className="nav-bar">
          {tabs.map(tab => (
            <NavTab
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </nav>

        {showMobileNav && (
          <div className="mobile-nav">
            {tabs.map(tab => (
              <div
                key={tab}
                className={`mobile-nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab)
                  setShowMobileNav(false)
                }}
              >
                {tab}
              </div>
            ))}
          </div>
        )}
      </header>

      <main className="app-main">
        <div className="card">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default BaseLayout

import { useState } from 'react'
import NavTab from './NavTab'
import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'
import RadialProgress from '../charts/RadialProgress'

function BaseLayout({ children }) {
    const [activeTab, setActiveTab] = useState('Overview')
    const [showMobileNav, setShowMobileNav] = useState(false)

    const tabs = [
        'Overview',
        'Add Transactions',
        'Transactions',
        'Budget Planner',
        'Investments'
    ]

    return (
        <div className="app-wrapper">
            <header className="app-header">
                <div className="header-content">
                    <div className="logo">
                        <div style={{ fontSize: '28px', fontWeight: '400', lineHeight: '0.4', textShadow: '2px 2px 3px rgba(0,0,0.4,0.4)' }}>FINANCE</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', textShadow: '2px 2px 3px rgba(0,0,0.4,0.4)' }}>TRACKER</div>
                    </div>

                    <div className="burger" onClick={() => setShowMobileNav(!showMobileNav)}>
                        ☰
                    </div>
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
      <h2 className="section-title">Financial Overview</h2>
    <div className="chart-card">
      <div className="chart-zone">
        <PieChart width={300} height={200} />
      </div>
      <div className="chart-zone">
        <LineChart width={300} height={200} />
      </div>
      <div className="chart-zone">
        <RadialProgress width={200} height={200} progress={0.65} />
      </div>
    </div>

    <div className="balance-section">
      <h2 className="section-title">Current Balance</h2>
      <p>26,232.56</p> {/* Replace with dynamic data later */}
    </div>

    <hr className="section-divider" />

    <div className="transactions-section">
      <h2 className="section-title">Recent Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Example static rows; later map dynamic data */}
          <tr>
            <td>26.03.2025</td>
            <td>Expense</td>
            <td>Electrical bill</td>
            <td>-1349,-</td>
          </tr>
          <tr>
            <td>22.03.2025</td>
            <td>Expense</td>
            <td>Gas bill</td>
            <td>-979,-</td>
          </tr>
          <tr>
            <td>20.03.2025</td>
            <td>Income</td>
            <td>Salary</td>
            <td>29,390,-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main>
        </div>
    )
}

export default BaseLayout

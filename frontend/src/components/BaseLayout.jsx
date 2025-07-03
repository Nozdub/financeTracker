import { useState } from 'react'
import NavTab from './NavTab'

function BaseLayout({ children }) {
    const [activeTab, setActiveTab] = useState('Overview')

    const tabs = [
        'Overview',
        'Add transactions',
        'Transactions',
        'Budget planner',
        'Investments'
    ]


    return (
        <div className="app-wrapper">
            <header className="app-header">
                <div className="logo">
                    <div style={{ fontSize: '28px', fontWeight: '400', lineHeight: '0.4', textShadow: '2px 2px 3px rgba(0,0,0.4,0.4)' }}>FINANCE</div>
                    <div style={{ fontSize: '32px', fontWeight: '700', textShadow: '2px 2px 3px rgba(0,0,0.4,0.4)' }}>TRACKER</div>
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
            </header>
            <main className="app-main">
                <div className="card">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default BaseLayout
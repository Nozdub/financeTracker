function NavTab({ label, isActive, onClick }) {
    return (
        <div className="nav-tab-wrapper"  onClick={onClick}>
            <div className={`nav-tab-label ${isActive ? 'active' : ''}`}>{label}</div>
            <div className={`nav-tab-bar ${isActive ? 'active-bar' : 'inactive-bar'}`}></div>

        </div>
    )
}

export default NavTab

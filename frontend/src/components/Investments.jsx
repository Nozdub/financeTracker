function Investments() {
  return (
    <div className="card">
      <h2 className="section-title">Your Investments</h2>

      <div className="investment-header">
        <input type="text" placeholder="Search stock (e.g., AAPL)" />
        <input type="number" placeholder="Amount" />
        <input type="number" placeholder="Purchase Price" />
        <button>Add Investment</button>
      </div>

      <div className="investment-list">
        {/* Placeholder for investment blocks */}
        <div className="investment-item">
          <div className="investment-info">
            <strong>Apple Inc. (AAPL)</strong>
            <p>Current Value: $190.12</p>
            <p>Change Today: +1.3%</p>
          </div>
          <div className="investment-actions">
            <button>Sell</button>
            <button>Remove</button>
          </div>
        </div>
        {/* Repeat investment-item blocks dynamically later */}
      </div>
    </div>
  );
}

export default Investments;

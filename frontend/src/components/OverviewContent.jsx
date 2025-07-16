import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'
import RadialProgress from '../charts/RadialProgress'

function OverviewContent() {
  return (
    <>
      <h2 className="section-title">Financial Overview</h2>
      <div className="chart-card">
        <div className="chart-zone">
          <PieChart width={300} height={250} />
        </div>
        <div className="chart-zone">
          <LineChart
            width={300}
            height={250}
            data={[
                { month: 'Jan', income: 3000, expense: 2000 },
                { month: 'Feb', income: 3200, expense: 2100 },
                { month: 'Mar', income: 3100, expense: 2200 },
                { month: 'Apr', income: 3050, expense: 2500 },
                ]}
            lines={[
                { key: 'income', color: '#f0a500' },
                { key: 'expense', color: '#888888' },
            ]}
            showAxes={true}
          />
        </div>
        <div className="chart-zone">
          <RadialProgress width={250} height={250} progress={0.65} />
        </div>
      </div>

      <div className="balance-section">
        <h2 className="section-title">Current Balance</h2>
        <p>26,232.56</p>
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
    </>
  )
}

export default OverviewContent

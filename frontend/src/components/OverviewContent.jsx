import { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';
import RadialProgress from '../charts/RadialProgress';
import { Typography } from '@mui/material';

function OverviewContent() {
  const [balance, setBalance] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/balance/')
      .then(res => res.json())
      .then(data => setBalance(data.balance));

    fetch('http://localhost:8000/api/summary/')
      .then(res => res.json())
      .then(data => {
        setMonthlyData(data.monthly);
        setCategoryData(data.categories);
      });

    fetch('http://localhost:8000/api/transactions/')
      .then(res => res.json())
      .then(data => setRecentTransactions(data.slice(0, 5)));
  }, []);

  return (
    <>
      <h2 className="section-title">Financial Overview</h2>

      <div className="chart-card">
        <div className="chart-zone">
          <PieChart
            width={300}
            height={250}
            data={categoryData.map((c, i) => ({
              label: c.category,
              value: c.amount,
            }))}
          />
        </div>

        <div className="chart-zone">
          <LineChart
            width={300}
            height={250}
            data={monthlyData.map(m => ({
              month: m.month,
              income: m.income,
              expense: m.expense,
            }))}
            lines={[
              { key: 'income', color: '#f0a500' },
              { key: 'expense', color: '#888888' },
            ]}
            showAxes={true}
          />
        </div>

        <div className="chart-zone">
          <RadialProgress
            width={250}
            height={250}
            progress={0.65} // Static for now; can hook to budget later
          />
        </div>
      </div>

      <div className="balance-section">
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontFamily: 'Urbanist, sans-serif',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#474747',
            mt: 4,
            mb: 1,
          }}
        >
          Current Balance
        </Typography>

        <Typography
          align="center"
          sx={{
            fontFamily: 'Urbanist, sans-serif',
            fontWeight: 600,
            fontSize: '2rem',
            color: '#2e2e2e',
            mb: 2,
          }}
        >
          {balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
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
            {recentTransactions.map((tx, index) => (
              <tr key={index}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.type}</td>
                <td>{tx.description}</td>
                <td>{parseFloat(tx.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OverviewContent;

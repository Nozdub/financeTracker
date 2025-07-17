import { useState } from 'react';
import { Button } from '@mui/material';
import AddTransactionModal from './AddTransactionModal';

function TransactionsContent() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // Placeholder transaction list
  const transactions = [
    {
      date: '2025-07-17',
      type: 'Income',
      description: 'Freelance gig',
      recurring: false,
      amount: 4200,
      balanceAfter: 14200,
    },
    {
      date: '2025-07-15',
      type: 'Expense',
      description: 'Groceries',
      recurring: false,
      amount: -1290,
      balanceAfter: 10000,
    }
  ];

  return (
    <div>
      {/* Header section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}
      >
        <h2 className="section-title" style={{ marginBottom: 0 }}>Transactions Overview</h2>
        <Button onClick={handleOpen} className="custom-btn add-btn" size="small">
          + Add
        </Button>
      </div>

      <hr className="section-divider" />

      {/* Modal */}
      <AddTransactionModal open={openModal} onClose={handleClose} />

      {/* Transaction Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="transaction-table">
          <thead>
            <tr>
              <th style={{ color: 'white' }}>Date</th>
              <th style={{ color: 'white' }}>Type</th>
              <th style={{ color: 'white' }}>Description</th>
              <th style={{ color: 'white' }}>Recurring</th>
              <th style={{ color: 'white' }}>Amount</th>
              <th style={{ color: 'white' }}>Balance After</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                <td>{tx.date}</td>
                <td>{tx.type}</td>
                <td>{tx.description}</td>
                <td>{tx.recurring ? 'Yes' : 'No'}</td>
                <td style={{ color: tx.amount < 0 ? 'crimson' : 'darkgreen' }}>
                  {tx.amount < 0 ? `-${Math.abs(tx.amount)}` : `+${tx.amount}`}
                </td>
                <td>{tx.balanceAfter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsContent;

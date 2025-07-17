import { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import AddTransactionModal from './AddTransactionModal';

function TransactionsContent() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
    },
  ];

  return (
  <div>
    {/* Title row and Add button in separate containers */}
    <div style={{ position: 'relative' }}>
      {/* Centered title */}
      <h2 className="section-title" style={{ marginBottom: '4rem' }}>
        Transactions Overview
      </h2>

      {/* Add button - absolutely positioned in top right */}
      <Tooltip title="Add more transactions" arrow>
        <Button
          onClick={handleOpen}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            borderRadius: '50%',
            minWidth: '42px',
            height: '42px',
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: 1,
            padding: 0,
            background: '#dbeafe',
            color: '#1976d2',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.15)',
            '&:hover': {
              background: '#bfdbfe',
            },
          }}
        >
          +
        </Button>
      </Tooltip>
    </div>

    {/* Table section */}
    <div style={{ width: '90%', margin: '0 auto', overflowX: 'auto' }}>
      <table className="transaction-table" style={{ width: '100%' }}>
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
      </table>

      <hr className="section-divider" />

      <table className="transaction-table" style={{ width: '100%'}}>
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

    <AddTransactionModal open={openModal} onClose={handleClose} />
  </div>
);
}


export default TransactionsContent;

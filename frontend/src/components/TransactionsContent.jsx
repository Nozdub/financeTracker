import { useEffect, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import AddTransactionModal from './AddTransactionModal';

function TransactionsContent() {
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions/');
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      {/* Title row and Add button */}
      <div style={{ position: 'relative' }}>
        <h2 className="section-title" style={{ marginBottom: '4rem' }}>
          Transactions Overview
        </h2>
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

      {/* Table content */}
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
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.type}</td>
                <td>{tx.description}</td>
                <td>{tx.recurring ? 'Yes' : 'No'}</td>
                <td style={{ color: tx.amount < 0 ? 'crimson' : 'darkgreen' }}>
                  {tx.amount < 0 ? `-${Math.abs(tx.amount)}` : `+${tx.amount}`}
                </td>
                <td>{tx.balanceAfter?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTransactionModal open={openModal} onClose={handleClose} onAdded={fetchTransactions} />
    </div>
  );
}

export default TransactionsContent;

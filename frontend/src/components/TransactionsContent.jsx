import { useEffect, useState } from 'react';
import {
  Button,
  Tooltip,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddTransactionModal from './AddTransactionModal';

function TransactionsContent() {
  const [transactions, setTransactions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions/');
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Header and menu button */}
      <h2 className="section-title" style={{ marginBottom: '4rem' }}>
        Transactions Overview
      </h2>

      <Tooltip title="Options" arrow>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: '#dbeafe',
            color: '#1976d2',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.15)',
            '&:hover': { background: '#bfdbfe' }
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpenAddModal(true);
          }}
        >
          Add Transaction
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpenEditModal(true);
          }}
        >
          Edit Transactions
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpenCategoryModal(true);
          }}
        >
          Manage Categories
        </MenuItem>
      </Menu>

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
                <td>
                  {tx.balanceAfter?.toLocaleString(undefined, {
                    minimumFractionDigits: 2
                  }) || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddTransactionModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdded={fetchTransactions}
      />
    </div>
  );
}

export default TransactionsContent;

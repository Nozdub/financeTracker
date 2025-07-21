import {
  Modal,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function EditTransactionModal({ open, onClose }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (open) {
      fetch('/api/transactions/')
        .then((res) => res.json())
        .then((data) => setTransactions(data));
    }
  }, [open]);

  const handleDelete = async (id, type) => {
    const confirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;

    await fetch(`/api/delete_transaction/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type }),
    });

    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{ backdrop: { invisible: true } }}
    >
      <Box
        sx={{
          width: 700,
          maxHeight: '80vh',
          p: 4,
          borderRadius: '40px',
          mx: 'auto',
          my: '10vh',
          background: 'radial-gradient(circle, rgba(150,180,232,0.4) 0%, rgba(120,176,200,0.40) 100%)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(4px)',
          boxShadow: `
            inset 0px 4px 30px 9px rgba(255,255,255,0.25),
            6px 6px 18px rgba(0, 0, 0, 0.25)
          `,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Urbanist, sans-serif',
            fontWeight: 700,
            fontSize: '1.4rem',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Edit Transactions
        </Typography>

        <Box
          sx={{
            overflowY: 'auto',
            maxHeight: '60vh',
            pr: 1,
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome, Safari
            },
          }}
        >
          {transactions.map((tx) => (
            <Box
              key={tx.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                px: 2,
                py: 1,
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <Typography>
                {new Date(tx.date).toLocaleDateString()} - {tx.description} ({tx.type}) - {tx.amount}
              </Typography>

              <Box>
                <Tooltip title="Edit">
                  <IconButton size="small" sx={{ mr: 1 }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(tx.id, tx.type)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}

export default EditTransactionModal;

import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button } from '@mui/material';

function AddTransactionModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    date: '',
    type: '',
    description: '',
    amount: '',
    recurring: false,
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} hideBackdrop>
      {/* Click-outside-to-close layer */}
      <Box
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Glassmorphic Modal */}
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: 600,
            p: 4,
            borderRadius: '40px',
            background: 'radial-gradient(circle, rgba(150, 180, 232, 0.4) 0%, rgba(120, 176, 200, 0.40) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(4px)',
            boxShadow: `
              inset 0px 4px 30px 9px rgba(255, 255, 255, 0.25),
              6px 6px 18px rgba(0, 0, 0, 0.25)
            `,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            id="add-transaction-title"
            sx={{
              color: '#474747',
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 700,
              textAlign: 'center',
              fontSize: '1.4rem',
              mb: 4,
            }}
          >
            Add New Transaction
          </Typography>

          <TextField
            label="Date"
            type="date"
            fullWidth
            value={formData.date}
            onChange={handleChange('date')}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Type"
            select
            fullWidth
            value={formData.type}
            onChange={handleChange('type')}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </TextField>

          <TextField
            label="Description"
            fullWidth
            value={formData.description}
            onChange={handleChange('description')}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={formData.amount}
            onChange={handleChange('amount')}
            sx={{ mb: 4 }}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Add Transaction
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddTransactionModal;

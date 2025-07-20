import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React, { useState } from 'react';

function AddTransactionModal({ open, onClose, onAdded }) {
  const [formData, setFormData] = useState({
    date: '',
    type: 'Expense',
    description: '',
    amount: '',
    recurring: false,
  });

  const handleChange = (field) => (e) => {
    const value = field === 'recurring' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/transactions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add transaction');

      // Reset and close
      setFormData({
        date: '',
        type: 'Expense',
        description: '',
        amount: '',
        recurring: false,
      });

      onClose();
      if (onAdded) onAdded(); // notify parent to refresh
    } catch (err) {
      console.error('Error submitting transaction:', err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{ backdrop: { invisible: true } }}
      aria-labelledby="add-transaction-title"
      aria-describedby="add-transaction-description"
    >
      <Box
        sx={{
          width: 600,
          p: 4,
          borderRadius: '40px',
          mx: 'auto',
          my: '20vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'radial-gradient(circle, rgba(150, 180, 232, 0.4) 0%, rgba(120, 176, 200, 0.40) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(4px)',
          boxShadow: `
            inset 0px 4px 30px 9px rgba(255, 255, 255, 0.25),
            6px 6px 18px rgba(0, 0, 0, 0.25)
          `,
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
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.recurring}
              onChange={handleChange('recurring')}
              sx={{ color: '#474747' }}
            />
          }
          label="Recurring transaction"
          sx={{ mb: 4 }}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Add Transaction
        </Button>
      </Box>
    </Modal>
  );
}

export default AddTransactionModal;

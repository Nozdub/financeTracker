import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

function AddTransactionModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-transaction-title"
      aria-describedby="add-transaction-description"
    >
      <Box
        sx={{
          width: 400,
          bgcolor: 'rgba(255, 255, 255, 0.25)',
          border: '1px solid #7C7C7C',
          borderRadius: 4,
          boxShadow: 24,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          p: 3,
          mx: 'auto',
          my: '20vh',
        }}
      >
        <Typography id="add-transaction-title" variant="h6" component="h2" gutterBottom>
          Add New Transaction
        </Typography>
        <Typography id="add-transaction-description" variant="body2">
          Modal is working. Form fields will go here later.
        </Typography>
      </Box>
    </Modal>
  );
}

export default AddTransactionModal;

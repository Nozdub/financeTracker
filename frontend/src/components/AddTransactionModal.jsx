import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

function AddTransactionModal({ open, onClose }) {
  return (
    <Modal
  open={open}
  onClose={onClose}
  hideBackdrop
  aria-labelledby="add-transaction-title"
  aria-describedby="add-transaction-description"
>
      <Box
  sx={{
    width: 600,
    height: 600,
    p: 2,
    mb: 2,
    borderRadius: '40px',
    mx: 'auto',
    my: '20vh',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    background: 'radial-gradient(circle, rgba(150, 209, 232, 0.4) 0%, rgba(120, 176, 186, 0.40) 100%)',

    backdropFilter: 'blur(3px)',

    boxShadow: `
      inset 0px 4px 30px 9px rgba(255, 255, 255, 0.25),
      6px 6px 18px rgba(0, 0, 0, 0.25)
    `,
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

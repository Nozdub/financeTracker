import React from 'react';
import { Box, Typography } from '@mui/material';

function BudgetPlannerContent() {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#474747' }}>
          January
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2">Budgeted: $10,097.39</Typography>
          <Typography variant="body2">Left to Budget: $2,026.00</Typography>
          <Typography variant="body2">Income Spent: $2,143.67</Typography>
          <Box
            sx={{
              height: 10,
              width: 100,
              backgroundColor: '#ccc',
              borderRadius: 5,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '44%',
                height: '100%',
                backgroundColor: 'hsl(35, 100%, 70%)',
                position: 'absolute',
                left: 0,
                top: 0,
              }}
            />
          </Box>
          <Typography variant="body2">Saved: $166.67</Typography>
          <Typography variant="body2">Left Over: $3,086.33</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default BudgetPlannerContent;

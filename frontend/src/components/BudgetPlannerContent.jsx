import React from 'react';
import { Box, Typography, Divider, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function BudgetPlannerContent() {
  return (
    <div>
      {/* Header: Month + Budget Summary */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 4,
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        {/* Month label (left) */}
        <Box sx={{ minWidth: '120px', pr: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#474747' }}>
            JANUARY
          </Typography>
        </Box>

        {/* Budget summary (right) */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {[
            ['Budgeted', '$10,097.39'],
            ['Left to Budget', '$2,026.00'],
            ['Income Spent', '$2,143.67'],
            ['Saved', '$166.67'],
            ['Left Over', '$3,086.33'],
          ].map(([label, value], index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {label}
              </Typography>
              <Typography variant="body2">{value}</Typography>
            </Box>
          ))}

          {/* Progress bar */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Progress
            </Typography>
            <Box
              sx={{
                width: 100,
                height: 10,
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
          </Box>

          {/* Tooltip Icon */}
          <Tooltip title="This section summarizes your budget: what's allocated, spent, saved, and remaining.">
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />
    </div>
  );
}

export default BudgetPlannerContent;

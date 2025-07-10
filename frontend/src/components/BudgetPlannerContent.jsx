import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Tooltip,
  IconButton,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function BudgetPlannerContent() {
  return (
    <>
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
        <Box sx={{ minWidth: '120px', pr: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#474747' }}>
            JANUARY
          </Typography>
        </Box>

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

          <Tooltip title="This section summarizes your budget: what's allocated, spent, saved, and remaining.">
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Period Overview */}
      <Box
        sx={{
          width: '20%',
          minWidth: 250,
          p: 2,
          mb: 2,
          borderRadius: 4,
          background: 'radial-gradient(circle, #E8E1D4 0%, rgba(240, 240, 240, 0.18) 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0, color: '#474747' }}>
            Period Overview
          </Typography>
        </Box>

        <TextField select label="Choose a Year" defaultValue="2024" size="small">
          <MenuItem value="2024">2024</MenuItem>
          <MenuItem value="2025">2025</MenuItem>
          <MenuItem value="2026">2026</MenuItem>
        </TextField>

        <TextField select label="Choose a Month" defaultValue="January" size="small">
          {[
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
          ].map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Start on Day"
          type="number"
          defaultValue={1}
          size="small"
          inputProps={{ min: 1, max: 31 }}
        />
      </Box>

      {/* Cash Flow Summary */}
      <Box
        sx={{
          width: '20%',
          minWidth: 250,
          p: 2,
          borderRadius: 4,
          background: 'radial-gradient(circle, #E8E1D4 0%, rgba(240, 240, 240, 0.18) 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          mt: 1,
        }}
      >
        <Box sx={{ width: '100%', textAlign: 'center', mb: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#474747' }}>
            Cash Flow Summary
          </Typography>
        </Box>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', fontWeight: 'bold' }}>Name</th>
              <th style={{ textAlign: 'center', fontWeight: 'bold' }}>Budget</th>
              <th style={{ textAlign: 'center', fontWeight: 'bold' }}>Actual</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Rollover', true],
              ['Income'],
              ['Bills'],
              ['Expenses'],
              ['Savings'],
              ['Debt'],
              ['Left'],
            ].map(([label, isRollover], i) => (
              <tr key={i}>
                <td style={{ padding: '6px 4px', verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    {label}
                    {isRollover && (
                      <Checkbox size="small" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                </td>
                <td style={{ textAlign: 'right', padding: '1px 1px' }}>
                  <TextField variant="outlined" size="small" fullWidth />
                </td>
                <td style={{ textAlign: 'right', padding: '1px 0px' }}>
                  <TextField variant="outlined" size="small" fullWidth />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </>
  );
}

export default BudgetPlannerContent;
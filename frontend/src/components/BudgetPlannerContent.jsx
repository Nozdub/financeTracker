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
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RadialProgress from '../charts/RadialProgress';

function BudgetPlannerContent() {
  const renderEntryTable = (headers = ['Description', 'Budget', 'Actual'], rows = 10) => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} style={{ textAlign: 'left', fontSize: '0.75rem', paddingBottom: 4 }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {headers.map((_, colIdx) => (
              <td key={colIdx} style={{ padding: '4px 2px' }}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputProps={{ style: { fontSize: '0.75rem' } }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {/* Header: Month + Budget Summary */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4, mb: 2, flexWrap: 'wrap' }}>
        <Box sx={{ minWidth: '120px', pr: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#474747' }}>
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

      {/* Top Row */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        {/* Period Overview */}
        <Box
          sx={{
            flex: '1 1 20%',
            minWidth: 250,
            p: 2,
            borderRadius: 4,
            background: 'radial-gradient(circle, #E8E1D4 0%, rgba(240,240,240,0.18) 100%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
            Period Overview
          </Typography>

          <TextField select label="Year" defaultValue="2024" size="small" fullWidth sx={{ mb: 3 }}>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
          </TextField>

          <TextField select label="Month" defaultValue="January" size="small" fullWidth sx={{ mb: 3 }}>
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December',
            ].map((month) => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </TextField>

          <TextField
            label="Start on Day"
            type="number"
            defaultValue={1}
            size="small"
            inputProps={{ min: 1, max: 31 }}
            fullWidth
          />
        </Box>

        {/* Left to Spend Chart */}
        <Box
          sx={{
            flex: '1 1 20%',
            minWidth: 250,
            p: 2,
            borderRadius: 4,
            background: 'radial-gradient(circle, #F4F1EB 0%, rgba(240,240,240,0.3) 100%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Left to Spend
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <RadialProgress width={200} height={200} radius={100} fontSize={14} />

        </Box>
        </Box>

        {/* Chart placeholders to be added here */}
        {[1, 2].map(index => (
          <Box
            key={index}
            sx={{
              flex: '1 1 20%',
              minWidth: 250,
              p: 2,
              borderRadius: 4,
              background: 'radial-gradient(circle, #F4F1EB 0%, rgba(240,240,240,0.3) 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              textAlign: 'center',
            }}
          />
        ))}
      </Box>

      {/* Middle Row */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        {/* Cash Flow Summary */}
        <Box
          sx={{
            flex: '1 1 20%',
            minWidth: 250,
            p: 2,
            borderRadius: 4,
            background: 'radial-gradient(circle, #F4F1EB 0%, rgba(240,240,240,0.3) 100%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Cash Flow Summary
          </Typography>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', fontSize: '0.75rem' }}>Name</th>
                <th style={{ textAlign: 'center', fontSize: '0.75rem' }}>Budget</th>
                <th style={{ textAlign: 'center', fontSize: '0.75rem' }}>Actual</th>
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
                  <td style={{ padding: '4px 0', verticalAlign: 'middle' }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      {label}
                      {isRollover && <Checkbox size="small" sx={{ ml: 1, p: 0.5 }} />}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'right', padding: '2px' }}>
                    <TextField size="small" variant="outlined" fullWidth inputProps={{ style: { fontSize: '0.75rem' } }} />
                  </td>
                  <td style={{ textAlign: 'right', padding: '2px' }}>
                    <TextField size="small" variant="outlined" fullWidth inputProps={{ style: { fontSize: '0.75rem' } }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {/* Income, Savings, Debt (Empty Table Cards) */}
        {['Income', 'Savings', 'Debt'].map((label, i) => (
          <Box
            className="scrollable-no-scrollbar"
            sx={{
              flex: '1 1 20%',
              minWidth: 250,
              p: 2,
              borderRadius: 4,
              maxHeight: 350,
              overflowY: 'auto',
              background: 'radial-gradient(circle, #F4F1EB 0%, rgba(240,240,240,0.3) 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {label}
            </Typography>
            {renderEntryTable()}
          </Box>
        ))}
      </Box>

      {/* Bottom Row */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        {['Bills', 'Expenses'].map((label, i) => (
          <Box
            className="scrollable-no-scrollbar"
            sx={{
              flex: '1 1 20%',
              minWidth: 250,
              p: 2,
              borderRadius: 4,
              maxHeight: 350,
              overflowY: 'auto',
              background: 'radial-gradient(circle, #F4F1EB 0%, rgba(240,240,240,0.3) 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {label}
            </Typography>
            {renderEntryTable()}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default BudgetPlannerContent;

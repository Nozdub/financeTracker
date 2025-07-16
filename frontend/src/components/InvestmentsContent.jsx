import React, { useState } from 'react';
import {
  IconButton,
  InputBase,
  Paper,
  TextField,
  Button,
  Divider,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LineChart from '../charts/LineChart';


function InvestmentsContent() {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockName, setStockName] = useState('');
  const [pricePerShare, setPricePerShare] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleAddInvestment = (e) => {
    e.preventDefault();
    // Later: hook this to API/local state
    console.log('Adding:', { stockName, pricePerShare, quantity });
  };

  return (
    <div>
      <h2 className="section-title">Stock Investments</h2>

      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: expanded ? 300 : 40,
          transition: 'width 0.3s ease-in-out',
          overflow: 'hidden',
          borderRadius: '50px',
          boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          mb: 2,
        }}
      >
        <IconButton sx={{ p: '10px' }} onClick={handleExpand}>
          <SearchIcon />
        </IconButton>
        {expanded && (
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </Paper>

      {/* Investment Input Form */}
      <Box
        component="form"
        onSubmit={handleAddInvestment}
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}
      >
        <TextField
          label="Stock Name"
          variant="outlined"
          size="small"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />
        <TextField
          label="Price per Share"
          variant="outlined"
          size="small"
          type="number"
          value={pricePerShare}
          onChange={(e) => setPricePerShare(e.target.value)}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          size="small"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button className="custom-btn add-btn" onClick={handleAddInvestment}>ADD</Button>

      </Box>

      {/* Divider before Investment List */}
      <Divider sx={{ mb: 2 }} />

     {/* Investment List */}
<div style={{ maxHeight: '300px', overflowY: 'auto' }}>
  <Paper
    elevation={3}
    sx={{
  p: 2,
  mb: 2,
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',

  //Background gradient
  background: 'radial-gradient(circle, rgba(165, 209, 232, 0.38) 0%, rgba(137, 176, 186, 0.29) 100%)',

  //Border (stroke)
  border: '0.1mm solid #7C7C7C',

  //Backdrop blur
  backdropFilter: 'blur(12px)', // you can't animate range like 8.5–14.7 directly
  WebkitBackdropFilter: 'blur(12px)',

  //Inner shadow
  boxShadow: `
    inset 0px 4px 30px 9px rgba(255, 255, 255, 0.25),
    6px 6px 18px rgba(0, 0, 0, 0.25) /* drop shadow */
  `
}}
  >
    <div>
      <strong>Apple Inc. (AAPL)</strong>
      <div>Current Value: $7,620</div>
      <div>+12.4% since purchase</div>
    </div>

    <div>
      {/* Placeholder graph */}
      <LineChart
  width={200}
  height={90}
  data={[
    { month: 'Jan', value: 200 },
    { month: 'Feb', value: 424 },
    { month: 'Mar', value: 399 },
    { month: 'Apr', value: 490 },
  ]}
  lines={[
    { key: 'value', color: 'orange' },
  ]}
  showAxes={true}
  numTicksLeft={3}
/>

    </div>

    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button className="custom-btn more-btn">ADD MORE</Button>
        <Button className="custom-btn sell-btn">SELL</Button>
        <Button className="custom-btn remove-btn">REMOVE</Button>
    </div>
  </Paper>
</div>
</div>


  );
}

export default InvestmentsContent;
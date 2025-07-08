import React, { useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function InvestmentsContent() {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleExpand = () => {
    setExpanded(true);
  };

  return (
    <div>
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
    </div>
  );
}

export default InvestmentsContent;

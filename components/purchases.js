import React from 'react';
import { Box, Typography } from '@mui/material';

import CardGrid from './utility/CardGrid';

const PurchasesContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
      }}
    >
      <Box sx={{ maxWidth: 'lg', padding: '16px' }}>
        <Typography variant="h4" align="center">
          Purchases
        </Typography>
        <CardGrid />
      </Box>
    </Box>
  );
};

export default PurchasesContent;
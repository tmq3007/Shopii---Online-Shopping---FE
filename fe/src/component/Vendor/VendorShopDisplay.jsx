import React from 'react';
import { Avatar, Box, Typography, Grid, Divider } from '@mui/material';
import { LocationOn, Phone } from '@mui/icons-material';

const ShopDisplay = ({ shop }) => {
  const user = shop;

  return (
    <Box
      sx={{
        width: '100%',      // Ensure it takes the full width of its parent
        height: '100%',     // Ensure it takes the full height of its parent
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'white',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Avatar and Shop Information */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            marginRight: 2,
            backgroundColor: '#d2691e',
          }}
          src={user.logo} // Shop's avatar
        />
        <Box>
          <Typography variant="h6">{user.shopName}</Typography>
          <Typography variant="body2" color="text.secondary">
            <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {user.country+", "+user.city+", "+user.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Phone fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              {user.phone}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, width: '100%' }} />

      {/* Statistics Grid */}
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {0}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Commission
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {0}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Sale
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {0}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Balance
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {0}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Withdraw
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopDisplay;

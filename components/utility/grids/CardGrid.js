import { Box, Grid, Typography } from "@mui/material";

const CardGrid = ({ table }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box bgcolor="primary.light" p={2}>
          <Typography variant="body1" noWrap>
            Received Orders
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box bgcolor="secondary.light" p={2}>
          <Typography variant="body1" noWrap>
            Pending Orders
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box bgcolor="primary.light" p={2}>
          <Typography variant="body1" noWrap>
            This is the Third Grid
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {table}
      </Grid>
    </Grid>
  );
};

export default CardGrid;

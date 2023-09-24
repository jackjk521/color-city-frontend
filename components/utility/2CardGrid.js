import { Box, Grid, Typography, Paper } from "@mui/material";

const CardGrid_2 = ({ table }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {/* Export this  */}
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 150,
          }}>
          {/* Content */}
          <Typography variant="body1" noWrap>
            Received Orders
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 150,
          }}>
          {/* Content */}
          <Typography variant="body1" noWrap>
            Pending Orders
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Box>
          {/* <Typography variant="body1" noWrap>
            Orders Table
          </Typography> */}
          {table}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CardGrid_2;

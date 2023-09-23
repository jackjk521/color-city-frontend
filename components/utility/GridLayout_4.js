import { Box, Grid, Paper, Typography } from "@mui/material";

const CardGrid = () => {
  return (
    <Grid container spacing={2}>
      {/* Left Column */}
      <Grid item xs={12} md={8} lg={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} lg={7}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}>
              {/* Content */}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} lg={5}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}>
              {/* Content */}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}></Paper>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}>
          {/* Content */}
        </Paper>
      </Grid>
    
    </Grid>
  );
};

export default CardGrid;

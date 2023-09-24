import { Box, Grid, Typography } from '@mui/material';

export default function CardGrid() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box bgcolor="primary.light" p={2}>
          <Typography variant="body1" noWrap>
            This is the First Grid
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box bgcolor="secondary.light" p={2}>
          <Typography variant="body1" noWrap>
            This is the Second Grid
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
      <Grid item xs={8}>
        <Box bgcolor="secondary.light" p={2}>
          <Typography variant="body1" noWrap>
            This is the Fourth Grid
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
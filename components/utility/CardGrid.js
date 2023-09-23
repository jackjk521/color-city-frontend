import { Box, Grid, Typography } from "@mui/material";
import ResponsiveTable from "./ResponsiveTable";
// const containerStyles = {
//   paddingLeft: 0,
//   paddingRight: 0,
// };
const columns = [
  { id: 1, header: "Name", field: "name" },
  { id: 2, header: "Age", field: "age" },
  { id: 3, header: "Email", field: "email" },
];

const data = [
  { id: 1, name: "John Doe", age: 25, email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", age: 32, email: "janesmith@example.com" },
  { id: 3, name: "Alice Johnson", age: 28, email: "alicejohnson@example.com" },
];

const CardGrid = () => {
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
        <Box bgcolor="secondary.light" p={2}>
          <Typography variant="body1" noWrap>
            Orders Table
          </Typography>
          <ResponsiveTable columns={columns} data={data} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CardGrid;

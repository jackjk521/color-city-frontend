import { Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import { ViewBtn, EditBtn, RemoveBtn } from "./actionButtonList";

const ActionFormatter = ({ rowData, onClick }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 820px)");

  return (
    <>
      {isMobile || isTablet ? (
        <Box>
          <ViewBtn handleView={onClick} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <ViewBtn handleView={onClick} />
          </Grid>
          <Grid item>
            <EditBtn handleEdit={onClick} />
          </Grid>
          <Grid item>
            <RemoveBtn handleRemove={onClick} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ActionFormatter;

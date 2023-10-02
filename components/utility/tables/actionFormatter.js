import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import { ViewBtn, EditBtn, RemoveBtn } from "./actionButtonList";

const ActionFormatter = ({ rowData, onClick }) => {
  const isMobile = useMediaQuery("(max-width: 600px)"); 

  return (
    <>
      {isMobile ? (
        <Box>
          <ViewBtn handleView={onClick} />
        </Box>
      ) : (
        <Box>
          <ViewBtn handleView={onClick} />
          <EditBtn handleEdit={onClick} />
          <RemoveBtn handleRemove={onClick} />
        </Box>
      )}
    </>
  );
};

export default ActionFormatter;
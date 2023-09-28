// import {
//     Alert,
//     AlertIcon,
//     AlertTitle,
//     AlertDescription,
//   } from "@chakra-ui/react";

//   export const SuccessAlert = ({ msg }) => {
//     return (
//       <>
//         <Alert
//           status="success"
//           variant="subtle"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//           textAlign="center"
//           height="100%"
//         >
//           <AlertIcon boxSize={100} mr={0} /> {/* Update the boxSize value */}
//           <AlertTitle mt={4} mb={1} fontSize="lg">
//             Success
//           </AlertTitle>
//           <AlertDescription maxWidth="sm">
//             {msg}
//           </AlertDescription>
//         </Alert>
//       </>
//     );
//   };

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export const SuccessAlert = ({ alertStatus }) => {
  const { vertical, horizontal, msg, status } = alertStatus;
  // const snackbarStyles = {
  //   position: "absolute",
  //   top: vertical === "top" ? "20px" : "auto",
  //   bottom: vertical === "bottom" ? "20px" : "auto",
  //   left: horizontal === "left" ? "20px" : "auto",
  //   right: horizontal === "right" ? "20px" : "auto",
  // };
  return (
    <>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={status === "Success"}
          message={msg}
          key={vertical + horizontal}
        />
    </>
  );
};

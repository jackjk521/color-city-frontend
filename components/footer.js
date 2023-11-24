
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";


export default function Footer({props}) {
  return (
    <Box p={2} sx={{ flexGrow: 1, backgroundColor: "#FFFFF" }}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}>
        {"©Copyright. All Rights Reserved. "}
        <Link color="inherit" href="https://portfolio-mui-next.vercel.app/">
          My Portfolio
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MetamaskConnection } from "./MetamaskConnection";

export default function ApplicationBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RatherLabs
          </Typography>
          <MetamaskConnection />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

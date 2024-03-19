import { Container, Typography } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar";

function App() {
  return (
    <>
      <ApplicationBar />
      <Container>
        <Typography>MainContent</Typography>
      </Container>
    </>
  );
}

export default App;

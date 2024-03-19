import { Container, Typography } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar";
import { MetaMaskContextProvider } from "./contexts/metamask";

function App() {
  return (
    <>
      <MetaMaskContextProvider>
        <ApplicationBar />
        <Container>
          <Typography>MainContent</Typography>
        </Container>
      </MetaMaskContextProvider>
    </>
  );
}

export default App;

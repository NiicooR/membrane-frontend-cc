import { Container } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar";
import { MetaMaskContextProvider } from "./contexts/metamask";
import { WalletInfo } from "./components/WalletInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MetaMaskContextProvider>
          <ApplicationBar />
          <Container>
            <WalletInfo />
          </Container>
        </MetaMaskContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

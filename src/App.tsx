import { Container } from "@mui/material";
import ApplicationBar from "./components/ApplicationBar";
import { MetaMaskContextProvider } from "./contexts/metamask";
import { WalletInfo } from "./components/WalletInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Trivia } from "./components/trivia/Trivia";
import { TriviaContent } from "./components/trivia/TriviaContent";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MetaMaskContextProvider>
          <ApplicationBar />
          <Container sx={{ paddingTop: 1 }}>
            <TriviaContent>
              <WalletInfo />
              <Trivia />
            </TriviaContent>
          </Container>
        </MetaMaskContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

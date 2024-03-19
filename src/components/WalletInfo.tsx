import Paper from "@mui/material/Paper";
import { useMetaMask } from "../hooks/useMetamask";
import { Box, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../services/quiz.service";

export const WalletInfo = () => {
  const { wallet, hasProvider } = useMetaMask();
  const { data, isSuccess } = useQuery({
    enabled: Boolean(hasProvider && wallet.accounts[0]),
    queryKey: ["balance", wallet.accounts[0]],
    queryFn: async () => {
      const balance = await getBalance(wallet.accounts[0]);
      return balance;
    },
  });

  const isAccountConnected = hasProvider && wallet.accounts.length > 0;

  return (
    <Box paddingTop={1}>
      {isAccountConnected ? (
        <Paper elevation={3}>
          <Box padding={1}>
            <Typography>{`Complete address: ${wallet.accounts[0]}`}</Typography>
            <Typography>{`Chain id: ${wallet.chainId}`}</Typography>
            <Typography>{`$QUIZ balance: ${
              isSuccess ? data : "Loading..."
            }`}</Typography>
          </Box>
        </Paper>
      ) : (
        <Skeleton
          sx={{ bgcolor: "grey.500", borderRadius: "4px" }}
          variant="rectangular"
          height={88}
        />
      )}
    </Box>
  );
};

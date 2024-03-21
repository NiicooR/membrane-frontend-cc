import Typography from "@mui/material/Typography";
import { useMetaMask } from "../../hooks/useMetamask";
import { ReactElement } from "react";

export const TriviaContent = ({ children }: { children: ReactElement[] }) => {
  const { isAccountConnected, isConnectedToGoerli, isConnecting } =
    useMetaMask();
  if (isConnecting) return <Typography>Connecting Wallet...</Typography>;

  if (!isAccountConnected || (isAccountConnected && !isConnectedToGoerli))
    return (
      <Typography>Please connect your wallet in Goerli network</Typography>
    );

  return children;
};

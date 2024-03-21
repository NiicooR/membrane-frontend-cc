import Typography from "@mui/material/Typography";
import { useMetaMask } from "../../hooks/useMetamask";
import { ReactElement } from "react";

export const TriviaContent = ({ children }: { children: ReactElement[] }) => {
  const { isAccountConnected, isConnectedToGoerli, isConnecting } =
    useMetaMask();
  if (isConnecting) return <Typography>Connecting Wallet...</Typography>;

  if (!isAccountConnected || (isAccountConnected && !isConnectedToGoerli))
    return <Typography>First you must connect with your wallet</Typography>;

  return children;
};

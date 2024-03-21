import Link from "@mui/material/Link";
import { useMetaMask } from "../hooks/useMetamask";
import Button from "@mui/material/Button";
import { CHAIN_ID, formatAddress } from "../utils/web3";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const MetamaskConnection = () => {
  const data = useMetaMask();
  const {
    wallet,
    hasProvider,
    isConnecting,
    connectMetaMask,
    switchToChain,
    isConnectedToGoerli,
  } = data;
  const mustConnect = window.ethereum?.isMetaMask && wallet.accounts.length < 1;
  const isAccountConnected = hasProvider && wallet.accounts.length > 0;
  return (
    <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
      {!hasProvider && (
        <Link
          color="inherit"
          href="https://metamask.io"
          target="_blank"
          rel="noopener"
          data-tooltip="Go to Metamask page"
        >
          <Typography> Install MetaMask</Typography>
        </Link>
      )}

      {mustConnect && (
        <Button
          disabled={isConnecting}
          onClick={connectMetaMask}
          color="inherit"
        >
          Connect
        </Button>
      )}

      {isAccountConnected && !isConnectedToGoerli && (
        <Button onClick={() => switchToChain(CHAIN_ID.GOERLI)} color="inherit">
          Change to Goerli
        </Button>
      )}

      {isAccountConnected && (
        <Link
          color="inherit"
          href={`https://etherscan.io/address/${wallet.accounts[0]}`}
          target="_blank"
          rel="noopener"
          data-tooltip="Open in Block Explorer"
        >
          <Typography>{formatAddress(wallet.accounts[0])}</Typography>
        </Link>
      )}
    </Box>
  );
};

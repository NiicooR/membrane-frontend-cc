/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance, isGoerli } from "../utils/web3";

interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;
}

interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  connectMetaMask: () => void;
  clearError: () => void;
  switchToChain: (chainId: string) => void;
  isAccountConnected: boolean;
  isConnectedToGoerli: boolean;
}

const disconnectedState: WalletState = {
  accounts: [],
  balance: "",
  chainId: "",
};

export const MetaMaskContext = createContext<MetaMaskContextData>(
  {} as MetaMaskContextData
);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean>(false);

  const [isConnecting, setIsConnecting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");

  const [wallet, setWallet] = useState(disconnectedState);
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      setWallet(disconnectedState);
      return;
    }

    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    setWallet({ accounts, balance, chainId });
  }, []);

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  );
  const updateWallet = useCallback(
    (accounts: any) => _updateWallet(accounts),
    [_updateWallet]
  );

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        updateWalletAndAccounts();
        window.ethereum.on("accountsChanged", updateWallet);
        window.ethereum.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    console.log("connecting");
    setIsConnecting(true);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  const switchToChain = async (chainId: string) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId,
        },
      ],
    });
  };

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
        switchToChain,
        isAccountConnected: hasProvider && wallet.accounts.length > 0,
        isConnectedToGoerli: isGoerli(wallet.chainId),
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

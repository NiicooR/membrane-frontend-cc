/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { MetaMaskContext } from "../contexts/metamask";

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      "useMetaMask must be used within a MetaMaskContextProvider"
    );
  }
  return context;
};

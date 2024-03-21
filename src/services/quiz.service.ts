import Web3 from "web3";
import { QUIZ_ABI } from "../utils/abis/quiz.abi";

// TODO: Move it to env var
const QUIZ_ADDRESS = import.meta.env.VITE_QUIZ_CONTRACT_ADDRESS;

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("A provider is needed, connect with your wallet");
  }
  return new Web3(window.ethereum);
};

const getSelectedAddress = async (): Promise<string> => {
  const account = (await getProvider().eth.getAccounts()).find((e) => e);
  if (!account) throw new Error("Connect with Metamask");
  return account;
};

const getQuizContract = async () => {
  const web3 = getProvider();
  return new web3.eth.Contract(QUIZ_ABI, QUIZ_ADDRESS);
};

export const getBalance = async (address: string) => {
  const contract = await getQuizContract();
  const balance = (await contract.methods.balanceOf(address).call()) as bigint;
  const decimals = (await contract.methods.decimals().call()) as number;
  return getProvider().utils.fromWei(balance, DECIMAL_UNIT[decimals]);
};

export const submit = async ({
  surveyId,
  answerIds,
}: {
  surveyId: number;
  answerIds: number[];
}) => {
  const connectedAddress = await getSelectedAddress();
  const contract = await getQuizContract();
  return null;
  const res = await contract.methods
    .submit({ _surveyId: surveyId, _answerIds: answerIds })
    .send({ from: connectedAddress });
  return res;
};

const DECIMAL_UNIT: Record<number, "wei" | "ether"> = {
  1: "wei",
  18: "ether",
};

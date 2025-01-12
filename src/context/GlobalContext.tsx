import {ethereumabi} from "@/lib/etherumabi";
import {createContext, ReactNode, useEffect, useState} from "react";
import {Contract, ethers} from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const GlobalContext = createContext({
  connectWallet: () => {},
  ethereumAccount: "",
  etheruemContract: {} as Contract | undefined,
});

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [chainId, setChainId] = useState("");
  const [ethereumAccount, setEthereumAccount] = useState("");

  const contractAddress = "0x437d598258525Fb52Ca31A2259624e43472AEbdE";

  const {ethereum} = window;

  useEffect(() => {
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts: any) => {
        setEthereumAccount(accounts[0]);
      });
    } else console.log("No metamask!");

    return () => {
      // ethereum.removeListener('accountsChanged');
    };
  }, [ethereum]);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if (!ethereum) {
          console.log("Metamask not found");
          return;
        } else console.log("we have etherium object");

        const accounts = await ethereum.request({method: "eth_accounts"}); //check if there are accounts connected to the site

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          // if (ethereumAccount !== "")
          setEthereumAccount(account);

          // votingSystem();
        } else {
          setEthereumAccount("");
          console.log("No authorized accounts found!");
        }

        const curr_chainId = await ethereum.request({method: "eth_chainId"});
        setChainId(curr_chainId);

        ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    };

    checkIfWalletIsConnected();
  }, [ethereumAccount, ethereumabi, ethereum]);

  const [etheruemContract, setEthereumContract] = useState<ethers.Contract>();

  useEffect(() => {
    (async function () {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        ethereumabi,
        signer
      );

      setEthereumContract(contract);
    })();
  }, [ethereumAccount]);
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"}); // request connection with accounts
      // console.log("Connected", accounts[0]);
      setEthereumAccount(accounts[0]);
      // const chainId = await ethereum.request({ method: 'eth_chainId' });
    } catch (e) {
      console.log(e);
    }
  };

  const switchNetwork = async (chainId: string) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{chainId}], // Check networks.js for hexadecimal network ids
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chainId !== "0x13fb") {
      switchNetwork("0x13fb");
    }
  }, [chainId, ethereumAccount]);

  // useEffect(() => {
  //   if (ethereumAccount === "") {
  //     navigate("/connect");
  //   }
  // }, [ethereumAccount]);

  //   define viem

  return (
    <GlobalContext.Provider
      value={{connectWallet, ethereumAccount, etheruemContract}}
    >
      {children}
    </GlobalContext.Provider>
  );
}

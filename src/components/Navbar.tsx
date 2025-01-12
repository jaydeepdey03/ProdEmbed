import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "./ui/button";
import {
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core";
import {starknetCounterAbi} from "@/lib/starknetabi";
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import useGlobalContext from "@/context/useGlobalContext";

export default function Navbar() {
  const {address} = useAccount();
  const navigate = useNavigate();
  const {connectWallet, ethereumAccount} = useGlobalContext();

  const testAddress =
    "0x060fce01d8a9a6e7c5a16d5fd97a336795b67f89cbbbcfa4ad1b28136ae46ed8";

  const {contract} = useContract({
    abi: starknetCounterAbi as any,
    address: testAddress,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    try {
      console.log("contract", contract);
      // return [contract.populate("set_count", [BigInt(679)])];
      return [
        contract.populate("transfer", [
          "0x01a4B0066a5d7520c710cb07940c0Cb83355Ec1aE47d8D257eEeCD16A51225FA",
          BigInt(679),
        ]),
      ];
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [contract, address]);

  const {send: writeAsync} = useSendTransaction({});

  <Button onClick={() => writeAsync(calls)}>Test</Button>;
  return (
    <div className="w-full h-[70px] border-b flex justify-between items-center px-6">
      <div className="cursor-pointer" onClick={() => navigate(`/`)}>
        <b>ProdEmbed</b>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          {ethereumAccount ? (
            <p>
              {ethereumAccount.slice(0, 6) + "..." + ethereumAccount.slice(-4)}
            </p>
          ) : (
            <Button onClick={() => connectWallet()}>Connect Metamask</Button>
          )}
        </div>

        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn-ui.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

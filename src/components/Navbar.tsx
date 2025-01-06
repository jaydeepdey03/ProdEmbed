import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "./ui/button";
import {
  useAccount,
  useConnect,
  useContract,
  useDisconnect,
  useSendTransaction,
} from "@starknet-react/core";
import {starknetCounterAbi} from "@/lib/starknetabi";
import {useMemo} from "react";

export default function Navbar() {
  const {connect, connectors} = useConnect();
  const {address} = useAccount();
  const {disconnect} = useDisconnect({});

  const testAddress =
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

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
      <div>
        <b>FundWork</b>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <p className="font-semibold">{address ? address : "0x"}</p>
          {!address && connectors.length > 0 ? (
            <Button onClick={() => connect({connector: connectors[0]})}>
              Connect {connectors[0].id}
            </Button>
          ) : (
            <Button
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </Button>
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

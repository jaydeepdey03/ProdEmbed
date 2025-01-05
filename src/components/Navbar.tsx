import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "./ui/button";
import {
  useAccount,
  useConnect,
  useContract,
  useDisconnect,
  useProvider,
  useSendTransaction,
} from "@starknet-react/core";
import {starknetCounterAbi} from "@/lib/starknetabi";
import {useEffect, useMemo} from "react";

export default function Navbar() {
  const {connect, connectors} = useConnect();
  const {address} = useAccount();
  const {disconnect} = useDisconnect({});
  const {provider} = useProvider();

  const testAddress =
    "0x05bbce312570da006e894ca4706bf35ae58421abe3f4440321a5380dee60487a";

  const {contract} = useContract({
    abi: starknetCounterAbi as any,
    address: testAddress,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    try {
      return [contract.populate("set_count", [BigInt(69)])];
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [contract, address]);

  // useEffect(() => {
  //   if (contract) {
  //     (async function () {
  //       const res = await contract.get_count();
  //       console.log(res, "res");
  //     })();
  //   }
  // }, []);

  const {send: writeAsync} = useSendTransaction({
    calls: calls,
  });

  return (
    <div className="w-full h-[70px] border-b flex justify-between items-center px-6">
      <div>
        <b>FundWork</b>
      </div>

      <Button onClick={() => writeAsync()}>Test</Button>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <p className="font-semibold">{address ? address : "0x"}</p>
          {!address && connectors.length > 0 ? (
            connectors.map((connector, index) => (
              <Button key={index} onClick={() => connect({connector})}>
                Connect {connector.id}
              </Button>
            ))
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

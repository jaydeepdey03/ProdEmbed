import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {connect, disconnect, StarknetWindowObject} from "starknetkit";
import {InjectedConnector} from "starknetkit/injected";
import {Button} from "./ui/button";
import {useState} from "react";

export default function Navbar() {
  const [, setConnection] = useState<StarknetWindowObject | null | undefined>(
    null
  );
  const [address, setAddress] = useState<string | undefined>();
  return (
    <div className="w-full h-[70px] border-b flex justify-between items-center px-6">
      <div>
        <b>FundWork</b>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <p className="font-semibold">{address ? address : "0x"}</p>
          {!address ? (
            <Button
              onClick={async () => {
                const {wallet, connector, connectorData} = await connect({
                  modalMode: "canAsk",
                  connectors: [
                    new InjectedConnector({options: {id: "argentX"}}),
                  ],
                });

                if (wallet && connector && connectorData) {
                  const a = await wallet.request({
                    type: "wallet_requestAccounts",
                  });
                  console.log(a, "wallet");
                  setConnection(wallet);
                  setAddress(connectorData.account);
                }
              }}
            >
              Connect
            </Button>
          ) : (
            <Button
              onClick={async () => {
                await disconnect();
                setAddress(undefined);

                setConnection(null);
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

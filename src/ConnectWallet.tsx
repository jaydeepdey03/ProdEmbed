import {Button} from "./components/ui/button";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useGlobalContext from "./context/useGlobalContext";

export default function ConnectWalletPage() {
  // Handle user login
  const {ethereumAccount, connectWallet} = useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (ethereumAccount !== "") {
      navigate("/");
    }
  }, [ethereumAccount]);

  return (
    // <div className="h-screen w-full flex justify-center items-center">
    //   <Button onClick={() => handleLogin()}>Connect</Button>
    // </div>

    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ">
      <div className="hidden bg-muted text-white relative thumbnail justify-center items-center lg:flex">
        <img
          src={
            "https://cdn.prod.website-files.com/66b1e1cb750c24d738b2c64b/66b35f38ea5346a4abeb65d6_Livepeer%20Hub%20(3)%20(1).png"
          }
          alt="Image"
          // width="1920"
          // height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale absolute top-0 left-0 z-0"
        />

        <div className="text-4xl font-semibold z-[100] flex flex-col gap-8 justify-start">
          <p className="text-7xl">Simplify.</p>
          <p className="text-5xl">Scale.</p>
          <div className="flex gap-1 items-center text-5xlxl">
            <p className="font-bold">Earn.</p>
            {/* <img src="/seda.png" alt="livepeer" className="" />  */}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-12 bg-white text-black h-screen">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Connect Wallet</h1>
            <p className="text-balance text-muted-foreground">
              Connect your wallet to start
            </p>
          </div>
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => connectWallet()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

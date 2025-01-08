import {Loader2, Plus, Upload} from "lucide-react";
import {useNavigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import {useEffect, useState} from "react";
// import {Button} from "starkpay-lib";
import {Button} from "@/components/ui/button";
import {v4 as uuidv4} from "uuid";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Dropzone from "react-dropzone";
import {Field, Form, Formik} from "formik";
import {Input} from "@/components/ui/input";
import {Label} from "./components/ui/label";
import useGlobalContext from "./context/useGlobalContext";
import {PinataSDK} from "pinata-web3";
import {toast} from "sonner";

function Home() {
  const navigate = useNavigate();
  const {ethereumAccount, etheruemContract} = useGlobalContext();

  useEffect(() => {
    if (ethereumAccount === "") {
      navigate("/connect");
    }
  }, [ethereumAccount]);

  const [dashboardValues, setDashboardValues] = useState<any[]>([]);

  useEffect(() => {
    if (ethereumAccount === "" && !etheruemContract) return;
    const fetchDashboardValues = async () => {
      if (ethereumAccount === "" && !etheruemContract) return;
      try {
        if (etheruemContract && ethereumAccount !== "") {
          const dashboards = await etheruemContract.getAllDashboards(
            ethereumAccount
          );
          console.log(dashboards);
          setDashboardValues(dashboards);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardValues();
  }, [ethereumAccount, etheruemContract]);

  const [showDialog, setShowDialog] = useState(false);
  const [ipfsUploadLoading, setIpfsUploadLoading] = useState(false);

  const addStore = async (name: string, image: string) => {
    const apiKey = uuidv4();
    try {
      if (etheruemContract && ethereumAccount !== "") {
        toast.loading("Creating store");
        const tx = await etheruemContract.createDashboard(name, image, apiKey);
        await tx.wait();
        window.location.reload();
        toast.success("Created store successfully");
      }
    } catch (error) {
      console.error(error, "Error creating store");
      toast.error("Error creating store");
    } finally {
      toast.dismiss();
    }
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Store Front</DialogTitle>
            <DialogDescription className="pt-5">
              <Formik
                initialValues={{name: "", image: ""}}
                onSubmit={(values) => {
                  // console.log(values);
                  addStore(values.name, values.image);
                }}
              >
                {(formik) => (
                  <Form className="flex flex-col gap-4">
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        // setImage(URL.createObjectURL(acceptedFiles[0]));
                        // formik.setFieldValue("image", acceptedFiles[0]);
                        let cid;

                        const imageFile = acceptedFiles[0];

                        (async function () {
                          try {
                            if (imageFile) {
                              setIpfsUploadLoading(true);

                              const pinata = new PinataSDK({
                                pinataJwt: import.meta.env.VITE_PINATA_JWT!,
                                pinataGateway: "example-gateway.mypinata.cloud",
                              });

                              const upload = await pinata.upload.file(
                                imageFile
                              );

                              console.log(upload, " upload");
                              cid = upload?.IpfsHash;

                              console.log("IPFS CID:", cid);
                              console.log("done");
                              toast.success("Request sent successfully");

                              formik.setFieldValue("image", cid);
                              setIpfsUploadLoading(false);
                            }
                          } catch (error) {
                            console.error(
                              error,
                              "Error uploading image to ipfs"
                            );

                            setIpfsUploadLoading(false);
                            toast.error("Error sending request");
                          } finally {
                            toast.dismiss();
                          }
                        })();
                      }}
                      accept={{
                        "image/*": [".jpeg", ".jpg", ".png", ".gif"],
                      }}
                      multiple={false}
                    >
                      {({getRootProps, getInputProps, isDragActive}) => (
                        <div
                          {...getRootProps()}
                          className={`border-2 border-dashed rounded-lg
                              focus-visible:ring-0 active:ring-0
                              focus:outline-none active:outline-none

                            p-4 text-center cursor-pointer transition-colors ${
                              isDragActive
                                ? "border-primary bg-primary/10"
                                : "border-gray-300 hover:border-primary"
                            }`}
                        >
                          <input {...getInputProps()} />

                          {formik.values.image ? (
                            <div className="relative">
                              {ipfsUploadLoading && (
                                <div className="absolute top-1/2 right-1/2">
                                  <Loader2 className="animate-spin" />
                                </div>
                              )}
                              <img
                                src={
                                  formik.values.image != ""
                                    ? `https://ipfs.io/ipfs/${formik.values.image}`
                                    : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                                }
                                alt="Uploaded product"
                                className="mx-auto h-48 object-contain"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-4 relative h-48">
                              {ipfsUploadLoading ? (
                                <div className="absolute top-1/2 right-1/2">
                                  <Loader2 className="animate-spin" />
                                </div>
                              ) : (
                                <>
                                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                  <p className="text-sm text-gray-500">
                                    {isDragActive
                                      ? "Drop the image here"
                                      : "Drag & drop an image here, or click to select"}
                                  </p>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name" className="pl-1">
                        Store Name
                      </Label>
                      <Field
                        as={Input}
                        type="text"
                        placeholder="Enter store name"
                        name="name"
                        id="name"
                      />
                    </div>

                    {/* <div className="relative w-full"> */}
                    <Button
                      type="submit"
                      className="relative border-2 border-black w-full z-10"
                      variant={"outline"}
                    >
                      Create Store
                    </Button>
                    {/* <div className="absolute top-[2px] left-[2px] h-full w-full bg-[#0C0C4F] rounded-md z-0" /> */}
                    {/* </div> */}
                  </Form>
                )}
              </Formik>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="h-screen w-full">
        <Navbar />

        <div
          className="p-7 flex flex-col md:flex-row md:flex-wrap gap-6"
          style={{
            height: "calc(100vh - 70px)",
          }}
        >
          <div
            className="h-[200px] w-[350px] cursor-pointer rounded-xl border-2 border-black flex flex-col justify-center items-center gap-3 bg-white font-semibold text-lg"
            // onClick={() => navigate("/create-store")}
            onClick={() => setShowDialog(true)}
          >
            <Plus className="border-2 border-black rounded-full p-[3px] h-10 w-10 text-gray-600 z-10 bg-white" />
            <p>New StoreFront</p>
          </div>

          {dashboardValues &&
            dashboardValues[0] &&
            dashboardValues[0].length > 0 &&
            dashboardValues[0].map((_: any, index: number) => (
              <div
                key={index}
                className="h-[200px] w-[350px] cursor-pointer rounded-xl border-2 border-black flex flex-col items-center py-6 gap-3 bg-white font-semibold text-lg"
                onClick={() =>
                  navigate(`/dashboard/${dashboardValues[2][index]}`)
                }
              >
                {/* <Plus className="border-2 border-black rounded-full p-[3px] h-10 w-10 text-gray-600 z-10 bg-white" /> */}
                <div className="h-[80%] w-full flex items-center justify-center gap-3">
                  <img
                    src={dashboardValues[1][index]}
                    // src={"https://ipfs.io/ipfs/" + dashboardValues[1][index]}
                    // src="/test.png"
                    alt="img"
                    className="object-contain h-full w-full"
                  />
                </div>
                <p>{dashboardValues[0][index]}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;

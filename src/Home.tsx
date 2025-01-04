import {ArrowRight, Plus, StarIcon, Upload} from "lucide-react";
import {useNavigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import {useEffect, useRef, useState} from "react";
// import {Button} from "starkpay-lib";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Dropzone from "react-dropzone";
import {Field, Form, Formik} from "formik";
import {Input} from "@/components/ui/input";
import {Label} from "./components/ui/label";

function Home() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [image, setImage] = useState<string | null>(null);
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
                  console.log(values);
                }}
              >
                {(formik) => (
                  <Form className="flex flex-col gap-4">
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        setImage(URL.createObjectURL(acceptedFiles[0]));
                        formik.setFieldValue("image", acceptedFiles[0]);
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
                          {image ? (
                            <img
                              src={
                                typeof image === "string"
                                  ? image
                                  : URL.createObjectURL(image)
                              }
                              alt="Uploaded product"
                              className="mx-auto max-h-48 object-contain"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center py-4">
                              <Upload className="w-12 h-12 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">
                                {isDragActive
                                  ? "Drop the image here"
                                  : "Drag & drop an image here, or click to select"}
                              </p>
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
          <div
            className="h-[200px] w-[350px] cursor-pointer rounded-xl border-2 border-black flex flex-col items-center py-6 gap-3 bg-white font-semibold text-lg"
            onClick={() => navigate(`/dashboard/1`)}
          >
            {/* <Plus className="border-2 border-black rounded-full p-[3px] h-10 w-10 text-gray-600 z-10 bg-white" /> */}
            <div className="h-2/3 w-full flex items-center justify-center gap-3">
              <img
                src="https://github.com/shadcn-ui.png"
                // src="/test.png"
                alt="img"
                className="object-contain h-full w-full"
              />
            </div>
            <p>New StoreFront</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

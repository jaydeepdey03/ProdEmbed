import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {ArrowRight, ExternalLink, Loader2} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Field, Form, Formik} from "formik";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import useGlobalContext from "@/context/useGlobalContext";
import {toast} from "sonner";
import {v4 as uuidv4} from "uuid";
import {PinataSDK} from "pinata-web3";
import {useLocation} from "react-router-dom";
import {ethers} from "ethers";

export default function ProductsListedPage() {
  const [showDialog, setShowDialog] = useState(false);
  const {etheruemContract, ethereumAccount} = useGlobalContext();
  const location = useLocation();
  console.log(location.pathname.split("/")[2], "location");

  const addProduct = async (
    productImage: string,
    productName: string,
    price: string,
    stock: number,
    isEthereum: boolean,
    isStarknet: boolean
  ) => {
    try {
      if (etheruemContract && ethereumAccount !== "") {
        toast.loading("Adding product...");
        const productId = uuidv4();

        const priceInWei = BigInt(Number(price) * 10 ** 18);

        const tx = await etheruemContract.addProduct(
          productImage,
          location.pathname.split("/")[2],
          productId,
          productName,
          priceInWei,
          BigInt(stock),
          isEthereum,
          isStarknet
        );
        await tx.wait();

        toast.success("Product added successfully");

        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      toast.dismiss();
    }
  };

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      try {
        if (ethereumAccount !== "" && etheruemContract) {
          const prod = await etheruemContract.getDashboardInventory(
            ethereumAccount,
            location.pathname.split("/")[2]
          );

          setProducts(prod);

          console.log(prod, "prod");
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    })();
  }, [etheruemContract]);

  const [ipfsUploadLoading, setIpfsUploadLoading] = useState(false);

  const [openProductModal, setOpenProductModal] = useState<boolean[]>([]);

  useEffect(() => {
    // Sync state whenever the products array changes
    if (products.length !== openProductModal.length) {
      setOpenProductModal(Array.from({length: products.length}, () => false));
    }
  }, [products]);

  console.log(openProductModal, "openProductModal");

  return (
    <div className="container p-7 px-12">
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent
          className="max-w-fit"
          onInteractOutside={(e) => e.preventDefault()}
          // disable on esc key
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription>
              <Formik
                initialValues={{
                  name: "",
                  image: "",
                  price: 0,
                  stock: 0,
                  isStarknet: false,
                  isEthereum: false,
                }}
                onSubmit={(values) => {
                  addProduct(
                    values.image,
                    values.name,
                    values.price.toString(),
                    values.stock,
                    values.isEthereum,
                    values.isStarknet
                  );
                }}
              >
                {(formik) => (
                  <Form className="flex flex-col gap-4">
                    <div className="w-[900px] h-[500px] flex gap-4 items-center">
                      <div className="w-1/3 h-full text-black gap-4 flex flex-col">
                        <p className="pl-1"></p>
                        <div className="flex flex-col pt-2 gap-2">
                          <Label htmlFor="name" className="">
                            Product Name
                          </Label>
                          <Field
                            as={Input}
                            name="name"
                            label="Product Name"
                            placeholder="Enter product name"
                            className="w-full bg-white text-black"
                          />
                        </div>
                        <div className="flex flex-col pt-2 gap-2">
                          <Label htmlFor="price" className="">
                            Product Price
                          </Label>
                          <Field
                            as={Input}
                            name="price"
                            type="number"
                            label="Product Name"
                            placeholder="Enter product price"
                            className="w-full bg-white text-black"
                          />
                        </div>
                        <div className="flex flex-col pt-2 gap-2">
                          <Label htmlFor="stock" className="">
                            Product Stock
                          </Label>
                          <Field
                            as={Input}
                            name="stock"
                            type="number"
                            placeholder="Enter product Stock"
                            className="w-full bg-white text-black"
                          />
                        </div>
                        <div className="flex flex-col pt-2 gap-2">
                          <Label htmlFor="image" className="">
                            Product Image
                          </Label>
                          <Input
                            type="file"
                            id="image"
                            name="image"
                            className="w-full bg-white text-black"
                            accept="image/*"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const imageFile = event.target.files?.[0];
                              if (imageFile) {
                                // Update Formik state
                                formik.setFieldValue("image", imageFile);

                                // Generate and set preview URL
                                const objectUrl =
                                  URL.createObjectURL(imageFile);

                                formik.setFieldValue("image", objectUrl);
                                let cid;

                                (async function () {
                                  try {
                                    if (imageFile) {
                                      setIpfsUploadLoading(true);

                                      const pinata = new PinataSDK({
                                        pinataJwt: import.meta.env
                                          .VITE_PINATA_JWT!,
                                        pinataGateway:
                                          "example-gateway.mypinata.cloud",
                                      });

                                      const upload = await pinata.upload.file(
                                        imageFile
                                      );

                                      console.log(upload, " upload");
                                      cid = upload?.IpfsHash;

                                      console.log("IPFS CID:", cid);
                                      console.log("done");
                                      toast.success(
                                        "Request sent successfully"
                                      );

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
                              }
                            }}
                          />
                        </div>

                        <div className="w-full flex justify-between items-center border rounded-lg h-[50px] px-4">
                          <Label htmlFor="isStarknet">Pay with Starknet</Label>
                          <Checkbox
                            id="isStarknet"
                            checked={formik.values.isStarknet}
                            onCheckedChange={(checked) => {
                              formik.setFieldValue("isStarknet", checked);
                            }}
                            name="isStarknet"
                            className="shadow-none data-[state=checked]:bg-blue-700 h-5 w-5 data-[state=checked]:border-gray-100"
                          />
                        </div>
                        <div className="w-full flex justify-between items-center border rounded-lg h-[50px] px-4">
                          <Label htmlFor="isEthereum">
                            Pay with Ethereum (Citrea)
                          </Label>
                          <Checkbox
                            id="isEthereum"
                            onCheckedChange={(checked) => {
                              formik.setFieldValue("isEthereum", checked);
                            }}
                            className="shadow-none data-[state=checked]:bg-blue-700 h-5 w-5 data-[state=checked]:border-gray-100"
                          />
                        </div>

                        <Button type="submit" className="w-full">
                          Submit
                        </Button>
                      </div>
                      <div className="w-2/3 h-full flex justify-center items-center">
                        <div className="w-full h-full">
                          <div className="h-full flex justify-center items-center border rounded-xl bg-gray-100">
                            <Card className="w-[350px] max-w-md mx-auto">
                              <CardContent className="p-6">
                                <div className="relative">
                                  {ipfsUploadLoading && (
                                    <Loader2 className="animate-spin absolute top-1/2 right-1/2" />
                                  )}
                                  <img
                                    // src={"https://github.com/shadcn-ui.png"}
                                    src={
                                      formik.values.image
                                        ? `https://ipfs.io/ipfs/${formik.values.image}`
                                        : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                                    }
                                    alt={"img"}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                  />
                                </div>
                                <h2 className="text-xl font-semibold mb-2">
                                  {formik.values.name || "Product Name"}
                                </h2>
                                <p className="text-2xl font-bold mb-4">
                                  {Number(formik.values.price)}
                                  &nbsp;USDC
                                </p>

                                <div className="flex flex-col gap-2">
                                  <div className="space-x-2 flex items-center">
                                    {formik.values.isStarknet && (
                                      <Button
                                        className="w-full"
                                        variant={"outline"}
                                      >
                                        <img
                                          src="/starknet.svg"
                                          alt="starknet"
                                          className="h-4 w-4"
                                        />
                                        Pay with Starknet
                                      </Button>
                                    )}
                                    {formik.values.isEthereum && (
                                      <Button
                                        variant="outline"
                                        className="w-full"
                                      >
                                        <img
                                          src="/ethereum.png"
                                          alt="ethereum"
                                          className="h-4 w-4"
                                        />
                                        Pay with Eth
                                      </Button>
                                    )}
                                  </div>
                                  <Button variant="outline" className="w-full">
                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                    View in Link
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="w-full flex justify-end">
        <Button className="mb-5 rounded-lg" onClick={() => setShowDialog(true)}>
          Add Product
        </Button>
      </div>
      <div className="rounded-xl border overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">
                <div className="">Category</div>
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products && products.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No products listed yet
                </TableCell>
              </TableRow>
            )}
            {products &&
              products.length > 0 &&
              products.map((product: any, index) => (
                <>
                  <Dialog
                    open={openProductModal[index]}
                    onOpenChange={(open) =>
                      setOpenProductModal((prev) =>
                        prev.map((item, i) => (i === index ? open : item))
                      )
                    }
                    key={index}
                  >
                    <DialogContent
                      className="max-w-fit"
                      onInteractOutside={(e) => e.preventDefault()}
                      // disable on esc key
                      onEscapeKeyDown={(e) => e.preventDefault()}
                    >
                      <DialogHeader>
                        <DialogTitle>Create Product</DialogTitle>
                        <DialogDescription>
                          <div className="w-[900px] h-[500px] flex gap-4 items-center">
                            <div className="w-1/3 h-full text-black gap-4 flex flex-col">
                              <p className="pl-1"></p>
                              <div className="flex flex-col pt-2 gap-2">
                                <Label htmlFor="name" className="">
                                  Product Name
                                </Label>
                                <Input
                                  name="name"
                                  placeholder="Enter product name"
                                  className="w-full bg-white text-black"
                                  disabled
                                  value={product.name}
                                />
                              </div>
                              <div className="flex flex-col pt-2 gap-2">
                                <Label htmlFor="price" className="">
                                  Product Price
                                </Label>
                                <Input
                                  name="price"
                                  type="number"
                                  placeholder="Enter product price"
                                  className="w-full bg-white text-black"
                                  disabled
                                  value={ethers.utils.formatEther(
                                    product.price._hex
                                  )}
                                />
                              </div>
                              <div className="flex flex-col pt-2 gap-2">
                                <Label htmlFor="stock" className="">
                                  Product Stock
                                </Label>
                                <Input
                                  name="stock"
                                  type="number"
                                  placeholder="Enter product Stock"
                                  className="w-full bg-white text-black"
                                  disabled
                                  value={product.stock}
                                />
                              </div>
                              <div className="flex flex-col pt-2 gap-2">
                                <Label htmlFor="image" className="">
                                  Product Image
                                </Label>
                                <Input
                                  type="file"
                                  id="image"
                                  name="image"
                                  className="w-full bg-white text-black"
                                  disabled
                                />
                              </div>

                              <div className="w-full flex justify-between items-center border rounded-lg h-[50px] px-4">
                                <Label htmlFor="isStarknet">
                                  Pay with Starknet
                                </Label>
                                <Checkbox
                                  id="isStarknet"
                                  checked={product.isStarknet}
                                  disabled
                                  name="isStarknet"
                                  className="shadow-none data-[state=checked]:bg-blue-700 h-5 w-5 data-[state=checked]:border-gray-100"
                                />
                              </div>
                              <div className="w-full flex justify-between items-center border rounded-lg h-[50px] px-4">
                                <Label htmlFor="isEthereum">
                                  Pay with Ethereum (Citrea)
                                </Label>
                                <Checkbox
                                  id="isEthereum"
                                  checked={product.isEthereum}
                                  className="shadow-none data-[state=checked]:bg-blue-700 h-5 w-5 data-[state=checked]:border-gray-100"
                                  disabled
                                />
                              </div>

                              <Button type="submit" className="w-full">
                                Submit
                              </Button>
                            </div>
                            <div className="w-2/3 h-full flex justify-center items-center">
                              <Tabs
                                defaultValue="productcard"
                                className="w-full h-full"
                              >
                                <TabsList>
                                  <TabsTrigger value="productcard">
                                    Card
                                  </TabsTrigger>
                                  <TabsTrigger value="code">
                                    Code Snippet
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                  value="productcard"
                                  className="h-[90%]"
                                >
                                  <div className="h-full flex justify-center items-center border rounded-xl bg-gray-100">
                                    <Card className="w-[350px] max-w-md mx-auto">
                                      <CardContent className="p-6">
                                        <div className="relative">
                                          {ipfsUploadLoading && (
                                            <Loader2 className="animate-spin absolute top-1/2 right-1/2" />
                                          )}
                                          <img
                                            // src={"https://github.com/shadcn-ui.png"}
                                            src={
                                              product.productImage
                                                ? `https://ipfs.io/ipfs/${product.productImage}`
                                                : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                                            }
                                            alt={"img"}
                                            className="w-full h-48 object-cover mb-4 rounded"
                                          />
                                        </div>
                                        <h2 className="text-xl font-semibold mb-2">
                                          {product.productName ||
                                            "Product Name"}
                                        </h2>
                                        <p className="text-2xl font-bold mb-4">
                                          {ethers.utils.formatEther(
                                            product.price._hex
                                          )}
                                          &nbsp;USDC
                                        </p>

                                        <div className="flex flex-col gap-2">
                                          <div className="space-x-2 flex items-center">
                                            {product.isStarknet && (
                                              <Button
                                                className="w-full"
                                                variant={"outline"}
                                              >
                                                <img
                                                  src="/starknet.svg"
                                                  alt="starknet"
                                                  className="h-4 w-4"
                                                />
                                                Pay with Starknet
                                              </Button>
                                            )}
                                            {product.isEthereum && (
                                              <Button
                                                variant="outline"
                                                className="w-full"
                                              >
                                                <img
                                                  src="/ethereum.png"
                                                  alt="ethereum"
                                                  className="h-4 w-4"
                                                />
                                                Pay with Eth
                                              </Button>
                                            )}
                                          </div>
                                          <Button
                                            variant="outline"
                                            className="w-full"
                                          >
                                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                            View in Link
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </TabsContent>
                                <TabsContent value="code" className="h-[90%]">
                                  <div className="h-full flex justify-center items-center border rounded-xl bg-gray-100 overflow-y-auto">
                                    <pre>
                                      {`
      import {ProductCard} from "starkpay-lib";
      <ProductCard
        apiKey="${location.pathname.split("/")[2]}"
        merchantAddress="${ethereumAccount}"
        productId="${product.productId}"
      />
    `}
                                    </pre>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <TableRow
                    key={product.productId}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <img
                        src={"https://ipfs.io/ipfs/" + product.productImage}
                        alt={product.name}
                        className="ml-5 object-cover h-12 w-12 rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      {ethers.utils.formatEther(product.price._hex)} USDC
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        {product.isEthereum && <Badge>Ethereum</Badge>}
                        {product.isStarknet && <Badge>Starknet</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setOpenProductModal((prev) =>
                            prev.map((_, i) => (i === index ? true : false))
                          )
                        }
                      >
                        View
                        <ArrowRight className="ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

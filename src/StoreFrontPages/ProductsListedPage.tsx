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
import {Product, products} from "@/lib/products";
import {ArrowRight, ExternalLink} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Field, Form, Formik} from "formik";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function ProductsListedPage() {
  const [showDialog, setShowDialog] = useState(false);
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
                  isStarknet: false,
                  isEthereum: false,
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {(formik) => (
                  <Form className="flex flex-col gap-4">
                    <div className="w-[900px] h-[500px] flex gap-4 items-center">
                      <div className="w-1/3 h-full text-black gap-4 flex flex-col">
                        <p className="pl-1 mb-4"></p>
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
                          <Label htmlFor="name" className="">
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
                          <Label htmlFor="name" className="">
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
                              const file = event.target.files?.[0];
                              if (file) {
                                // Update Formik state
                                formik.setFieldValue("image", file);

                                // Generate and set preview URL
                                const objectUrl = URL.createObjectURL(file);

                                formik.setFieldValue("image", objectUrl);
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
                        <Tabs defaultValue="account" className="w-full h-full">
                          <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                          </TabsList>
                          <TabsContent value="account" className="h-[90%]">
                            <div className="h-full flex justify-center items-center border rounded-xl bg-gray-100">
                              <Card className="w-[350px] max-w-md mx-auto">
                                <CardContent className="p-6">
                                  <img
                                    // src={"https://github.com/shadcn-ui.png"}
                                    src={
                                      formik.values.image
                                        ? formik.values.image
                                        : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                                    }
                                    alt={"img"}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                  />
                                  <h2 className="text-xl font-semibold mb-2">
                                    {formik.values.name || "Product Name"}
                                  </h2>
                                  <p className="text-2xl font-bold mb-4">
                                    {Number(formik.values.price).toFixed(2)}
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
                          <TabsContent value="password">
                            Change your password here.
                          </TabsContent>
                        </Tabs>
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
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: Product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="ml-5 object-cover h-12 w-12 rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge>Starknet</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View
                    <ArrowRight className="ml-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import {useState} from "react";
import {useParams} from "react-router-dom";
import {products} from "@/lib/data";
import {Card, CardContent} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function ProductEditor() {
  const {id} = useParams<{id: string}>();
  const product = products.find((p) => p.id === id);
  const [showPaymentButtons, setShowPaymentButtons] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-payment"
              checked={showPaymentButtons}
              onCheckedChange={(checked) =>
                setShowPaymentButtons(checked as boolean)
              }
            />
            <Label htmlFor="show-payment">Show payment buttons</Label>
          </div>
          <div>
            <Label htmlFor="file-upload">Upload file</Label>
            <Input
              id="file-upload"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          {file && (
            <p className="text-sm text-muted-foreground">
              File selected: {file.name}
            </p>
          )}
        </div>
        <div className="w-full md:w-2/3">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-2xl font-bold mb-4">
                ${product.price.toFixed(2)}
              </p>
              {showPaymentButtons && (
                <div className="space-y-2">
                  <Button className="w-full">Buy Now</Button>
                  <Button variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

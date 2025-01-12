import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Check, Copy} from "lucide-react";
import {useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {Separator} from "@/components/ui/separator";

export default function Settings() {
  const {id} = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (inputRef.current && id) {
      inputRef.current.select();
      navigator.clipboard.writeText(id).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-gray-500 text-sm"> Manage your store settings </p>
      </div>
      <Separator className="mt-4" />

      <div className="flex flex-col gap-3 mt-4">
        <Label className="ml-1">Dashboard API Key</Label>
        <div className="flex items-center space-x-2">
          <Input
            ref={inputRef}
            type="text"
            value={id}
            className="flex-grow pr-10 max-w-[480px]"
            readOnly
          />
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className="flex-shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

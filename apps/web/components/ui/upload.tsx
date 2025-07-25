/**
 * v0 by Vercel.
 * see https://v0.dev/t/aDFucFbMyb8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"; //ensures the component runs in the browser, not on the server
import {
  Card,
  CardContent,
  //CardFooter
} from "@/components/ui/card";
//import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios"; // Import axios for HTTP requests
import { BACKEND_URL, CLOUDFLARE_URL } from "@/app/config";
import JSZip from "jszip"; // Import JSZip for handling zip files
import { useState } from "react";
import { useRef } from "react"; // Import useRef for file input reference

export function UploadModal({
  onUploadDone,
}: {
  onUploadDone: (zipUrl: string) => void;
}) {
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }

    setStatusMessage("Uploading...");
    const zip = new JSZip();
    const res = await axios.get(`${BACKEND_URL}/pre-sign`);
    const url = res.data.url;
    const key = res.data.key;
    if (files && files.length > 0) {
      for (const file of files) {
        const content = await file.arrayBuffer(); // Read the file content as an ArrayBuffer
        zip.file(file.name, content); // Add the file to the zip
      }
      const zipContent = await zip.generateAsync({ type: "blob" }); // Generate the zip file as a Blob
      const formData = new FormData();
      formData.append("file", zipContent); // Append the zip file
      const res = await axios.put(url, formData);
      setStatusMessage("✅ Upload complete!");
      onUploadDone(`${CLOUDFLARE_URL}/${key}`);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <div className="border border-dashed border-gray-200 rounded-md flex flex-col items-center gap-0 p-3 text-center">
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">
            Upload files for training
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <Input
            id="file"
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant={"outline"}
            size="lg"
            className="w-full"
            onClick={() => inputRef.current?.click()}
          >
            Select Files
          </Button>
          {statusMessage && (
            <p className="text-sm text-gray-600 mt-2">{statusMessage}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="M16 16l-4-4-4 4" />
    </svg>
  );
}

// function FileIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
//       <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//     </svg>
//   );
// }

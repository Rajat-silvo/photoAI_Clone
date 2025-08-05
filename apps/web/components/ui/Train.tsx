"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  //SelectGroup,
  SelectItem,
  //SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadModal } from "@/components/ui/upload";
import { useEffect, useState } from "react";
import { TrainModelInput } from "common/inferred";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function Train() {
  const { getToken } = useAuth(); //to get current session's jwt token from Clerk
  const [zipUrl, setZipUrl] = useState("");
  //probably should use FORMS in react
  const [type, setType] = useState("Man");
  const [age, setAge] = useState<string>();
  const [ethnicity, setEthnicity] = useState<string>();
  const [eyeColor, setEyeColor] = useState<string>();
  const [bald, setBald] = useState(false);
  const [name, setName] = useState("");
  const [modelTraining, setModelTraining] = useState(false);
  const router = useRouter();
  const [modelId, setModelId] = useState<string | null>(null);
  const [trainingStatus, setTrainingStatus] = useState<string | null>(null);

  // Check training status periodically if we have a modelId
  useEffect(() => {
    if (!modelId) return;

    const checkStatus = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `${BACKEND_URL}/model/status/${modelId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setTrainingStatus(response.data.model.status);

          // If training is complete, stop checking
          if (
            response.data.model.status === "Generated" ||
            response.data.model.status === "Failed"
          ) {
            if (response.data.model.status === "Generated") {
              toast.success("Model training completed successfully!");
              router.refresh();
            } else {
              toast.error("Model training failed. Please try again.");
            }
            setModelId(null);
            setModelTraining(false);
          }
        }
      } catch (error) {
        console.error("Error checking model status:", error);
      }
    };

    checkStatus();

    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, [modelId, getToken, router]);

  async function trainModel() {
    if (!zipUrl) {
      toast.error("Please upload images first");
      return;
    }

    if (!name) {
      toast.error("Please enter a model name");
      return;
    }

    if (!type || !age || !ethnicity || !eyeColor) {
      toast.error("Please fill in all required fields");
      return;
    }

    //Add types here
    const input = {
      zipUrl,
      type,
      age: parseInt(age ?? "0"),
      ethnicity,
      eyeColor,
      bald,
      name,
    };

    try {
      const token = await getToken(); // Get the JWT token from Clerk
      setModelTraining(true);

      const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
        //Backend authentication - using Clerk(slower requests) OR getting Client-side JWT from Clerk(faster requests) and sending it in headers in the backend requests
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
          // Authorization: `B32earer ${localStorage.getItem("clerkAuthToken")}`,
        },
      });

      if (response.data.modelId) {
        setModelId(response.data.modelId);
        toast.success(
          "Model training started! This will take approximately 20 minutes."
        );
        router.push("/");
      } else {
        toast.error("Failed to start model training");
        setModelTraining(false);
      }
    } catch (error) {
      console.error("Training error:", error);
      toast.error(
        (error as Error & { response?: { data?: { message?: string } } })
          .response?.data?.message || "Failed to start model training"
      );
      setModelTraining(false);
    }
  }

  const isFormValid = name && zipUrl && type && age && ethnicity && eyeColor;

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <Card className="w-[500px]  px-4">
        <CardHeader className="text-center">
          <CardTitle>Model Training</CardTitle>
          <CardDescription className="text-center">
            Train your own model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="Name for your model"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    onChange={(e) => setAge(e.target.value)}
                    id="age"
                    type="number"
                    placeholder="Write your Age"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="type">Type</Label>
                  <Select onValueChange={(value) => setType(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    {/* <SelectContent side="bottom" avoidCollisions={false}> */}
                    <SelectContent>
                      <SelectItem value="Man">Man</SelectItem>
                      <SelectItem value="Woman">Woman</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="ethnicity">Ethnicity</Label>
                  <Select onValueChange={(value) => setEthnicity(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Ethnicity" />
                    </SelectTrigger>
                    <SelectContent side="bottom" avoidCollisions={false}>
                      {/* <SelectContent> */}
                      <SelectItem value="White">White</SelectItem>
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="Asian_American">
                        Asian American
                      </SelectItem>
                      <SelectItem value="East_Asian">
                        East Asian (Chinese, Japanese, Korean, etc.)
                      </SelectItem>
                      <SelectItem value="South_East_Asian">
                        South East Asian (Thai, Indonesian, Vietnamese, etc.)
                      </SelectItem>
                      <SelectItem value="South_Asian">
                        South Asian (Indian, Pakistani, Bangladeshi, etc.)
                      </SelectItem>
                      <SelectItem value="Middle_Eastern(Arabic)">
                        Middle Eastern (Arabic)
                      </SelectItem>
                      <SelectItem value="Pacific(Polynesian)">
                        Pacific Islander (Polynesian)
                      </SelectItem>
                      <SelectItem value="Hispanic(Latin American)">
                        Hispanic (Latin American)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="eyeColor">Eye Color</Label>
                  <Select onValueChange={(value) => setEyeColor(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select eye color" />
                    </SelectTrigger>
                    <SelectContent side="bottom" avoidCollisions={false}>
                      {/* <SelectContent> */}
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="Brown">Brown</SelectItem>
                      <SelectItem value="Blue">Blue</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Hazel">Hazel</SelectItem>
                      <SelectItem value="Gray">Gray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="bald">Bald</Label>
                  <Switch
                    onClick={(e) => {
                      setBald(!bald);
                    }}
                    className="w-9 h-6"
                  />
                </div>
              </div>
              <UploadModal
                onUploadDone={(zipUrl) => {
                  setZipUrl(zipUrl);
                }}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button
            type="submit"
            className="w-full"
            // disabled={!zipUrl || !type || !age || !ethnicity || !eyeColor}
            onClick={trainModel}
            disabled={modelTraining || !isFormValid}
          >
            {modelTraining ? (
              <>
                {trainingStatus
                  ? `Training: ${trainingStatus}...`
                  : "Training..."}
              </>
            ) : (
              <>Train Model (20 credits)</>
            )}
          </Button>
          <CardAction className="w-full">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}

// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { UploadModal } from "@/components/ui/upload";
// import { useState } from "react";
// import {
//   TrainModelInput,
//   TypeOptions,
//   EthnicityOptions,
//   EyeColorOptions,
//   TYPE_OPTIONS,
//   ETHNICITY_OPTIONS,
//   EYE_COLOR_OPTIONS,
// } from "common/inferred";

// export default function Train() {
//   const [zipUrl, setZipUrl] = useState("");
//   const [name, setName] = useState("");
//   const [type, setType] = useState<TypeOptions>("Man");
//   const [age, setAge] = useState<number>(0);
//   const [ethnicity, setEthnicity] = useState<EthnicityOptions>("White");
//   const [eyeColor, setEyeColor] = useState<EyeColorOptions>("Black");
//   const [bald, setBald] = useState(false);

//   function trainModel() {
//     const input: TrainModelInput = {
//       zipUrl,
//       name,
//       type,
//       age,
//       ethnicity,
//       eyeColor,
//       bald,
//     };
//     console.log("Training model with:", input);
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <Card className="w-full max-w-sm px-4">
//         <CardHeader>
//           <CardTitle>Model Training</CardTitle>
//           <CardDescription>Train your own model</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   id="name"
//                   placeholder="Name for your model"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="type">Type</Label>
//                 <Select
//                   value={type}
//                   onValueChange={(value: TypeOptions) => setType(value)}
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Select Type" />
//                   </SelectTrigger>
//                   <SelectContent side="bottom" avoidCollisions={false}>
//                     {TYPE_OPTIONS.map((option) => (
//                       <SelectItem key={option} value={option}>
//                         {option}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="age">Age</Label>
//                 <Input
//                   id="age"
//                   type="number"
//                   placeholder="Write your Age"
//                   value={age}
//                   onChange={(e) => setAge(Number(e.target.value))}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="ethnicity">Ethnicity</Label>
//                 <Select
//                   value={ethnicity}
//                   onValueChange={(value: EthnicityOptions) =>
//                     setEthnicity(value)
//                   }
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Select Ethnicity" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {ETHNICITY_OPTIONS.map((option) => (
//                       <SelectItem key={option} value={option}>
//                         {option === "Asian_American"
//                           ? "Asian American"
//                           : option === "East_Asian"
//                             ? "East Asian (Chinese, Japanese, Korean, etc.)"
//                             : option === "South_East_Asian"
//                               ? "South East Asian (Thai, Indonesian, Vietnamese, etc.)"
//                               : option === "South_Asian"
//                                 ? "South Asian (Indian, Pakistani, Bangladeshi, etc.)"
//                                 : option === "Middle_Eastern"
//                                   ? "Middle Eastern (Arabic)"
//                                   : option === "Pacific"
//                                     ? "Pacific Islander (Polynesian)"
//                                     : option === "Hispanic"
//                                       ? "Hispanic (Latin American)"
//                                       : option}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="eyeColor">Eye Color</Label>
//                 <Select
//                   value={eyeColor}
//                   onValueChange={(value: EyeColorOptions) => setEyeColor(value)}
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Select eye color" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {EYE_COLOR_OPTIONS.map((option) => (
//                       <SelectItem key={option} value={option}>
//                         {option}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Label htmlFor="bald">Bald</Label>
//                 <Switch id="bald" checked={bald} onCheckedChange={setBald} />
//               </div>
//               <UploadModal
//                 onUploadDone={(zipUrl) => {
//                   setZipUrl(zipUrl);
//                 }}
//               />
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex-col gap-2">
//           <Button type="submit" className="w-full" onClick={trainModel}>
//             Train Model
//           </Button>
//           <CardAction className="w-full">
//             <Button variant="outline" className="w-full">
//               Cancel
//             </Button>
//           </CardAction>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

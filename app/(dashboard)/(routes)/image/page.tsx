'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import axios from 'axios'
// import { Download, ImageIcon } from 'lucide-react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'
// import * as z from 'zod'

// import { Empty } from '@/components/empty'
// import { Heading } from '@/components/heading'
// import { Loader } from '@/components/loader'
// import { Button } from '@/components/ui/button'
// import { Card, CardFooter } from '@/components/ui/card'
// import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { useProModal } from '@/hooks/use-pro-modal'
// import { imageFormSchema } from '@/schemas'

// const amountOptions = [
//   { value: '1', label: '1 Photo' },
//   { value: '2', label: '2 Photos' },
//   { value: '3', label: '3 Photos' },
//   { value: '4', label: '4 Photos' },
//   { value: '5', label: '5 Photos' },
// ]

// const resolutionOptions = [
//   { value: '256x256', label: '256x256' },
//   { value: '512x512', label: '512x512' },
//   { value: '1024x1024', label: '1024x1024' },
// ]

// const ImagePage = () => {
//   const proModal = useProModal()
//   const router = useRouter()
//   const [image, setImages] = useState<string[]>([])

//   const form = useForm<z.infer<typeof imageFormSchema>>({
//     resolver: zodResolver(imageFormSchema),
//     defaultValues: { prompt: '', amount: '1', resolution: '512x512' },
//   })

//   const isLoading = form.formState.isSubmitting

//   const onSubmit = async (values: z.infer<typeof imageFormSchema>) => {
//     try {
//       setImages([])

//       const response = await axios.post('/api/generate-image', values)

//       const urls = response.data.image

//       setImages(urls)
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error) && error?.response?.status === 403)
//         proModal.onOpen()
//       else toast.error('Something went wrong.')

//       console.error(error)
//     } finally {
//       form.reset()
//       router.refresh()
//     }
//   }

//   return (
//     <div>
//       <Heading
//         title="Image Generation"
//         description="Turn your prompt into an image."
//         icon={ImageIcon}
//         iconColor="text-pink-700"
//         bgColor="bg-pink-700/10"
//       />

//       <div className="px-4 lg:px-8">
//         <div className="">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               autoComplete="off"
//               autoCapitalize="off"
//               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-6">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading}
//                         aria-disabled={isLoading}
//                         placeholder="A picture of a horse in Swiss Alps."
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="amount"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-2">
//                     <Select
//                       disabled={isLoading}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue defaultValue={field.value} />
//                         </SelectTrigger>
//                       </FormControl>

//                       <SelectContent>
//                         {amountOptions.map(option => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="resolution"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-2">
//                     <Select
//                       disabled={isLoading}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue defaultValue={field.value} />
//                         </SelectTrigger>
//                       </FormControl>

//                       <SelectContent>
//                         {resolutionOptions.map(option => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 className="col-span-12 lg:col-span-2 w-full"
//                 disabled={isLoading}
//                 aria-disabled={isLoading}
//               >
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </div>

//         <div className="space-y-4 mt-4">
//           {isLoading && (
//             <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
//               <Loader />
//             </div>
//           )}
//           {/* {images.length === 0 && !isLoading && (
//             <Empty label="No images generated." />
//           )} */}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
//           {image && (
//               <Card key={`data:image/png;base64,${image}`} className="rounded-lg overflow-hidden">
//                 <div className="relative aspect-square">
//                   <Image src={`data:image/png;base64,${image}`} alt="Generated image" fill />
//                 </div>

//                 <CardFooter className="p-2">
//                   <Button
//                     variant="secondary"
//                     className="w-full"
//                     onClick={() => window.open(`data:image/png;base64,${image}`)}
//                   >
//                     <Download className="h-4 w-4 mr-2" />
//                     Download
//                   </Button>
//                 </CardFooter>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ImagePage

// return ( 
  //   <div style={{ padding: "20px" }}>
  //     <h1>Room Design Generator</h1>
  //     <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
  //       <div>
  //         <label>Design Prompt:</label>
  //         <input
  //           type="text"
  //           value={prompt}
  //           onChange={(e) => setPrompt(e.target.value)}
  //           placeholder="Describe your design"
  //           style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
  //         />
  //       </div>

  //       <div>
  //         <label>Upload Room Image:</label>
  //         <input
  //           type="file"
  //           onChange={handleImageChange}
  //           accept="image/*"
  //           style={{ display: "block", marginBottom: "10px", padding: "8px" }}
  //         />
  //       </div>

  //       <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
  //         {loading ? "Generating..." : "Generate Design"}
  //       </button>
  //     </form>

  //     {generatedImage && (
  //       <div>
  //         <h2>Your Generated Room Design:</h2>
  //         <img
  //           src={generatedImage}
  //           alt="Generated Design"
  //           style={{ width: "1456px", height: "640px" }}
  //         />
  //       </div>
  //     )}
  //   </div>
  // );




// import { useState } from "react";
// import axios from "axios";

// export default function ImagePage() {
//   const [prompt, setPrompt] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     setSelectedImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!prompt || !selectedImage) {
//       alert("Please provide both prompt and image");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("prompt", prompt);
//     formData.append("image", selectedImage);
  
//     try {
//       setLoading(true);
//       const response = await axios.post(`http://192.168.1.190:8000/generate_design/?prompt=${prompt}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         responseType: "blob",  // We expect a blob image response
//       });

//       // Create a temporary URL for the generated image
//       const imageUrl = URL.createObjectURL(response.data);
//       setGeneratedImage(imageUrl);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error generating design:", error);
//       setLoading(false);
//     }
//   };

  
//   return (
//   <div className="p-5">
//     <h1 className="text-3xl font-bold mb-6">Room Design Generator</h1>
//     <form onSubmit={handleSubmit} className="mb-6">
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Design Prompt:</label>
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Describe your design"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Upload Room Image:</label>
//         <input
//           type="file"
//           onChange={handleImageChange}
//           accept="image/*"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
//       >
//         {loading ? "Generating..." : "Generate Design"}
//       </button>
//     </form>

//     {generatedImage && (
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">Your Generated Room Design:</h2>
//         <img
//           src={generatedImage}
//           alt="Generated Design"
//           className="w-full h-auto max-w-xl"
//         />
//       </div>
//     )}
//   </div>
// );
// }


import { useState } from "react";
import axios from "axios";

export default function ImagePage() {
  const [prompt, setPrompt] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Token for authentication (replace with actual token or fetch it securely)
  const AUTH_TOKEN = "EJNVCNK42QFNIQALCMNOLENFLQ3JNQLJ";  // Replace with the actual token
  //const AUTH_TOKEN = process.env.AUTH_TOKEN

 

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt || !selectedImage) {
      alert("Please provide both prompt and image");
      return;
    }
  
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("image", selectedImage);
  
    try {
      setLoading(true);
      const response = await axios.post(`https://6b15-46-122-102-58.ngrok-free.app/generate_design/?prompt=${prompt}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${AUTH_TOKEN}`,  // Add the token to the Authorization header
        },
        responseType: "blob",  // We expect a blob image response
      });

      // Create a temporary URL for the generated image
      const imageUrl = URL.createObjectURL(response.data);
      setGeneratedImage(imageUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error generating design:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Room Design Generator</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Design Prompt:</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your design"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Room Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          {loading ? "Generating..." : "Generate Design"}
        </button>
      </form>

      {generatedImage && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Generated Room Design:</h2>
          <img
            src={generatedImage}
            alt="Generated Design"
            className="w-full h-auto max-w-xl"
          />
        </div>
      )}
    </div>
  );
}
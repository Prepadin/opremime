// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import * as z from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'
// import { Music } from 'lucide-react'

// import { Empty } from '@/components/empty'
// import { Heading } from '@/components/heading'
// import { Loader } from '@/components/loader'
// import { Button } from '@/components/ui/button'
// import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'

// import { useProModal } from '@/hooks/use-pro-modal'
// import { musicFormSchema } from '@/schemas'

// const MusicPage = () => {
//   const proModal = useProModal()
//   const router = useRouter()
//   const [music, setMusic] = useState<string>()

//   const form = useForm<z.infer<typeof musicFormSchema>>({
//     resolver: zodResolver(musicFormSchema),
//     defaultValues: { prompt: '' },
//   })

//   const isLoading = form.formState.isSubmitting

//   const onSubmit = async (values: z.infer<typeof musicFormSchema>) => {
//     try {
//       setMusic(undefined)

//       const response = await axios.post('/api/music', values)

//       setMusic(response.data.audio)
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
//         title="Music Generation"
//         description="Turn your prompt into music."
//         icon={Music}
//         iconColor="text-emerald-500"
//         bgColor="bg-emerald-500/10"
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
//                   <FormItem className="col-span-12 lg:col-span-10">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading}
//                         aria-disabled={isLoading}
//                         placeholder="Piano solo"
//                         {...field}
//                       />
//                     </FormControl>
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
//           {!music && !isLoading && <Empty label="No music generated." />}

//           {music && (
//             <audio controls className="w-full mt-8">
//               <source src={music} />
//             </audio>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MusicPage


'use client'

import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-image', { prompt });
      setImage(response.data.image);
    } catch (error) {
      console.error('Error generating image:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Local AI Image Generator</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Local AI Image Generator</h1>
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={generateImage}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {image && (
        <div className="mt-4">
          <img src={`data:image/png;base64,${image}`} alt="Generated image" className="max-w-full" />
        </div>
      )}
    </div>
  );
}
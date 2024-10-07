// import axios from 'axios';
// import { NextRequest, NextResponse } from 'next/server';

// const LOCAL_SD_API_URL = 'http://localhost:7860'; // Update this to your local API URL

// export async function POST(req: NextRequest) {
//   try {
//     // Ensure that the request method is POST
//     const { prompt } = await req.json();

//     // Call the Stable Diffusion API
//     const response = await axios.post(`${LOCAL_SD_API_URL}/sdapi/v1/txt2img`, {
//       prompt,
//       steps: 50,
//       width: 512,
//       height: 512,
//     });

//     // Extract the image from the response
//     const image = response.data.images[0];

//     // Send the image in the response
//     return NextResponse.json({ image }, { status: 200 });
//   } catch (error) {
//     console.error('Error generating image:', error);
//     return NextResponse.json({ message: 'Error generating image' }, { status: 500 });
//   }
// }
import { auth } from "@clerk/nextjs";

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const LOCAL_SD_API_URL = 'http://localhost:7860'; // Update this to your local API URL

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
   
    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });
   
    // Ensure that the request method is POST
    const { prompt } = await req.json();
    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 });
    // Call the Stable Diffusion API
    const response = await axios.post(`${LOCAL_SD_API_URL}/sdapi/v1/txt2img`, {
      prompt,
      steps: 50,
      width: 512,
      height: 512,
    });

    if (!isPro) await increaseApiLimit();

    // Extract the image from the response
    const image = response.data.images[0];

    // Send the image in the response
    return NextResponse.json({ image }, { status: 200 });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ message: 'Error generating image' }, { status: 500 });
  }
}
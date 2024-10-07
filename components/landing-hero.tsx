'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import TypewriterComponent from 'typewriter-effect'

import { Button } from '@/components/ui/button'
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';



export const LandingHero = () => {
  const { isSignedIn } = useAuth()
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/stablediffusion', { prompt });
      setImage(response.data.image);
    } catch (error) {
      console.error('Error generating image:', error);
    }
    setLoading(false);
  };


  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
     
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                'Chatbot.',
                'Photo Generation.',
                'Music Generation.',
                'Code Generation.',
                'Video Generation.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster.
      </div>

      <div className="">
        <Button
          variant="premium"
          className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          asChild
        >
          <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
            Start Generating For Free
          </Link>
        </Button>
      </div>

      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
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
    
  )
}

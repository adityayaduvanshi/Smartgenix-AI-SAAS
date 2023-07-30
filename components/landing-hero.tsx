/* eslint-disable @next/next/no-img-element */
'use client';

import TypewriterComponent from 'typewriter-effect';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
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
                  'Video Generation.',
                  'Code Generation.',
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
        <div>
          <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
            <Button
              variant="premium"
              className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
            >
              Start Generating For Free
            </Button>
          </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
          No credit card required.
        </div>
        <div className="pt-4 sm:pt-10 px-14 sm:px-28 ">
          <img src="/demo.PNG" alt="banner_image" className=" object-cover" />
        </div>
      </div>
    </>
  );
};

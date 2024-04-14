'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-10'>
      <h1 className="text-lg">Transcriptions at 50-100x real time.</h1>
      <Button type="button" onClick={() => router.push('/upload')}>
        Transcribe Here
      </Button> 
    </div>
  )
}
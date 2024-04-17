"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TranscriptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [filename, setFilename] = useState<string>('');
  const [fileLength, setFileLength] = useState<number>(0);
  const [timeToTranscribe, setTimeToTranscribe] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('https://548c-2600-1700-7b00-5e10-2d8b-4410-33a9-e3f.ngrok-free.app/audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json(); // Assuming the response is JSON
      console.log(data)
      if (data.results && data.results.segments && data.results.segments.length > 0) {
        const allTexts = data.results.segments.map((segment: { text: string }) => segment.text).join(' ');
        setTranscription(allTexts);
      } else {
        setTranscription('No transcription available')
      }
      setFilename(data.filename);
      setFileLength(data.length);
      setTimeToTranscribe(data.time_to_transcribe);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col md:flex-row">
      <div className="w-4/5 md:w-1/2 h-1/4 flex flex-col items-center justify-center space-y-4 m-4">
        <Input type="file" accept="audio/*" onChange={handleFileChange} className="mb-2 w-3/4 md:w-1/2" />
        <Button onClick={handleUpload}>Upload and Transcribe</Button>
      </div>
      <div className="w-4/5 md:w-1/2 h-1/2 flex flex-col items-center justify-center bg-gray-100 px-4 py-4 border mx-4 my-4">
        <h2 className="text-lg font-semibold">Transcription Result:</h2>
        <div className='flex flex-col md:flex-row md:gap-2 text-sm'>
          <p>Filename: {filename}</p>
          <p>File length: {fileLength} seconds</p>
          <p>Time to transcribe: {timeToTranscribe.toFixed(2)} seconds</p>
        </div>
        <ScrollArea className='flex w-full h-full'>
          <p className="text-gray-700 mt-2">{transcription || 'No transcription available yet.'}</p>
        </ScrollArea>
      </div>
    </div>
  );
}


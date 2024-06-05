"use client"

import React, { useEffect } from "react";
import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { transcribeFile, fetchExampleData } from '@/app/analytics/action';

interface TranscriptionData {
  summary: string;
  outcome: string;
  sentiment: string;
  keywords: string[];
  transcription: Message[];
}

interface Message {
  role: string;
  content: string;
}

export default function AnalyticsComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchToyData = async () => {
    const toyData = fetchExampleData();
  }

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
      const data = await fetchExampleData();
      if (data.results && data.results.segments && data.results.segments.length > 0) {
        const allTexts = data.results.segments.map((segment: { text: string }) => segment.text).join(' ');
        setTranscriptionData(allTexts);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-wrap p-4">
      <div className="border flex flex-col justify-center items-center h-1/3 w-1/2">
        Quadrant 1
        <Input type="file" accept="audio/*" onChange={handleFileChange} className="mb-2 w-3/4 md:w-1/2" />
        <Button onClick={handleUpload} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Upload and Transcribe'}
        </Button>
      </div>
      <div className="border flex flex-col gap-4 justify-center items-center h-1/3 w-1/2">
        Quadrant 2
        <div className="border p-4 rounded-md w-[60%] flex justify-center">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
      <div className="border flex justify-center items-center h-2/3 w-1/2 p-1 rounded">
        <ScrollArea className="h-full w-full p-3 rounded-md border overflow-y-auto">
          <h4 className="mb-4 text-sm font-medium leading-none">Summary</h4>
          <Separator className="my-2 border-b" />
          <div className="flex flex-col gap-10 p-4">
            {transcriptionData && (
              <>
                <div>
                  <h5 className="text-lg font-bold">Summary of Call:</h5>
                  <p>{transcriptionData.summary}</p>
                </div>
                <div>
                  <h5 className="text-lg font-bold">Outcome of Call:</h5>
                  <p>{transcriptionData.outcome}</p>
                </div>
                <div>
                  <h5 className="text-lg font-bold">Resulting Sentiment:</h5>
                  <p>{transcriptionData.sentiment}</p>
                </div>
                <div>
                  <h5 className="text-lg font-bold">Key Terms:</h5>
                  <ul className="list-disc pl-5">
                    {transcriptionData.keywords.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="border flex justify-center items-center h-2/3 w-1/2 p-1 rounded">
        <ScrollArea className="h-full w-full p-3 rounded-md border overflow-y-auto">
          <h4 className="mb-4 text-sm font-medium leading-none">Transcription</h4>
          <Separator className="my-2 border-b" />
          <div className="flex gap-2 flex-col">
            {transcriptionData && transcriptionData.transcription.map((m, index) => (
              <div key={index} className="text-sm">
                <div className="font-bold">{m.role}:</div>
                <div className="m-2">{m.content}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

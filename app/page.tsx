"use client"

import React, { useEffect } from "react";
import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { transcribeFile, fetchExampleData, processAudio } from '@/app/analytics/action';

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

const toydata: TranscriptionData = {
  summary: "The user contacts the assistant seeking help with resetting their password. The assistant responds positively, offering to send a link to the user's email to facilitate the password reset. The user appreciates this solution, indicating that it would be perfect for them. This brief exchange showcases a straightforward customer support scenario where the assistant efficiently addresses the user's request.",
  outcome: "Issue resolved with no escalation.",
  sentiment: "Positive",
  keywords: ["Email", "Password", "Reset"],
  transcription: [
    {"role":"assistant", "content": "Hello, thank you for calling Hrai customer support, how can I help you?"},
    {"role":"user", "content": "Hi. I can't figure out how to reset my password."},
    {"role":"assistant", "content": "No problem at all, I can send you a link to your email if you would like?"},
    {"role":"user", "content": "Oh that would be perfect."},
    {"role":"assistant", "content": "Could you please confirm the email address associated with your account?"},
    {"role":"user", "content": "Yes, it’s [email]."},
    {"role":"assistant", "content": "Thank you, [name]. I’ve sent the password reset link to your email. Please check your inbox and follow the instructions to reset your password."},
    {"role":"user", "content": "I’ve received the email. Thanks for your help!"},
    {"role":"assistant", "content": "You're welcome! Is there anything else I can assist you with today?"},
    {"role":"user", "content": "No, that's all for now. Thanks again."},
    {"role":"assistant", "content": "It was my pleasure helping you. Have a great day, [name]!"},
  ]


}

export default function Wireframe() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transcriptionData, setTranscriptionData] = useState<TranscriptionData>(toydata);

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

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append('align', 'false');
    formData.append('diarize', 'true');
    formData.append('chat_transcription', 'true');
    formData.append('summarize', 'true');
    formData.append('analyze_sentiment', 'true');
    formData.append('extract_keywords', 'true');
    

    try {
      const response = await processAudio(formData)
      console.log(response);

      const mappedData: TranscriptionData = {
        summary: response.summary,
        outcome: "",
        sentiment: response.sentiment,
        keywords: response.keywords,
        transcription: response.chat_transcription.map((itme: any) => ({
          role: itme.role,
          content: itme.content
        }))
      };

        setTranscriptionData(mappedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="h-screen">
        <div className="h-3/4 flex flex-wrap p-10 items-center justify-center">
            <h2 className="flex flex-col justify-center items-center">
              <span>Analyze your calls,</span>
              <span>from every angle.</span>
            </h2>
        </div>
      <div className="h-screen w-screen flex flex-wrap p-2 md:p-10">
        <div className="border flex flex-col justify-center items-center h-1/3 w-1/2">
          <Input type="file" accept="audio/*" onChange={handleFileChange} className="mb-2 w-3/4 md:w-1/2" />
          <Button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Upload and Transcribe'}
          </Button>
        </div>
        <div className="border flex flex-col gap-4 justify-center items-center h-1/3 w-1/2">
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
            <h4 className="mb-4 text-sm font-medium leading-none">Overview</h4>
            <Separator className="my-2 border-b" />
            <div className="flex flex-col gap-6 p-1">
              {transcriptionData && (
                <>
                  <div>
                    <h5 className="text-md font-bold underline">Summary of Call:</h5>
                    <p className="text-sm px-1">{transcriptionData.summary}</p>
                  </div>
                  <div>
                    <h5 className="text-md font-bold underline">Outcome of Call:</h5>
                    <p className="text-sm px-1">{transcriptionData.outcome}</p>
                  </div>
                  <div>
                    <h5 className="text-md font-bold underline">Resulting Sentiment:</h5>
                    <p className="text-sm px-1">{transcriptionData.sentiment}</p>
                  </div>
                  <div>
                    <h5 className="text-md font-bold underline">Key Terms:</h5>
                    <ul className="text-sm list-disc pl-5">
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
        <div className="h-3/4 flex flex-wrap p-10 items-center justify-center">
            <h2><a href="/auth/signup" className="underline">Signup</a> for early API access.</h2>
        </div>
    </div>
  )
}
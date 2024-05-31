import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Wireframe() {
  const messages = [
    {"role": "speaker01", "content": "Hello"},
    {"role": "speaker02", "content": "Hey, how's it going?"},
  ]
  return (
    <div className="h-screen w-screen flex flex-wrap p-4">
      <div className="border flex flex-col justify-center items-center h-1/3 w-1/2">
        Quadrant 1
        <Input type="file" accept="audio/*" className="mb-2 w-3/4 md:w-1/2" />
        <Button>Upload and Transcribe</Button>
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
            <div>
              <h5 className="text-lg font-bold">Call Length:</h5>
              <p>length</p>
            </div>
            <div>
              <h5 className="text-lg font-bold">Reason for Call:</h5>
              <p>reason</p>
            </div>
            <div>
              <h5 className="text-lg font-bold">Summary of Call:</h5>
              <p>the summary goes here</p>
            </div>
            <div>
              <h5 className="text-lg font-bold">Key Terms:</h5>
              <ul className="list-disc pl-5">
                <li>term1</li>
                <li>term2</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold">Resulting Sentiment:</h5>
              <p>positive</p>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="border flex justify-center items-center h-2/3 w-1/2 p-1 rounded">
        <ScrollArea className="h-full w-full p-3 rounded-md border overflow-y-auto">
          <h4 className="mb-4 text-sm font-medium leading-none">Transcription</h4>
          <Separator className="my-2 border-b" />
          <div className="flex gap-2 flex-col">
            {messages.filter(m => m.role !== 'system').map((m, index) => (
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
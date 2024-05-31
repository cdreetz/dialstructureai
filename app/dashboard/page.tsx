import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="flex w-screen h-screen justify-center items-center p-4">
      <div className="border w-1/5 h-full flex justify-center items-center p-4">
        Component 1
      </div>
      <div className="border w-4/5 h-full flex justify-center items-center p-4">
        Component 2
      </div>
    </div>
  )
}
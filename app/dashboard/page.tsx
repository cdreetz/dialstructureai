import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="flex w-screen h-[calc(100vh-4rem)] p-4"> {/* Assuming the header is 4rem in height */}
      <div className="border w-1/5 flex-grow flex flex-col justify-between items-start p-4">
        <div>
          <div className="mb-4">Playground</div>
          <div className="mb-4">Usage</div>
          <div className="mb-4">API Keys</div>
          <div className="mb-8">Docs</div> {/* Increased space between 'API Keys' and 'Docs' */}
        </div>
        <div>
          <div className="mb-4">Settings</div>
          <div>Account</div>
        </div>
      </div>
      <hr />
      <div className="border w-4/5 flex-grow flex justify-center items-center p-4">
        Dashboard coming soon.
      </div>
    </div>
  )
}
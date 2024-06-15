'use client'

import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client"


export default function Navigation() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const [userStatus, setUserStatus] = React.useState("Login");

  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setUserStatus("Login");
      } else {
        setUserStatus("Logout");
      }
    };
    checkUser();
  }, []);

  if (pathname.startsWith('/auth/')) {
    return null;
  }

  // logout handler
  const handleLogout = async () => {
    if (userStatus === "Logout") {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push("/");
        router.refresh();
      } else {
        console.error("Logout failed:", error.message);
      }
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex justify-between items-center p-4 w-full">
      <div className="flex-initial text-xs">
        <a href="/">Home</a>
      </div>
      <div className="flex flex-row gap-4">
        {userStatus === "Logout" && (
          <div className="flex-initial text-xs">
            <a href="/dashboard">Dashboard</a>
          </div>
        )}
        <div className="flex-initial text-xs">
          <a href={userStatus === "Login" ? "/auth/login" : "/"} onClick={handleLogout}>{userStatus === "Login" ? "Login" : "Logout"}</a>
        </div>
      </div>
    </div>
  )
}
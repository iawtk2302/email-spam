"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/email/inbox");
    }
  }, []);

  return <></>; // or render a loading indicator or any other content
}

"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  return <div>Homepage</div>
}

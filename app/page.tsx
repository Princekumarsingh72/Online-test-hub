"use client"
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
 useEffect(() => {
    setTimeout(() => {
      router.push("/auth/signup");
    }, 2000); // 2 sec
  }, []);
  return null;
}
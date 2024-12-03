import Navbar from "@/components/ui/navbar";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <p className="text-center text-2xl pt-10"> You are currently not authenticated</p>
    </main>
  );
}

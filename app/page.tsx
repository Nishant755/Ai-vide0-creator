import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <h1>AI Video Creator</h1>
      <Button>Upload Video</Button>
      <UserButton/>
    </div>
  );
}

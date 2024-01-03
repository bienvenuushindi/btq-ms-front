'use client'
import { useRouter } from "next/navigation";
import Button from '@/components/Button';

export default function BackButton() {
  const router = useRouter()

  return (
    <Button  onClick={() => router.back()}>
      Go Back
    </Button>
  )
}
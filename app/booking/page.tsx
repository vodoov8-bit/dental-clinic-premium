'use client'

import { useRouter } from 'next/navigation'
import { AppointmentModal } from '@/components/appointment-modal'

export default function BookingPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen">
      <AppointmentModal
        open={true}
        onOpenChange={(open) => {
          if (!open) router.push('/')
        }}
      />
    </main>
  )
}

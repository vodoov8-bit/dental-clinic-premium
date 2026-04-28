'use client'

import { useState } from 'react'
import { FileText, MessageCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppointmentModal } from '@/components/appointment-modal'

const trustPoints = [
  {
    icon: FileText,
    title: 'Tailored Treatment Plans',
    description: 'Every plan is designed specifically for your unique dental needs and personal goals.',
  },
  {
    icon: MessageCircle,
    title: 'Transparent Consultation',
    description: 'We explain every step clearly, so you understand your options before any treatment begins.',
  },
  {
    icon: ShieldCheck,
    title: 'No Hidden Costs',
    description: 'You receive a complete breakdown of costs upfront with no surprises along the way.',
  },
]

export default function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="pricing" className="section-padding scroll-mt-20">
      <div className="section-container">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="section-eyebrow mb-6 bg-primary/10 text-primary">
            Your Journey With Us
          </span>
          <h2 className="section-title mb-6">
            Personalized Treatment Plans
          </h2>
          <p className="section-description mx-auto max-w-2xl">
            Every patient is unique. During your consultation, we take the time to understand 
            your needs, goals, and oral health to create a treatment plan that is truly yours.
          </p>
        </div>

        {/* Trust Points */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {trustPoints.map((point) => (
            <div 
              key={point.title} 
              className="text-center group"
            >
              <div className="icon-container-lg mb-6 size-16 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <point.icon className="size-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
              <p className="text-muted-foreground/90 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="h-14 px-10 bg-primary text-primary-foreground shadow-[0_10px_24px_-16px_rgba(124,144,130,0.72)] ring-1 ring-primary/25 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-primary/95 hover:shadow-[0_14px_30px_-18px_rgba(124,144,130,0.85)] hover:ring-primary/35 active:scale-[0.985]"
            onClick={() => setIsModalOpen(true)}
          >
            Book Appointment
          </Button>
          <p className="mt-5 text-sm text-muted-foreground/90">
            Complimentary consultation for new patients
          </p>
        </div>

        <AppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
    </section>
  )
}

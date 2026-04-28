'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AppointmentModal } from '@/components/appointment-modal'
import { WhyChooseUsModal } from '@/components/why-choose-us-modal'
import { ArrowRight, Star, Shield, Award } from 'lucide-react'

const trustBadges = [
  { icon: Star, label: '5-Star Reviews', value: '500+' },
  { icon: Shield, label: 'Years Experience', value: '15+' },
  { icon: Award, label: 'Awards Won', value: '12' },
]

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        
        {/* Floating orbs - subtle animated elements */}
        <div className="absolute top-1/4 right-1/4 size-96 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/4 size-80 rounded-full bg-accent/5 blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 right-1/3 size-64 rounded-full bg-primary/3 blur-2xl animate-float-medium" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>
      
      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <div className="section-eyebrow inline-flex w-fit items-center gap-2 bg-primary/10 text-primary animate-fade-in-up stagger-1">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Now Accepting New Patients
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance text-foreground animate-fade-in-up stagger-2">
              Your Smile,{' '}
              <span className="text-primary">Perfected</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground/90 leading-relaxed max-w-2xl animate-fade-in-up stagger-3">
              Experience premium dental care where artistry meets advanced technology. 
              Dr. Aris Thorne and our dedicated team are committed to crafting your 
              most confident smile.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-in-up stagger-4">
              <Button 
                size="lg" 
                className="group h-14 bg-primary text-primary-foreground shadow-[0_10px_24px_-16px_rgba(124,144,130,0.72)] ring-1 ring-primary/25 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-primary/95 hover:shadow-[0_14px_30px_-18px_rgba(124,144,130,0.85)] hover:ring-primary/35 active:scale-[0.985]"
                onClick={() => setIsModalOpen(true)}
              >
                Book Your Consultation
                <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 border-border/70 bg-background/80 shadow-[0_10px_28px_-20px_rgba(26,46,53,0.3)] backdrop-blur-sm hover:border-primary/30 hover:bg-background hover:shadow-[0_18px_34px_-24px_rgba(26,46,53,0.42)] active:translate-y-px"
                onClick={() => setIsLearnMoreOpen(true)}
              >
                Learn More
              </Button>
            </div>

            <AppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
            <WhyChooseUsModal 
              open={isLearnMoreOpen} 
              onOpenChange={setIsLearnMoreOpen}
              onBookAppointment={() => setIsModalOpen(true)}
            />

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 pt-4 animate-fade-in-up stagger-5">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-3">
                  <div className="icon-container rounded-full">
                    <badge.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">{badge.value}</p>
                    <p className="text-sm text-muted-foreground/90 leading-snug">{badge.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] rounded-3xl bg-gradient-to-br from-primary/20 via-muted/30 to-accent/20 overflow-hidden">
              <Image
                src="/lumina-dental-hero.jpg"
                alt="Dentist with patient in a modern dental clinic"
                fill
                quality={95}
                className="object-cover contrast-[1.08] saturate-[1.08] brightness-[0.98]"
                priority
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-lg p-6 border border-border max-w-xs transition-transform duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-xl animate-fade-in-up stagger-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="size-8 rounded-full bg-primary/20 border-2 border-card"
                    />
                  ))}
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">500+ patients</span>{' '}
                trust us with their smiles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

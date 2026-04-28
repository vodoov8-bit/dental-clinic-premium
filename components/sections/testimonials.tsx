'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Marketing Executive',
    content:
      'Dr. Thorne and his team completely transformed my smile. I was always self-conscious about my teeth, but after my veneer treatment, I cannot stop smiling. The attention to detail and personalized care exceeded all my expectations.',
    rating: 5,
    treatment: 'Porcelain Veneers',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineer',
    content:
      'As someone who dreaded dental visits, Lumina Dental Studio changed everything for me. The calming environment and gentle approach made my Invisalign journey actually enjoyable. My teeth have never looked better!',
    rating: 5,
    treatment: 'Invisalign',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Interior Designer',
    content:
      'The whitening results were absolutely stunning! Dr. Thorne took the time to understand exactly what I wanted and delivered beyond my expectations. The whole team made me feel like a VIP from start to finish.',
    rating: 5,
    treatment: 'Professional Whitening',
  },
  {
    id: 4,
    name: 'James Thompson',
    role: 'Financial Advisor',
    content:
      'After losing a tooth in an accident, I was devastated. The implant Dr. Thorne placed looks and feels completely natural. His expertise and compassion during a difficult time meant everything to me.',
    rating: 5,
    treatment: 'Dental Implant',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = testimonials[activeIndex]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="section-padding bg-secondary text-secondary-foreground scroll-mt-20">
      <div className="section-container">
        {/* Section Header */}
        <div className="mx-auto mb-18 max-w-3xl text-center md:mb-20">
          <span className="section-eyebrow mb-6 border border-secondary-foreground/10 bg-secondary-foreground/[0.07] text-secondary-foreground shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            Patient Stories
          </span>
          <h2 className="section-title mb-6 text-secondary-foreground">
            Smiles That Speak for Themselves
          </h2>
          <p className="section-description mx-auto max-w-2xl text-secondary-foreground/75">
            Do not just take our word for it. Hear from our patients about their 
            transformative experiences at Lumina Dental Studio.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mx-auto mb-12 max-w-4xl md:mb-14">
          <Card className="group relative overflow-hidden border border-secondary-foreground/10 bg-gradient-to-br from-secondary-foreground/[0.08] via-secondary-foreground/[0.05] to-primary/10 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(0,0,0,0.24)] animate-fade-in-up stagger-1">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,249,248,0.18),transparent_32%),linear-gradient(135deg,transparent,rgba(124,144,130,0.08))]" />
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-secondary-foreground/40 to-transparent" />
            <CardContent className="relative p-8 md:p-12">
              <div className="mb-8 flex items-start justify-between gap-6">
                <Quote className="size-12 shrink-0 text-primary/95 md:size-14" />
                <div className="hidden h-px flex-1 self-center bg-gradient-to-r from-secondary-foreground/20 via-secondary-foreground/10 to-transparent sm:block" />
              </div>
              <p className="mb-10 max-w-3xl text-xl leading-relaxed text-secondary-foreground md:text-[1.7rem] md:leading-[1.75]">
                {activeTestimonial.content}
              </p>
              <div className="flex flex-col justify-between gap-6 border-t border-secondary-foreground/10 pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  {/* Avatar Placeholder */}
                  <div className="flex size-14 items-center justify-center rounded-full border border-primary/20 bg-primary/15 shadow-inner shadow-primary/10 ring-4 ring-secondary/20">
                    <span className="text-xl font-semibold text-primary">
                      {activeTestimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold tracking-[0.01em] text-secondary-foreground">
                      {activeTestimonial.name}
                    </p>
                    <p className="text-sm text-secondary-foreground/65">
                      {activeTestimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <div className="flex items-center gap-1.5">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="rounded-full border border-secondary-foreground/10 bg-secondary-foreground/[0.06] px-3 py-1 text-sm text-secondary-foreground/70 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                    {activeTestimonial.treatment}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full border-secondary-foreground/15 bg-secondary-foreground/[0.08] text-secondary-foreground shadow-[0_10px_24px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-foreground/[0.14] hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]"
          >
            <ChevronLeft className="size-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          
          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'h-2.5 w-8 bg-primary shadow-[0_0_0_4px_rgba(124,144,130,0.16)]'
                    : 'size-2.5 bg-secondary-foreground/30 hover:bg-secondary-foreground/50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full border-secondary-foreground/15 bg-secondary-foreground/[0.08] text-secondary-foreground shadow-[0_10px_24px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-foreground/[0.14] hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]"
          >
            <ChevronRight className="size-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-secondary-foreground/10 pt-10 md:grid-cols-4 md:pt-12">
          {[
            { value: '500+', label: 'Happy Patients' },
            { value: '15+', label: 'Years Experience' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '5.0', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="mb-2 text-3xl font-semibold text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="text-secondary-foreground/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

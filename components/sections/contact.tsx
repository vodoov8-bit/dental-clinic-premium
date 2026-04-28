'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowRight, Star, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AppointmentModal } from '@/components/appointment-modal'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(123) 456-7890',
    href: 'tel:+1234567890',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@Luminadental.com',
    href: 'mailto:hello@Luminadental.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Wellness Avenue, Suite 200, New York, NY 10001',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Fri: 8am-6pm, Sat: 9am-2pm',
    href: null,
  },
]

const ctaReasons = [
  'Complimentary consultation for new patients',
  'Same-day emergency appointments',
  'Flexible payment options available',
  '0% financing on cosmetic procedures',
]

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="contact" className="scroll-mt-20">
      {/* Strong CTA Banner */}
      <div className="bg-secondary text-secondary-foreground py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-eyebrow mb-6 inline-flex items-center gap-2 bg-primary/20 text-primary-foreground">
              <Sparkles className="size-4" />
              Limited Time Offer
            </div>
            
            <h2 className="section-title mb-6">
              Start Your Smile Transformation Today
            </h2>
            
            <p className="section-description mx-auto mb-8 max-w-2xl text-secondary-foreground/80">
              Join over 500 patients who have discovered their most confident smile. 
              Book your complimentary consultation and receive a personalized treatment plan.
            </p>

            {/* CTA Reasons Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
              {ctaReasons.map((reason) => (
                <div key={reason} className="flex items-center gap-3 text-left">
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                  <span className="text-secondary-foreground/90 text-sm">{reason}</span>
                </div>
              ))}
            </div>

            {/* Main CTA Button */}
            <Button
              size="lg"
              className="h-14 bg-primary px-10 text-base text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsModalOpen(true)}
            >
              Book Your Free Consultation
              <ArrowRight className="ml-2 size-5" />
            </Button>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-1 mt-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-5 fill-primary text-primary" />
              ))}
              <span className="text-secondary-foreground/70 text-sm ml-2">
                Rated 5.0 by 500+ patients
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="section-padding bg-muted/30">
        <div className="section-container">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="section-eyebrow mb-6 bg-primary/10 text-primary">
              Get in Touch
            </span>
            <h3 className="section-title mb-6 text-2xl sm:text-3xl lg:text-4xl">
              We Would Love to Hear From You
            </h3>
            <p className="section-description">
              Have questions? Reach out to us through any of the channels below, 
              or simply book your appointment online.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <Card key={item.label} className="bg-card border-border">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="icon-container shrink-0">
                      <item.icon className="size-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground/90 mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{item.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Map Placeholder */}
              <Card className="bg-card border-border overflow-hidden">
                <div className="aspect-video bg-muted/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="size-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground/90">Map placeholder</p>
                    <p className="text-sm text-muted-foreground/80 mt-1">
                      Interactive map would be embedded here
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right - Secondary CTA Card */}
            <div className="flex flex-col">
              <Card className="bg-card border-border flex-1">
                <CardContent className="p-8 md:p-12 flex flex-col h-full">
                  <div className="flex-1">
                    <h4 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                      Ready to Get Started?
                    </h4>
                    <p className="text-muted-foreground/90 leading-relaxed mb-8">
                      Whether you are looking for a routine cleaning or a complete smile 
                      makeover, we are here to help. Book your appointment today and 
                      experience the Lumina difference.
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="size-2 rounded-full bg-primary" />
                        <span className="text-foreground/80">
                          Complimentary consultation for new patients
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="size-2 rounded-full bg-primary" />
                        <span className="text-foreground/80">
                          Flexible scheduling including evenings
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="size-2 rounded-full bg-primary" />
                        <span className="text-foreground/80">
                          Same-day emergency appointments available
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="h-12 w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Book Your Appointment
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  )
}

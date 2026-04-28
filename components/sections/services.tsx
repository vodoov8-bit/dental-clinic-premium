import { Sparkles, Smile, ShieldCheck, Clock, Stethoscope, HeartPulse } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description:
      'Transform your smile with veneers, bonding, and complete smile makeovers designed to enhance your natural beauty.',
    features: ['Porcelain Veneers', 'Dental Bonding', 'Smile Design'],
  },
  {
    icon: Smile,
    title: 'Teeth Whitening',
    description:
      'Achieve a brilliantly white smile with our professional-grade whitening treatments that deliver dramatic results.',
    features: ['In-Office Whitening', 'Take-Home Kits', 'Touch-Up Treatments'],
  },
  {
    icon: ShieldCheck,
    title: 'Dental Implants',
    description:
      'Restore missing teeth with permanent implant solutions that look, feel, and function like natural teeth.',
    features: ['Single Implants', 'Full Arch Restoration', 'Same-Day Implants'],
  },
  {
    icon: Clock,
    title: 'Invisalign',
    description:
      'Straighten your teeth discreetly with clear aligners. The modern alternative to traditional braces.',
    features: ['Custom Aligners', 'Progress Tracking', 'Fast Results'],
  },
  {
    icon: Stethoscope,
    title: 'General Dentistry',
    description:
      'Comprehensive preventive care to maintain your oral health, including cleanings, exams, and restorations.',
    features: ['Routine Cleanings', 'Digital X-Rays', 'Cavity Treatment'],
  },
  {
    icon: HeartPulse,
    title: 'Emergency Care',
    description:
      'Same-day emergency appointments for urgent dental needs. We are here when you need us most.',
    features: ['Same-Day Visits', 'Pain Relief', 'Tooth Repair'],
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-muted/30 scroll-mt-20">
      <div className="section-container">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center animate-fade-in-up stagger-1">
          <span className="section-eyebrow mb-6 bg-primary/10 text-primary">
            Our Services
          </span>
          <h2 className="section-title mb-6">
            Comprehensive Care for Every Smile
          </h2>
          <p className="section-description">
            From routine check-ups to complete smile transformations, we offer a full 
            spectrum of dental services tailored to your unique needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <Card
              key={service.title}
              className={`group bg-card border-border shadow-[0_14px_32px_-24px_rgba(26,46,53,0.22)] hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_22px_48px_-26px_rgba(26,46,53,0.3)] transition-all duration-300 animate-fade-in-up stagger-${idx + 1}`}
            >
              <CardContent className="p-8">
                {/* Icon */}
                <div className="icon-container-lg mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="size-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground/90 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground/90"
                    >
                      <span className="size-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <a href="#services">
              View All Services
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

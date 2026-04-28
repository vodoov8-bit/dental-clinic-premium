'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppointmentModal } from '@/components/appointment-modal'

const quickLinks = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

const services = [
  'Cosmetic Dentistry',
  'Teeth Whitening',
  'Dental Implants',
  'Invisalign',
  'General Dentistry',
  'Emergency Care',
]

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-semibold tracking-tight">Lumina</span>
              <span className="text-sm text-secondary-foreground/70 ml-2">Dental Studio</span>
            </Link>
            <p className="text-secondary-foreground/80 leading-relaxed mb-6">
              Premium dental care that combines artistry with advanced technology. 
              Your smile deserves nothing less than excellence.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="size-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="#"
                className="size-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="#"
                className="size-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-secondary-foreground/80">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-start gap-3 text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  <Phone className="size-5 mt-0.5 shrink-0" />
                  <span>(123) 456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@Luminadental.com"
                  className="flex items-start gap-3 text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  <Mail className="size-5 mt-0.5 shrink-0" />
                  <span>hello@Luminadental.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/80">
                <MapPin className="size-5 mt-0.5 shrink-0" />
                <span>
                  123 Wellness Avenue<br />
                  Suite 200<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/80">
                <Clock className="size-5 mt-0.5 shrink-0" />
                <span>
                  Mon - Fri: 8am - 6pm<br />
                  Sat: 9am - 2pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 md:p-12 rounded-2xl bg-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              Ready to Transform Your Smile?
            </h3>
            <p className="text-secondary-foreground/80">
              Schedule your consultation today and take the first step.
            </p>
          </div>
          <Button
            size="lg"
            className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            Book Your Appointment
          </Button>
        </div>

        <AppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-foreground/60">
              &copy; {new Date().getFullYear()} Lumina Dental Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

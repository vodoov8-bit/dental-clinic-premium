'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AppointmentModal } from '@/components/appointment-modal'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              Lumina
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              Dental Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="size-4" />
              (123) 456-7890
            </a>
            <Button
              size="lg"
              className="rounded-full px-6 bg-primary text-primary-foreground shadow-[0_10px_24px_-16px_rgba(124,144,130,0.72)] ring-1 ring-primary/25 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-primary/95 hover:shadow-[0_14px_30px_-18px_rgba(124,144,130,0.85)] hover:ring-primary/35 active:scale-[0.985]"
              onClick={() => setIsModalOpen(true)}
            >
              Book Appointment
            </Button>
          </div>

          <AppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-md bg-background px-6 pt-8 pb-10 data-[state=open]:animate-in data-[state=open]:slide-in-from-right-4 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-4 data-[state=closed]:fade-out-0 duration-300"
            >
              <SheetHeader className="pb-4">
                <SheetTitle className="text-center">
                  <span className="text-xl font-semibold">Lumina</span>
                  <span className="text-sm text-muted-foreground ml-2">Dental Studio</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex h-full flex-col justify-between">
                <div className="flex flex-col items-center gap-1 py-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="w-full rounded-xl px-4 py-4 text-center text-lg font-semibold tracking-wide text-foreground transition-all duration-200 hover:bg-muted/60 hover:text-primary active:scale-[0.99] active:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                </div>
                <hr className="my-6 border-border" />
                <div className="flex flex-col items-center gap-4 pb-2">
                <a
                  href="tel:+1234567890"
                  className="flex w-full items-center justify-center gap-3 rounded-xl px-4 py-4 text-center text-lg font-semibold tracking-wide text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground active:scale-[0.99] active:bg-muted"
                >
                  <Phone className="size-5" />
                  (123) 456-7890
                </a>
                <Button 
                  size="lg" 
                  className="mt-2 w-full rounded-2xl py-6 text-base font-semibold tracking-wide bg-primary text-primary-foreground shadow-[0_14px_34px_-18px_rgba(124,144,130,0.82)] ring-1 ring-primary/30 transition-all duration-300 ease-out hover:bg-primary/95 hover:shadow-[0_18px_36px_-20px_rgba(124,144,130,0.9)] hover:ring-primary/40 active:scale-[0.99]"
                  onClick={() => {
                    setIsOpen(false)
                    setIsModalOpen(true)
                  }}
                >
                  Book Appointment
                </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}

'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { 
  Award, 
  Clock, 
  Heart, 
  Shield, 
  Sparkles, 
  Users,
  ArrowRight 
} from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: 'Award-Winning Care',
    description: 'Recognized as a top dental practice with 12 industry awards for excellence in cosmetic and restorative dentistry.',
  },
  {
    icon: Sparkles,
    title: 'Advanced Technology',
    description: 'State-of-the-art equipment including 3D imaging, laser dentistry, and digital smile design for precise, comfortable treatments.',
  },
  {
    icon: Heart,
    title: 'Patient-Centered Approach',
    description: 'We listen to your concerns and customize every treatment plan to match your unique goals and comfort level.',
  },
  {
    icon: Shield,
    title: '15+ Years of Experience',
    description: 'Dr. Aris Thorne brings over 15 years of expertise and has transformed thousands of smiles with exceptional results.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Early morning, evening, and weekend appointments available. Same-day emergency care when you need it most.',
  },
  {
    icon: Users,
    title: 'Trusted by 500+ Patients',
    description: 'Join our family of satisfied patients who have rated us 5 stars for our personalized care and stunning results.',
  },
]

interface WhyChooseUsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBookAppointment?: () => void
}

export function WhyChooseUsModal({ open, onOpenChange, onBookAppointment }: WhyChooseUsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader className="text-left pb-4">
          <DialogTitle className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Why Choose Lumina Dental Studio?
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Discover what makes our practice the preferred choice for discerning patients.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {reasons.map((reason, index) => (
            <div 
              key={reason.title} 
              className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="size-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                <reason.icon className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <Button 
            size="lg" 
            className="w-full rounded-full h-14 text-base"
            onClick={() => {
              onOpenChange(false)
              onBookAppointment?.()
            }}
          >
            Book Your Consultation
            <ArrowRight className="ml-2 size-5" />
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-3">
            Complimentary consultation for new patients
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

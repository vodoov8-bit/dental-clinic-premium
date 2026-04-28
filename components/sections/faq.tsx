'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Mail, Phone } from 'lucide-react'

const faqs = [
  {
    question: 'What should I expect during my first visit?',
    answer:
      'Your first visit begins with a warm welcome from our team. We will conduct a comprehensive examination, including digital X-rays if needed, and discuss your dental history and goals. Dr. Thorne will personally review your results and create a customized treatment plan. The entire visit typically takes 60-90 minutes.',
  },
  {
    question: 'Do you accept dental insurance?',
    answer:
      'Yes, we accept most major dental insurance plans. Our team will verify your coverage before your appointment and help maximize your benefits. We also offer flexible payment plans and 0% financing options for treatments not covered by insurance.',
  },
  {
    question: 'How long does teeth whitening last?',
    answer:
      'Professional whitening results typically last 1-3 years, depending on your lifestyle habits. Avoiding staining foods and beverages, along with good oral hygiene, helps maintain your bright smile. We also provide take-home touch-up kits for maintenance.',
  },
  {
    question: 'Is Invisalign right for me?',
    answer:
      'Invisalign is an excellent option for most adults and teens seeking to straighten their teeth discreetly. During your consultation, Dr. Thorne will evaluate your bite and alignment to determine if Invisalign is the best solution for your specific needs.',
  },
  {
    question: 'What are porcelain veneers and how long do they last?',
    answer:
      'Porcelain veneers are thin, custom-made shells that cover the front surface of your teeth to improve their appearance. With proper care, high-quality veneers can last 15-20 years. They are stain-resistant and provide a natural, beautiful smile.',
  },
  {
    question: 'Do you offer emergency dental services?',
    answer:
      'Yes, we reserve time in our schedule for dental emergencies. If you are experiencing severe tooth pain, a broken tooth, or other urgent dental issues, call us immediately. We strive to see emergency patients the same day whenever possible.',
  },
  {
    question: 'What financing options are available?',
    answer:
      'We offer several financing options to make quality dental care accessible. These include 0% APR financing for qualified patients, flexible payment plans, and acceptance of major credit cards. Our team will work with you to find a payment solution that fits your budget.',
  },
  {
    question: 'How do I prepare for a cosmetic dental procedure?',
    answer:
      'Preparation varies by procedure, but generally includes maintaining good oral hygiene and attending any pre-treatment appointments. For certain procedures, you may be advised to avoid eating or drinking beforehand. We will provide detailed instructions specific to your treatment.',
  },
]

export default function FAQ() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <section id="faq" className="section-padding scroll-mt-20">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Content */}
          <div>
            <span className="section-eyebrow mb-6 bg-primary/10 text-primary">
              FAQ
            </span>
            <h2 className="section-title mb-6">
              Questions? We Have Answers
            </h2>
            <p className="section-description mb-8">
              We believe informed patients make the best decisions about their dental health. 
              Here are answers to some of our most frequently asked questions.
            </p>
            <div className="rounded-2xl border border-border bg-muted/50 p-7">
              <h3 className="font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Our team is here to help. Reach out and we will get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsContactOpen(true)}>
                Contact Us
              </Button>
            </div>
          </div>

          {/* Right Content - Accordion */}
          <div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-border bg-card px-7 data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-medium pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
              We&apos;ll get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-center gap-3">
                <div className="icon-container shrink-0">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone number</p>
                  <a
                    href="tel:+1234567890"
                    className="font-medium text-foreground"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-center gap-3">
                <div className="icon-container shrink-0">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:hello@Luminadental.com"
                    className="font-medium text-foreground"
                  >
                    hello@Luminadental.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

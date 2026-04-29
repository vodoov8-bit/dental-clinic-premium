'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, Clock, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const services = [
  { id: 'consultation', name: 'New Patient Consultation', duration: '60 min', complimentary: true },
  { id: 'cleaning', name: 'Professional Cleaning', duration: '45 min' },
  { id: 'whitening', name: 'Teeth Whitening', duration: '90 min' },
  { id: 'invisalign', name: 'Invisalign Consultation', duration: '45 min', complimentary: true },
  { id: 'veneers', name: 'Veneer Consultation', duration: '60 min', complimentary: true },
  { id: 'emergency', name: 'Emergency Visit', duration: '30 min' },
]

const doctors = [
  { id: 'dr-ahmed-khan', name: 'Dr. Ahmed Khan', specialty: 'General Dentist' },
  { id: 'dr-sarah-malik', name: 'Dr. Sarah Malik', specialty: 'Orthodontist' },
  { id: 'dr-ali-raza', name: 'Dr. Ali Raza', specialty: 'Cosmetic Dentist' },
]

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
]

const N8N_BOOKING_POST_WEBHOOK_PRODUCTION_URL =
  'https://34.60.172.142.sslip.io/webhook/352af969-5636-4752-acc8-a8d3c9b43268'

/** Converts UI label time (e.g. "2:30 PM") to 24h "HH:mm". */
function normalizeTimeTo24Hour(time12h: string): string {
  const m = time12h.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!m) return time12h
  let h = parseInt(m[1], 10)
  const minutes = m[2]
  const ap = m[3].toUpperCase()
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${minutes}`
}

function createSlotKey(date: Date, time: string): string {
  return `${format(date, 'yyyy-MM-dd')}|${normalizeTimeTo24Hour(time)}`
}

/** Normalizes server slot keys to canonical "yyyy-MM-dd|HH:mm". */
function normalizeBookedSlotKey(slot: string): string | null {
  const [datePart, timePart] = slot.split('|')
  if (!datePart || !timePart) return null

  const normalizedDate = datePart.trim()
  const normalizedTime = normalizeTimeTo24Hour(timePart.trim().toUpperCase())

  if (!normalizedDate || !normalizedTime) return null
  return `${normalizedDate}|${normalizedTime}`
}

function extractBookedSlotsFromResponse(data: unknown): string[] {
  if (Array.isArray(data)) {
    return data.filter((slot): slot is string => typeof slot === 'string')
  }

  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>

    if (Array.isArray(record.bookedSlots)) {
      return record.bookedSlots.filter((slot): slot is string => typeof slot === 'string')
    }

    if (Array.isArray(record.slots)) {
      return record.slots.filter((slot): slot is string => typeof slot === 'string')
    }
  }

  return []
}

interface AppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppointmentModal({ open, onOpenChange }: AppointmentModalProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [confirmationDetails, setConfirmationDetails] = useState<{
    doctorName: string
    date: string
    time: string
  } | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const resetForm = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedDoctor(null)
    setSelectedDate(undefined)
    setSelectedTime(null)
    setConfirmationDetails(null)
    setFormData({ firstName: '', lastName: '', email: '', phone: '' })
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(resetForm, 300)
  }

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleClose()
      return
    }

    onOpenChange(true)
  }

  const handleSubmit = async () => {
    if (!selectedService || !selectedDoctor || !selectedDate || !selectedTime) return

    setSubmitError(null)

    try {
      const envWebhookUrl = process.env.NEXT_PUBLIC_N8N_BOOKING_POST_WEBHOOK_URL?.trim()
      const envUrlUsesLocalhost =
        Boolean(envWebhookUrl) &&
        (envWebhookUrl.includes('localhost') ||
          envWebhookUrl.includes('127.0.0.1') ||
          envWebhookUrl.includes('0.0.0.0'))
      const submitWebhookUrl =
        envWebhookUrl && !envUrlUsesLocalhost
          ? envWebhookUrl
          : N8N_BOOKING_POST_WEBHOOK_PRODUCTION_URL

      console.log('[booking-submit] POST URL:', submitWebhookUrl)

      const response = await fetch(submitWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          serviceName: services.find((s) => s.id === selectedService)?.name ?? selectedService,
          doctorName: doctors.find((d) => d.id === selectedDoctor)?.name ?? selectedDoctor,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: normalizeTimeTo24Hour(selectedTime),
        }),
      })

      console.log('[booking-submit] response status:', response.status, response.statusText)

      const rawResponseText = await response.text()
      const responseContentType = response.headers.get('content-type') ?? ''

      if (responseContentType.includes('application/json')) {
        try {
          const parsedJson = rawResponseText ? JSON.parse(rawResponseText) : null
          console.log('[booking-submit] response json:', parsedJson)
        } catch {
          console.log('[booking-submit] response text (invalid json):', rawResponseText)
        }
      } else {
        console.log('[booking-submit] response text:', rawResponseText)
      }

      if (!response.ok) {
        throw new Error('Failed to submit booking')
      }

      setConfirmationDetails({
        doctorName: doctors.find((d) => d.id === selectedDoctor)?.name ?? selectedDoctor,
        date: format(selectedDate, 'MMMM d, yyyy'),
        time: selectedTime,
      })
      setStep(5)
      setFormData({ firstName: '', lastName: '', email: '', phone: '' })
      setSelectedService(null)
      setSelectedDoctor(null)
      setSelectedDate(undefined)
      setSelectedTime(null)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    }
  }

  const bookedSlotsSet = useMemo(
    () => new Set(bookedSlots.map(normalizeBookedSlotKey).filter((slot): slot is string => Boolean(slot))),
    [bookedSlots]
  )

  const handleSelectTimeSlot = useCallback(
    (time: string) => {
      if (!selectedDate) return
      const slotKey = createSlotKey(selectedDate, time)
      if (bookedSlotsSet.has(slotKey)) return
      setSelectedTime(time)
    },
    [bookedSlotsSet, selectedDate]
  )

  const handleContinueFromDateTime = useCallback(() => {
    if (!selectedDate || !selectedTime) return
    setStep(4)
  }, [selectedDate, selectedTime])

  useEffect(() => {
    if (!open || step !== 3) return

    let isCancelled = false

    const fetchBookedSlots = async () => {
      try {
        const response = await fetch('https://34.60.172.142.sslip.io/webhook/59e14cb9-4216-4f0e-afdf-bc9755f43810', {
          method: 'GET',
        })

        console.log('booked-slots response:', response)
        if (!response.ok) return

        const data = await response.json()
        console.log('fetched booked-slots payload:', data)
        if (isCancelled) return

        const normalizedSlots = extractBookedSlotsFromResponse(data)
          .map(normalizeBookedSlotKey)
          .filter((slot): slot is string => Boolean(slot))

        console.log('bookedSlots:', normalizedSlots)
        setBookedSlots(normalizedSlots)
      } catch {
        if (!isCancelled) {
          setBookedSlots([])
        }
      }
    }

    fetchBookedSlots()

    return () => {
      isCancelled = true
    }
  }, [open, step])

  const selectedSlotKey =
    selectedDate && selectedTime
      ? createSlotKey(selectedDate, selectedTime)
      : null
  const selectedSlotIsBooked = selectedSlotKey ? bookedSlotsSet.has(selectedSlotKey) : false

  useEffect(() => {
    if (selectedSlotIsBooked) {
      setSelectedTime(null)
    }
  }, [selectedSlotIsBooked])

  const canProceedStep1 = selectedService !== null
  const canProceedStep2 = selectedDoctor !== null
  const canProceedStep3 = Boolean(selectedDate && selectedTime && !selectedSlotIsBooked)
  const canProceedStep4 = formData.firstName && formData.lastName && formData.email && formData.phone

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="w-[calc(100vw-1rem)] max-w-[600px] p-0 overflow-hidden max-h-[90vh] flex flex-col sm:w-full">
        {/* Progress Bar */}
        {step < 5 && (
          <div className="flex gap-1 p-4 pb-0">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  s <= step ? 'bg-primary' : 'bg-muted'
                )}
              />
            ))}
          </div>
        )}

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden">
            <DialogHeader className="px-4 pt-6 sm:px-6 mb-6">
              <DialogTitle className="text-2xl">Select a Service</DialogTitle>
              <DialogDescription>
                Choose the service you would like to book
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 space-y-3 overflow-y-auto overflow-x-hidden px-4 sm:px-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    'w-full p-4 rounded-xl border text-left transition-all',
                    selectedService === service.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/30 hover:bg-muted/30'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                        {service.complimentary && (
                          <span className="text-xs font-medium text-primary">Complimentary</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {selectedService === service.id && (
                        <div className="size-5 rounded-full bg-primary flex items-center justify-center mt-1 ml-auto">
                          <Check className="size-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="sticky bottom-0 mt-4 flex justify-end border-t bg-background px-4 py-4 sm:px-6">
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="rounded-full px-6"
              >
                Continue
                <ChevronRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Doctor */}
        {step === 2 && (
          <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden">
            <DialogHeader className="px-4 pt-6 sm:px-6 mb-6">
              <DialogTitle className="text-2xl">Select a Doctor</DialogTitle>
              <DialogDescription>
                Choose your preferred doctor
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 space-y-3 overflow-y-auto overflow-x-hidden px-4 sm:px-6">
              {doctors.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor.id)}
                  className={cn(
                    'w-full p-4 rounded-xl border text-left transition-all',
                    selectedDoctor === doctor.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/30 hover:bg-muted/30'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <div className="text-right">
                      {selectedDoctor === doctor.id && (
                        <div className="size-5 rounded-full bg-primary flex items-center justify-center mt-1 ml-auto">
                          <Check className="size-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="sticky bottom-0 mt-4 flex justify-between border-t bg-background px-4 py-4 sm:px-6">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="rounded-full"
              >
                <ChevronLeft className="mr-2 size-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="rounded-full px-6"
              >
                Continue
                <ChevronRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Select Date & Time */}
        {step === 3 && (
          <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden">
            <DialogHeader className="px-4 pt-6 sm:px-6 mb-6">
              <DialogTitle className="text-2xl">Choose Date & Time</DialogTitle>
              <DialogDescription>
                Select your preferred appointment slot
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 min-w-0">
              {/* Calendar */}
              <div className="border rounded-xl p-3 min-w-0 overflow-x-auto">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="w-full p-0"
                  classNames={{ root: 'w-full' }}
                />
              </div>

              {/* Time Slots */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    (() => {
                      const slotKey = selectedDate
                        ? `${format(selectedDate, 'yyyy-MM-dd')}|${normalizeTimeTo24Hour(time)}`
                        : ''
                      const isBooked = selectedDate ? bookedSlotsSet.has(slotKey) : false

                      return (
                        <button
                          key={time}
                          type="button"
                          onPointerUp={() => {
                            if (isBooked) return
                            handleSelectTimeSlot(time)
                          }}
                          onClick={() => {
                            if (isBooked) return
                            handleSelectTimeSlot(time)
                          }}
                          disabled={!selectedDate || isBooked}
                          className={cn(
                            'p-2.5 rounded-lg border text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed',
                            selectedTime === time && !isBooked
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary/30 hover:bg-muted/30',
                            isBooked && 'opacity-50 cursor-not-allowed'
                          )}
                        >
                          {time}
                        </button>
                      )
                    })()
                  ))}
                </div>
              </div>
            </div>
            </div>
            <div className="sticky bottom-0 mt-4 flex justify-between border-t bg-background px-4 py-4 sm:px-6">
              <Button
                variant="ghost"
                onClick={() => setStep(2)}
                className="rounded-full"
              >
                <ChevronLeft className="mr-2 size-4" />
                Back
              </Button>
              <Button
                onClick={handleContinueFromDateTime}
                disabled={!canProceedStep3}
                className="rounded-full px-6"
              >
                Continue
                <ChevronRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Contact Information */}
        {step === 4 && (
          <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden">
            <DialogHeader className="px-4 pt-6 sm:px-6 mb-6">
              <DialogTitle className="text-2xl">Your Information</DialogTitle>
              <DialogDescription>
                Please provide your contact details
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-4 sm:px-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                <h4 className="font-medium mb-3">Appointment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">
                      {services.find((s) => s.id === selectedService)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor:</span>
                    <span className="font-medium">
                      {doctors.find((d) => d.id === selectedDoctor)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>
              </div>
            </div>
            {submitError && (
              <div className="px-4 sm:px-6 pt-2">
                <p className="text-sm text-destructive">{submitError}</p>
              </div>
            )}
            <div className="sticky bottom-0 mt-4 flex justify-between border-t bg-background px-4 py-4 sm:px-6">
              <Button
                variant="ghost"
                onClick={() => setStep(3)}
                className="rounded-full"
              >
                <ChevronLeft className="mr-2 size-4" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!canProceedStep4}
                className="rounded-full px-6"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="flex items-center justify-center px-6 py-10 sm:px-10">
            <div className="w-full max-w-md rounded-2xl border border-border/70 bg-background p-8 text-center shadow-sm">
              <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-8 text-primary" />
              </div>

              <h2 className="mb-2 text-2xl font-semibold tracking-tight">Appointment Confirmed ✅</h2>
              <p className="mb-6 text-muted-foreground">
                Your appointment has been successfully booked.
              </p>

              <div className="mx-auto mb-4 w-full max-w-sm rounded-xl border border-border bg-muted/30 p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Doctor Name</span>
                    <span className="font-medium text-right">{confirmationDetails?.doctorName ?? '-'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-right">{confirmationDetails?.date ?? '-'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-right">{confirmationDetails?.time ?? '-'}</span>
                  </div>
                </div>
              </div>

              <p className="mb-6 text-xs text-muted-foreground">
                A confirmation email has been sent.
              </p>

              <Button onClick={resetForm} className="rounded-full px-8">
                Book Another Appointment
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

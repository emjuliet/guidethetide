import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { date, time, service } = await request.json()

    if (!date || !time || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check for existing confirmed bookings at this date/time
    const { data: existingBookings, error } = await supabase
      .from('bookings')
      .select('id, booking_status, reservation_expires_at')
      .eq('booking_date', date)
      .eq('booking_time', time)
      .in('booking_status', ['confirmed', 'reserved'])

    if (error) {
      throw error
    }

    // Check if slot is taken by confirmed booking
    const confirmedBooking = existingBookings?.find(b => b.booking_status === 'confirmed')
    if (confirmedBooking) {
      return NextResponse.json({
        available: false,
        reason: 'Time slot already booked'
      })
    }

    // Check if slot is reserved and reservation hasn't expired
    const activeReservation = existingBookings?.find(b => {
      if (b.booking_status !== 'reserved') return false
      
      const expiresAt = new Date(b.reservation_expires_at)
      const now = new Date()
      return expiresAt > now
    })

    if (activeReservation) {
      return NextResponse.json({
        available: false,
        reason: 'Time slot temporarily reserved'
      })
    }

    // Slot is available
    return NextResponse.json({
      available: true
    })

  } catch (error: any) {
    console.error('Availability check error:', error)
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    )
  }
}
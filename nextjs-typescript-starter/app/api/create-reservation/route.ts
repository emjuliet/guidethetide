import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { bookingData, pricing } = await request.json()

    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.service || !bookingData.date) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      )
    }

    // Double-check availability before creating reservation
    const { data: existingBookings, error: checkError } = await supabase
      .from('bookings')
      .select('id')
      .eq('booking_date', bookingData.date)
      .eq('booking_time', bookingData.time)
      .in('booking_status', ['confirmed', 'reserved'])
      .gte('reservation_expires_at', new Date().toISOString())

    if (checkError) {
      throw checkError
    }

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Time slot no longer available' },
        { status: 409 }
      )
    }

    // Create 15-minute reservation
    const reservationExpiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
    
    const reservation = {
      id: randomUUID(),
      customer_name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      service_type: bookingData.service,
      booking_date: bookingData.date,
      booking_time: bookingData.time,
      number_of_people: bookingData.people,
      notes: bookingData.notes,
      addons: bookingData.addons,
      base_price: pricing.basePrice,
      addon_costs: pricing.addonCosts,
      total_amount: pricing.total,
      booking_fee_paid: 0, // Not paid yet
      remaining_balance: pricing.total,
      payment_status: 'pending',
      booking_status: 'reserved',
      reservation_expires_at: reservationExpiresAt.toISOString(),
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert(reservation)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      reservationId: data.id,
      expiresAt: reservationExpiresAt.toISOString(),
      message: 'Time slot reserved for 15 minutes'
    })

  } catch (error: any) {
    console.error('Reservation creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    )
  }
}
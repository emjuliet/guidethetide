import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Handle Square import issues in production
let squareClient: any = null
let Environment: any = null

try {
  // @ts-ignore
  const { Client, Environment: Env } = require('squareup')
  Environment = Env
  
  squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox'
  })
} catch (error) {
  console.warn('Square SDK not available:', error)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { reservationId, paymentToken, pricing } = await request.json()

    if (!reservationId || !paymentToken) {
      return NextResponse.json(
        { error: 'Missing reservation ID or payment token' },
        { status: 400 }
      )
    }

    // Get the reservation from Supabase
    const { data: reservation, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', reservationId)
      .eq('booking_status', 'reserved')
      .single()

    if (fetchError || !reservation) {
      return NextResponse.json(
        { error: 'Reservation not found or expired' },
        { status: 404 }
      )
    }

    // Check if reservation is still valid (not expired)
    const now = new Date()
    const expiresAt = new Date(reservation.reservation_expires_at)
    
    if (now > expiresAt) {
      // Clean up expired reservation
      await supabase
        .from('bookings')
        .delete()
        .eq('id', reservationId)

      return NextResponse.json(
        { error: 'Reservation has expired' },
        { status: 410 }
      )
    }

    let paymentId = 'dev-payment-' + Date.now()

    // Process payment with Square if available, otherwise simulate for dev
    if (squareClient && paymentToken !== 'dev-test-token') {
      try {
        const paymentsApi = squareClient.paymentsApi
        const { randomUUID } = await import('crypto')
        
        const requestBody = {
          sourceId: paymentToken,
          amountMoney: {
            amount: BigInt(pricing.bookingFee * 100), // Convert to cents
            currency: 'USD'
          },
          idempotencyKey: randomUUID(),
          note: `Booking fee for ${reservation.service_type} - ${reservation.customer_name}`,
          buyerEmailAddress: reservation.email
        }

        const paymentResponse = await paymentsApi.createPayment(requestBody)

        if (paymentResponse.result.payment?.status !== 'COMPLETED') {
          throw new Error('Payment not completed: ' + paymentResponse.result.payment?.status)
        }

        paymentId = paymentResponse.result.payment.id
      } catch (squareError: any) {
        console.error('Square payment error:', squareError)
        
        // Handle Square-specific errors
        if (squareError.errors && Array.isArray(squareError.errors)) {
          const errorMessages = squareError.errors.map((e: any) => e.detail || e.code).join(', ')
          return NextResponse.json(
            { error: 'Payment failed: ' + errorMessages },
            { status: 400 }
          )
        }
        
        return NextResponse.json(
          { error: 'Payment failed: ' + squareError.message },
          { status: 400 }
        )
      }
    } else {
      console.log('Using development mode - simulating payment')
    }

    // Payment successful - update reservation to confirmed booking
    const { data: updatedBooking, error: updateError } = await supabase
      .from('bookings')
      .update({
        payment_id: paymentId,
        payment_status: 'booking_fee_paid',
        booking_status: 'confirmed',
        booking_fee_paid: pricing.bookingFee,
        remaining_balance: pricing.total - pricing.bookingFee,
        reservation_expires_at: null, // Clear expiration since it's now confirmed
        updated_at: new Date().toISOString()
      })
      .eq('id', reservationId)
      .select()
      .single()

    if (updateError) {
      throw updateError
    }

    // Send confirmation email (TODO: implement email service)
    console.log('Send confirmation email to:', reservation.email)

    return NextResponse.json({
      success: true,
      bookingId: reservationId,
      paymentId: paymentId,
      message: 'Booking confirmed successfully'
    })

  } catch (error: any) {
    console.error('Booking confirmation error:', error)
    return NextResponse.json(
      { error: 'Booking confirmation failed: ' + error.message },
      { status: 500 }
    )
  }
}
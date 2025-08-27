import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

// Handle Square import issues in production
let squareClient: any = null

try {
  // @ts-ignore
  const { Client } = require('squareup')
  
  squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox'
  })
} catch (error) {
  console.warn('Square SDK not available:', error)
}

export async function POST(request: NextRequest) {
  try {
    const { bookingData, pricing, paymentToken } = await request.json()

    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.service) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      )
    }

    if (!paymentToken) {
      return NextResponse.json(
        { error: 'Payment token is required' },
        { status: 400 }
      )
    }

    // Process payment with Square
    const paymentsApi = squareClient.paymentsApi
    
    const requestBody = {
      sourceId: paymentToken,
      amountMoney: {
        amount: BigInt(pricing.bookingFee * 100), // Convert to cents
        currency: 'USD'
      },
      idempotencyKey: randomUUID(),
      note: `Booking fee for ${bookingData.service} - ${bookingData.name}`,
      buyerEmailAddress: bookingData.email
    }

    const paymentResponse = await paymentsApi.createPayment(requestBody)

    if (paymentResponse.result.payment?.status === 'COMPLETED') {
      // Payment successful - now save to Supabase
      const booking = {
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
        booking_fee_paid: pricing.bookingFee,
        remaining_balance: pricing.total - pricing.bookingFee,
        payment_id: paymentResponse.result.payment.id,
        payment_status: 'booking_fee_paid',
        booking_status: 'confirmed',
        created_at: new Date().toISOString()
      }

      // TODO: Save to Supabase database
      // const supabaseResult = await supabase.from('bookings').insert(booking)

      // For now, log the booking (replace with Supabase insert)
      console.log('Booking to save:', booking)

      // Send confirmation email
      // TODO: Implement email service
      console.log('Send confirmation email to:', bookingData.email)

      return NextResponse.json({
        success: true,
        bookingId: booking.id,
        paymentId: paymentResponse.result.payment.id,
        message: 'Booking confirmed and payment processed successfully'
      })

    } else {
      throw new Error('Payment not completed: ' + paymentResponse.result.payment?.status)
    }

  } catch (error: any) {
    console.error('Booking processing error:', error)
    
    // Handle Square-specific errors
    if (error.errors && Array.isArray(error.errors)) {
      const errorMessages = error.errors.map((e: any) => e.detail || e.code).join(', ')
      return NextResponse.json(
        { error: 'Payment failed: ' + errorMessages },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Booking processing failed: ' + error.message },
      { status: 500 }
    )
  }
}
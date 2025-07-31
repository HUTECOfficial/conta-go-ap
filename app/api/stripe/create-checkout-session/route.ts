import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json()
    
    let priceId: string
    let planName: string
    
    // Configurar el price_id según el plan seleccionado
    switch (plan) {
      case 'digital':
        priceId = process.env.STRIPE_DIGITAL_PRICE_ID!
        planName = 'Plan Digital'
        break
      case 'personal':
        priceId = process.env.STRIPE_PERSONAL_PRICE_ID!
        planName = 'Plan Personal'
        break
      default:
        return NextResponse.json(
          { error: 'Plan no válido' },
          { status: 400 }
        )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // Cambiado a subscription para planes mensuales
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
      metadata: {
        plan: plan,
        planName: planName,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error al crear la sesión de Stripe:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

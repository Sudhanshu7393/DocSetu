// src/app/api/payment/create-order/route.ts
// Razorpay payment order creation
// Install: npm install razorpay

import { NextResponse } from "next/server";

const PLANS = {
  premium_monthly: { amount: 29900, currency: "INR", description: "DocSetu Premium - Monthly" },
  premium_annual: { amount: 286800, currency: "INR", description: "DocSetu Premium - Annual (20% off)" },
  business_monthly: { amount: 99900, currency: "INR", description: "DocSetu Business - Monthly" },
  business_annual: { amount: 958800, currency: "INR", description: "DocSetu Business - Annual (20% off)" },
};

export async function POST(request: Request) {
  try {
    const { plan, userId } = await request.json();

    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ success: false, error: "Invalid plan" }, { status: 400 });
    }

    const planDetails = PLANS[plan as keyof typeof PLANS];

    // In production: create Razorpay order
    // const Razorpay = require("razorpay");
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    // const order = await razorpay.orders.create({
    //   amount: planDetails.amount,
    //   currency: planDetails.currency,
    //   receipt: `order_${userId}_${Date.now()}`,
    //   notes: { plan, userId },
    // });
    // return NextResponse.json({ success: true, order });

    // Mock response until Razorpay is installed
    return NextResponse.json({
      success: true,
      order: {
        id: `order_mock_${Date.now()}`,
        amount: planDetails.amount,
        currency: planDetails.currency,
        description: planDetails.description,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Payment initialization failed" }, { status: 500 });
  }
}

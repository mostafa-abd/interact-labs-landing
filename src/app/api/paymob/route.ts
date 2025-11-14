import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { amount, currency, product_name, quantity, billing_data } = await req.json();

    // Validate required fields
    if (!amount || !currency || !product_name || !quantity) {
      throw new Error("Missing required fields: amount, currency, product_name, or quantity");
    }

    const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
    const INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
    const IFRAME_ID = process.env.PAYMOB_IFRAME_ID;
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

    if (!PAYMOB_API_KEY || !INTEGRATION_ID || !IFRAME_ID || !NEXT_PUBLIC_URL) {
      throw new Error("Missing Paymob configuration in environment variables");
    }

    // 1. Auth token
    const authRes = await fetch("https://accept.paymobsolutions.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: PAYMOB_API_KEY }),
    });

    if (!authRes.ok) {
      const errorData = await authRes.json().catch(() => ({}));
      throw new Error(`Auth failed: ${authRes.status} - ${JSON.stringify(errorData)}`);
    }

    const authData = await authRes.json();
    const token = authData.token;
    if (!token) {
      throw new Error(`Auth token failed: ${JSON.stringify(authData)}`);
    }

    // 2. Create order
    const orderRes = await fetch("https://accept.paymobsolutions.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: false,
        amount_cents: Math.round(amount * 100),
        currency,
        items: [
          {
            name: product_name,
            amount_cents: Math.round((amount / quantity) * 100),
            quantity,
          },
        ],
      }),
    });

    if (!orderRes.ok) {
      const errorData = await orderRes.json().catch(() => ({}));
      throw new Error(`Order creation failed: ${orderRes.status} - ${JSON.stringify(errorData)}`);
    }

    const orderData = await orderRes.json();
    const orderId = orderData.id;
    if (!orderId) {
      throw new Error(`Order creation failed - no order ID: ${JSON.stringify(orderData)}`);
    }

    // 3. Generate payment key
    const paymentKeyRes = await fetch("https://accept.paymobsolutions.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: Math.round(amount * 100),
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: billing_data?.apartment || "1",
          email: billing_data?.email,
          floor: billing_data?.floor || "1",
          first_name: billing_data?.first_name,
          last_name: billing_data?.last_name,
          street: billing_data?.street || "1",
          building: billing_data?.building || "1",
          phone_number: billing_data?.phone_number,
          city: billing_data?.city || "1",
          country: billing_data?.country || "EG",
          state: billing_data?.state || "1",
        },
        currency,
        integration_id: INTEGRATION_ID,
      }),
    });

    if (!paymentKeyRes.ok) {
      const errorData = await paymentKeyRes.json().catch(() => ({}));
      throw new Error(`Payment key generation failed: ${paymentKeyRes.status} - ${JSON.stringify(errorData)}`);
    }

    const paymentKeyData = await paymentKeyRes.json();
    const paymentToken = paymentKeyData.token;
    if (!paymentToken) {
      throw new Error(`Payment key failed - no token: ${JSON.stringify(paymentKeyData)}`);
    }

    // Encode redirect URL properly
    const redirectUrl = encodeURIComponent(`${NEXT_PUBLIC_URL}/api/paymob/response`);
    const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentToken}&redirect_url=${redirectUrl}`;
    
    return NextResponse.json({ success: true, iframeUrl });
  } catch (error: any) {
    console.error("🔥 Paymob Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Unknown error",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined
      }, 
      { status: 500 }
    );
  }
}

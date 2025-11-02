import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, name, email, phone, address, state, country, product } = await req.json();

    if (!amount || !name || !email || !phone || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const amountCents = Math.round(Number(amount) * 100);
    const firstName = (name || "").split(" ")[0] || "User";
    const lastName = (name || "").split(" ").slice(1).join(" ") || "Tester";
    const phoneIntl =
      String(phone).startsWith("+")
        ? String(phone)
        : `+20${String(phone).replace(/\D/g, "")}`;
    const currency = "EGP";

    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.PAYMOB_API_KEY,
      }),
    });
    const authData = await authRes.json();

    if (!authRes.ok || !authData.token) {
      return NextResponse.json(
        { error: "Auth failed", details: authData },
        { status: 500 }
      );
    }

    const token = authData.token;

    const orderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: false,
        amount_cents: amountCents,
        currency,
        items: product ? [  
          {
            name: product.name,
            amount_cents: Math.round(Number(product.price) * 100),  
            description: `${product.name} - ${product.qty} units`,
            quantity: product.qty,
          }
        ] : [],
      }),
    });
    const orderData = await orderRes.json();

    if (!orderRes.ok || !orderData.id) {
      return NextResponse.json(
        { error: "Order creation failed", details: orderData },
        { status: 500 }
      );
    }

    const billing_data = {
      apartment: "NA",
      email,
      floor: "NA",
      first_name: firstName,
      street: address,
      building: "NA",
      phone_number: phoneIntl,
      shipping_method: "NA",
      postal_code: "NA",
      city: state || "Cairo",  
      country: country || "EG",
      last_name: lastName,
      state: state || "NA",  
    };

    const successUrl = process.env.NEXT_PUBLIC_SUCCESS_URL || "https://yourdomain.com/payment/success";
    const failedUrl = process.env.NEXT_PUBLIC_FAILED_URL || "https://yourdomain.com/payment/failed";
    const redirectUrl = `${successUrl}?order_id=${orderData.id}`;

    const paymentKeyRes = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: token,
          amount_cents: amountCents,
          expiration: 3600,
          order_id: orderData.id,
          billing_data,
          currency,
          integration_id: Number(process.env.PAYMOB_INTEGRATION_ID),
          redirect_url: redirectUrl,
        }),
      }
    );

    const paymentData = await paymentKeyRes.json();

    if (!paymentKeyRes.ok || !paymentData.token) {
      return NextResponse.json(
        { error: "Payment key not created", details: paymentData },
        { status: 500 }
      );
    }

    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentData.token}`;

    return NextResponse.json({
      iframeUrl,
      debug: {
        amountCents,
        orderId: orderData.id,
        integrationId: Number(process.env.PAYMOB_INTEGRATION_ID),
        iframeId: Number(process.env.PAYMOB_IFRAME_ID),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Payment initialization failed",
        details: error?.message || error,
      },
      { status: 500 }
    );
  }
}
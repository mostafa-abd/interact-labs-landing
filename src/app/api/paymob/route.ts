import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("🔵 [PAYMOB] Starting payment process...");
  
  try {
    const body = await req.json();
    console.log("📦 [PAYMOB] Received request body:", JSON.stringify(body, null, 2));
    
    const { amount, name, email, phone, address, state, country, product } = body;

    // ✅ Validation
    if (!amount || !name || !email || !phone || !address) {
      console.error("❌ [PAYMOB] Missing required fields:", {
        amount: !!amount,
        name: !!name,
        email: !!email,
        phone: !!phone,
        address: !!address
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Prepare data
    const amountCents = Math.round(Number(amount) * 100);
    const firstName = (name || "").split(" ")[0] || "User";
    const lastName = (name || "").split(" ").slice(1).join(" ") || "Tester";
    const phoneIntl = String(phone).startsWith("+")
      ? String(phone)
      : `+20${String(phone).replace(/\D/g, "")}`;
    const currency = "EGP";

    console.log("💰 [PAYMOB] Payment details:", {
      amountCents,
      amount: amount,
      firstName,
      lastName,
      phoneIntl,
      currency,
      product: product
    });

    console.log("🔑 [PAYMOB] Environment variables check:", {
      hasApiKey: !!process.env.PAYMOB_API_KEY,
      apiKeyLength: process.env.PAYMOB_API_KEY?.length,
      hasIntegrationId: !!process.env.PAYMOB_INTEGRATION_ID,
      integrationId: process.env.PAYMOB_INTEGRATION_ID,
      hasIframeId: !!process.env.PAYMOB_IFRAME_ID,
      iframeId: process.env.PAYMOB_IFRAME_ID,
    });

    // STEP 1: Authentication
    console.log("🔐 [PAYMOB STEP 1] Authenticating with Paymob...");
    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.PAYMOB_API_KEY,
      }),
    });
    
    const authData = await authRes.json();
    console.log("🔐 [PAYMOB STEP 1] Auth response status:", authRes.status);
    console.log("🔐 [PAYMOB STEP 1] Auth response:", JSON.stringify(authData, null, 2));

    if (!authRes.ok || !authData.token) {
      console.error("❌ [PAYMOB STEP 1] Auth failed!");
      return NextResponse.json(
        { error: "Authentication failed", details: authData },
        { status: 500 }
      );
    }

    const token = authData.token;
    console.log("✅ [PAYMOB STEP 1] Auth successful, token received");

    // STEP 2: Create Order
    console.log("📝 [PAYMOB STEP 2] Creating order...");
    const orderPayload = {
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
    };
    
    console.log("📝 [PAYMOB STEP 2] Order payload:", JSON.stringify(orderPayload, null, 2));

    const orderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    
    const orderData = await orderRes.json();
    console.log("📝 [PAYMOB STEP 2] Order response status:", orderRes.status);
    console.log("📝 [PAYMOB STEP 2] Order response:", JSON.stringify(orderData, null, 2));

    if (!orderRes.ok || !orderData.id) {
      console.error("❌ [PAYMOB STEP 2] Order creation failed!");
      return NextResponse.json(
        { error: "Order creation failed", details: orderData },
        { status: 500 }
      );
    }

    console.log("✅ [PAYMOB STEP 2] Order created successfully, ID:", orderData.id);

    // STEP 3: Prepare billing data
    console.log("👤 [PAYMOB STEP 3] Preparing billing data...");
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

    console.log("👤 [PAYMOB STEP 3] Billing data:", JSON.stringify(billing_data, null, 2));

    // STEP 4: Create payment key
    console.log("🔑 [PAYMOB STEP 4] Creating payment key...");
    
    const successUrl = process.env.NEXT_PUBLIC_SUCCESS_URL || "http://localhost:3000/payment/success";
    const failedUrl = process.env.NEXT_PUBLIC_FAILED_URL || "http://localhost:3000/payment/failed";
    
    console.log("🔗 [PAYMOB STEP 4] URLs:", {
      successUrl,
      failedUrl,
    });

    const paymentKeyPayload = {
      auth_token: token,
      amount_cents: amountCents,
      expiration: 3600,
      order_id: orderData.id,
      billing_data,
      currency,
      integration_id: Number(process.env.PAYMOB_INTEGRATION_ID),
    };

    console.log("🔑 [PAYMOB STEP 4] Payment key payload:", JSON.stringify(paymentKeyPayload, null, 2));

    const paymentKeyRes = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentKeyPayload),
      }
    );

    const paymentData = await paymentKeyRes.json();
    console.log("🔑 [PAYMOB STEP 4] Payment key response status:", paymentKeyRes.status);
    console.log("🔑 [PAYMOB STEP 4] Payment key response:", JSON.stringify(paymentData, null, 2));

    if (!paymentKeyRes.ok || !paymentData.token) {
      console.error("❌ [PAYMOB STEP 4] Payment key creation failed!");
      return NextResponse.json(
        { error: "Payment key not created", details: paymentData },
        { status: 500 }
      );
    }

    console.log("✅ [PAYMOB STEP 4] Payment key created successfully");

    // STEP 5: Generate iframe URL
const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentData.token}`;    
    console.log("🎬 [PAYMOB STEP 5] Iframe URL generated:", iframeUrl);
    console.log("✅ [PAYMOB] Payment process completed successfully!");

    return NextResponse.json({
      iframeUrl,
      debug: {
        amountCents,
        orderId: orderData.id,
        integrationId: Number(process.env.PAYMOB_INTEGRATION_ID),
        iframeId: Number(process.env.PAYMOB_IFRAME_ID),
        currency,
        paymentToken: paymentData.token,
        billingData: billing_data,
      },
    });
  } catch (error: any) {
    console.error("💥 [PAYMOB] Fatal error:", error);
    console.error("💥 [PAYMOB] Error stack:", error?.stack);
    return NextResponse.json(
      {
        error: "Payment initialization failed",
        details: error?.message || error,
        stack: error?.stack,
      },
      { status: 500 }
    );
  }
}
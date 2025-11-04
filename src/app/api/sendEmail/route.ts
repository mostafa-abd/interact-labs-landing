import nodemailer from "nodemailer";

let lastSentData: string | null = null;

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      productName,
      quantity,
      price,
      paymentStatus = "Payment upon receipt",
    }: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      city: string;
      state: string;
      productName: string;
      quantity: number;
      price: number;
      paymentStatus?: string;
    } = body;

    const currentData = JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      productName,
      quantity,
      price,
      paymentStatus,
    });

    if (lastSentData === currentData) {
      return new Response(JSON.stringify({ success: false, message: "Email already sent" }), { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false,
      auth: {
        user: "d.marketing@interact-labs.com",
        pass: "49WdIBf!",
      },
    });

    const mailOptions = {
      from: `"Interact Labs" <d.marketing@interact-labs.com>`,
      to: "d.marketing@interact-labs.com",
      subject: `New Order (${paymentStatus}): ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0056b3;">Customer Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f2f2f2;"><td style="padding: 10px; font-weight: bold;">First Name</td><td style="padding: 10px;">${firstName}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Last Name</td><td style="padding: 10px;">${lastName}</td></tr>
            <tr style="background-color: #f2f2f2;"><td style="padding: 10px; font-weight: bold;">Email</td><td style="padding: 10px;">${email}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Phone</td><td style="padding: 10px;">${phone}</td></tr>
            <tr style="background-color: #f2f2f2;"><td style="padding: 10px; font-weight: bold;">City</td><td style="padding: 10px;">${city}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">State</td><td style="padding: 10px;">${state}</td></tr>
          </table>

          <h2 style="color: #0056b3;">Order Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f2f2f2;"><td style="padding: 10px; font-weight: bold;">Product</td><td style="padding: 10px;">${productName}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Quantity</td><td style="padding: 10px;">${quantity}</td></tr>
            <tr style="background-color: #f2f2f2;"><td style="padding: 10px; font-weight: bold;">Price per Unit</td><td style="padding: 10px;">${price.toLocaleString()} EGP</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Total</td><td style="padding: 10px;">${(price * quantity).toLocaleString()} EGP</td></tr>
            <tr style="background-color: #f2f2f2;"><td style="padding: 10px; font-weight: bold;">Payment Status</td><td style="padding: 10px;">${paymentStatus}</td></tr>
          </table>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    lastSentData = currentData;

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Email sending error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return new Response(JSON.stringify({ success: false, error: errorMessage }), { status: 500 });
  }
}

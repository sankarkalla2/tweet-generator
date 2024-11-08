import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string);

type Params = {
  params: {
    id: string;
  };
};
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  console.log(id, "id");
  if (!id) {
    return NextResponse.json({ status: 400, message: "Missing or invalid id" });
  }
  console.log(process.env.STRIPE_CLIENT_SECRET, "GEt endpoint hit👉🏻");

  const session = await auth();
  if (!session?.user) return NextResponse.json({ status: 404 });
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: id,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
  });

  if (stripeSession) {
    return NextResponse.json({
      status: 200,
      session_url: stripeSession.url,
      customer_id: stripeSession.customer,
    });
  }

  return NextResponse.json({ status: 400 });
}

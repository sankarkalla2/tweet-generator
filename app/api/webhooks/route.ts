import { auth } from "@/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  console.log("🟢 webhook called successfully");
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    // Handle subscription-specific events
    switch (event.type) {
      case "customer.subscription.created":
        const newSubscription = event.data.object as Stripe.Subscription;
        await handleNewSubscription(newSubscription);
        break;

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object as Stripe.Subscription;
        // Handle subscription updates (upgrades/downgrades)
        await handleUpdatedSubscription(updatedSubscription);
        break;

      case "customer.subscription.deleted":
        const cancelledSubscription = event.data.object as Stripe.Subscription;
        // Handle subscription cancellation
        await handleCancelledSubscription(cancelledSubscription);
        break;

      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice;
        // Handle successful subscription renewal
        if (invoice.subscription) {
          await handleSuccessfulPayment(invoice);
        }
        break;

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice;
        // Handle failed subscription payment
        if (failedInvoice.subscription) {
          await handleFailedPayment(failedInvoice);
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}

// Handler functions for different subscription events
async function handleNewSubscription(subscription: Stripe.Subscription) {
  // Example implementation

  const customerId = subscription.customer as string;
  const status = subscription.status;
  const priceId = subscription.items.data[0].price.id;

  const customer = (await stripe.customers.retrieve(
    customerId
  )) as Stripe.Customer;
  const customer_email = customer.email;

  const isUserExisted = await db.user.findUnique({
    where: {
      email: customer_email as string,
    },
  });

  if (isUserExisted) {
    await db.subscription.update({
      where: {
        userId: isUserExisted.id,
      },
      data: {
        plan: "PRO",
        customerId: customerId,
      },
    });
  } else {
    await db.subscription.create({
      data: {
        plan: "PRO",
        customerId: customerId,
      },
    });
  }
}

async function handleUpdatedSubscription(subscription: Stripe.Subscription) {
  // Handle subscription updates
  // Example: User upgrading/downgrading their plan
  const status = subscription.status;
  const priceId = subscription.items.data[0].price.id;

  const customer = (await stripe.customers.retrieve(
    subscription.customer as string
  )) as Stripe.Customer;

  const customer_email = customer.email;

  const isCustomerExisted = await db.subscription.findUnique({
    where: {
      customerId: subscription.customer as string,
    },
  });
  if (isCustomerExisted) {
    await db.subscription.update({
      where: {
        customerId: subscription.customer as string,
      },
      data: {
        plan: "PRO",
      },
    });
  }
}

async function handleCancelledSubscription(subscription: Stripe.Subscription) {
  // Handle subscription cancellation
  // TODO: Update your database
  await db.subscription.update({
    where: {
      customerId: subscription.customer as string,
    },
    data: {
      plan: "FREE",
    },
  });
}

async function handleSuccessfulPayment(invoice: Stripe.Invoice) {
  // Handle successful subscription renewal
  // Add your business logic here (e.g., update database, send email)
  console.log(`Subscription renewal succeeded: ${invoice.id}`);
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  // Handle failed subscription payment
  console.log(`Subscription payment failed: ${invoice.id}`);
}

import { stripe } from "@/config/stripe";
import {
  handleSubscriptionCreate,
  handleSubscriptionEnded,
  handleSubscriptionUpdate,
} from "@/lib/subuscriptions";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const signature = req.headers.get("stripe-signature") as string;
    const body = await req.arrayBuffer();

    let event;

    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(
          Buffer.from(body),
          signature,
          endpointSecret
        );
      } catch {
        console.log(`⚠️  Webhook signature verification failed.`);
        return new Response("Webhook error", { status: 400 });
      }
    }

    if (!event) {
      return new Response("Webhook Event Error", { status: 500 });
    }

    const subscription = event.data.object as Stripe.Subscription;

    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreate(subscription);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(subscription);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionEnded(subscription);
        break;
    }

    return new Response("Webhook received", { status: 200 });
  } catch {
    return new Response("Error verifying webhook", { status: 400 });
  }
}

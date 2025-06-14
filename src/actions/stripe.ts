"use server";

import { stripe } from "@/config/stripe";
import { prisma } from "@/lib/prisma";
import { StripeSessionState } from "@/types/type";
import { currentUser } from "@clerk/nextjs/server";

export async function createStripeSession(
  state: StripeSessionState,
  formData: FormData
): Promise<StripeSessionState> {
  try {
    const priceId = formData.get("priceId") as string;

    const user = await currentUser();

    if (!user) {
      throw new Error("認証が必要です");
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    let customerId = dbUser?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        metadata: {
          clerkId: user.id,
        },
      });

      await prisma.user.update({
        where: { clerkId: user.id },
        data: {
          stripeCustomerId: customer.id,
        },
      });

      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      metadata: { clerkId: user.id },
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/dashboard?canceled=true`,
    });

    if (!session.url) {
      throw new Error("セッションの作成に失敗しました");
    }

    return {
      status: "success",
      error: "",
      redirectUrl: session.url,
    };
  } catch (error) {
    console.error("Stripe session create Error", error);
    return {
      status: "error",
      error: "Failed to Create Stripe Session",
    };
  }
}
import { SubscriptionStatus } from "@prisma/client";
import Stripe from "stripe";
import { prisma } from "./prisma";

function getPlanDetails(subscription: Stripe.Subscription) {
  let subscriptionStatus: SubscriptionStatus = "FREE";
  let credits = 5;
  const priceId = subscription.items.data[0].price.id;

  switch (subscription.items.data[0].price.id) {
    case "price_1RYOSqGgefN37N2wiM3eMhZZ":
      subscriptionStatus = "STARTER";
      credits = 50;
      break;
    case "price_1RYOTHGgefN37N2wYPMaK9er":
      subscriptionStatus = "PRO";
      credits = 120;
      break;
    case "price_1RYOThGgefN37N2w3BDxePTz":
      subscriptionStatus = "ENTERPRISE";
      credits = 300;
      break;
  }

  return { subscriptionStatus, credits, priceId };
}

export async function handleSubscriptionCreate(
  subscription: Stripe.Subscription
) {
  const { subscriptionStatus, credits, priceId } = getPlanDetails(subscription);

  await prisma.user.update({
    where: { stripeCustomerId: subscription.customer as string },
    data: {
      subscriptionStatus: subscriptionStatus,
      credits: credits,
      subscriptions: {
        create: {
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          stripeCurrentPeriodEnd: new Date(
            subscription.items.data[0].current_period_end * 1000
          ),
        },
      },
    },
  });
}

export async function handleSubscriptionUpdate(
  subscription: Stripe.Subscription
) {
  if (subscription.status === "active") {
    const { subscriptionStatus, credits, priceId } =
      getPlanDetails(subscription);

    const isCanceled = subscription.cancel_at_period_end;

    await prisma.user.update({
      where: { stripeCustomerId: subscription.customer as string },
      data: {
        subscriptionStatus: subscriptionStatus,
        credits: credits,
        isCancelAtPeriodEnd: isCanceled,
        subscriptions: {
          update: {
            data: {
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: new Date(
                subscription.items.data[0].current_period_end * 1000
              ),
            },
          },
        },
      },
    });
  } else if (subscription.status === "canceled") {
    await prisma.user.update({
      where: { stripeCustomerId: subscription.customer as string },
      data: {
        subscriptionStatus: "FREE",
        credits: 5,
        isCancelAtPeriodEnd: false,
        subscriptions: {
          delete: {
            stripeSubscriptionId: subscription.id,
          },
        },
      },
    });
  }
}

export async function handleSubscriptionEnded(
  subscription: Stripe.Subscription
) {
  await prisma.user.update({
    where: { stripeCustomerId: subscription.customer as string },
    data: {
      subscriptionStatus: "FREE",
      credits: 5,
      isCancelAtPeriodEnd: false,
      subscriptions: {
        delete: {
          stripeSubscriptionId: subscription.id,
        },
      },
    },
  });
}

import { NextResponse } from "next/server";
import { prisma } from "./prisma";

export async function getUserSubscriptionStatus(clerkId: string) {
  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: clerkId },
      select: { subscriptionStatus: true },
    });

    const subscriptionStatus = dbUser?.subscriptionStatus;

    return NextResponse.json({ subscriptionStatus }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export const createUser = async (clerkId: string, email: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        clerkId: clerkId,
        email: email,
        credits: 5,
        subscriptionStatus: "FREE",
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export async function deleteUser(id: string) {
  try {
    const user = await prisma.$transaction(async (tx) => {
      await tx.subscription.deleteMany({
        where: {
          user: {
            clerkId: id,
          },
        },
      });

      const user = await tx.user.delete({
        where: { clerkId: id },
      });

      return user;
    });
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}

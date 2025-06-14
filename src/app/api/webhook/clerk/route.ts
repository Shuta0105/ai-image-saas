import { createUser, deleteUser } from "@/lib/users";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const user = await createUser(
        evt.data.id,
        evt.data.email_addresses[0].email_address
      );

      return NextResponse.json({ user }, { status: 200 });
    } else if (evt.type === "user.deleted") {
      const { id } = evt.data;
      if (!id) {
        throw new Error("Failed to Delete User Table");
      }
      await deleteUser(id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}

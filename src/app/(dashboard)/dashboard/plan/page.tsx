"use client";

import { createStripeSession } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { plans } from "@/config/plans";
import { StripeSessionState } from "@/types/type";
import { Check } from "lucide-react";
import React, { useActionState } from "react";

const initialState: StripeSessionState = {
  status: "idle",
  error: "",
};

const Plan = () => {
  const [_state, formAction] = useActionState(
    async (state: StripeSessionState, formData: FormData) => {
      const result = await createStripeSession(state, formData);

      if (result.status === "error") {
        alert("セッションの作成に失敗しました");
      } else if (result.status === "success" && result.redirectUrl) {
        window.location.href = result.redirectUrl;
      }
      return result;
    },
    initialState
  );

  return (
    <div className="container mx-auto py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">料金プラン</h1>
        <p className="mt-2">
          あなたのニーズに合わせて最適なプランをお選びください。
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 py-4 mt-8">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.name}
              className="flex flex-col border rounded-3xl p-8"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Icon />
                  <h2 className="text-3xl">{plan.name}</h2>
                </div>
                <p className="mt-2 text-lg">{plan.description}</p>
                <div className="flex items-end mt-2">
                  <span className="text-3xl">{plan.price}</span>
                  <span className="">/月</span>
                </div>

                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <form action={formAction}>
                <Input name="priceId" value={plan.priceId} type="hidden" />
                <Button variant={"outline"} className="w-full mt-8">
                  {plan.name}を選択
                </Button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plan;

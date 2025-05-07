"use client";

import { useRouter } from "next/navigation";

import { PageUrl } from "@/types/enums";
import { useState } from "react";
import { actionCanConsumeCredit, actionIncrementCostByAmount } from "@/actions/usage-limiter-actions";

const CREDIT_AMOUNT = 5

const ClientConsumeCreditButton =  () => {
  const [canConsume, setCanConsume] = useState(true); //can be improved by correct one
  const router = useRouter();

  const clickHandler = async () => {
    const consumeCreditAllowed = await actionCanConsumeCredit();
    setCanConsume(consumeCreditAllowed);

    if (!consumeCreditAllowed) {
      router.push(PageUrl.UsageLimitExceeded);
      return;
    }
    await actionIncrementCostByAmount(CREDIT_AMOUNT);
    // Optionally, you might want to trigger a refresh or navigate elsewhere after incrementing
  };

  return (
    <button onClick={clickHandler} disabled={!canConsume}>
      {canConsume ? `Simulate Consume Credit of ${CREDIT_AMOUNT}` : "Credit Limit Reached"}
    </button>
  );
};

export default ClientConsumeCreditButton;

"use client";

import { useState } from "react";
import {
  actionCanConsumeCredit,
  actionIncrementCostByAmount,
} from "@/actions/usage-limiter-actions";
import useNavigateOnUsageExceedLimit from "@/hooks/use-navigate-on-usage-exceed-limit";

const CREDIT_AMOUNT = 5;

const ClientConsumeCreditButton = () => {
  const [canConsume, setCanConsume] = useState(true); //can be improved by correct one
  const { navigateOnUsageLimitExceeded } = useNavigateOnUsageExceedLimit(); // Use the custom hook

  const clickHandler = async () => {
    const consumeCreditAllowed = await actionCanConsumeCredit();
    setCanConsume(consumeCreditAllowed);

    if (!consumeCreditAllowed) {
      navigateOnUsageLimitExceeded();
      return;
    }
    await actionIncrementCostByAmount(CREDIT_AMOUNT);
    // Optionally, you might want to trigger a refresh or navigate elsewhere after incrementing
  };

  return (
    <button onClick={clickHandler} disabled={!canConsume}>
      {canConsume
        ? `Simulate Consume Credit of ${CREDIT_AMOUNT}`
        : "Credit Limit Reached"}
    </button>
  );
};

export default ClientConsumeCreditButton;

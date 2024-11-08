import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import React from "react";

type Props = {
  priceId: string;
};

const PaymentButton = ({ priceId }: Props) => {
  const { onSubscribe, isProcessing } = useSubscription(priceId);

  return (
    <Button
      className="text-sm w-full "
      onClick={onSubscribe}
      disabled={isProcessing}
    >
      Upgrade
    </Button>
  );
};

export default PaymentButton;

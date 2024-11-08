import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const useSubscription = (priceId: string) => {
  const [isProcessing, setIsprocessing] = useState(false);

  const onSubscribe = async () => {
    setIsprocessing(true);

    try {
      const response = await axios.get(
        "/api/payment/price_1QISFWSHHY3ghmt1loyHkwjh"
      );
      if (response.data.status === 200) {
        console.log(response.data.session_url, "session_url");
        return (window.location.href = response.data.session_url);
      } else {
        toast.error(response.data);
      }
    } catch (err) {
      console.log("🔴", err);
    } finally {
      setIsprocessing(false);
    }
  };

  return { isProcessing, onSubscribe };
};

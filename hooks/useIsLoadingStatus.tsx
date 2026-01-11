"use client";

import { useEffect, useState } from "react";
import { subscribeToLoading, unsubscribeFromLoading } from "@/services/loadingService";

export function useLoadingStatus() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoading = (loading: boolean) => setIsLoading(loading);

    subscribeToLoading(handleLoading);
    return () => unsubscribeFromLoading(handleLoading);
  }, []);

  return isLoading;
}

"use client";

import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import styles from "./SpinnerOverlay.module.css";
import { subscribeToLoading, unsubscribeFromLoading } from "@/services/loadingService";

export default function SpinnerOverlay() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoading = (loading: boolean) => setIsLoading(loading);
    subscribeToLoading(handleLoading);
    return () => unsubscribeFromLoading(handleLoading);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <Spinner />
    </div>
  );
}

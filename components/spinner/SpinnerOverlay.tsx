"use client";

import Spinner from "./Spinner";
import styles from "./SpinnerOverlay.module.css";
import { useLoadingStatus } from "@/hooks/useIsLoadingStatus";

export default function SpinnerOverlay() {
  
  const isLoading = useLoadingStatus();

  if (!isLoading) return null;
  return (
    <div className={styles.overlay}>
      <Spinner />
    </div>
  );
}

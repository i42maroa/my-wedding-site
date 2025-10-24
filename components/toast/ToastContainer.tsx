"use client";

import React, { useState, useEffect } from "react";
import Toast from "./Toast";
import styles from "./ToastContainer.module.css";
import { subscribeToNotifications, unsubscribeFromNotifications } from "@/services/notificationService";

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleNewToast = (toast: ToastItem) => {
      setToasts((prev) => [...prev, toast]);
    };

    subscribeToNotifications(handleNewToast);
    return () => unsubscribeFromNotifications(handleNewToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}

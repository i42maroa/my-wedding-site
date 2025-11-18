// services/notificationService.ts
import { v4 as uuidv4 } from "uuid";
import type { ToastItem } from "@/components/toast/ToastContainer";

type Subscriber = (toast: ToastItem) => void;

const subscribers = new Set<Subscriber>();

export function subscribeToNotifications(callback: Subscriber) {
  subscribers.add(callback);
}

export function unsubscribeFromNotifications(callback: Subscriber) {
  subscribers.delete(callback);
}

export function showToastSuccess(message: string) {
  return showToast(message, 'success');
}

export function showToastError(message: string) {
  return showToast(message, 'error');
}

export function showToast(message: string, type: "success" | "error" | "info" = "info") {
  const toast: ToastItem = {
    id: uuidv4(),
    message,
    type,
  };

  for (const callback of subscribers) {
    callback(toast);
  }
}

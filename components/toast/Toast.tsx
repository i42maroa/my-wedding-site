import { useEffect } from "react";
import styles from "./Toast.module.css";

export interface ToastProps {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({
  id,
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {message}
    </div>
  );
}

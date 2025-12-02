"use client";

import { useEffect } from "react";
import { AppError } from "@/helper/mapFirebaseError";
import { showToastAppError } from "@/services/notificationService";

export function useApiErrorToast(apiError?: AppError, title = "Error") {
  useEffect(() => {
    if (apiError) {
      showToastAppError(title, apiError);
    }
  }, [apiError, title]);
}

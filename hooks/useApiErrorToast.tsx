"use client";

import { AppError } from "@/helper/mapFirebaseError";
import { showToastAppError } from "@/services/notificationService";

export function useApiErrorToast(apiError?: AppError, title = "Error") {
    if (apiError) {
      showToastAppError(title, apiError);
    }
}

"use client";

import { AppError } from "@/helper/mapFirebaseError";
import { showToastAppError, showToastError } from "@/services/notificationService";

export function useApiErrorToast(error?: AppError | Error, title = "Error") {
   if (!error) return;

  if (error instanceof AppError) {
     showToastAppError(title, error);
  }
  else if (error instanceof Error) {
    showToastError(error.message);
  }
  else{
   showToastError("Error desconocido");
  }
}

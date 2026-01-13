import { describe, test, expect, beforeEach, vi } from "vitest";
import {
  subscribeToNotifications,
  unsubscribeFromNotifications,
  showToast,
  showToastSuccess,
  showToastError,
  showToastAppError,
} from "../notificationService";
import { AppError } from "@/helper/mapFirebaseError";
import { ToastItem } from "@/components/toast/ToastContainer";

vi.mock("uuid", () => ({
  v4: () => "mocked-uuid",
}));

describe("notificationService", () => {
  let subscriber = vi.fn<(toast: ToastItem) => void>();

  beforeEach(() => {
    subscriber = vi.fn();
    unsubscribeFromNotifications(subscriber);
  });

  test("notifica a un subscriber cuando se muestra un toast", () => {
    subscribeToNotifications(subscriber);

    showToast("Hola mundo", "info");

    expect(subscriber).toHaveBeenCalledOnce();
    expect(subscriber).toHaveBeenCalledWith({
      id: "mocked-uuid",
      message: "Hola mundo",
      type: "info",
    });
  });

  test("no notifica tras hacer unsubscribe", () => {
    subscribeToNotifications(subscriber);
    unsubscribeFromNotifications(subscriber);

    showToast("No debería verse", "success");

    expect(subscriber).not.toHaveBeenCalled();
  });

  test("showToastSuccess emite tipo success", () => {
    subscribeToNotifications(subscriber);

    showToastSuccess("Éxito");

    expect(subscriber).toHaveBeenCalledWith({
      id: "mocked-uuid",
      message: "Éxito",
      type: "success",
    });
  });

  test("showToastError emite tipo error", () => {
    subscribeToNotifications(subscriber);

    showToastError("Error");

    expect(subscriber).toHaveBeenCalledWith({
      id: "mocked-uuid",
      message: "Error",
      type: "error",
    });
  });

  test("showToast usa info por defecto", () => {
    subscribeToNotifications(subscriber);

    showToast("Por defecto");

    expect(subscriber).toHaveBeenCalledWith({
      id: "mocked-uuid",
      message: "Por defecto",
      type: "info",
    });
  });

  test("showToastAppError loguea el error y emite toast error", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const appError = new AppError(
      "auth/invalid-api-key", "NOT_FOUND", "PERMISSION_DENIED");

    subscribeToNotifications(subscriber);

    showToastAppError("Algo salió mal", appError);

    expect(consoleSpy).toHaveBeenCalledWith(
      appError.code,
      appError.message,
      appError.cause
    );

    expect(subscriber).toHaveBeenCalledWith({
      id: "mocked-uuid",
      message: "Algo salió mal",
      type: "error",
    });

    consoleSpy.mockRestore();
  });
});

import { describe, test, expect, beforeEach, vi } from "vitest";
import {
  subscribeToLoading,
  unsubscribeFromLoading,
  startLoading,
  stopLoading,
  resetLoading,
} from "../loadingService";

type LoadingSubscriber = (isLoading: boolean) => void;

describe("loadingService", () => {
  let subscriber: LoadingSubscriber;

  beforeEach(() => {
    subscriber = vi.fn<(isLoading: boolean) => void>();
    unsubscribeFromLoading(subscriber);
    resetLoading();
  });

  test("notifica isLoading=true al iniciar carga", () => {
    subscribeToLoading(subscriber);

    startLoading();

    expect(subscriber).toHaveBeenCalledWith(true);
  });

  test("isLoading sigue siendo true con múltiples startLoading", () => {
    subscribeToLoading(subscriber);

    startLoading();
    startLoading();
    startLoading();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const calls = (subscriber as any).mock.calls;
    expect(calls[calls.length - 1][0]).toBe(true);
  });

  test("notifica isLoading=false al parar todas las cargas", () => {
    subscribeToLoading(subscriber);

    startLoading();
    stopLoading();

    expect(subscriber).toHaveBeenLastCalledWith(false);
  });

  test("no baja de cero aunque se llame stopLoading de más", () => {
    subscribeToLoading(subscriber);

    stopLoading();
    stopLoading();

    expect(subscriber).toHaveBeenLastCalledWith(false);
  });

  test("resetLoading fuerza isLoading=false", () => {
    subscribeToLoading(subscriber);

    startLoading();
    startLoading();
    resetLoading();

    expect(subscriber).toHaveBeenLastCalledWith(false);
  });

  test("unsubscribe evita futuras notificaciones", () => {
    subscribeToLoading(subscriber);
    unsubscribeFromLoading(subscriber);

    startLoading();

    expect(subscriber).not.toHaveBeenCalled();
  });
});

"use client";

import { GuestSession } from "@/interfaces/guest.interface";
import {  getGuestSessionSnapshot, initGuestSessionFromStorage, setGuestSession, subscribeToGuestSession } from "@/services/guestSessionBus";
import { startLoading, stopLoading } from "@/services/loadingService";
import { showToastSuccess } from "@/services/notificationService";
import { getGuestSession, loginGuestSession, logoutGuestSession } from "@/services/sessionService";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

interface UseGuestGuardResult {
  session:GuestSession | null;
  isGuest:boolean;
  isReady: boolean;
  loginWithCode: (code: string) => Promise<void>;
  logoutGuest: () => void;
}

export function useGuestGuard(): UseGuestGuardResult {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const session = useSyncExternalStore(
    subscribeToGuestSession,
    getGuestSessionSnapshot,
    () => null
  );

  useEffect(() => {
    const storedSession = getGuestSession();
    initGuestSessionFromStorage(storedSession);
    setIsReady(true);
  }, []);

  const loginWithCode = useCallback(async (code: string) => {
    startLoading()
    loginGuestSession(code)
      .then(session => setGuestSession(session))
      .finally(() => stopLoading());
  }, []);

  const logoutGuest = useCallback(() => {
    startLoading();
    logoutGuestSession();
    stopLoading();
    showToastSuccess("Sesión cerrada correctamente");
    router.replace("/")
  }, []);

  return {
    session,
    isGuest: !!session,
    isReady,
    loginWithCode,
    logoutGuest,
  };
}
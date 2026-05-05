"use client";

import { useEffect } from "react";
import { useGuestGuard } from "@/hooks/useGuestGuard";

type PreloadAccesCodeInterface = {
  accessCode?: string;
};

export default function PreloadCode({ accessCode }: PreloadAccesCodeInterface) {

  const { loginWithCode } = useGuestGuard();

  useEffect(() => {
    if (!accessCode) return;

    loginWithCode(accessCode);
  }, [accessCode, loginWithCode]);

  return null;
}
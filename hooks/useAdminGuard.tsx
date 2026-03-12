"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/firebase/config";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { startLoading, stopLoading } from "@/services/loadingService";
import { useRouter } from "next/navigation";

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
export function useAdminGuard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email === adminEmail) {
        setIsAdmin(true);
        setUserEmail(user.email);
      } else {
        setIsAdmin(false);
        setUserEmail(user?.email ?? null);
      }
      stopLoading()
    });

    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    startLoading()
    await signInWithPopup(auth, googleProvider)
      .then(() => stopLoading());
  };

  const logout = async () => {
    await auth.signOut();
    router.push("/");
  };

  return {isAdmin, userEmail, loginWithGoogle, logout};
}

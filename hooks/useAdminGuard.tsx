"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/firebase/config";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

const ADMIN_EMAIL = "amrodriguezjarote@gmail.com"; 

export function useAdminGuard() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) {
        setIsAdmin(true);
        setUserEmail(user.email);
      } else {
        setIsAdmin(false);
        setUserEmail(user?.email ?? null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await auth.signOut();
  };

  return {
    loading,
    isAdmin,
    userEmail,
    loginWithGoogle,
    logout,
  };
}

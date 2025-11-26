"use client";

import { ReactNode } from "react";
import FormButton from "@/components/button/FormButton";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import styles from "./LayoutAdminShell.module.css";

export default function AdminShell({ children }: {children: ReactNode}) {
  const { isAdmin, loginWithGoogle, userEmail } = useAdminGuard();

  if (!isAdmin) {
    return (
        <div className={styles.container}>
          <h2>Zona administración</h2>
          {userEmail && (
            <p className={styles.text}>
             Iniciaste sesión como <strong>{userEmail}</strong>, pero no eres admin.
            </p>
          )}
          <FormButton onClick={loginWithGoogle} className={styles.button}>Entrar con Google</FormButton>
        </div>
    );
  }

  return (
    <main className={styles.main}>{children}</main> 
  );
}

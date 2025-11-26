"use client";

import { ReactNode } from "react";
import MainLayout from "@/components/layout/main/MainLayout";
import FormButton from "@/components/button/FormButton";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import styles from "./LayoutAdminShell.module.css";

type AdminShellProps = {
  children: ReactNode;
  title?: string;
};

export default function AdminShell({ children, title }: AdminShellProps) {
  const { loading, isAdmin, loginWithGoogle, logout, userEmail } = useAdminGuard();

  if (loading) {
    return (
      <MainLayout header={false}>
        <div className={styles.container}>
          <p>Comprobando permisos...</p>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return (
      <MainLayout header={false}>
        <div className={styles.container}>
          <h1 className={styles.title}>Zona privada</h1>
          {userEmail && (
            <p>
              Has iniciado sesión como <strong>{userEmail}</strong>, pero no
              eres admin.
            </p>
          )}
          <p>Inicia sesión con tu cuenta de Google de admin:</p>
          <FormButton onClick={loginWithGoogle}>Entrar con Google</FormButton>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout header={false}>
      <div className={styles.container}>
        <header className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>{title ?? "Panel de administración"}</h1>
          </div>
          <div className={styles.userBox}>
            <span className={styles.userEmail}>{userEmail}</span>
            <FormButton onClick={logout}>Salir</FormButton>
          </div>
        </header>

        <main className={styles.main}>{children}</main>
      </div>
    </MainLayout>
  );
}

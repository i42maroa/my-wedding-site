"use client";

import { ReactNode, useEffect, useState } from "react";
import { useGuestGuard } from "@/hooks/useGuestGuard";
import FormButton from "@/components/button/FormButton";
import styles from "./LayoutGuestShell.module.css";
import FormInput from "@/components/form/input/FormInput";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useApiErrorToast } from "@/hooks/useApiErrorToast";
import { useLoadingStatus } from "@/hooks/useIsLoadingStatus";

export default function LayoutGuestShell({ children }: { children: ReactNode }) {
 
  const isLoading = useLoadingStatus(); 
  const { isGuest, isReady, loginWithCode } = useGuestGuard();

  const onSuccessDo = (accessCode:string) =>{
    loginWithCode(accessCode)
  }
  const {formData, formErrors, handleInputChange, handleSubmit, apiError } = useLoginForm(onSuccessDo);
  useApiErrorToast(apiError, "Error al enviar el formulario");

  if (!isReady) {
    return <div className={styles.container} />;
  }
  
  if (!isGuest) {
    return (
      <div className={styles.container}>
        <h2>Zona privada de invitados</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <h3 className={styles.title}>Introduce tu código de familia</h3>
              <span className={styles.text}>Se encuentra en la invitación</span>           

              <FormInput
                                name="accessCode"
                                placeholder="XXXX"
                                value={formData.accessCode}
                                onChange={(value) => handleInputChange(value, true)}
                                required
                                error={formErrors.accessCode}
                                maxLength={4}
                                />      
              <FormButton className={styles.button} type="submit" disabled={isLoading}>Enviar</FormButton>
          </form>                           
      </div>
    );
  }

  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}
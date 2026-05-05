"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Form.module.css";
import FormTemplateAssistance from "../../components/form/form-template/FormAsistenceTemplate";
import { useLoadFamily } from "@/hooks/useLoadFamily";
import { showToastAppError, showToastError, showToastSuccess } from "@/services/notificationService";
import { useGuestGuard } from "@/hooks/useGuestGuard";

export default function RSVPContent() {
  const router = useRouter();
  const { session, isGuest } = useGuestGuard();
  const familyId = session?.familyId ?? "";

  const { family, loading, error } = useLoadFamily(familyId);

  useEffect(() => {
    if (!isGuest) return;
    if (loading) return;

    if (!loading && familyId && !family) {
      const errorText = "No pudo encontrarse la información del código acceso introducido";
      error ? showToastAppError(errorText, error) : showToastError(errorText);
    }
  }, [loading, familyId, family, error]);

  const onSuccessSubmit = () => {
    showToastSuccess("Confirmación enviada correctamente. \n ¡Viva los novios!🎉💍");
    router.push("/galeria");
  };

  if (!isGuest) return null;
  if (loading) return null;
  if (!family) return null;

  return (
    <>
        {family && <div className={styles.container}>
            <h2 className={styles.title}>Asistencia</h2>
            <FormTemplateAssistance prechargeFamily={family} onSuccessSubmit={onSuccessSubmit} />
        </div> }
    </>
  );
}
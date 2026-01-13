"use client";

import styles from "./Form.module.css"
import FloralLayout from "@/components/layout/floral/FloralLayout";
import FormTemplateAssistance from "./form-template/FormAsistenceTemplate";
import { useLoadFamily } from "@/hooks/useLoadFamily";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToastAppError, showToastError, showToastSuccess } from "@/services/notificationService";

type FormPageProps = { params: Promise<{ accessCode: string }>};
export default function RSVPPage({params}:FormPageProps) {
  
    const {accessCode} = use(params);
    const { family, loading, error } = useLoadFamily(accessCode);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !family) {
        const errorText = "No pudo encontrarse la información del código acceso introducido";
        error ? showToastAppError(errorText, error) : showToastError(errorText);
        router.push("/login");    
      } 
    }, [loading, error, router]);

    const onSuccessSubmit = () => {
        showToastSuccess("Confirmación enviada correctamente. \n ¡Viva los novios!🎉💍")
        router.push("/");
    }
 
  return (
      <FloralLayout> 
         {family && (
            <div className={styles.container}>
              <h2 className={styles.title}>Asistencia</h2>
              <FormTemplateAssistance prechargeFamily={family} onSuccessSubmit={onSuccessSubmit} />
            </div>
          )}
      </FloralLayout>
  );
}
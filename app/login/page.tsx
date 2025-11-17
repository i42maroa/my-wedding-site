'use client'

import MainLayout from "@/components/layout/main/MainLayout";
import {  FormDataLogin } from "@/types/formTypes";
import { useState } from "react";
import styles from './Login.module.css'
import FormInput from "@/components/form/input/FormInput";
import FormButton from "@/components/button/FormButton";
import { startLoading, stopLoading } from "@/services/loadingService";
import { getFamilyByAccessCode } from "@/services/formService";
import { showToast } from "@/services/notificationService";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [formData, setFormData] = useState<FormDataLogin>({accessCode:''});
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        startLoading();
    
        try {
          // Validación local
        //   const { isValid, errors } = validateForm(formData, id);
        //   setErrors(errors);
    
        //   if (!isValid) {
        //     showToast("Por favor, corrige los errores del formulario.", "error");
        //     stopLoading();
        //     return;
        //   }
    
          // Simulamos brevemente el proceso (opcional, mejora UX)
          await new Promise((r) => setTimeout(r, 400));
      
          // Envío a Firestore (asíncrono)
          const family = await getFamilyByAccessCode(formData.accessCode);

          if (!family) {
            showToast("No se ha encontrado ninguna familia con ese código.", "error");
            return;
        }

        // 2. Guardar en localStorage
        localStorage.setItem(family.id, JSON.stringify(family));
        router.push(`/form?id=${family.id}`)
    
   
        } catch (err) {
          console.error("Error al hacer login formulario:", err);
        //   showToast("Error inesperado al enviar la confirmación", "error");
        } finally {
          stopLoading();
        }
      };

    return(
        <MainLayout header={false}>
            <div className={styles.container}>
                <h2 className={styles.title}>Introduce tu código de familia</h2>
                 <form className={styles.formContainer} onSubmit={handleSubmit}>
                 <FormInput
                                name="accessCode"
                                label="Indica vuestros nombres"
                                placeholder=""
                                value={formData.accessCode}
                                onChange={handleInputChange}
                                required
                                // error={errors.nombre}
                                />

                                <FormButton className={styles.button}
                type="submit" 
                // disabled={loading} TODO: BLOCK WHEN IS LOADING
                >Enviar
        </FormButton>
        </form>
                              
            </div>
        </MainLayout>
    )
}
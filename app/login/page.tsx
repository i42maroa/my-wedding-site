'use client'

import MainLayout from "@/components/layout/main/MainLayout";
import {  FamilyInterface, FormDataLogin, FormErrors } from "@/interfaces/formTypes";
import { useState } from "react";
import styles from './Login.module.css'
import FormInput from "@/components/form/input/FormInput";
import FormButton from "@/components/button/FormButton";
import { startLoading, stopLoading } from "@/services/loadingService";
import { showToastError } from "@/services/notificationService";
import { useRouter } from "next/navigation";
import { getFamilyByAccessCode } from "@/services/dbService";
import { saveItemInLocalStorage } from "@/services/localStorageService";
import { validateFormLogin } from "@/services/formService";

export default function LoginPage() {
    const [formData, setFormData] = useState<FormDataLogin>({accessCode:''});
    const [errors, setErrors] = useState<FormErrors>({});  
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const goToForm = (accessCode:string) =>{
      router.push(`/form/${accessCode}`)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        startLoading();
    
        const accessCode = formData.accessCode.toUpperCase();
        const { isValid, errors } = validateFormLogin(formData);
        if (!isValid) {
            setErrors(errors);
            return;
        }

        await getFamilyByAccessCode(accessCode)
        .then(family => {
          if(family){
            saveItemInLocalStorage<FamilyInterface>(family, accessCode);
            goToForm(accessCode);
          }else{
            showToastError("No se ha encontrado ninguna familia con ese código.");
          }
        })
        .catch(e => {
          showToastError("Error al enviar el código");
          console.error(e)})
        .finally(() => stopLoading())
    }

    return(
        <MainLayout header={false}>
            <div className={styles.container}>
                  <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Introduce tu código de familia</h2>
                      <FormInput
                                name="accessCode"
                                placeholder=""
                                value={formData.accessCode}
                                onChange={handleInputChange}
                                required
                                error={errors.accessCode}
                                />      
                       <span className={styles.text}>Se encuentra en la invitación</span>           
                    <FormButton className={styles.button}type="submit" >Enviar</FormButton>
                  </form>                           
            </div>
        </MainLayout>
    )
}
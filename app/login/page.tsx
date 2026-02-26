'use client'

import styles from './Login.module.css'
import FormInput from "@/components/form/input/FormInput";
import FormButton from "@/components/button/FormButton";
import { useRouter } from "next/navigation";
import { useLoginForm } from '@/hooks/useLoginForm';
import { useLoadingStatus } from '@/hooks/useIsLoadingStatus';
import { useApiErrorToast } from '@/hooks/useApiErrorToast';

export default function LoginPage() {
    const router = useRouter();
    const onSuccessDo = (accessCode:string) =>{
       router.push(`/form/${accessCode}`)
    }

    const {formData, formErrors, handleInputChange, handleSubmit, apiError } = useLoginForm(onSuccessDo);
    const isLoading = useLoadingStatus();
    useApiErrorToast(apiError, "Error al enviar el formulario");

    return(
            <div className={styles.container}>
                  <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Introduce tu código de familia</h2>
                      <FormInput
                                name="accessCode"
                                placeholder="XXX-XXX"
                                value={formData.accessCode}
                                onChange={handleInputChange}
                                required
                                error={formErrors.accessCode}
                                />      
                       <span className={styles.text}>Se encuentra en la invitación</span>           
                    <FormButton className={styles.button} type="submit" disabled={isLoading}>Enviar</FormButton>
                  </form>                           
            </div>
    )
}
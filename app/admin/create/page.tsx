"use client";

import FormButton from "@/components/button/FormButton";
import FormInput from "@/components/form/input/FormInput";
import styles from "./CreateFamily.module.css";
import { useCreateFamilyForm } from "@/hooks/useCreateFamilyForm";
import { useLoadingStatus } from "@/hooks/useIsLoadingStatus";
import { useApiErrorToast } from "@/hooks/useApiErrorToast";

export default function AdminCreatePage() {

  const {formData, formErrors, handleInputChange, handleSubmit,
      apiError, addUser, handleIntegranteChange } = useCreateFamilyForm();
  const isLoading = useLoadingStatus();
  useApiErrorToast(apiError, "Error al enviar el formulario");

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Crear nueva familia</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <FormInput
              name="name"
              label="Nombre de familia"
              value={formData.name}
              onChange={handleInputChange}
              required
              error={formErrors.nombre}
            />
            <FormInput
              name="mesa"
              label="Mesa"
              value={formData.mesa}
              onChange={handleInputChange}
              required
              error={formErrors.mesa}
            />
          </div>
          

        <div className={styles.userContainer}>          
          <span className={styles.userTitle}> <h3>Users</h3> <button type="button" onClick={()=>addUser()}>+</button></span>
          {
            formData.users.map((user, index) =>
              <FormInput
                key={index}
                name={user}
                label="Integrante"
                value={user}
                onChange={e =>  handleIntegranteChange(index, e.target.value)}
                error={formErrors.users}
              />
            )
          }  
          </div>    

          <FormButton type="submit" className={styles.button} disabled={isLoading}>
            Guardar familia
          </FormButton>
        </form>
      </div>
  );
}
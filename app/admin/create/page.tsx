"use client";

import FormButton from "@/components/button/FormButton";
import FormInput from "@/components/form/input/FormInput";
import MainLayout from "@/components/layout/main/MainLayout";
import { useState } from "react";
import styles from "./CreateFamily.module.css";
import { FORM_DATA_ADMIN_DEFAULT, FormDataAdmin, FormErrors } from "@/interfaces/formTypes";
import { submitForm, validateFormAdmin } from "@/services/formAdminService";
import { startLoading, stopLoading } from "@/services/loadingService";
import { showToastError, showToastSuccess } from "@/services/notificationService";

export default function AdminCreatePage() {
  const [formData, setFormData] = useState<FormDataAdmin>(FORM_DATA_ADMIN_DEFAULT);
  const [errors, setErrors] = useState<FormErrors>({}); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addUser = () => {
    !formData.users.includes('') && setFormData((prev) => ({ ...prev, users: [...formData.users, ''] }));
  }

  const handleIntegranteChange = (index:number, value:string) => {
    const newIntegrantes = [...formData.users];
    newIntegrantes[index] = value;
    setFormData((prev) => ({ ...prev, users: newIntegrantes }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const { isValid, errors } = validateFormAdmin(formData);
      if (!isValid) {
          setErrors(errors);
            return;
      }

      startLoading();    
      submitForm(formData)
      .then(result => {
            if (result.success) {
                showToastSuccess("Familia creada correctamente");
                setFormData(FORM_DATA_ADMIN_DEFAULT);
                setErrors({})
              } else {
                showToastError(result.error || " Error al enviar la confirmación");
              }
          })
        .catch(() => showToastError("Error inesperado al enviar la confirmación"))
        .finally(() => stopLoading())
    };

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
              error={errors.nombre}
            />
            <FormInput
              name="mesa"
              label="Mesa"
              value={formData.mesa}
              onChange={handleInputChange}
              required
              error={errors.mesa}
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
                error={errors.users}
              />
            )
          }  
          </div>    

          <FormButton type="submit" className={styles.button}>
            Guardar familia
          </FormButton>
        </form>
      </div>
  );
}
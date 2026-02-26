"use client";

import styles from "./CreateFamily.module.css";
import FormFamilyTemplate from "@/components/form-template/FormFamilyTemplate";
import { FORM_DATA_ADMIN_DEFAULT } from "@/interfaces/formTypes";
import { showToastSuccess } from "@/services/notificationService";

export default function AdminCreatePage() {

  const onSuccess = () => {
    showToastSuccess("Familia creada correctamente");
  }

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Crear nueva familia</h1>

        <FormFamilyTemplate formMode="create" initialData={FORM_DATA_ADMIN_DEFAULT} onSuccess={onSuccess} />
      </div>
  );
}
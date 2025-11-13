"use client";
import { useState } from "react";
import styles from "./Form.module.css"
import FormButton from "@/components/button/FormButton";
import RadioButton from "@/components/form/radio-button/RadioButton";
import { FORM_DATA_DEFAULT, FormData, FormErrors } from "@/types/formTypes";
import { validateForm, submitForm } from "../../services/formService";
import FormInput from "@/components/form/input/FormInput";
import FloralLayout from "@/components/layout/floral/FloralLayout";
import { showToast } from "@/services/notificationService";
import { startLoading, stopLoading } from "@/services/loadingService";
import MainLayout from "@/components/layout/main/MainLayout";

export default function RSVPPage() {
  const [formData, setFormData] = useState<FormData>(FORM_DATA_DEFAULT);

  const [errors, setErrors] = useState<FormErrors>({});  
  const [success, setSuccess] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    try {
      showToast("Validando datos...", "info");
      // Validación local
      const { isValid, errors } = validateForm(formData);
      setErrors(errors);

      if (!isValid) {
        showToast("Por favor, corrige los errores del formulario.", "error");
        stopLoading();
        return;
      }
// Simulamos brevemente el proceso (opcional, mejora UX)
      await new Promise((r) => setTimeout(r, 400));
  
      // Envío a Firestore (asíncrono)
      const result = await submitForm(formData);

      if (result.success) {
        showToast("🎉 ¡Confirmación enviada con éxito!", "success");
        setFormData(FORM_DATA_DEFAULT);
      } else {
        showToast(result.error || " Error al enviar la confirmación", "error");
      }
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      showToast("Error inesperado al enviar la confirmación", "error");
    } finally {
      stopLoading();
    }
  };

  return (
    <MainLayout header={false}>
    <FloralLayout>
    <div className={styles.container}>
      <h2 className={styles.title}>Asistencia</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <p>Hola, soy/somos:</p>
          <FormInput
            name="nombre"
            label="Indica vuestros nombres"
            placeholder="Ej: Ana García Rosales, Jose María Martinez"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            error={errors.nombre}
          />
          <p>y confirmo la asistencia a vuestra boda el día</p>
          <h3 className={styles.date}>22 de Agosto de 2026</h3>
        </div>
        
        <div className={styles.formGroup}>
          <p>Respecto a la comida:</p>
          <div className={styles.radioButtonContainer}>
            <RadioButton
              name="intolerancia"
              value={false}
              label="No padezco/padecemos ninguna intolerancia"
              selectedValue={formData.intolerancia}
               onChange={() => setFormData({ ...formData, intolerancia: false })}
            />
            <RadioButton
              name="intolerancia"
              value={true}
              label="Sí, tengo alguna intolerancia"
              selectedValue={formData.intolerancia}
               onChange={() => setFormData({ ...formData, intolerancia: true })}
            /> 
          </div>

          {formData.intolerancia && (
            <FormInput
              name="detallesIntolerancia"
              label="Indica tus intolerancias"
              placeholder="Ej: gluten, lactosa...)"
              value={formData.detallesIntolerancia}
              onChange={handleInputChange}
              error={errors.detallesIntolerancia}
              required
            />
          )}
        </div>
        <div className={styles.formGroup}>
          <p>Respecto a cómo iré a la boda:</p>
          <div className={styles.radioButtonContainer}>
            <RadioButton
              name="transporte"
              value="coche"
              label="Voy en coche"
              selectedValue={formData.transporte}
              onChange={() => setFormData({ ...formData, transporte: 'coche' })}
            />

            <RadioButton
              name="transporte"
              value="autobus"
              label="Voy en autobús"
              selectedValue={formData.transporte}
              onChange={() => setFormData({ ...formData, transporte: 'autobus' })}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <p>Además, quiero indicar:</p>
            <FormInput
              name="mensaje"
              label="Mensaje para los novios (opcional)"
              placeholder="Ej: Me "
              value={formData.mensaje}
              onChange={handleInputChange}
            />  
        </div>      
        <FormButton className={styles.button}
                type="submit" 
                // disabled={loading} TODO: BLOCK WHEN IS LOADING
                >Enviar
        </FormButton>
      </form>
    </div>
    </FloralLayout>
    </MainLayout>
  );
}
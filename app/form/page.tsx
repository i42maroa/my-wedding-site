"use client";
import { useState } from "react";
import styles from "./Form.module.css"
import FormButton from "@/components/button/FormButton";
import RadioButton from "@/components/form/radio-button/RadioButton";
import { FormData, FormErrors } from "@/types/formTypes";
import { emptyErrors, validateForm, submitForm } from "../../services/formService";
import FormInput from "@/components/form/input/FormInput";
import FloralLayout from "@/components/layout/floral/FloralLayout";
import Link from "next/link";

export default function RSVPPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    transporte: "",
    intolerancia: false,
    detallesIntolerancia: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState<FormErrors>(emptyErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Manejadores
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "intolerancia" && !value ? { detallesIntolerancia: "" }: {}),
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const { isValid, errors } = validateForm(formData);
    setErrors(errors);
    if (!isValid) return;

    try {
      setIsSubmitting(true);
      await submitForm(formData);
      setSuccessMessage("🎉 ¡Formulario enviado con éxito!");
      setFormData({
        nombre: "",
        transporte: "",
        intolerancia: false,
        detallesIntolerancia: "",
        mensaje: "",
      });
      setErrors(emptyErrors);
    } catch (err) {
      alert("❌ Error al enviar. Inténtalo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FloralLayout>
      <Link href={'/'}> - Volver</Link>
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
            onChange={handleChange}
            required
            error={errors.nombre}
          />
          <p>y confirmo la asistencia a vuestra boda el día</p>
          <p>22 de Agosto de 2026</p>
        </div>
        
        <div className={styles.formGroup}>
          <p>Respecto a la comida:</p>
          <div className={styles.radioButtonContainer}>
            <RadioButton
              name="intolerancia"
              value={false}
              label="No padezco/padecemos ninguna intolerancia"
              selectedValue={formData.intolerancia}
              onChange={handleRadioChange}
            />
            <RadioButton
              name="intolerancia"
              value={true}
              label="Sí, tengo alguna intolerancia"
              selectedValue={formData.intolerancia}
              onChange={handleRadioChange}
            /> 
          </div>

          {formData.intolerancia && (
            <FormInput
            name="detallesIntolerancia"
            label="Indica tus intolerancias"
            placeholder="Ej: gluten, lactosa...)"
            value={formData.detallesIntolerancia}
            onChange={handleChange}
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
              onChange={handleRadioChange}
            />

            <RadioButton
              name="transporte"
              value="autobus"
              label="Voy en autobús"
              selectedValue={formData.transporte}
              onChange={handleRadioChange}
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
            onChange={handleChange}
          />  
        </div>      
        <FormButton className={styles.button} type="submit">Enviar</FormButton>

        {successMessage && (
          <p style={{ color: "#4caf50", fontWeight: 500 }}>
            {successMessage}
          </p>
        )}
      </form>
    </div>
    </FloralLayout>
  );
}
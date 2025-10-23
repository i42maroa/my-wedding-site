"use client";

import { ChangeEvent } from "react";
import styles from "./FormInput.module.css";

export interface InputProps {
  /** Nombre del campo (clave del formData) */
  name: string;
  /** Etiqueta visible encima del input */
  label?: string;
  /** Valor actual */
  value: string;
  /** Placeholder dentro del input */
  placeholder?: string;
  /** Tipo (text, email, etc.) */
  type?: string;
  /** Manejador de cambio */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Mensaje de error opcional */
  error?: string;
  /** Si es requerido */
  required?: boolean;
}

export default function FormInput({
  name,
  label,
  value,
  placeholder,
  type = "text",
  onChange,
  error,
  required = false,
}: InputProps) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`${styles.input} ${error ? styles.errorInput : ""}`}
      />

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

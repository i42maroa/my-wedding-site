"use client";

import { ChangeEvent } from "react";
import styles from "./FormInput.module.css";

export interface InputInterface {
  name: string;
  label?: string;
  value: string | number;
  placeholder?: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export default function FormInput({name, label, value, placeholder, type = "text", onChange,
  error, required = false }: InputInterface) {
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

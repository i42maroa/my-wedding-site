"use client";

import { ChangeEvent } from "react";
import styles from "./RadioButton.module.css";

export interface RadioButtonProps {
  /** Nombre del campo (clave en formData) */
  name: string;
  /** Valor que representa esta opción */
  value: string | boolean;
  /** Valor actual del campo seleccionado */
  selectedValue: string | boolean;
  /** Función de cambio, que actualiza formData */
  onChange: (name: string, value: string) => void;
  /** Etiqueta visible junto al botón */
  label: string;
}

export default function RadioButton({
  name,
  value,
  selectedValue,
  onChange,
  label,
}: RadioButtonProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <label className={styles.container}>
      <input
        type="radio"
        name={name}
        value={String(value)}
        checked={selectedValue === value}
        onChange={handleChange}
      />
      <span className={styles.customRadio}></span>
      {label}
    </label>
  );
}

import { FormData, FormErrors, ValidationResult } from "../types/formTypes";

/**
 * Crea un objeto de errores vacío.
 */
export const emptyErrors: FormErrors = {
  nombre: "",
  transporte: "",
  intolerancia: "",
  detallesIntolerancia: "",
};

/**
 * Valida los datos del formulario.
 * @param data Los datos actuales del formulario
 * @returns Objeto con errores y si el formulario es válido
 */
export function validateForm(data: FormData): ValidationResult {
  const errors: FormErrors = { ...emptyErrors };

  if (!data.nombre.trim()) {
    errors.nombre = "Por favor, introduce tu nombre.";
  }

  if (!data.transporte) {
    errors.transporte = "Selecciona un medio de transporte.";
  }

  if (!data.intolerancia) {
    errors.intolerancia = "Indica si tienes alguna intolerancia.";
  }

  if (data.intolerancia && !data.detallesIntolerancia.trim()) {
    errors.detallesIntolerancia =
      "Por favor, indica tus intolerancias alimentarias.";
  }

  const isValid = Object.values(errors).every((err) => err === "");

  return { isValid, errors };
}

/**
 * Envía el formulario a Firebase (pendiente de integración).
 * Actualmente simula un envío con un delay.
 */
export async function submitForm(data: FormData): Promise<void> {
  try {
    // 🔜 Aquí irá la integración con Firebase:
    // await addDoc(collection(db, "rsvp"), data);

    console.log("Simulando envío del formulario:", data);

    // Simulación de delay (como si se enviara a un backend)
    await new Promise((res) => setTimeout(res, 1000));

    return;
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    throw new Error("No se pudo enviar el formulario. Intenta más tarde.");
  }
}

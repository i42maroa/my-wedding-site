// services/formService.ts
import { db } from "@/services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FormData } from "@/types/formTypes";
import { showToast } from "@/services/notificationService";
/**
 * Crea un objeto de errores vacío.
 */
export interface FormErrors {
  nombre?: string;
  transporte?: string;
  intolerancia?: string;
  detallesIntolerancia?: string;
}

export function validateForm(data: FormData): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  if (!data.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio.";
  }

  if (!data.transporte) {
    errors.transporte = "Selecciona cómo vas a venir.";
  }

  // if (data.intolerancia && !data.detallesIntolerancia.trim()) {
  //   errors.detallesIntolerancia = "Por favor, especifica tus intolerancias.";
  // }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

/**
 * Envía el formulario a Firebase (pendiente de integración).
 * Actualmente simula un envío con un delay.
 */
export async function submitForm(
  data: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    await addDoc(collection(db, "asistencias"), {
      ...data,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (err) {
    showToast("🎉 ¡Confirmación enviada con éxito!", "error");
    return { success: false, error: "No se pudo enviar el formulario." };
  }
}
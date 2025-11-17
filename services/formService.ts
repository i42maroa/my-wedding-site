// services/formService.ts
import { ASISTENCIAS_COLLECTION, db } from "@/services/firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
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

export interface Family {
  assistance?: {
    transporte: 'bus' | 'car';
    confirm: boolean;
    mensaje?: string;
    detalleIntolerancia:string;
    intolerancia:boolean;
  };
  name: string;
  users: string[];
}

export function validateForm(data: FormData, id:string): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  if (id=== "" && !data.nombre.trim()) { // Si no tiene codigo de familia
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
export async function submitForm( data: FormData, familyId?:string): Promise<{ success: boolean; error?: string }> {
  try {
     if (familyId) {
      const familyRef = doc(db, ASISTENCIAS_COLLECTION, familyId);

      await updateDoc(familyRef, {
        assistance: {
          confirm: true, 
          transporte: data.transporte,
          intolerancia: data.intolerancia,
          detalleIntolerancia: data.intolerancia ? data.detallesIntolerancia : "",
          mensaje: data.mensaje || "",
        },
        updatedAt: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, ASISTENCIAS_COLLECTION), {...data, createdAt: serverTimestamp()});
    }

    return { success: true };
  } catch (err) {
    showToast("🎉 ¡Confirmación enviada con éxito!", "error");
    return { success: false, error: "No se pudo enviar el formulario." };
  }
}

export const getFamilyById = async (id: string): Promise<Family | null> => {
  const docRef = doc(db, ASISTENCIAS_COLLECTION, id); // cambia "families" si tu colección tiene otro nombre
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return snapshot.data() as Family;
};
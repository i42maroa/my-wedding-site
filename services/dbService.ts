import { AssistanceFamily, Family, FormDataAsistencia } from "@/interfaces/formTypes";
import { getDocument, getDocumentByField, updateDocument } from "./repositoryFirebase";
import { HandleErrorInterface } from "@/interfaces/error.interface";

export const getFamilyById = async (id: string): Promise<Family | null> => {
  return getDocument(id);
};

export const getFamilyByAccessCode = async (code: string): Promise<Family | null> => {
    return getDocumentByField<Family, "accessCode">("accessCode", code);
};

export async function createNewAsistencia( data: FormDataAsistencia): Promise<HandleErrorInterface> {
  try {
      await createNewAsistencia(data);
    return { success: true };
  } catch (err) {
    return { success: false, error: "No se pudo enviar el formulario." };
  }
}

export async function updateAsistencia(data: FormDataAsistencia, familyId:string): Promise<HandleErrorInterface> {
  try {
      await updateDocument<AssistanceFamily>(familyId, {
        assistance: {
          confirm: true,
          transporte: data.transporte,
          intolerancia: data.intolerancia,
          detalleIntolerancia: data.intolerancia ? data.detallesIntolerancia : "",
          mensaje: data.mensaje || "",
        }
      });
      localStorage.removeItem(familyId);
    return { success: true };
  } catch (err) {
    return { success: false, error: "No se pudo enviar el formulario." };
  }
}
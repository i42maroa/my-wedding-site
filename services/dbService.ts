import { Family, FamilyUpdate, FormDataAdmin, FormDataAsistencia, FormDataLogin } from "@/interfaces/formTypes";
import { createDocument, getCollection, getCollectionByFilter, getDocument, getDocumentByField, updateDocument } from "./repositoryFirebase";
import { HandleErrorInterface } from "@/interfaces/error.interface";

export const getFamilyById = async (id: string): Promise<Family | null> => {
  return getDocument(id);
};

export const getFamilyByAccessCode = async (code: string): Promise<Family | null> => {
    return getDocumentByField<Family, "accessCode">("accessCode", code);
};

export const getAllFamilies = async ():Promise<Family[]> =>{
  return getCollection<Family>()
}

export const getAllFamiliesByAssistence = async (assist:boolean):Promise<Family[]> =>{
  return getCollectionByFilter<Family,"assistanceConfirm">("assistanceConfirm", assist);
}

export async function createNewAsistencia( data: FormDataAsistencia): Promise<HandleErrorInterface> {
  try {
      await createNewAsistencia(data);
    return { success: true };
  } catch (err) {
    return { success: false, error: "No se pudo enviar el formulario." };
  }
}

export async function createNewFamily( data: FormDataAdmin): Promise<HandleErrorInterface> {
  try {
      await createDocument(data);
    return { success: true };
  } catch (err) {
    return { success: false, error: "No se pudo enviar el formulario." };
  }
}

export async function updateAsistencia(data: FormDataAsistencia, accessCode:string): Promise<HandleErrorInterface> {
  try {
    console.log(data)
      await updateDocument<FamilyUpdate>(data.id!, {
        assistanceConfirm:true,
        assistance: {
          transporte: data.transporte,
          intolerancia: data.intolerancia,
          detalleIntolerancia: data.intolerancia ? data.detallesIntolerancia : "",
          mensaje: data.mensaje || "",
        }
      });
      localStorage.removeItem(accessCode);
    return { success: true };
  } catch (err) {
    console.error(err)
    return { success: false, error: "No se pudo enviar el formulario." };
  }
}

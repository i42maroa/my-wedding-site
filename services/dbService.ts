import { FamilyInterface, FamilyUpdate, FormDataAdmin, FormDataAsistencia } from "@/interfaces/formTypes";
import { createDocument, getCollection, getCollectionByFilter, getDocument, getDocumentByField, updateDocument } from "./repositoryFirebase";
import { mapFirebaseError } from "@/helper/mapFirebaseError";

export const getFamilyById = async (id: string): Promise<FamilyInterface | null> => {
  return handleFirebaseResponse(async () => getDocument(id));
};

export const getFamilyByAccessCode = async (code: string): Promise<FamilyInterface | null> => {
  return handleFirebaseResponse(async () => getDocumentByField<FamilyInterface, "accessCode">("accessCode", code));
};

export const getAllFamilies = async ():Promise<FamilyInterface[]> =>{
  return handleFirebaseResponse(async () => getCollection<FamilyInterface>());
}

export const getAllFamiliesByAssistence = async (assist:boolean):Promise<FamilyInterface[]> =>{
  return handleFirebaseResponse(async () => getCollectionByFilter<FamilyInterface,"assistanceConfirm">("assistanceConfirm", assist));
}

export async function createNewFamily( data: FormDataAdmin): Promise<string> {
   return handleFirebaseResponse(async () => await createDocument(data))
}

export async function updateAsistencia(data: FormDataAsistencia, accessCode:string): Promise<void> {
  const assistance = {
        assistanceConfirm:true,
        assistance: {
          transporte: data.transporte,
          intolerancia: data.intolerancia,
          detalleIntolerancia: data.intolerancia ? data.detallesIntolerancia : "",
          mensaje: data.mensaje || "",
        }
      }
  localStorage.removeItem(accessCode);

  return handleFirebaseResponse(async () => await updateDocument<FamilyUpdate>(data.id!, assistance));
}

async function handleFirebaseResponse<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    throw mapFirebaseError(err);
  }
}
import { FamilyInterface, FORM_DATA_DEFAULT, FormDataAsistencia, FormDataLogin, FormErrors } from "@/interfaces/formTypes";
import { updateAsistencia } from "./dbService";
import { HandleErrorInterface } from "@/interfaces/error.interface";

export const validateForm = (data: FormDataAsistencia): { isValid: boolean; errors: FormErrors } =>{
  const errors: FormErrors = {};

  if (!data.transporte) {
    errors.transporte = "Selecciona cómo vas a venir.";
  }

   if (data.intolerancia && (!data.detallesIntolerancia ||data.detallesIntolerancia === "")) {
    errors.detallesIntolerancia = "Indica que intolerancia tienes.";
  }

  return { isValid:isValid(errors), errors };
}

export const  validateFormLogin = (data: FormDataLogin): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};

  if (!data.accessCode) {
    errors.accessCode = "Introduce el codigo de familia";
  }

  return { isValid: isValid(errors), errors };
}

export async function submitForm (formData:FormDataAsistencia, accessCode:string):Promise<HandleErrorInterface> {
    return await updateAsistencia(formData, accessCode);
}

export function preloadForm(family: FamilyInterface): FormDataAsistencia{
    return family.assistance? {
        id:family.id,
        assistanceConfirm:true,
        intolerancia: family.assistance.intolerancia,
        detallesIntolerancia: family.assistance.detalleIntolerancia || "",
        transporte: family.assistance.transporte,
        mensaje: family.assistance.mensaje || ""} : 
        {...FORM_DATA_DEFAULT, id:family.id};
}

function isValid(errors:FormErrors):boolean {
  return Object.keys(errors).length === 0;
}
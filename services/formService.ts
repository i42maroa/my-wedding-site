import { Family, FORM_DATA_DEFAULT, FormDataAsistencia, FormDataLogin, FormErrors } from "@/interfaces/formTypes";
import { updateAsistencia } from "./dbService";
import { HandleErrorInterface } from "@/interfaces/error.interface";

export function isFormWithAccessCode(id:string):boolean{
  return id !== "";
}

export function validateForm(data: FormDataAsistencia, id:string): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  if (!isFormWithAccessCode(id) && !data.nombre!.trim()) { 
    errors.nombre = "El nombre es obligatorio.";
  }

  if (!data.transporte) {
    errors.transporte = "Selecciona cómo vas a venir.";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

export function validateFormLogin(data: FormDataLogin): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  if (!data.accessCode) {
    errors.accessCode = "Introduce el codigo de familia";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

export async function submitForm(formData:FormDataAsistencia, accessCode:string):Promise<HandleErrorInterface> {
    return await updateAsistencia(formData, accessCode);
}

export function preloadForm(family: Family): FormDataAsistencia{
    return family.assistance? {
        id:family.id,
        intolerancia: family.assistance.intolerancia,
        detallesIntolerancia: family.assistance.detalleIntolerancia || "",
        transporte: family.assistance.transporte,
        mensaje: family.assistance.mensaje || ""} : 
        {...FORM_DATA_DEFAULT, id:family.id};
}


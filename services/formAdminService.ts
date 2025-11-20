import { FormDataAdmin, FormErrors } from "@/interfaces/formTypes";
import { createNewFamily } from "./dbService";
import { HandleErrorInterface } from "@/interfaces/error.interface";
import { generateAccessCode } from "./accessCodeService";


export function validateFormAdmin(data: FormDataAdmin): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};
  const usersClean = data.users.filter(item => item !=='');
   if (!data.name) {
    errors.transporte = "Selecciona cómo vas a venir.";
  }
  if (!data.mesa) {
    errors.mesa = "Numero de mesa obligatorio.";
  }

  if(!data.users || usersClean.length < 1 ){
    errors.users = "Minimo un usuario por familia";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

export async function submitForm(formData:FormDataAdmin):Promise<HandleErrorInterface> {
    const usersClean = formData.users.filter(item => item !=='');
    const formDataClean = {...formData,
      assistanceConfirm:false,
      users:usersClean,
      accessCode:generateAccessCode(formData)
    };
    return await createNewFamily(formDataClean);
}


import { FormDataAdmin, FormErrors } from "@/interfaces/formTypes";
import { createNewFamily } from "./dbService";
import { generateAccessCode } from "./accessCodeService";


export function validateFormAdmin(data: FormDataAdmin): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};
  const usersClean = cleanUsers(data.users);

   if (!data.name) {
    errors.nombre = "Selecciona cómo vas a venir.";
  }
  if (!data.mesa || data.mesa < 0) {
    errors.mesa = "Numero de mesa obligatorio.";
  }

  if(!data.users || usersClean.length < 1 ){
    errors.users = "Minimo un usuario por familia";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

export async function submitForm(formData:FormDataAdmin):Promise<string> {
    const usersClean = cleanUsers(formData.users);
    const formDataClean = {...formData,
      assistanceConfirm:false,
      users:usersClean,
      accessCode:generateAccessCode(formData)
    };
    return await createNewFamily(formDataClean);
}

const cleanUsers = (user:string[]): string[] => {
 return user
  .map(user => user.trim())
    .filter(item => item !=='');
}

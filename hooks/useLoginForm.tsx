"use client";

import { FamilyInterface, FormDataLogin, FormErrors } from "@/interfaces/formTypes";
import { validateFormLogin } from "@/services/formService";
import { useForm, UseFormResult } from "@/hooks/useForm";
import { getFamilyByAccessCode } from "@/services/dbService";
import { showToastError } from "@/services/notificationService";


export function useLoginForm(onSuccessDo?: (accessCode:string) => void): UseFormResult<FormDataLogin, FormErrors> {
   const initialValues:FormDataLogin = {accessCode:''};
  const onSuccess = (family:FamilyInterface|null) => {
      if(family){
        onSuccessDo?.(family.accessCode);
         
      }else{
        showToastError("No existe ninguna familia con el código introducido");
      }    
    }

  const form = useForm<FormDataLogin, FormErrors, FamilyInterface|null>({
    initialValues,
    validate: validateFormLogin,
    submit: (values) => getFamilyByAccessCode(values.accessCode.toUpperCase()),
    onSuccess
  });

  return {
    ...form,
  };
}

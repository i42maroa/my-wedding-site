"use client";

import { FamilyInterface, FormDataLogin, FormErrors } from "@/interfaces/formTypes";
import { validateFormLogin } from "@/services/formService";
import { useForm, UseFormResult } from "@/hooks/useForm";
import { getFamilyByAccessCode } from "@/services/dbService";
import { saveItemInLocalStorage } from "@/services/localStorageService";
import { showToastError } from "@/services/notificationService";


export function useLoginForm(onSuccessDo?: (accessCode:string) => void): UseFormResult<FormDataLogin, FormErrors> {

  const initialValues:FormDataLogin = {accessCode:''};
  const onSuccess = (family:FamilyInterface|null) => {
      if(family){
        saveItemInLocalStorage<FamilyInterface>(family, family.accessCode);
        onSuccessDo?.(family.accessCode);
      }else{
        showToastError("No existe ninguna familia con el código introducido");
      }    
    }

  const form = useForm<FormDataLogin, FormErrors, FamilyInterface|null>({
    initialValues,
    validate: validateFormLogin,
    submit: (values) => getFamilyByAccessCode(values.accessCode),
    onSuccess
  });

  return {
    ...form,
  };
}

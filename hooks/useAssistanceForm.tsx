"use client";

import { useEffect, useMemo, useState } from "react";
import { FamilyInterface, FORM_DATA_DEFAULT, FormDataAsistencia, FormErrors } from "@/interfaces/formTypes";
import { preloadForm, submitForm, validateForm } from "@/services/formService";
import { useForm, UseFormResult } from "@/hooks/useForm";

export type UseAssistanceFormResult = UseFormResult<FormDataAsistencia, FormErrors> & {
  names: string[];
};

export function useAssistanceForm(prechargeFamily: FamilyInterface, onSuccess?: () => void
): UseAssistanceFormResult {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => { 
    setNames(prechargeFamily.users);
  }, [prechargeFamily]);

  const initialValues = useMemo(() => preloadForm(prechargeFamily) ?? FORM_DATA_DEFAULT, 
  [prechargeFamily]);

  const form = useForm<FormDataAsistencia, FormErrors>({
    initialValues,
    validate: validateForm,
    submit: (values) => submitForm(values, prechargeFamily.accessCode),
    onSuccess
  });

  return {
    ...form,
    names
  };
}

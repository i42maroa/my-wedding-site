
import { FormDataAdmin, FormErrors } from "@/interfaces/formTypes";
import { useForm, UseFormResult } from "@/hooks/useForm";
import { submitEditForm, submitForm, validateFormAdmin } from "@/services/formAdminService";

export type FormFamilyMode = "create" | "edit";

export type UseFamilyFormResult  = UseFormResult<FormDataAdmin, FormErrors> & {
  addUser: () => void,
  handleIntegranteChange: (index:number, value:string) => void
};

export type UseFamilyFormParams = {
  formMode: FormFamilyMode; 
  initialData: FormDataAdmin; 
  onSuccess?: () => void;
};

export function useFamilyForm({formMode, initialData, onSuccess}: UseFamilyFormParams): UseFamilyFormResult  {

  const form = useForm<FormDataAdmin, FormErrors, string>({
    initialValues:initialData,
    validate: validateFormAdmin,
    submit: async (values) => {
      return formMode === "create" ? submitForm(values) : submitEditForm(values);
    },
    onSuccess 
  });

  const addUser = () => {
    !form.formData.users.includes('') && form.setFormData((prev) => ({ ...prev, users: [...prev.users, ''] }));
  }

  const handleIntegranteChange = (index:number, value:string) => {
    const newIntegrantes = [...form.formData.users];
    newIntegrantes[index] = value;
    form.setFormData((prev) => ({ ...prev, users: newIntegrantes }));
  };

  return {
    ...form,
    addUser,
    handleIntegranteChange
  };
}

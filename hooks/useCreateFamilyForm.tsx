
import {  FORM_DATA_ADMIN_DEFAULT, FormDataAdmin, FormErrors } from "@/interfaces/formTypes";
import { useForm, UseFormResult } from "@/hooks/useForm";
import { submitForm, validateFormAdmin } from "@/services/formAdminService";
import { showToastSuccess } from "@/services/notificationService";


export type useCreateFamilyForm = UseFormResult<FormDataAdmin, FormErrors> & {
  addUser: () => void,
  handleIntegranteChange: (index:number, value:string) => void
};
export function useCreateFamilyForm(): useCreateFamilyForm {
 
  const initialValues =  FORM_DATA_ADMIN_DEFAULT;

  const form = useForm<FormDataAdmin, FormErrors, string>({
    initialValues,
    validate: validateFormAdmin,
    submit: (values) => submitForm(values),
    onSuccess:(newFamilyId)=> {
        if (newFamilyId) {
            showToastSuccess("Familia creada correctamente");
            form.setFormData(FORM_DATA_ADMIN_DEFAULT);
        }
      }
  });

  const addUser = () => {
    !form.formData.users.includes('') && form.setFormData((prev) => ({ ...prev, users: [...form.formData.users, ''] }));
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

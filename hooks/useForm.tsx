"use client";

import { useState } from "react";
import { startLoading, stopLoading } from "@/services/loadingService";
import { AppError } from "@/helper/mapFirebaseError";

export type UseFormResult<FormDataInterface, FormErrorInterface> = {
  formData: FormDataInterface;
  formErrors: FormErrorInterface;
  apiError?: AppError;
  isSubmitting: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataInterface>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
};

type ValidateFn<FormDataInterface, FormErrorInterface> = (values: FormDataInterface) => { isValid: boolean; errors: FormErrorInterface };

type UseFormOptions<FormDataInterface, FormErrorInterface, TSubmitResult = unknown> = {
  initialValues: FormDataInterface;
  validate?: ValidateFn<FormDataInterface, FormErrorInterface>;
  submit: (values: FormDataInterface) => Promise<TSubmitResult>;
  onSuccess?: (result: TSubmitResult) => void;
};

export function useForm<FormDataInterface, FormErrorInterface, TSubmitResult = unknown>(options: UseFormOptions<FormDataInterface, FormErrorInterface, TSubmitResult>): 
  UseFormResult<FormDataInterface, FormErrorInterface> {

  const { initialValues, validate, submit, onSuccess } = options;
  const [formData, setFormData] = useState<FormDataInterface>(initialValues);
  const [formErrors, seFormErrorInterface] = useState<FormErrorInterface>({} as FormErrorInterface);
  const [apiError, setApiError] = useState<AppError>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate) {
      const { isValid, errors } = validate(formData);
      if (!isValid) {
        seFormErrorInterface(errors);
        return;
      }
    }

    startLoading();
    setIsSubmitting(true);
    setApiError(undefined);

    await submit(formData)
      .then(result => onSuccess?.(result))
      .catch((err: any) => setApiError(err))
      .finally(()=> {
        setIsSubmitting(false);
        stopLoading();
      });
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    apiError,
    handleInputChange,
    setFormData,
    handleSubmit,
  };
}
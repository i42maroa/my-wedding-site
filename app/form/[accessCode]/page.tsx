"use client";
import { use, useEffect, useState } from "react";
import styles from "./Form.module.css"
import FormButton from "@/components/button/FormButton";
import RadioButton from "@/components/form/radio-button/RadioButton";
import { Family, FORM_DATA_DEFAULT, FormDataAsistencia, FormErrors } from "@/interfaces/formTypes";
import { isFormWithAccessCode, preloadForm, submitForm, validateForm } from "../../../services/formService";
import FormInput from "@/components/form/input/FormInput";
import FloralLayout from "@/components/layout/floral/FloralLayout";
import { showToastError, showToastSuccess } from "@/services/notificationService";
import { startLoading, stopLoading } from "@/services/loadingService";
import MainLayout from "@/components/layout/main/MainLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { getFamilyByAccessCode } from "@/services/dbService";
import { loadItemFromLocalStorage } from "@/services/localStorageService";

type FormPageProps = {
  params: Promise<{ accessCode: string }>;
};
export default function RSVPPage({params}:FormPageProps) {
  const [formData, setFormData] = useState<FormDataAsistencia>(FORM_DATA_DEFAULT);
  const [errors, setErrors] = useState<FormErrors>({});  
  const [names, setNames] = useState(['']);
  const router = useRouter();
  const {accessCode} = use( params);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, errors } = validateForm(formData, accessCode);
    if (!isValid) {
      setErrors(errors);
      return;
    }
    startLoading();    
    submitForm(formData, accessCode)
      .then(result => {
        if (result.success) {
            showToastSuccess("¡Confirmación enviada con éxito!");
            router.push(`/`) // Go to main page
          } else {
            showToastError(result.error || " Error al enviar la confirmación");
          }
      })
      .catch(() => showToastError("Error inesperado al enviar la confirmación"))
      .finally(() => stopLoading())
  };

  const loadFamilyData = async () => { 
       const dataFromLocalStorage = loadItemFromLocalStorage<Family>(accessCode);
 
       if(dataFromLocalStorage){
          prechargeForm(dataFromLocalStorage);
       }else{ //Go to DB
          startLoading();
          await getFamilyByAccessCode(accessCode)
            .then(family => {
              if(family){
                prechargeForm(family);
              } else{
                showToastError("No asignada ninguna familia a este id.");
                // router.push('/login');  
              }             
            })
            .catch((err) => {
               showToastError("No hemos podido cargar tus datos automáticamente."); 
                // router.push('/login');           
            })
            .finally(() => stopLoading());
       }
    };
  

  const prechargeForm = (data:Family) => {
      setNames(data.users);
      const newFormData = preloadForm(data);
      setFormData(newFormData);
  }

  useEffect(() => { loadFamilyData();}, [searchParams]);


  return (
      <MainLayout header={false}>
      <FloralLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Asistencia</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <p>Hola, { names.length > 1 ? 'somos ': 'soy '}
            {
              isFormWithAccessCode(accessCode) && (
                <>
                  <span className={styles.names}>{ names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + ' y ' + names[names.length - 1]}</span>
                  <span> y { names.length > 1 ? 'confirmamos': 'confirmo'} la asistencia a vuestra boda el día:</span>
                </>
              )} 
            </p>      
            {
              !isFormWithAccessCode(accessCode) && (
                <>
                <FormInput
                  name="nombre"
                  label="Indica vuestros nombres"
                  placeholder="Ej: Ana García Rosales, Jose María Martinez"
                  value={formData.nombre!}
                  onChange={handleInputChange}
                  required
                  error={errors.nombre}/>
                  <p>y { names.length > 1 ? 'confirmamos': 'confirmo'} la asistencia a vuestra boda el día</p>
                </>
              ) 
            }
              
            <h3 className={styles.date}>22 de Agosto de 2026</h3>
          </div>
          
          <div className={styles.formGroup}>
            <p>Respecto a la comida:</p>
            <div className={styles.radioButtonContainer}>
              <RadioButton
                name="intolerancia"
                value={false}
                label="No padezco/padecemos ninguna intolerancia"
                selectedValue={formData.intolerancia}
                onChange={() => setFormData({ ...formData, intolerancia: false })}
              />
              <RadioButton
                name="intolerancia"
                value={true}
                label="Sí, tengo alguna intolerancia"
                selectedValue={formData.intolerancia}
                onChange={() => setFormData({ ...formData, intolerancia: true })}
              /> 
            </div>

            {formData.intolerancia && (
              <FormInput
                name="detallesIntolerancia"
                label="Indica tus intolerancias"
                placeholder="Ej: gluten, lactosa...)"
                value={formData.detallesIntolerancia}
                onChange={handleInputChange}
                error={errors.detallesIntolerancia}
                required
              />
            )}
          </div>
          <div className={styles.formGroup}>
            <p>Respecto a cómo iré a la boda:</p>
            <div className={styles.radioButtonContainer}>
              <RadioButton
                name="transporte"
                value="car"
                label="Voy en coche"
                selectedValue={formData.transporte}
                onChange={() => setFormData({ ...formData, transporte: 'car' })}
              />

              <RadioButton
                name="transporte"
                value="bus"
                label="Voy en autobús"
                selectedValue={formData.transporte}
                onChange={() => setFormData({ ...formData, transporte: 'bus' })}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <p>Además, quiero indicar:</p>
              <FormInput
                name="mensaje"
                label="Mensaje para los novios (opcional)"
                placeholder="Ej: Me "
                value={formData.mensaje}
                onChange={handleInputChange}
              />  
          </div>      
          <FormButton className={styles.button}
                  type="submit" 
                  // disabled={loading} TODO: BLOCK WHEN IS LOADING
                  >Enviar
          </FormButton>
        </form>
      </div>
      </FloralLayout>
      </MainLayout>
  );
}
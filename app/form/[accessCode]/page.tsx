"use client";
import { use, useEffect, useState } from "react";
import styles from "./Form.module.css"
import FormButton from "@/components/button/FormButton";
import RadioButton from "@/components/form/radio-button/RadioButton";
import { FamilyInterface, FORM_DATA_DEFAULT, FormDataAsistencia, FormErrors } from "@/interfaces/formTypes";
import { preloadForm, submitForm, validateForm } from "../../../services/formService";
import FormInput from "@/components/form/input/FormInput";
import FloralLayout from "@/components/layout/floral/FloralLayout";
import { showToastError, showToastSuccess } from "@/services/notificationService";
import { startLoading, stopLoading, subscribeToLoading, unsubscribeFromLoading } from "@/services/loadingService";
import { useRouter } from "next/navigation";
import { getFamilyByAccessCode } from "@/services/dbService";
import { loadItemFromLocalStorage } from "@/services/localStorageService";

type FormPageProps = {params: { accessCode: string }};
export default function RSVPPage({params}:FormPageProps) {
  const [formData, setFormData] = useState<FormDataAsistencia>(FORM_DATA_DEFAULT);
  const [errors, setErrors] = useState<FormErrors>({});  
  const [names, setNames] = useState<string[]>([]);
  const router = useRouter();
  const {accessCode} = params;
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, errors } = validateForm(formData);
    if (!isValid) {
      setErrors(errors);
      return;
    }
    startLoading(); 
    console.log(formData)   
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
       const dataFromLocalStorage = loadItemFromLocalStorage<FamilyInterface>(accessCode);
 
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
                router.push('/login');  
              }             
            })
            .catch((err) => {
               showToastError("No hemos podido cargar tus datos automáticamente."); 
               router.push('/login');           
            })
            .finally(() => stopLoading());
       }
    };
  
  const prechargeForm = (data:FamilyInterface) => {
      setNames(data.users);
      const newFormData = preloadForm(data);
      setFormData(newFormData);
  }

  useEffect(() => { 
      loadFamilyData();
      const handleLoading = (loading: boolean) => setIsLoading(loading);
      subscribeToLoading(handleLoading);
      return () => unsubscribeFromLoading(handleLoading);
  }, []);

  const textSomosOrSoy = () => names.length > 1 ? 'somos ': 'soy ';
  const textConfirmamosOrConfirmo = () => names.length > 1 ? 'Confirmamos': 'Confirmo';
  const userNames = () => names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + ' y ' + names[names.length - 1];

  return (
      <FloralLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Asistencia</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <p>Hola, {textSomosOrSoy()} <span className={styles.names}>{userNames()}</span></p> 
            <RadioButton
                name="assistanceConfirm"
                value={true}
                label={`${textConfirmamosOrConfirmo()} la asistencia a vuestra boda el día`}
                selectedValue={formData.assistanceConfirm}
                onChange={() => setFormData({ ...formData})}
              />                    
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
          <FormButton className={styles.button}type="submit" disabled={isLoading}>Enviar</FormButton>
        </form>
      </div>
      </FloralLayout>
  );
}
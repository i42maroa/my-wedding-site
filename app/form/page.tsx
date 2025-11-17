"use client";
import { useEffect, useState } from "react";
import styles from "./Form.module.css"
import FormButton from "@/components/button/FormButton";
import RadioButton from "@/components/form/radio-button/RadioButton";
import { FORM_DATA_DEFAULT, FormDataAsistencia, FormErrors } from "@/types/formTypes";
import { validateForm, submitForm, getFamilyById,  } from "../../services/formService";
import FormInput from "@/components/form/input/FormInput";
import FloralLayout from "@/components/layout/floral/FloralLayout";
import { showToast } from "@/services/notificationService";
import { startLoading, stopLoading } from "@/services/loadingService";
import MainLayout from "@/components/layout/main/MainLayout";
import { useRouter, useSearchParams } from "next/navigation";

export default function RSVPPage() {
  const [formData, setFormData] = useState<FormDataAsistencia>(FORM_DATA_DEFAULT);

  const [errors, setErrors] = useState<FormErrors>({});  
  const [names, setNames] = useState(['']);
  const [id, setId] = useState('');

  const router = useRouter();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

  const isFamilyLoaded = id !== "";

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    try {
      const { isValid, errors } = validateForm(formData, id);
      setErrors(errors);

      if (!isValid) {
        showToast("Por favor, corrige los errores del formulario.", "error");
        stopLoading();
        return;
      }

      // Simulamos brevemente el proceso (opcional, mejora UX)
      await new Promise((r) => setTimeout(r, 400));
  
      // Envío a Firestore (asíncrono)
      const result = await submitForm(formData, id);

      if (result.success) {
        showToast("🎉 ¡Confirmación enviada con éxito!", "success");
        router.push(`/`)
      } else {
        showToast(result.error || " Error al enviar la confirmación", "error");
      }
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      showToast("Error inesperado al enviar la confirmación", "error");
    } finally {
      stopLoading();
    }
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    const loadFamilyData = async () => {
      const id = searchParams.get("id");

      if (!id) {
        router.push('/login');
        return;
      }; 
      setId(id);

      startLoading();
      console.log("loading")
      //ver si está en el localStorage
       const raw = localStorage.getItem(id);
      
       
      let family;
      if (raw) {
        console.log("loading from LocalStorage")
          family = JSON.parse(raw);
      }else{
        try {
          console.log("loading from firebase")
          family = await getFamilyById(id);
        } catch (error) {
          console.error("Error al cargar datos de la familia:", error);
          router.push('/login');
          showToast("No hemos podido cargar tus datos automáticamente.", "error");      
        } finally {
          stopLoading();
        }
      }

       if (!family) {
            showToast(
              "No hemos encontrado tu invitación. Revisa el enlace o contacta con los novios ❤️",
              "error"
            );
            setId(''); //Ponemos a empty para que rellenen el nombre
            return;
          }

          // Precargamos siempre los nombres de invitados
          setNames(family.users);
          const newFormData: FormDataAsistencia = {
            ...FORM_DATA_DEFAULT,
          };

          if (family.assistance?.confirm) {
            newFormData.intolerancia = family.assistance.intolerancia;
            newFormData.detallesIntolerancia =
              family.assistance.detalleIntolerancia || "";
            newFormData.transporte = family.assistance.transporte;
            newFormData.mensaje = family.assistance.mensaje || "";
          }

          setFormData(newFormData);
      stopLoading();
    };

    loadFamilyData();
  }, [searchParams]);

  return (
    <MainLayout header={false}>
    <FloralLayout>
    <div className={styles.container}>
      <h2 className={styles.title}>Asistencia</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <p>Hola, { names.length > 1 ? 'somos ': 'soy '}
           {
            isFamilyLoaded && (
              <>
                <span className={styles.names}>{ names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + ' y ' + names[names.length - 1]}</span>
                <span> y { names.length > 1 ? 'confirmamos': 'confirmo'} la asistencia a vuestra boda el día:</span>
              </>
            )} 
           </p>      
          {
            !isFamilyLoaded && (
              <>
              <FormInput
                name="nombre"
                label="Indica vuestros nombres"
                placeholder="Ej: Ana García Rosales, Jose María Martinez"
                value={formData.nombre}
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
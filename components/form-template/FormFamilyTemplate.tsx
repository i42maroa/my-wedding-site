

import { useFamilyForm, UseFamilyFormParams } from '@/hooks/useCreateFamilyForm';
import styles from './FormFamilyTemplate.module.css'
import { useLoadingStatus } from '@/hooks/useIsLoadingStatus';
import { useApiErrorToast } from '@/hooks/useApiErrorToast';
import FormInput from '../form/input/FormInput';
import RadioButton from '../form/radio-button/RadioButton';
import FormButton from '../button/FormButton';


export default function FormFamilyTemplate({formMode, initialData, onSuccess}: UseFamilyFormParams) {

    const {formData, formErrors, handleInputChange, setFormData, handleSubmit,
          apiError, addUser, handleIntegranteChange } = useFamilyForm({formMode, initialData, onSuccess});

    const isLoading = useLoadingStatus();
    useApiErrorToast(apiError, "Error al enviar el formulario");

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <FormInput
                name="name"
                label="Nombre de familia"
                value={formData.name}
                onChange={handleInputChange}
                required
                error={formErrors.nombre}
                />
                <FormInput
                name="mesa"
                label="Mesa"
                value={formData.mesa}
                onChange={handleInputChange}
                required
                error={formErrors.mesa}
                />
            <div className={styles.radioButtonContainer}>
                <RadioButton
                    name="origen"
                    value={'novio'}
                    label="Parte novio"
                    selectedValue={formData.origen}
                    onChange={() => setFormData({ ...formData, origen: 'novio' })}
                />
                <RadioButton
                    name="origen"
                    value={'novia'}
                    label="Parte novia"
                    selectedValue={formData.origen}
                    onChange={() => setFormData({ ...formData, origen: 'novia' })}
                /> 
                </div>
            </div>
            

            <div className={styles.userContainer}>          
            <span className={styles.userTitle}> <h3>Users</h3> <button type="button" onClick={()=>addUser()}>+</button></span>
            {
                formData.users.map((user, index) =>
                <FormInput
                    key={index}
                    name={user}
                    label="Integrante"
                    value={user}
                    onChange={e =>  handleIntegranteChange(index, e.target.value)}
                    error={formErrors.users}
                />
                )
            }  
            </div>    

            <FormButton type="submit" className={styles.button} disabled={isLoading}>
                Guardar familia
            </FormButton>
        </form>
    );
}
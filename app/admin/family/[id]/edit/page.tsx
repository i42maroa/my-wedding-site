'use client'

import { useEffect, useMemo, useState } from "react";
import styles from "./AdminEditFamily.module.css";
import FormFamilyTemplate from "@/components/form-template/FormFamilyTemplate";
import { FORM_DATA_ADMIN_DEFAULT, FormDataAdmin } from "@/interfaces/formTypes";
import { showToastError, showToastSuccess } from "@/services/notificationService";
import { loadItemFromLocalStorage, removeLocalStorage } from "@/services/localStorageService";
import { useParams, useRouter } from "next/navigation";

export default function AdminEditFamilyPage() {
    
    const params = useParams<{ id: string }>();
    const id = useMemo(() => params?.id, [params]);
    const [initialData, setInitialData] = useState<FormDataAdmin>()
    const router = useRouter();

    useEffect(() => {
        const data = loadItemFromLocalStorage<FormDataAdmin>(id);
        if(!data){
            showToastError("No existe id");
            router.replace("/admin/family"); 
        }else{
              const initialValues: FormDataAdmin = {
                ...FORM_DATA_ADMIN_DEFAULT,
                ...data,
                id,
                users: data?.users ?? FORM_DATA_ADMIN_DEFAULT.users,
            };

            setInitialData(initialValues);
        }
        
    }, [id, router]);  

    const onSuccess = () => {
        showToastSuccess("Familia creada correctamente");
        removeLocalStorage(id);
        router.replace('/admin/family')
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Editar familia</h1>
            {initialData && <FormFamilyTemplate formMode="edit" initialData={initialData} onSuccess={onSuccess} />}
        </div>
    );
}
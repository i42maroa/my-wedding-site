import { AppError } from "@/helper/mapFirebaseError";
import { FamilyInterface } from "@/interfaces/formTypes";
import { getAllFamilies } from "@/services/dbService";
import { startLoading, stopLoading } from "@/services/loadingService";
import { useState } from "react";

export function useLoadAllFamilies() {
    const [families, setFamilies] = useState<FamilyInterface[]>([]);
    const [apiError, setApiError] = useState<AppError>();

    const loadFamilies = async (): Promise<FamilyInterface[]> => {
        startLoading();
        
        return await getAllFamilies()
        .then(families => {
            setFamilies(families);
            return families;
        })
        .catch((err) => {
            setApiError(err);
            return []
        })
        .finally(() => stopLoading());
      };

    return {
        families,
        loadFamilies,
        apiError,
        setApiError
    }
}

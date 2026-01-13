"use client";

import { useEffect, useState } from "react";
import { FamilyInterface } from "@/interfaces/formTypes";
import { getFamilyByAccessCode } from "@/services/dbService";
import { loadItemFromLocalStorage } from "@/services/localStorageService";
import { startLoading, stopLoading } from "@/services/loadingService";
import { AppError } from "@/helper/mapFirebaseError";

export function useLoadFamily(accessCode: string) {
  const [family, setFamily] = useState<FamilyInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError>();

  useEffect(() => {
    const loadFamilyData = async () => {
     
      const dataFromLocalStorage =
        loadItemFromLocalStorage<FamilyInterface>(accessCode);

      if (dataFromLocalStorage) {
        setFamily(dataFromLocalStorage);
        setLoading(false);
        return;
      }  
      
      startLoading();

      await getFamilyByAccessCode(accessCode)
        .then(familyFromDB => setFamily(familyFromDB))
        .catch((err:AppError) => {
          setError(err);
          setFamily(null);
        })
        .finally(() => {
          stopLoading();    
          setLoading(false);
        })
    };

    loadFamilyData();
  }, [accessCode]);

  return { family, loading, error };
}

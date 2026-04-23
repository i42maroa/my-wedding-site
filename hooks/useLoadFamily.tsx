"use client";

import { useEffect, useState } from "react";
import { FamilyInterface } from "@/interfaces/formTypes";
import {  getFamilyById } from "@/services/dbService";
import { startLoading, stopLoading } from "@/services/loadingService";
import { AppError } from "@/helper/mapFirebaseError";

export function useLoadFamily(familyId: string) {
  const [family, setFamily] = useState<FamilyInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError>();

  useEffect(() => {
    const loadFamilyData = async () => {
      
      startLoading();
      setLoading(true)

      await getFamilyById(familyId)
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
  }, [familyId]);

  return { family, loading, error };
}

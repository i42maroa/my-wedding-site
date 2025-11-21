"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/main/MainLayout";
import styles from "./AdminFamily.module.css";
import { showToastError } from "@/services/notificationService";
import { startLoading, stopLoading } from "@/services/loadingService";
import { getAllFamilies, getAllFamiliesByAssistence } from "@/services/dbService";
import { FamilyInterface } from "@/interfaces/formTypes";
import BaseButton from "@/components/button/base/BaseButton";
import FamilyCard from "@/components/card/family/FamilyCard";

export default function AdminFamilyListPage() {
  const [families, setFamilies] = useState<FamilyInterface[]>([]);
  const [isFilterConfirm, setIsFilterConfirm] = useState(false);
  const [familiesFiltered, setFamiliesFiltered] = useState<FamilyInterface[]>([]);

  const loadFamilies = async () => {
    startLoading();
    await getAllFamilies()
    .then(families => {
      setFamilies(families);
      setFamiliesFiltered(families);
      setIsFilterConfirm(true);
      
    })
    .catch(() => showToastError("Error al cargar las familias"))
    .finally(() => stopLoading());
  };

  const filterFamilies = async (assist:boolean) => {
    startLoading();
    await getAllFamiliesByAssistence(assist)
    .then(families => {
      setFamilies(families);
      setFamiliesFiltered(families);
      setIsFilterConfirm(assist);})
    .catch(() => showToastError("Error al cargar las familias"))
    .finally(() => stopLoading());
  }

  const filterFamiliesByBus = () => {
    const famWithBus = families.filter(fam => fam.assistance && fam.assistance.transporte == 'bus')
    setFamiliesFiltered(famWithBus); 
  }

  const filterFamiliesByIntolerancia = () => {
    const famWithIntolerancia = families.filter(fam => fam.assistance && fam.assistance.intolerancia)
    setFamiliesFiltered(famWithIntolerancia); 
  }

  const clearFilters = () => {
    setFamiliesFiltered(families); 
  }

  useEffect(() => {
    // loadFamilies();
}, []);

  return (
    <MainLayout header={false}>
      <div className={styles.container}>
        <h2 className={styles.title}>Familias</h2>
        <div className={styles.buttonContainer}>
            <BaseButton onClick={() => loadFamilies()}>Todos</BaseButton>
            <BaseButton onClick={() => filterFamilies(true)}>Confirmado</BaseButton>
            <BaseButton onClick={() => filterFamilies(false)}>No confirmado</BaseButton>
        </div>
        {
          isFilterConfirm &&  <div className={styles.buttonContainer}>
            <BaseButton onClick={() => filterFamiliesByBus()}>Bus</BaseButton>
            <BaseButton onClick={() => filterFamiliesByIntolerancia()}>Intolerancia</BaseButton>
            <BaseButton onClick={() => clearFilters()}>Clear</BaseButton>

        </div>
        }   
            {
                familiesFiltered.length > 0 && 
                <div className={styles.familyContainer}>
                    {
                        familiesFiltered.map(fam =><FamilyCard key={fam.id} card={fam}></FamilyCard>)
                    }
                </div>            
            }
            {

                familiesFiltered.length == 0 && <div className={styles.noFamilyContainer}>
                  <span>No hay familias</span>
                  </div>
            } 
           
      </div>
    </MainLayout>
  );
}

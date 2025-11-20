"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/main/MainLayout";
import styles from "./AdminFamily.module.css";
import { showToastError } from "@/services/notificationService";
import { startLoading, stopLoading } from "@/services/loadingService";
import { getAllFamilies, getAllFamiliesByAssistence } from "@/services/dbService";
import { Family } from "@/interfaces/formTypes";
import BaseButton from "@/components/button/base/BaseButton";

export default function AdminFamilyListPage() {
  const [families, setFamilies] = useState<Family[]>([]);

  const loadFamilies = async () => {
    startLoading();
    await getAllFamilies()
    .then(families => setFamilies(families))
    .catch(() => showToastError("Error al cargar las familias"))
    .finally(() => stopLoading());
  };

  const filterFamilies = async (assist:boolean) => {
    startLoading();
    await getAllFamiliesByAssistence(assist)
    .then(families => setFamilies(families))
    .catch(() => showToastError("Error al cargar las familias"))
    .finally(() => stopLoading());
  }

  const filterFamiliesByBus = async () => {
    await getAllFamiliesByAssistence(true)
        .then(families => {
             const famWithBus = families.filter(fam => fam.assistance && fam.assistance.transporte == 'bus')
            setFamilies(famWithBus);
        })
        .catch(() => showToastError("Error al cargar las familias"))
        .finally(() => stopLoading()); 
  }

  useEffect(() => {
    // loadFamilies();
}, []);

  return (
    <MainLayout header={false}>
      <div className={styles.container}>
        <h2 className={styles.title}>Familias</h2>
        <div className={styles.buttonContainer}>
            <BaseButton onClick={() => filterFamilies(true)}>Confirmado</BaseButton>
            <BaseButton onClick={() => filterFamilies(false)}>No confirmado</BaseButton>
            <BaseButton onClick={() => filterFamiliesByBus()}>Bus</BaseButton>
        </div>
            {
                families.length > 0 && 
                <ul className={styles.table}>
                    {
                        families.map(fam =>
                            <li key={fam.name}>
                                <span>{fam.name}</span> - 
                                <span>{fam.assistanceConfirm ? ' Confirmado' : ' En espera'}</span>                          
                            </li>
                        )
                    }
                </ul>            
            }
            {
                families.length == 0 && <span>No hay familias</span>
            }     
      </div>
    </MainLayout>
  );
}

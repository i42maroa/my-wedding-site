'use client'

import MesaCard from '@/components/card/mesa/MesaCard';
import styles from './Mesas.module.css'
import { useEffect, useState } from 'react';
import { FamilyInterface } from '@/interfaces/formTypes';
import { startLoading, stopLoading } from '@/services/loadingService';
import { showToastError } from '@/services/notificationService';
import { getAllFamilies } from '@/services/dbService';
import BaseButton from '@/components/button/base/BaseButton';

export default function AdminFamilyListPage() {

    const [familyByMesas, setFamiliesByMesas] = useState<Map<number, FamilyInterface[]>>(new Map());

    const loadFamilies = async () => {
        startLoading();
        await getAllFamilies()
        .then(families => {
         const mapOfFamilyOFMesas = new Map<number, FamilyInterface[]>();
    
        families.forEach(family =>{
        if(!mapOfFamilyOFMesas.has(family.mesa)){
            mapOfFamilyOFMesas.set(family.mesa, [family]);
        }
        else{
            mapOfFamilyOFMesas.get(family.mesa)!.push(family);
        }
        })
        setFamiliesByMesas(mapOfFamilyOFMesas);
        })
        .catch(() => showToastError("Error al cargar las mesas"))
        .finally(() => stopLoading());
      };


    useEffect(() => {
        // loadFamilies();
    }, []);

    return(
        <>
            <BaseButton className={styles.button} onClick={() => loadFamilies()}>Cargar Mesas</BaseButton>
            <div className={styles.container}>              
            {
              
              Array.from(familyByMesas.entries())
                .sort(([mesaA],[mesaB]) => mesaA - mesaB)
                .map(([mesa, families]) => <MesaCard mesa={mesa} key={mesa} families={families}></MesaCard>)
            } 
            </div> 
        </>
    );
}
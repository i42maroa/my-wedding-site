'use client'

import MesaCard from '@/components/card/mesa/MesaCard';
import styles from './Mesas.module.css'
import BaseButton from '@/components/button/base/BaseButton';
import { useApiErrorToast } from '@/hooks/useApiErrorToast';
import { useLoadFamiliesByMesas } from '@/hooks/useLoadFamiliesByMesas';

export default function AdminFamilyListPage() {
    const {filteredFamilies, filterByMesa, apiError} = useLoadFamiliesByMesas();
    useApiErrorToast(apiError, "Error al cargar las familias");

    return(
        <>
            <BaseButton className={styles.button} onClick={() => filterByMesa()}>Cargar Mesas</BaseButton>
            <div className={styles.container}>              
            {            
              filteredFamilies && Array.from(filteredFamilies.entries())
                .sort(([mesaA],[mesaB]) => mesaA - mesaB)
                .map(([mesa, families]) => <MesaCard mesa={mesa} key={mesa} families={families}></MesaCard>)
            } 
            </div> 
        </>
    );
}
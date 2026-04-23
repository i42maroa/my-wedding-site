"use client";

import styles from "./AdminFamily.module.css";
import BaseButton from "@/components/button/base/BaseButton";
import FamilyCard from "@/components/card/family/FamilyCard";
import FormInput from "@/components/form/input/FormInput";
import { useApiErrorToast } from "@/hooks/useApiErrorToast";
import { useFilterFamilies } from "@/hooks/useFilterFamilies";
import { useState } from "react";

export default function AdminFamilyListPage() {
  const {filteredFamilies, allFamilies, apiError, filterByAssistance,
        filterFamiliesByBus,filterFamiliesByIntolerancia, filterFamiliesByOrigin, filterByInput, clearFilters} = useFilterFamilies();
  useApiErrorToast(apiError, "Error al cargar las familias");
  const [filteredName, setFilteredName] = useState("");

  const setFiltered = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
     const { value } = e.target;
    setFilteredName(value);
    filterByInput(value);
  }

  return (
      <div className={styles.container}>
        <h2 className={styles.title}>Familias</h2>
        <div className={styles.buttonContainer}>
            <BaseButton onClick={() => allFamilies()}>Todos</BaseButton>
            <BaseButton onClick={() => filterByAssistance(true)}>Confirmado</BaseButton>
            <BaseButton onClick={() => filterByAssistance(false)}>No confirmado</BaseButton>
        </div>
         <div className={styles.buttonContainer}>
            <BaseButton onClick={() => filterFamiliesByBus()}>Bus</BaseButton>
            <BaseButton onClick={() => filterFamiliesByIntolerancia()}>Intolerancia</BaseButton>
            <BaseButton onClick={() => filterFamiliesByOrigin('novio')}>Novio</BaseButton>
            <BaseButton onClick={() => filterFamiliesByOrigin('novia')}>Novia</BaseButton>
            <BaseButton onClick={() => clearFilters()}>Clear</BaseButton>
          </div>
           

           <FormInput name={""} onChange={setFiltered} value={filteredName} placeholder="Filtra por nombre"></FormInput>
        {
            filteredFamilies.length > 0 && 
            <div className={styles.familyContainer}>
            {
                filteredFamilies.map(fam =><FamilyCard key={fam.id} card={fam}></FamilyCard>)
            }
            </div>            
        }
        {
            filteredFamilies.length == 0 && 
            <div className={styles.noFamilyContainer}>
                <span>No hay familias</span>
            </div>
        } 
           
      </div>
  );
}

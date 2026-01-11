import { useState } from "react";
import { useLoadAllFamilies } from "./useLoadAllFamilies";
import { FamilyInterface } from "@/interfaces/formTypes";
import { startLoading, stopLoading } from "@/services/loadingService";
import { getAllFamiliesByAssistence } from "@/services/dbService";


export function useFilterFamilies() {
    const {families, loadFamilies, apiError, setApiError} = useLoadAllFamilies();
    const [filteredFamilies, setFilteredFamilies] = useState<FamilyInterface[]>([]);

    const allFamilies = () => {
        loadFamilies()
            .then(families => setFilteredFamilies(families));
    }


    const filterByAssistance = (assistance:boolean) => {
        startLoading();
        getAllFamiliesByAssistence(assistance)
            .then(families => {
                setFilteredFamilies(families)          
            })
            .catch(err => setApiError(err))
            .finally(() => stopLoading());
    }

    const filterFamiliesByBus = () => {
        const famWithBus = families.filter(fam => fam.assistance && fam.assistance.transporte == 'bus')
        setFilteredFamilies(famWithBus); 
    }

    const filterFamiliesByIntolerancia = () => {
        const famWithIntolerancia = families.filter(fam => fam.assistance && fam.assistance.intolerancia)
        setFilteredFamilies(famWithIntolerancia); 
    }

    const clearFilters = () => {
        setFilteredFamilies(families); 
    }

    return {
        filteredFamilies,
        allFamilies,
        filterByAssistance,
        filterFamiliesByBus,
        filterFamiliesByIntolerancia,
        clearFilters,
        apiError,
    }
}
import { useState } from "react";
import { useLoadAllFamilies } from "./useLoadAllFamilies";
import { FamilyInterface, OrigenType } from "@/interfaces/formTypes";
import { startLoading, stopLoading } from "@/services/loadingService";
import { getAllFamiliesByAssistence } from "@/services/dbService";
import { sortByStringField } from "@/helper/sortByStringField";


export function useFilterFamilies() {
    const {families, loadFamilies, apiError, setApiError} = useLoadAllFamilies();
    const [filteredFamilies, setFilteredFamilies] = useState<FamilyInterface[]>([]);

    

    const allFamilies = () => {
        loadFamilies()
            .then(families => {
                const sortedFamilies = sortByStringField(families, "name", "asc");
                setFilteredFamilies(sortedFamilies);
        });
    }


    const filterByAssistance = (assistance:boolean) => {
        startLoading();
        getAllFamiliesByAssistence(assistance)
            .then(families => {
                const sortedFamilies = sortByStringField(families, "name", "asc");
                setFilteredFamilies(sortedFamilies);
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

    const filterFamiliesByOrigin = (origin:OrigenType) =>{
         const famFromOrigin = families.filter(fam => fam.origen == origin)
        setFilteredFamilies(famFromOrigin); 
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
        filterFamiliesByOrigin,
        clearFilters,
        apiError,
    }
}
import { useState } from "react";
import { useLoadAllFamilies } from "./useLoadAllFamilies";
import { FamilyInterface } from "@/interfaces/formTypes";


export function useLoadFamiliesByMesas() {
    const {loadFamilies, apiError} = useLoadAllFamilies();
    const [filteredFamilies, setFilteredFamilies] = useState<Map<number, FamilyInterface[]>>(new Map());

    const filterByMesa = () => {
        loadFamilies()
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
            setFilteredFamilies(mapOfFamilyOFMesas);
        });  
    }

    return {
        filterByMesa,
        apiError,
        filteredFamilies
    }
}
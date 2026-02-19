import { useState } from "react";
import { useLoadAllFamilies } from "./useLoadAllFamilies";
import { FamilyInterface } from "@/interfaces/formTypes";


export function useLoadFamiliesByMesas() {
    const {loadFamilies, apiError} = useLoadAllFamilies();
    const [filteredFamilies, setFilteredFamilies] = useState<Map<string, FamilyInterface[]>>(new Map());

    const filterByMesa = () => {
        loadFamilies()
        .then(families => {
            const mapOfFamilyOFMesas = new Map<string, FamilyInterface[]>();
            families.forEach(family =>{
             
                if(!mapOfFamilyOFMesas.has(getNumOfMesa(family))){

                    mapOfFamilyOFMesas.set(getNumOfMesa(family), [family]);
                }
                else{
                    mapOfFamilyOFMesas.get(getNumOfMesa(family))!.push(family);
                }
            })
            setFilteredFamilies(mapOfFamilyOFMesas);
        });  
    }

    const getNumOfMesa = (family:FamilyInterface) => {
        return  family!.mesa || family.mesa == 0  ?"Sin mesa": "Mesa" + family.mesa;
    }

    return {
        filterByMesa,
        apiError,
        filteredFamilies
    }
}
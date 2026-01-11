import { FormDataAdmin } from "@/interfaces/formTypes";

export const generateAccessCode = (formData:FormDataAdmin) => {
    if(formData.users && formData.mesa && formData.users.length > 0){
        const code = getFirstLetterFromNames(formData.users);
        
        if(code == '') return '';
        return  code + formData.users.length + formData.mesa;
    }
    return "";
}

const getFirstLetterFromNames = (names:string[]):string => {
    return names
    .map(n => n.trim())
    .map(n => n.toUpperCase())
    .map(n => n[0])
    .join("");
}
import { FormDataAdmin, OrigenType } from "@/interfaces/formTypes";

export const generateAccessCode = (formData:FormDataAdmin) => {
    if(formData.users && formData.users.length > 0){
        const firstLetterFamily = formData.name? formData.name.trim()[0] : "";
        const code = getFirstLetterFromNames(formData.users);
    
        if(code == '') return '';
        return firstLetterFamily + code + formData.users.length + getCodeByOrigin(formData.origen);
    }
    return ""; //TODO throw error
}

const getFirstLetterFromNames = (names:string[]):string => {
    return names
    .map(n => n.trim())
    .map(n => n.toUpperCase())
    .map(n => n[0])
    .join("");
}

const getCodeByOrigin = (origin:OrigenType):string => {
    return origin == 'novio' ? "0" : "1";
}
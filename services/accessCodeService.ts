import { FormDataAdmin } from "@/interfaces/formTypes";

export const generateAccessCode = (formData:FormDataAdmin) => {
    return getFirstLetterFromName(formData.users) + formData.users.length + formData.mesa;
}

const getFirstLetterFromName = (names:string[]):string => {
    return names
    .map(n => n.trim()[0].toUpperCase())
    .join("");
}
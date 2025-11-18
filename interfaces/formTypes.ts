
export interface FormDataAsistencia {
  id?:string;
  nombre?:string;
  transporte: "car" | "bus";
  intolerancia: boolean;
  detallesIntolerancia: string;
  mensaje: string;
  createdAt?: Date;
}

export interface FormDataLogin {
  accessCode:string;
}

export const FORM_DATA_DEFAULT:FormDataAsistencia = {
    nombre:'',
    transporte: "car",
    intolerancia: false,
    detallesIntolerancia: "",
    mensaje: "",
  }

export interface FormErrors {
  nombre?: string;
  transporte?: string;
  intolerancia?: string;
  detallesIntolerancia?: string;
  accessCode?:string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

export interface FormErrors {
  nombre?: string;
  transporte?: string;
  intolerancia?: string;
  detallesIntolerancia?: string;
}

export interface Family {
  id:string;
  assistance?:AssistanceFamily;
  name: string;
  users: string[];
  accessCode:string;
}

export interface AssistanceFamily{
transporte: 'bus' | 'car';
    confirm: boolean;
    mensaje?: string;
    detalleIntolerancia:string;
    intolerancia:boolean;
}

export interface FormDataAsistencia {
  id:string;
  nombre?:string;
  transporte: "car" | "bus";
  intolerancia: boolean;
  detallesIntolerancia: string;
  mensaje: string;
  createdAt?: Date;
}

export interface FormDataAdmin {
  name:string;
  mesa:number;
  users:string[];
}

export interface FormDataLogin {
  accessCode:string;
}

export const FORM_DATA_DEFAULT:FormDataAsistencia = {
    id:'',
    nombre:'',
    transporte: "car",
    intolerancia: false,
    detallesIntolerancia: "",
    mensaje: "",
  }

  export const FORM_DATA_ADMIN_DEFAULT:FormDataAdmin = {
    name:"",
    mesa:0,
    users:['']
  }

export interface FormErrors {
  nombre?: string;
  transporte?: string;
  intolerancia?: string;
  detallesIntolerancia?: string;
  accessCode?:string;
  users?:string;
  mesa?:string;
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
  assistanceConfirm:boolean;
  name: string;
  users: string[];
  accessCode:string;
  mesa:number;
}

export interface AssistanceFamily{
    transporte: 'bus' | 'car';
    mensaje?: string;
    detalleIntolerancia:string;
    intolerancia:boolean;
}

export interface FamilyUpdate{
  assistanceConfirm:boolean;
  assistance:AssistanceFamily;
}
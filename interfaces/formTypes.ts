
export interface FormDataAsistencia {
  id:string;
  transporte: "car" | "bus";
  intolerancia: boolean;
  detallesIntolerancia: string;
  mensaje: string;
  origen:OrigenType;
  assistanceConfirm:boolean;
}

export type OrigenType = 'novio' | 'novia';

export interface FormDataAdmin {
  name:string;
  mesa:number;
  origen:OrigenType;
  users:string[];
}

export interface FormDataLogin {
  accessCode:string;
}

export const FORM_DATA_DEFAULT:FormDataAsistencia = {
    id:'',
    transporte: "car",
    origen:'novio',
    intolerancia: false,
    detallesIntolerancia: "",
    mensaje: "",
    assistanceConfirm:true
  }

  export const FORM_DATA_ADMIN_DEFAULT:FormDataAdmin = {
    name:"",
    mesa:0,
    origen:'novio',
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

export interface FamilyInterface {
  id:string;
  assistance?:AssistanceFamilyInterface;
  assistanceConfirm:boolean;
  origen:OrigenType;
  name: string;
  users: string[];
  accessCode:string;
  mesa:number;
}

export const FAMILY_DEFAULT:FamilyInterface ={
  id:'',
  assistanceConfirm:false,
  name:'',
  users:[],
  accessCode:'',
  origen:'novio',
  mesa:0
}

export interface AssistanceFamilyInterface{
    transporte: 'bus' | 'car';
    mensaje?: string;
    detalleIntolerancia:string;
    intolerancia:boolean;
}

export interface FamilyUpdate{
  assistanceConfirm:boolean;
  assistance:AssistanceFamilyInterface;
}
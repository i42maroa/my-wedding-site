export interface FormData {
  nombre:string;
  transporte: "car" | "bus";
  intolerancia: boolean;
  detallesIntolerancia: string;
  mensaje: string;
  createdAt?: Date;
}

export const FORM_DATA_DEFAULT:FormData ={
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
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

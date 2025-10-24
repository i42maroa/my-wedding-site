export interface FormData {
  nombre: string;
  transporte: "coche" | "autobus";
  intolerancia: boolean;
  detallesIntolerancia: string;
  mensaje: string;
  createdAt?: Date;
}

export const FORM_DATA_DEFAULT:FormData ={
    nombre: "",
    transporte: "coche",
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

export interface FormData {
  nombre: string;
  transporte: string;
  intolerancia: boolean;
  detallesIntolerancia: string;
  mensaje: string;
}

export interface FormErrors {
  nombre: string;
  transporte: string;
  intolerancia: string;
  detallesIntolerancia: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

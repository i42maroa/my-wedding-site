import { FirebaseError } from "firebase/app"; 

export type AppErrorCode =
  | "NOT_FOUND"
  | "VALIDATION"
  | "PERMISSION_DENIED"
  | "UNAUTHENTICATED"
  | "CONFLICT"
  | "UNKNOWN";

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly cause?: unknown; 

  constructor(message: string, code: AppErrorCode = "UNKNOWN", cause?: unknown) {
    super(message);
    this.code = code;
    this.cause = cause;
  }
}

export function mapFirebaseError(err: unknown): AppError {
  if (err instanceof AppError) return err;

  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "permission-denied":
        return new AppError("No tienes permisos para realizar esta acción.", "PERMISSION_DENIED", err);
      case "not-found":
        return new AppError("No se ha encontrado el recurso solicitado.", "NOT_FOUND", err);
      default:
        return new AppError("Error al conectar con la base de datos.", "UNKNOWN", err);
    }
  }
  return new AppError("Ha ocurrido un error inesperado.", "UNKNOWN", err);
}

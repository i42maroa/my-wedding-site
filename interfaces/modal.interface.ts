import { ReactNode } from "react";
import { FormDataAsistencia } from "./formTypes";

export type ModalType = "confirm-asistencia" | "delete-image";

export interface BaseModalItem  {
  id: string;
  confirmModal: () => void
}

export interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  onSend: () => void;
}

export type  ConfirmAsistenciaModal = BaseModalItem &{
  type: "confirm-asistencia";
  data: FormDataAsistencia;
  names:string[];
}

export type  ConfirmDeleteImageModal = BaseModalItem &{
  displayImageUrl:string;
  type:"delete-image";
}

export type ModalItem = ConfirmAsistenciaModal | ConfirmDeleteImageModal;
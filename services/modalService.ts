import { v4 as uuidv4 } from "uuid";
import { FormDataAsistencia } from "@/interfaces/formTypes";
import { ConfirmAsistenciaModal, ConfirmDeleteImageModal, ModalItem } from "@/interfaces/modal.interface";

type Subscriber = (toast: ModalItem) => void;

const subscribers = new Set<Subscriber>();

export function subscribeToNotifications(callback: Subscriber) {
  subscribers.add(callback);
}

export function unsubscribeFromNotifications(callback: Subscriber) {
  subscribers.delete(callback);
}

function emitModal(modal: ModalItem) {
  for (const callback of subscribers) {
    callback(modal);
  }
}

export function showModalConfirmAsistencia(formData: FormDataAsistencia, names:string[], confirmModal:()=>void) {
   const modal: ConfirmAsistenciaModal = {
    id: uuidv4(),
    type: "confirm-asistencia",
    data: formData,
    names,
    confirmModal
  };

  emitModal(modal);
}

export function showModalConfirmDeleteImage(displayImageUrl:string, confirmModal: () => void) {
  const modal: ConfirmDeleteImageModal = {
    id: uuidv4(),
    type: "delete-image",
    displayImageUrl,
    confirmModal
  };

  emitModal(modal);
}


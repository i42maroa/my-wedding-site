import { v4 as uuidv4 } from "uuid";
import { ModalItem } from "@/components/modal/ModalContainer";
import { FormDataAsistencia } from "@/interfaces/formTypes";

type Subscriber = (toast: ModalItem) => void;

const subscribers = new Set<Subscriber>();

export function subscribeToNotifications(callback: Subscriber) {
  subscribers.add(callback);
}

export function unsubscribeFromNotifications(callback: Subscriber) {
  subscribers.delete(callback);
}

export function showModalByContent(formData: FormDataAsistencia, names:string[], confirmModal:()=>void) {
  return showModal(formData, names, confirmModal);
}

export function showModal(formData: FormDataAsistencia, names:string[], confirmModal:()=>void) {
  const modal: ModalItem = {
    id: uuidv4(),
    formData,
    names,
    confirmModal
  };

  for (const callback of subscribers) {
    callback(modal);
  }
}

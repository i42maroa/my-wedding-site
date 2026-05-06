import styles from "./Modal.module.css";
import BaseButton from "../button/base/BaseButton";
import CloseButton from "../button/base/CloseButton";
import { ModalProps } from "@/interfaces/modal.interface";

export default function Modal({
  children,
  onClose,
  onSend,
}: ModalProps) {

  return (
    <div className={`${styles.overlay}`}>
    <div className={`${styles.container}`}>
      {children}
  
      <div className={styles.buttonContainer}>
        <CloseButton onClick={() => onClose()}>Cancelar</CloseButton>
        <BaseButton onClick={() => onSend()}>Confirmar</BaseButton>
      </div>  
    </div>
    </div>
  );
}

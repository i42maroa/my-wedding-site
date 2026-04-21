import styles from "./Modal.module.css";
import { FormDataAsistencia } from "@/interfaces/formTypes";
import { textSomosOrSoy, userNames } from "@/helper/mapTextByUser";
import BaseButton from "../button/base/BaseButton";
import CloseButton from "../button/base/CloseButton";

export interface ModalProps {
  formData: FormDataAsistencia;
  names: string[];
  onClose: () => void;
  onSend: () => void;
}

export default function Modal({
  formData,
  names,
  onClose,
  onSend,
}: ModalProps) {

  return (
    <div className={`${styles.overlay}`}>
    <div className={`${styles.container}`}>
      <h2>Confirmar asistencia</h2>
      <p>- S{textSomosOrSoy(names).slice(1)} {userNames(names)} y confirmamos la asistencia a la boda.</p>
      <p>{
        formData.intolerancia ? `Padecemos intolerancia: ${formData.detallesIntolerancia}` : `- No padecemos ninguna intolerancia.`
      }</p>
      <p>{
        formData.transporte == 'car' ? '- Iremos en coche a la boda.' : '- Iremos en bus a la boda.'
      }</p>
       <p>
      {
        formData.mensaje ? `- ${formData.mensaje}` : '- (Sin mensaje adicional)'
      }
      </p>
  
      <div className={styles.buttonContainer}>
        <CloseButton onClick={() => onClose()}>Cancelar</CloseButton>
        <BaseButton onClick={() => onSend()}>Confirmar</BaseButton>
      </div>  
    </div>
    </div>
  );
}

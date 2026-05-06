import { textSomosOrSoy, userNames } from "@/helper/mapTextByUser";
import { FormDataAsistencia } from "@/interfaces/formTypes";

export interface ModalConfirmAsistenciaProps {
  formData: FormDataAsistencia;
  names: string[];
}
export default function ModalConfirmAsistencia({
  formData,
  names,
}: ModalConfirmAsistenciaProps) {

  return (
    <>
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
    </>
  );
}
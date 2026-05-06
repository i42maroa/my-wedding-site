import Image from "next/image";
import styles from './ModalConfirmDeleteImage.module.css'

export default function ModalConfirmDeleteImage({displayPhotoUrl} : {displayPhotoUrl:string}) {

  return (
    <>
      <h2>Eliminar Imagen</h2>
      
      <p>¿Estás seguro de eliminar la imagen seleccionada?</p>  

      <div className={styles.imageWrap}>
        <Image
          src={displayPhotoUrl}
          alt="Foto a eliminar"
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </>
  );
}
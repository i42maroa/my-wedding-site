"use client";

import { useState } from "react";
import styles from "./UploadPanel.module.css";
import { AlbumInterface } from "@/interfaces/gallery.types";
import { useLoadingStatus } from "@/hooks/useIsLoadingStatus";
import { showToastError } from "@/services/notificationService";
import BaseButton from "../button/base/BaseButton";

interface UploadPanelProps {
  album: AlbumInterface;
  onUpload: (files: FileList | null) => Promise<void>;
}

export default function UploadPanel({ album, onUpload }: UploadPanelProps) {

  const [files, setFiles] = useState<FileList | null>();
  const isLoading = useLoadingStatus(); 

  const disabled = !album.isUnlocked || !album.guestUploadsEnabled || isLoading;
  const selectedCount = files?.length ?? 0;

  const loadImages = (event:any) => {
    const targetFiles = event.target.files;
    if(targetFiles?.length > 0){
      if(targetFiles?.length <= album.maxUploadsPerFamily){
        setFiles(targetFiles);
      }
      else{
        showToastError(`Solamente puedes subir un máximo de ${album.maxUploadsPerFamily} imagenes a la vez`)
      }
    }
  }

  const uploadImages = () => files && onUpload(files).then(() => setFiles(null));            
  const cancel = () => setFiles(null);            

  return (
    <aside className={styles.panel}>
      <h3 >Subir fotos</h3>
      <p>Solo imágenes. Máximo permitido en este álbum: {album.maxUploadsPerFamily} fotos por familia.</p>
      <label className={`${styles.inputLabel} ${disabled ? styles.disabled : ""}`}>
        <span>{"Seleccionar imágenes"}</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          multiple
          disabled={disabled}
          className={styles.input}
          onChange={loadImages}
        />
      </label>

        {!disabled && selectedCount > 0 ? 
        <>
          <p>{selectedCount} archivo(s) seleccionado(s).</p>
          <ul>
            {files && Array.from(files).map((f) =><li key={f.name}>
              {f.name}
            </li>)}
          </ul>
          <div className={styles.buttonContainer}>
            <BaseButton onClick={cancel}>Cancelar</BaseButton>
            <BaseButton onClick={uploadImages}>Subir</BaseButton>
          </div>
        </>: <></>}         
    </aside>
  );
}
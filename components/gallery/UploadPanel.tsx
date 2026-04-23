"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./UploadPanel.module.css";
import { AlbumInterface } from "@/interfaces/gallery.types";
import { useLoadingStatus } from "@/hooks/useIsLoadingStatus";
import { showToastError } from "@/services/notificationService";
import BaseButton from "../button/base/BaseButton";
import CloseButton from "../button/base/CloseButton";
import { MAX_PHOTOS_TO_UPLOAD } from "@/services/photoService";

interface UploadPanelProps {
  album: AlbumInterface;
  onUpload: (files: File[] | null) => Promise<void>;
}

interface PreviewFile {
  file: File;
  previewUrl: string;
}

export default function UploadPanel({ album, onUpload }: UploadPanelProps) {

  const [files, setFiles] = useState<PreviewFile[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isLoading = useLoadingStatus(); 

  const disabled = !album.isUnlocked || !album.guestUploadsEnabled || isLoading;
  const selectedCount = files.length;

  const clearFiles = () => {
      files.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      setFiles([]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

  const loadImages = (event: ChangeEvent<HTMLInputElement>) => {
    const targetFiles = event.target.files;
    if (!targetFiles || targetFiles.length === 0) return;
    if (targetFiles.length > MAX_PHOTOS_TO_UPLOAD) {
      showToastError(
        `Solamente puedes subir un máximo de ${MAX_PHOTOS_TO_UPLOAD} imágenes a la vez`
      );

      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    clearFiles();

    const nextFiles: PreviewFile[] = Array.from(targetFiles).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFiles(nextFiles);
  };

  const uploadImages = async () => {
      if (!files.length) return;

      await onUpload(files.map((item) => item.file));
      clearFiles();
    };          

    useEffect(() => {
    return () => {
      files.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [files]);

  const removeFile = (index: number) => {
  setFiles((prev) => {
    const fileToRemove = prev[index];

    // importante: liberar memoria
    URL.revokeObjectURL(fileToRemove.previewUrl);

    return prev.filter((_, i) => i !== index);
  });
};

  return (
    <aside className={styles.panel}>
      <h2 >Subir fotos</h2>
      <p>Solo imágenes. El máximo permitido en este álbum es de {MAX_PHOTOS_TO_UPLOAD} fotos por familia.</p>
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

        {!disabled && selectedCount > 0 && (
        <>
          <p>{selectedCount} archivo(s) seleccionado(s).</p>

          <div className={styles.previewGrid}>
            {files.map((item, index) => (
              <div
                key={`${item.file.name}-${item.file.lastModified}`}
                className={styles.previewCard}
              >
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation(); // evita comportamientos raros
                    removeFile(index);
                  }}
                >
                  ×
                </button>

                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className={styles.previewImage}
                />

                <p className={styles.previewName}>{item.file.name}</p>
              </div>
            ))}
          </div>

          <div className={styles.buttonContainer}>
            <CloseButton onClick={clearFiles}>Cancelar</CloseButton>
            <BaseButton onClick={uploadImages}>Subir</BaseButton>
          </div>
        </>
      )}      
    </aside>
  );
}
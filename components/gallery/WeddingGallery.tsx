"use client";

import { useEffect, useMemo, useState } from "react";
import AlbumTabs from "./AlbumTabs";
import GalleryGrid from "./GalleryGrid";
import UploadPanel from "./UploadPanel";
import styles from "./WeddingGallery.module.css";
import {  AlbumInterface, ALBUMS, PhotoEntity, ReactionKey } from "@/interfaces/gallery.types";
import { getPhotosByAlbum, uploadPhotos } from "@/services/photoService";
import { startLoading, stopLoading } from "@/services/loadingService";
import { useApiErrorToast } from "@/hooks/useApiErrorToast";
import { useGuestGuard } from "@/hooks/useGuestGuard";


export default function WeddingGallery() {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumInterface>(ALBUMS[0]);
  const [photos, setPhotos] = useState<PhotoEntity[]>([]);
  const { isGuest, session } = useGuestGuard();

  useEffect(() => {
    if (!isGuest || !session) return;
      startLoading()
      getPhotosByAlbum(selectedAlbum.id)
        .then(photos => setPhotos(photos))
        .catch(err => useApiErrorToast(err, "Error cargando la galería"))
        .finally(() =>  stopLoading())

  }, [isGuest, session, selectedAlbum, useApiErrorToast]);

  const visiblePhotos = useMemo(() => photos.filter((photo) => photo.albumType === selectedAlbum.id),
    [photos, selectedAlbum]
  );


  const handleUpload = async (files: File[] | null) => {
    if (!files) return;

    startLoading();
    uploadPhotos(selectedAlbum, files)
      .then(() => getPhotosByAlbum(selectedAlbum.id))
      .then(photos => setPhotos(photos))
      .catch(err => useApiErrorToast(err))
      .finally(() => stopLoading());
  };

  const handleReactionToggle = async (photoId: string, emoji: ReactionKey) => {
     //TODO
  };

  return (
    <section className={styles.container}>
      <AlbumTabs
        selectedAlbum={selectedAlbum.id}
        onSelect={setSelectedAlbum}
      />

      <div className={styles.topRow}>
        <div className={styles.albumInfo}>
          <h2 className={styles.albumTitle}>{selectedAlbum.name}</h2>
          <p className={styles.albumDescription}>{selectedAlbum.description}</p>
          {!selectedAlbum.isUnlocked && (
            <div className={styles.lockedBox}>
              Este álbum todavía no está disponible.
            </div>
          )}
        </div>

        {selectedAlbum.isUnlocked && <UploadPanel album={selectedAlbum} onUpload={handleUpload} />}
      </div>

      {selectedAlbum.isUnlocked ? (
        <GalleryGrid photos={visiblePhotos} onReactionToggle={handleReactionToggle} />
      ) : (
        <div className={styles.placeholder}>
          <p>Cuando se desbloquee este álbum, podréis ver y subir fotos desde aquí.</p>
        </div>
      )}
    </section>
  );
}
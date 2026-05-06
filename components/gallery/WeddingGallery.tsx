"use client";

import { useEffect, useMemo, useState } from "react";
import AlbumTabs from "./AlbumTabs";
import GalleryGrid from "./GalleryGrid";
import UploadPanel from "./UploadPanel";
import styles from "./WeddingGallery.module.css";
import {  AlbumInterface, ALBUMS, PhotoEntity, ReactionKey } from "@/interfaces/gallery.types";
import { deletePhoto, getPhotosByFamilyId, getPhotosPageByAlbum, uploadPhotos } from "@/services/photoService";
import { startLoading, stopLoading } from "@/services/loadingService";
import { useApiErrorToast } from "@/hooks/useApiErrorToast";
import { useGuestGuard } from "@/hooks/useGuestGuard";
import { showToastSuccess } from "@/services/notificationService";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import BaseButton from "../button/base/BaseButton";
import { showModalConfirmDeleteImage } from "@/services/modalService";

const INITIAL_PAGE_SIZE = 25;
const LOAD_MORE_PAGE_SIZE = 15;

export default function WeddingGallery() {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumInterface>(ALBUMS[0]);
  const [photos, setPhotos] = useState<PhotoEntity[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [amountPhotosFamily, setAmountPhotosFamily] = useState<number>(0);
  const { isGuest, session } = useGuestGuard();

  useEffect(() => {
    if (!isGuest || !session) return;
      startLoading()
      getPhotosPageByAlbum(ALBUMS[0].id, INITIAL_PAGE_SIZE, lastDoc)
        .then(page => {
          setPhotos(page.documents);
          setLastDoc(page.lastDoc);
          setHasMore(page.hasMore);
        })
        .catch(err => useApiErrorToast(err, "Error cargando la galería"))
        .finally(() =>  stopLoading())
      
        getPhotosByFamilyId(session.familyId)
          .then(photos => photos.filter(p => p.familyId == session.familyId).length)
          .then(amount => setAmountPhotosFamily(amount))
          .catch(err => console.error("Error al cargar cantidad de fotos", err))

  }, [isGuest, session]);

  const handleUpload = async (files: File[] | null) => {
    if (!files) return;

    startLoading();
    uploadPhotos(selectedAlbum, files)
      .then(newPhotos => {
        setPhotos((prev) => [...newPhotos, ...prev]);
        setAmountPhotosFamily(amountPhotosFamily + files.length)
        showToastSuccess("Imagenes subidas correctamente");
      })
      .catch(err => useApiErrorToast(err))
      .finally(() => stopLoading());
  };

  const handleLoadMore = async () => {
    if (!hasMore || !lastDoc) return;

    startLoading();
    getPhotosPageByAlbum(selectedAlbum.id,LOAD_MORE_PAGE_SIZE,lastDoc)
    .then(page => {
          setPhotos((prev) => [...prev, ...page.documents]);
          setLastDoc(page.lastDoc);
          setHasMore(page.hasMore);
        })
    .catch(err => useApiErrorToast(err))
    .finally(() => stopLoading()); 
  };

  const handleDeleteImage = async (photo: PhotoEntity) => {
    showModalConfirmDeleteImage(photo.displayUrl, () => {
      startLoading();
       deletePhoto(photo)
        .then(() => {
          setPhotos(prev => prev.filter(p => p.id !== photo.id));
          setAmountPhotosFamily(amountPhotosFamily - 1)
          showToastSuccess("Foto eliminada correctamente");
        })
      .catch(err => useApiErrorToast(err))
      .finally(() => stopLoading())
    }
    ); 
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
          {selectedAlbum.isUnlocked ? 
            <>
              <p className={styles.albumDescription}>{selectedAlbum.description}</p>
              <p className={styles.subDescription}>Estas fotografías sólo las pueden ver los invitados.</p>
            </> 
            : (
                <div className={styles.lockedBox}>
                  Este álbum todavía no está disponible.
                </div>
              )}
        </div>

        {selectedAlbum.isUnlocked && <UploadPanel amountPhotosFamily={amountPhotosFamily} album={selectedAlbum} onUpload={handleUpload} />}
      </div>

      {selectedAlbum.isUnlocked ? (
        <>
          <GalleryGrid
            photos={photos}
            onReactionToggle={handleReactionToggle}
            onDeleteImage={handleDeleteImage}
          />

          {hasMore && photos.length > 0 && (
            <div className={styles.loadMoreContainer}>
              <BaseButton
                className={styles.loadMoreButton}
                onClick={handleLoadMore}
              >
                Cargar más
              </BaseButton>
            </div>
          )}
        </>
      ) : (
        <div className={styles.placeholder}>
          <p>Cuando se desbloquee este álbum, podréis ver y subir fotos desde aquí.</p>
        </div>
      )}
    </section>
  );
}
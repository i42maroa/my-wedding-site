import { serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import imageCompression from "browser-image-compression";
import { storage } from "@/firebase/config";
import { createDocument, getCollectionByFilter } from "./repositoryFirebase";
import {  handleFirebaseResponse } from "./dbService";
import { AlbumInterface, AlbumType, ALLOWED_MIME_TYPES, PhotoEntity, PhotoInterface } from "@/interfaces/gallery.types";
import { showToastSuccess } from "./notificationService";
import { getGuestSessionSnapshot } from "./guestSessionBus";

const PHOTOS_COLLECTION = "photos";

export async function getPhotosByAlbum(albumId: AlbumType): Promise<PhotoEntity[]> {
  const session = getGuestSessionSnapshot();
  if (!session) {
    return Promise.reject(new Error("No hay sesión de invitado activa"));
  }
  return handleFirebaseResponse(async () => await getCollectionByFilter<PhotoEntity,"albumType">("albumType", albumId, PHOTOS_COLLECTION));
}

export function validateFilesBeforeUpload(files: FileList | File[]): void {
  const list = Array.from(files);

  if (!list.length) {
    throw new Error("No se han seleccionado imágenes");
  }

  list.forEach(file => {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
          throw new Error(`Formato no permitido: ${file.name}`);
        }

    if (file.size > 8 * 1024 * 1024) {
          throw new Error(`La imagen ${file.name} supera el máximo de 8 MB`);
    }
  })
}

async function compressImage(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 1.2,
    maxWidthOrHeight: 2000,
    useWebWorker: true,
    initialQuality: 0.8,
  });
}

export async function uploadPhotos(album: AlbumInterface,files: FileList | File[]): Promise<void> {
  const session = getGuestSessionSnapshot();

  if (!session?.familyId) {
    throw new Error("No hay sesión de invitado activa");
  }

  if (!album.isUnlocked || !album.guestUploadsEnabled) {
    throw new Error("Este álbum no permite subidas en este momento");
  }

  const fileList = Array.from(files);
  validateFilesBeforeUpload(fileList);

  //TODO: LIMIT DE FOTOS POR USUARIO

  return Promise.all(
    fileList.map(file =>
      compressImage(file)
        .then(compressed => {
          const photoId = crypto.randomUUID();
          const storagePath = `photos/display/${album.id}/${session.familyId}/${photoId}.jpg`;
          const storageRef = ref(storage, storagePath);

          return uploadBytes(storageRef, compressed, {
            contentType: compressed.type || "image/jpeg"
          });
        })
        .then(snapshot => getDownloadURL(snapshot.ref))
        .then(displayUrl => newPhoto(album.id, session.familyId, displayUrl))
        .then(photo =>{
          console.log(photo, "pohto")
          return handleFirebaseResponse(() =>
            createDocument(photo, PHOTOS_COLLECTION)
          )}
        )
    )
  ).then(() => showToastSuccess("Imagenes subidas correctamente"));
}

// TODO:
// Otra mejora recomendable
// Ahora mismo subes todas las fotos en paralelo.
// Eso suele estar bien, pero si alguien sube 20 fotos grandes puede saturar la red.
// Una alternativa más controlada sería subida secuencial, pero eso ya sería con reduce o async/await.
// Para una boda normalmente no hace falta complicarlo.


const newPhoto = (albumType:AlbumType, familyId:string, displayUrl:string):PhotoInterface => {
  return { 
            albumType, familyId, thumbUrl: displayUrl, displayUrl,
            alt: `Foto subida por invitado`,
            uploadedByType: "guest",
            status: "published",
            reactionsCount: {
                  "❤️": 0, "😂": 0, "😍": 0, "🥳": 0, "🔥": 0,
                },
              createdAt: serverTimestamp()
          } 
}
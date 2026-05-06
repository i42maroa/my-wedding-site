import {  PhotoEntity, ReactionKey } from '@/interfaces/gallery.types';
import styles from './GalleryGrid.module.css';
import PhotoCard from './PhotoCard';
import { useGuestGuard } from '@/hooks/useGuestGuard';

interface GalleryGridProps {
  photos: PhotoEntity[];
  onReactionToggle: (photoId: string, emoji: ReactionKey) => void;
    onDeleteImage: (photo:PhotoEntity) => void;

}

export default function GalleryGrid({ photos, onDeleteImage, onReactionToggle }: GalleryGridProps) {
  const { session } = useGuestGuard();
  
  return (
    <div className={styles.grid}>
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} mine={session?.familyId == photo.familyId} onReactionToggle={onReactionToggle} onDeleteImage={onDeleteImage} />
      ))}
    </div>
  );
}
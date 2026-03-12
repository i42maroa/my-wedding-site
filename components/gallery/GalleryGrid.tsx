import {  PhotoEntity, ReactionKey } from '@/interfaces/gallery.types';
import styles from './GalleryGrid.module.css';
import PhotoCard from './PhotoCard';

interface GalleryGridProps {
  photos: PhotoEntity[];
  onReactionToggle: (photoId: string, emoji: ReactionKey) => void;
}

export default function GalleryGrid({ photos, onReactionToggle }: GalleryGridProps) {
  return (
    <div className={styles.grid}>
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onReactionToggle={onReactionToggle} />
      ))}
    </div>
  );
}
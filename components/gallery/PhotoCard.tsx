import Image from 'next/image';
import styles from './PhotoCard.module.css';
import { PhotoEntity, ReactionKey } from '@/interfaces/gallery.types';

interface PhotoCardProps {
  photo: PhotoEntity;
  onReactionToggle: (photoId: string, emoji: ReactionKey) => void;
}

export default function PhotoCard({ photo, onReactionToggle }: PhotoCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={photo.thumbUrl}
          alt={photo.alt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* <div className={styles.footer}>
        <ReactionBar photo={photo} onToggle={(emoji) => onReactionToggle(photo.id, emoji)} />
      </div> */}
    </article>
  );
}
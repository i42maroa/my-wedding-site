import Image from 'next/image';
import styles from './PhotoCard.module.css';
import { PhotoEntity, ReactionKey } from '@/interfaces/gallery.types';

interface PhotoCardProps {
  photo: PhotoEntity;
  mine:boolean;
  onReactionToggle: (photoId: string, emoji: ReactionKey) => void;
}

export default function PhotoCard({ photo, mine, onReactionToggle }: PhotoCardProps) {
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
      {
        mine && <div className={styles.footer}>
         <span>Subida por mi</span>
      </div>}
      {/* <div className={styles.footer}>
        <ReactionBar photo={photo} onToggle={(emoji) => onReactionToggle(photo.id, emoji)} />
      </div> */}
    </article>
  );
}
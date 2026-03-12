
import { AlbumInterface, ALBUMS, AlbumType } from '@/interfaces/gallery.types';
import styles from './AlbumTabs.module.css';

interface AlbumTabsProps {
  selectedAlbum: AlbumType;
  onSelect: (albumId: AlbumInterface) => void;
}

export default function AlbumTabs({ selectedAlbum, onSelect }: AlbumTabsProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {
        ALBUMS.map((album) => {
        const active = album.id === selectedAlbum;

        return (
          <button
            key={album.id}
            type="button"
            className={`${styles.tab} ${active ? styles.active : ''}`}
            onClick={() => onSelect(album)}
            role="tab"
            aria-selected={active}
          >
            <span>{album.name}</span>
            {!album.isUnlocked && <span className={styles.badge}>Próximamente</span>}
          </button>
        );
      })}
    </div>
  );
}
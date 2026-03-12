import WeddingGallery from "@/components/gallery/WeddingGallery";
import styles from "./Galeria.module.css";

export default function GalleryContent() {
  return (
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.title}>Compartid vuestros recuerdos con nosotros</h2>
          </header>
          <WeddingGallery />
        </div>
  );
}
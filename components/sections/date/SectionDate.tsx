import styles from "./SectionDate.module.css";
import Image from "next/image";

export default function SectionDate() {
  return (
    <section className={styles.container} id="date">
      <div className={styles.contentContainer}>      
        <h2>Acompános en nuestro día especial</h2>
      </div>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={'/nosotros.jpg'} alt="Nosotros" fill priority />
      </div>
    </section>
  );
}
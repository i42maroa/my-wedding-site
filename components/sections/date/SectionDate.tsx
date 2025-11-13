import styles from "./SectionDate.module.css";
import Image from "next/image";
import ExternalLinkButton from "@/components/button/ExternalLinkButton";

export default function SectionDate() {
  return (
    <section className={styles.container} id="date">
      
      <div className={styles.contentContainer}>      
        <h2>Acompáñame en nuestro día especial</h2>
        <p className={styles.date}>22 de Agosto 2026</p>
        <ExternalLinkButton className={styles.button} href="https://maps.google.com">Agendar la fecha</ExternalLinkButton>
      </div>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={'/nosotros.jpg'} alt="Nosotros" fill priority />
      </div>
    </section>
  );
}
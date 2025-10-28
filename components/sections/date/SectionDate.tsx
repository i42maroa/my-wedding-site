import styles from "./SectionDate.module.css";
import Image from "next/image";
import ExternalLinkButton from "@/components/button/ExternalLinkButton";

export default function SectionDate() {
  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={'/nosotros.jpg'} alt="Nosotros" fill  sizes="(max-width: 768px) 90vw,
           (max-width: 1200px) 50vw, 30vw" priority />
      </div>
      <div className={styles.contentContainer}>      
        <h2>Acompañame en nuestro día especial</h2>
        <p className={styles.date}>22 de Agosto 2026</p>
        <ExternalLinkButton className={styles.button} href="https://maps.google.com">Agendar la fecha</ExternalLinkButton>
      </div>
    </section>
  );
}
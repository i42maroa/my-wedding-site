import styles from "./SectionDate.module.css";
import Image from "next/image";
import ExternalLinkButton from "@/components/button/ExternalLinkButton";

export default function SectionDate() {
  return (
    <section className={styles.container}>
      <Image className={styles.image} src={'/nosotros.jpg'} alt="Nosotros" width={544} height={720} priority />
      <div className={styles.contentContainer}>      
        <h2>Acompañame en nuestro día especial</h2>
        <p className={styles.date}>22 de Agosto 2026</p>
        <ExternalLinkButton className={styles.button} href="https://maps.google.com">Agendar la fecha</ExternalLinkButton>
      </div>
    </section>
  );
}
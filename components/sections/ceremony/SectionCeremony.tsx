import ExternalLinkButton from "@/components/button/ExternalLinkButton";
import styles from "./SectionCeremony.module.css";
import FloralLayout from "@/components/layout/floral/FloralLayout";

export default function SectionCeremony() {
  return (
    <section id='ceremony' className={styles.container}>
      <FloralLayout className={styles.layout}>
            <h2>Ceremonia y celebración</h2>
            <p className={styles.text}>19:00h Centro lúdico de Belmez</p>
            <ExternalLinkButton className={styles.button} href='https://maps.app.goo.gl/8jQSVLh2XEj8Uhbv8'>Cómo llegar</ExternalLinkButton>
      </FloralLayout>
    </section>
  );
}
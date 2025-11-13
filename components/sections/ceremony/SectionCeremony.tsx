import AddToGoogleCalendarButton from "@/components/button/AddToGoogleCalendarButton";
import styles from "./SectionCeremony.module.css";
import FloralLayout from "@/components/layout/floral/FloralLayout";

export default function SectionCeremony() {
  return (
    <section id='ceremony' className={styles.container}>
      <FloralLayout className={styles.layout}>
            <h2>Ceremonia y celebración</h2>
            <h3 className={styles.text}>22 de Agosto 2026</h3>
            <p className={styles.text}>19:00h Centro lúdico de Belmez</p>
          <AddToGoogleCalendarButton className={styles.button}/>
      </FloralLayout>
    </section>
  );
}
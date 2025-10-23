import styles from "./SectionVehicle.module.css";
import ExternalLinkButton from "@/components/button/ExternalLinkButton";
import FloralLayout from "@/components/layout/floral/FloralLayout";

export default function SectionVehicle() {
  return (
    <section className={styles.container}>
      <FloralLayout className={styles.layout}>
            <h2>Ceremonia y celebración</h2>
            <p>19:00h Centro lúdico de Belmez</p>
            <div className={styles.element}>
                <h3>Autobús</h3>
                <p>Vva de Córdoba - Peñarroya - Belmez</p>
                <p>(Pendiente de confirmación)</p>
            </div>
            <div className={styles.element}>
                <h3>Coche</h3>
                <ExternalLinkButton className={styles.button} href='https://maps.app.goo.gl/8jQSVLh2XEj8Uhbv8'>Cómo llegar</ExternalLinkButton>
            </div>
      </FloralLayout>
    </section>
  );
}
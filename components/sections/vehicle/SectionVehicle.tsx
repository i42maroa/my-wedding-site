import SvgMap from "@/components/svg/SvgMap/SvgMap";
import styles from "./SectionVehicle.module.css";
import ExternalLinkButton from "@/components/button/ExternalLinkButton";

export default function SectionVehicle() {
  return (
    <section id="vehicle" className={styles.container}>
            <h2>Cómo llegar a Belmez</h2>

            <div className={styles.contentContainer}>
              <SvgMap className={styles.map}/>
              <div className={styles.content}>
                  <p>Habrá autobús con salida desde Villanueva de Córdoba, pasará por Peñarroya y llegará justo antes del comienzo de la ceremonia. (hora de salida pendiente de confirmar).</p>
                  <p>Si no quieres autobús, siempre puedes ir en tu propio coche.</p>
                  <ExternalLinkButton className={styles.button} href='https://maps.app.goo.gl/8jQSVLh2XEj8Uhbv8'>Cómo llegar</ExternalLinkButton>
              </div>           
            </div>                      
    </section>
  );
}
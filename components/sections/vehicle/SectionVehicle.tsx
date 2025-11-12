import SvgMap from "@/components/svg/SvgMap/SvgMap";
import styles from "./SectionVehicle.module.css";

export default function SectionVehicle() {
  return (
    <section id="vehicle" className={styles.container}>
            <h2>Consejos de Viaje</h2>

            <div className={styles.contentContainer}>
              <SvgMap/>
              <div className={styles.content}>
                  <h3>Cómo llegar a Belmez</h3>
                  <p>Habrá autobús con salida desde Villanueva de Córdoba, pasará por Peñarroya y llegará justo antes del comienzo de la ceremonia. (hora pendiente de confirmar).</p>
                  <p>Si no quieres autobús, siempre puedes ir en tu propio coche.</p>
              </div>           
            </div>                      
    </section>
  );
}
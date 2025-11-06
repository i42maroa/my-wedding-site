import styles from "./SectionVehicle.module.css";

export default function SectionVehicle() {
  return (
    <section className={styles.container}>
            <h2>Transporte</h2>
            <div className={styles.element}>
                <h3>Autobús</h3>
                <p>- Salida desde Villanueva de Córdoba (hora pendiente de confirmar)</p>
                <p>- Paso por Peñarroya</p>
                <p>- LLegada al Centro Lúdico</p>
                <p className={styles.bold}>(Si quieres ir en el autobús debes indicarlo en la confirmación de la boda)</p>
            </div>
            <div className={styles.element}>
                <h3>Coche</h3>
                <p>En el lugar hay un amplio lugar de aparcamiento.</p>
            </div>
            
    </section>
  );
}
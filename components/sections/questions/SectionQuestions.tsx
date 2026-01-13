import Link from "next/link";
import styles from "./SectionQuestions.module.css";


export default function SectionQuestions() {
  return (
    <section id="question" className={styles.container}>
        <h2>¿Tienes alguna duda?</h2>
    
    <div className={styles.questionContainer}>

        <div className={styles.item}>
            <h3>¿La ceremonia y convite es en el mismo sitio?</h3>
            <p>Sí, todo se celebra en el mismo sitio. Justo cuando se termine la ceremonia dará lugar a los entrantes.</p>
        </div>

        <div className={styles.item}>
            <h3>¿Por dónde pasará el autobús?</h3>
            <p>El autobús saldrá de Villanueva de Córdoba, pasará por Peñarroya (Si hay invitados que lo solicite) e irá directamente al lugar de la ceremonia.</p>
        </div>

        <div className={styles.item}>
            <h3>¿Cuántos autobuses habrá de vuelta?</h3>
            <p>Habrá dos. Todavía no hay hora confirmadas pero el primero saldrá más temprano y el segundo más avanzada la noche. Los autobuses de vuelta pararán en Peñarroya si se le indica al conductor.</p>
        </div>

        <div className={styles.item}>
            <h3>¿Dónde puedo quedarme a dormir ?</h3>
            <p> <Link href={'/#sleep'} className={styles.link}>Aquí te indico donde quedarte</Link>. Puedes quedarte también en Peñarroya, ya que el autobús de vuelta pasará por ahí.</p>
        </div>
        
    </div>
       
    </section>
  );
}
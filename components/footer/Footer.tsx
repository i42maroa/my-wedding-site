import styles from "./Footer.module.css";
import LinkButton from "../button/LinkButton";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <h2>Esperamos verte</h2>
      <LinkButton href='/form'>Confirmar asistencia</LinkButton>
      </div>
    </footer>
  );
}
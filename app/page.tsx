import Navbar from "@/components/navbar/Navbar";
import styles from "@/app/Home.module.css";
import Link from "next/link";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1>💍 Nuestra Boda</h1>
        <p>Te invitamos a celebrar con nosotros este día tan especial.</p>
        <div className={styles.info}>
          <p>📅 20 de Junio de 2026</p>
          <p>📍 Finca Los Olivos, Madrid</p>
        </div>
        <Link href="/form" className={styles.button}>Confirmar asistencia</Link>
      </main>
      <Footer />
    </>
  );
}

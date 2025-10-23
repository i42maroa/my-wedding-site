import Image from "next/image";
import styles from "./SectionHeader.module.css";

export default function SectionHeader() {
  return (
  <div className={styles.container}>
      <Image className={styles.flower1} src={'/frontal-flower.webp'} alt="Los novios" width={1000} height={325} priority />
      <h1>Antonio & Sheila</h1>
      <h2>Nuestra boda</h2>
      <Image className={styles.flower2} src={'/frontal-flower.webp'} alt="Los novios" width={1000} height={325} priority />
   </div>
  );
}
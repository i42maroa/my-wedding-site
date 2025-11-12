import Image from "next/image";
import styles from "./SectionHeader.module.css";

export default function SectionHeader() {
  return (
  <div className={styles.container}>
      <div className={styles.flowerContainer}>
        <Image className={styles.flower1} src={'/frontal-flower.webp'} alt="Los novios" fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"/>
      </div>
      <h1>Antonio & Sheila</h1>
      <h2>Nuestra boda</h2>
      <div className={styles.flowerContainer}>
        <Image className={styles.flower2} src={'/frontal-flower.webp'} alt="Los novios" fill priority sizes="(max-width: 768px) 100vw,
           (max-width: 1200px) 80vw, 70vw"/>
      </div>
   </div>
  );
}
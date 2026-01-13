"use client";

import { ReactNode } from "react";
import styles from "./FloralLayout.module.css";
import Image from "next/image";

interface FloralLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function FloralLayout ({children, className }:FloralLayoutProps)  {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.imageContainer} ${styles.topLeft}`}>
        <Image className={`${styles.flower}`} src={'/flower1.webp'} alt="Flor decorativa superior izquierda" priority fill sizes="(max-width: 768px) 88vw,
         (max-width: 1200px) 80vw, 66vw"/>
      </div>
      <div className={`${styles.imageContainer} ${styles.bottomRight}`}>
        <Image className={`${styles.flower}`} src={'/flower2.webp'} alt="Flor decorativa inferior derecha" priority fill sizes="(max-width: 768px) 88vw,
         (max-width: 1200px) 80vw, 66vw"/>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};


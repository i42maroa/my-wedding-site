"use client";

import { FC, ReactNode } from "react";
import styles from "./FloralLayout.module.css";
import Image from "next/image";

interface FloralLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function FloralLayout ({children, className }:FloralLayoutProps)  {
  return (
    <div className={`${styles.container} ${className}`}>
      
      <Image className={`${styles.flower} ${styles.topLeft}`} src={'/flower1.webp'} alt="Flor decorativa superior izquierda" width={400} height={400} priority />
      <Image className={`${styles.flower} ${styles.bottomRight}`} src={'/flower2.webp'} alt="Flor decorativa inferior derecha" width={400} height={400} priority />
      
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};


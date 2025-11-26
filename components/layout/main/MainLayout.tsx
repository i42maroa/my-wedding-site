"use client";

import Navbar from "@/components/navbar/Navbar";
import styles from "./MainLayout.module.css";
import { usePathname } from "next/navigation";

export default function MainLayout ({children}: Readonly<{children: React.ReactNode}>)  {
  const isHome = usePathname() === "/";
  
  return (
    <div className={`${styles.container} ${isHome && styles.containerWithFooter}`}>
      <Navbar/>
      <div className={`${styles.content}`}>
          {children}
      </div>
    </div>
  );
};


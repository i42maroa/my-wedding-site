"use client";

import Navbar from "@/components/navbar/Navbar";
import styles from "./MainLayout.module.css";

export default function MainLayout ({children }: Readonly<{children: React.ReactNode}>)  {
  return (
    <>
      <Navbar />
      <div className={`${styles.container}`}>
          {children}
      </div>
    </>
  );
};


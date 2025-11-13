"use client";

import Navbar from "@/components/navbar/Navbar";
import styles from "./MainLayout.module.css";
import SectionHeader from "@/components/header/SectionHeader";

export default function MainLayout ({header = false, children }: Readonly<{header:boolean, children: React.ReactNode}>)  {
  return (
    <>
      <Navbar />
      {header && <SectionHeader/>}
      <div className={`${styles.container}`}>
          {children}
      </div>
    </>
  );
};


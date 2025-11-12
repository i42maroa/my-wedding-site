"use client";

import Navbar from "@/components/navbar/Navbar";
import styles from "./MainLayout.module.css";
import SectionHeader from "@/components/header/SectionHeader";

export default function MainLayout ({children }: Readonly<{children: React.ReactNode}>)  {
  return (
    <>
      <Navbar />
      <SectionHeader/>
      <div className={`${styles.container}`}>
          {children}
      </div>
    </>
  );
};


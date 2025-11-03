"use client";

import styles from "./MainLayout.module.css";

export default function MainLayout ({children }: Readonly<{children: React.ReactNode}>)  {
  return (
    <div className={`${styles.container}`}>
        {children}
    </div>
  );
};


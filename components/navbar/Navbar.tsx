"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import BaseButton from "../button/base/BaseButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const {  isAdmin, logout, userEmail } = useAdminGuard();

  useEffect(() => {
    if (menuOpen && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {document.body.style.overflow = "auto"};
  }, [menuOpen]);

  return (
    <header className={styles.navbar}>
      
      {    
        !isAdmin && <div className={styles.logo}>
            <Link href="/" onClick={closeMenu}>
              <span>Antonio & Sheila</span>
            </Link>
        </div>
      }
      {    
        isAdmin && <span className={styles.userEmail}>admin: {userEmail}</span>
      }

      <button
        className={`${styles.hamburgerButton} ${menuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        aria-label="Abrir menú">
        <span />
        <span />
        <span />
      </button>

      {
        !isAdmin &&  <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
              <Link className={styles.navlink} href="/#ceremony" onClick={closeMenu}>
                Ceremonia
              </Link>
              <Link className={styles.navlink} href="/#vehicle" onClick={closeMenu}>
                Cómo llegar
              </Link>
              <Link className={styles.navlink} href="/#question" onClick={closeMenu}>
                Preguntas
              </Link>
              <Link href="/login" onClick={closeMenu} className={`${styles.navlink} ${styles.confirmButton}`}>
                <span>Confirmar asistencia</span>
              </Link>
            </nav>
      }
      {
        isAdmin &&     
        <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
              <Link className={styles.navlink} href="/admin/create" onClick={closeMenu}>
                Crear familia
              </Link>
              <Link className={styles.navlink} href="/admin/family" onClick={closeMenu}>
                Ver familias
              </Link>
              <Link className={styles.navlink} href="/admin/mesas" onClick={closeMenu}>
                Ver mesas
              </Link>  
              <BaseButton onClick={logout}>Salir</BaseButton>
            </nav>       
      }   
    </header>
  );
}

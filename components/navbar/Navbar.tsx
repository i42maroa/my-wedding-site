"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import LinkButton from "../button/LinkButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // 👇 Bloquear scroll cuando el menú está abierto (modo móvil)
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
      <div className={styles.logo}>
        <Link href="/" onClick={closeMenu}>
          <span>Antonio & Sheila</span>
        </Link>
      </div>

      {/* Botón hamburguesa (solo visible en móvil) */}
      <button
        className={`${styles.hamburgerButton} ${menuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>

        <Link href="/#ceremony" onClick={closeMenu}>
          Ceremonia
        </Link>
        <Link href="/#vehicle" onClick={closeMenu}>
          Cómo llegar
        </Link>
        <Link href="/#question" onClick={closeMenu}>
          Preguntas
        </Link>
        <Link href="/form" onClick={closeMenu} className={styles.confirmButton}>
          <span>Confirmar</span>
        </Link>
      </nav>
    </header>
  );
}

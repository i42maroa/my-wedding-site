"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { useGuestGuard } from "@/hooks/useGuestGuard";
import { userNames } from "@/helper/mapTextByUser";
import FormButton from "../button/FormButton";
import LinkButton from "../button/LinkButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const { isAdmin, logout, userEmail } = useAdminGuard();
  const { isGuest, session, logoutGuest } = useGuestGuard();

  useEffect(() => {
    if (menuOpen && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {document.body.style.overflow = "auto"};
  }, [menuOpen]);

  return (
    <header className={`${styles.navbar}`}>
      
      {    
        !isAdmin && !isGuest && <div className={styles.logo}>
            <Link href="/" onClick={closeMenu}>
              <span>Antonio & Sheila</span>
            </Link>
        </div>
      }
      {    
        isGuest && <div className={styles.leftContain}> 
          <div className={styles.logo}>
              <Link href="/" onClick={closeMenu}>
                <span>A&S</span>
              </Link>
          </div>
          <span className={styles.userEmail}>{session?.familyName} - {userNames(session?session.users:[])}</span>
          
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
              <Link className={styles.navlink} href="/galeria" onClick={closeMenu}>
                Galería
              </Link>
              <LinkButton href="/form" onClick={closeMenu}>Confirmar asistencia</LinkButton> 
              {isGuest && <button className={styles.logoutButton} onClick={logoutGuest}>Cerrar sesión</button>}                     
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
              <FormButton onClick={logout}>Salir</FormButton>
            </nav>       
      }   
    
    </header>
  );
}

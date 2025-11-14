'use client'
import { useEffect, useRef, useState } from "react";
import styles from "./SectionDate.module.css";
import Image from "next/image";

//Limita un numero dentro de un rango
//Asegura que el progrose nunca pase de 0 a 1
function clamp(v: number, min = 0, max = 1) {
  return Math.min(Math.max(v, min), max);
}

//Convierte un valor p en un progreso solo dentro de un tramo
function rangeProgress(p: number, start: number, end: number) {
  if (end === start) return 0;
  return clamp((p - start) / (end - start));
}

//Calcula valor entre a y b segun porcentaje t
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
export default function SectionDate() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 → inicio sección, 1 → final sección

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frameId: number;

    const updateProgress = () => {
      //tamaño y posicion de la sección en la pantalla
      const rect = section.getBoundingClientRect();
      // altura de la ventana
      const viewportH = window.innerHeight;
      // Altura total de la sección pinneada
      const sectionHeight = rect.height;
      // Lo que realmente puedes recorrer
      const totalScrollable = sectionHeight - viewportH;

      // Si la sección aún no ha entrado: progreso 0
      if (rect.top >= viewportH) {
        setProgress(0);
        return;
      }

      // Si ya ha pasado completamente: progreso 1
      if (rect.bottom <= 0) {
        setProgress(1);
        return;
      }

      // Dentro de la sección: cuánto hemos "recorrido" mientras el contenido está sticky
      const scrolledInside = Math.min(Math.max(-rect.top, 0), totalScrollable);
      const p = totalScrollable > 0 ? scrolledInside / totalScrollable : 0;

      setProgress(p);
    };

    const onScrollOrResize = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScrollOrResize);
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  // Progresos individuales por foto (tramos)
  const p1     = rangeProgress(progress, 0.00, 0.15);
  
  const p2     = rangeProgress(progress, 0.12, 0.30);
  const p3     = rangeProgress(progress, 0.28, 0.45);
  const p4     = rangeProgress(progress, 0.45, 0.60);
  const pTitle = rangeProgress(progress, 0.60, 0.70);
  const p5     = rangeProgress(progress, 0.70, 0.85);

  
  // Estilos calculados para cada foto
   const titleStyle = {
    opacity: pTitle,
    transform: `translateY(${lerp(40, 0, pTitle)}px)`,
  };

  // Estilos para cada foto
  const photo1Style = {
    opacity: p1,
    transform: `translate(${lerp(-120, 0, p1)}px, ${lerp(80, 0, p1)}px) rotate(${lerp(-10, -6, p1)}deg)`,
  };

  const photo2Style = {
    opacity: p2,
    transform: `translate(${lerp(120, 0, p2)}px, ${lerp(80, 0, p2)}px) rotate(${lerp(10, 4, p2)}deg)`,
  };

  const photo3Style = {
    opacity: p3,
    transform: `translate(${lerp(0, 0, p3)}px, ${lerp(120, 0, p3)}px) rotate(${lerp(
      0,-3,p3)}deg) scale(${lerp(0.9, 1.02, p3)})`,
  };

  const photo4Style = {
    opacity: p4,
    transform: `translate(${lerp(-100, 0, p4)}px, ${lerp(-80, 0, p4)}px) rotate(${lerp(-8, -2, p4)}deg)`,
  };

  const photo5Style = {
    opacity: p5,
    transform: `translate(${lerp(100, 0, p5)}px, ${lerp(-60, 0, p5)}px) rotate(${lerp(8, 3, p5)}deg)`,
  };

  return (
    <section ref={sectionRef} className={styles.pinSection} >
      <div className={styles.pinInner}>
           <div className={styles.stage}>
              <h2 className={styles.title} style={titleStyle}>Acompáñanos en nuestro día especial</h2>

              <div className={`${styles.photo} ${styles.photo1}`}>
                  <div className={styles.photoInner} style={photo1Style}>
                    <Image
                      src="/gallery/photo1.jpg"
                      alt="Recuerdo 1"
                      fill
                      className={styles.image}
                      priority={false}
                    />
                  </div>
              </div>
              <div className={`${styles.photo} ${styles.photo2}`}>
                <div className={styles.photoInner} style={photo2Style}>
                    <Image
                      src="/gallery/photo2.jpg"
                      alt="Recuerdo 2"
                      fill
                      className={styles.image}
                      priority={false}
                    />
                  </div>
              </div>

              <div className={`${styles.photo} ${styles.photo3}`}>
                  <div className={styles.photoInner} style={photo3Style}>
                    <Image
                      src="/gallery/photo3.jpg"
                      alt="Recuerdo 3"
                      fill
                      className={styles.image}
                      priority={false}
                    />
                  </div>
              </div>

              <div className={`${styles.photo} ${styles.photo4}`}>
                  <div className={styles.photoInner} style={photo4Style}>
                    <Image
                      src="/gallery/photo4.jpg"
                      alt="Recuerdo 4"
                      fill
                      className={styles.image}
                      priority={false}
                    />
                  </div>
              </div>

              <div className={`${styles.photo} ${styles.photo5}`}>
                <div className={styles.photoInner} style={photo5Style}>
                    <Image
                      src="/gallery/photo5.jpg"
                      alt="Recuerdo 5"
                      fill
                      className={styles.image}
                      priority={false}
                    />
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
}
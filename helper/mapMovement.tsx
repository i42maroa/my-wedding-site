//Limita un numero dentro de un rango
//Asegura que el progrose nunca pase de 0 a 1
export function clamp(v: number, min = 0, max = 1) {
  return Math.min(Math.max(v, min), max);
}

//Convierte un valor p en un progreso solo dentro de un tramo
export function rangeProgress(p: number, start: number, end: number) {
  if (end === start) return 0;
  return clamp((p - start) / (end - start));
}

//Calcula valor entre a y b segun porcentaje t
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
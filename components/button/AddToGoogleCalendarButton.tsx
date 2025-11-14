// components/calendar/AddToGoogleCalendarButton.tsx
"use client";

import ExternalLinkButton from "./ExternalLinkButton";

function toDate(d: Date | string): Date {
  return d instanceof Date ? d : new Date(d);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDatesForGoogle(start: Date, end?: Date): string {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date(s.getTime() + 60 * 60 * 1000); // +1h por defecto
  const sUTC = `${s.getUTCFullYear()}${pad(s.getUTCMonth() + 1)}${pad(s.getUTCDate())}T${pad(s.getUTCHours())}${pad(
    s.getUTCMinutes())}${pad(s.getUTCSeconds())}Z`;
  const eUTC = `${e.getUTCFullYear()}${pad(e.getUTCMonth() + 1)}${pad(e.getUTCDate())}T${pad(e.getUTCHours())}${pad(
    e.getUTCMinutes())}${pad(e.getUTCSeconds())}Z`;
  return `${sUTC}/${eUTC}`;
}

export default function AddToGoogleCalendarButton({ className = "",}: {className:string}) {
    const start = "2026-08-22T19:00:00+02:00";
    const end = "2026-08-23T07:59:00+02:00";
    const dates = formatDatesForGoogle(toDate(start), toDate(end));

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", "Boda de Antonio & Sheila 💒");
  url.searchParams.set("dates", dates);
  url.searchParams.set("location", "Centro Lúdico, Belmez");
  url.searchParams.set("details", "Nos vemos allí");

  return (
    <ExternalLinkButton  className={` ${className}`} href={url.toString()}> Añadir al calendario</ExternalLinkButton>
  );
}

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", textAlign: "center", background: "#fff", borderBottom: "1px solid #eee" }}>
      <Link href="/">Inicio</Link> | <Link href="/rsvp">RSVP</Link> | <Link href="/gallery">Galería</Link>
    </nav>
  );
}
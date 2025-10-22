"use client";
import { useState } from "react";
//import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function RSVPPage() {
  const [formData, setFormData] = useState({ name: "", guests: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  //  await addDoc(collection(db, "rsvp"), formData);
  console.log(formData)
    setSubmitted(true);
  };

  if (submitted) {
    return <p>¡Gracias por confirmar tu asistencia! ❤️</p>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Confirmar asistencia</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Tu nombre" onChange={handleChange} required />
        <input name="guests" placeholder="Número de acompañantes" onChange={handleChange} required />
        <textarea name="message" placeholder="Mensaje (opcional)" onChange={handleChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
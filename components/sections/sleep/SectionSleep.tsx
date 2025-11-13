import HotelCard, { HotelCardInterface } from "@/components/card/hotel/HotelCard";
import styles from "./SectionSleep.module.css";

const HOTELS:HotelCardInterface[] = [
  {title:"Hostal Javi", city:"Belmez",distance:"10 minutos andando", url:"https://www.hostaljavi.es/"},
  {title:"Hotel Rijoma", city:"Peñarroya", distance:"Coger con el autobus de vuelta", url:"https://www.hotelrestauranterijoma.com/"},
  {title:"Hotel Sol", city:"Peñarroya", distance:'', url:'https://www.hotelsol.es/'}
]

export default function SectionSleep() {
  return (
    <section className={styles.container}>
        <h2>¿Quieres quedarte a dormir allí?</h2>
        
        <div className={styles.hotelContainer}>
          {HOTELS.map(hotel =><HotelCard card={hotel} key={hotel.title}/>)}
        </div>
    </section>
  );
}
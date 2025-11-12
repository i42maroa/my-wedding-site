import ExternalLinkButton from "@/components/button/ExternalLinkButton";
import styles from "./HotelCard.module.css";


export interface HotelCardInterface {
  title: string;
  city:string;
  url:string;
  distance:string;
}

export default function HotelCard({card}:{card:HotelCardInterface}) {
  return (
    <div className={styles.container}>
            <h3>{card.title}</h3>
            <p>{card.city}</p>
            <p>{card.distance}</p>
            <ExternalLinkButton href={card.url}>Dónde está</ExternalLinkButton>
    </div>
  );
}
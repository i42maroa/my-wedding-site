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
        <h3 className={styles.title}>{card.title}</h3>
        <p className={styles.text}>{card.city}</p>
          <ExternalLinkButton className={styles.button} href={card.url}>Ver</ExternalLinkButton>
    </div>
  );
}
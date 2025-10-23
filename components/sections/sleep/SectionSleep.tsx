import styles from "./SectionSleep.module.css";
import ExternalLinkButton from "@/components/button/ExternalLinkButton";

export default function SectionSleep() {
  return (
    <section className={styles.container}>
        <h2>¿Quieres quedarte a dormir allí?</h2>
        <ExternalLinkButton className={styles.button} href='https://www.booking.com/searchresults.es.html?aid=303946&label=belmez-z%2A9eYolEtp0kfi90gKAgrQS329846379005%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-359770204033%3Alp9047035%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9Ye7BFAsTyVd6olzyFZA51Co&gclid=CjwKCAjwpOfHBhAxEiwAm1SwEtiWTaBEOZY3-lJD0oW6eFUGlMue7dTnnm7XNd-mOJ0T61Gu38vtbhoCR14QAvD_BwE&dest_type=city&redirected=1&dest_id=-373086&source=city&redirected_from_city=1&keep_landing=1&sid=ee539a0d6cd9b53d20e76d46811a283b&chal_t=1761208072737&force_referer=https%3A%2F%2Fwww.google.com%2F'>Te recomiendo hoteles</ExternalLinkButton>
    </section>
  );
}
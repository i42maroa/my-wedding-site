import SectionVehicle from "@/components/sections/vehicle/SectionVehicle";
import SectionSleep from "@/components/sections/sleep/SectionSleep";
import SectionCeremony from "@/components/sections/ceremony/SectionCeremony";
import SectionQuestions from "@/components/sections/questions/SectionQuestions";
import styles from "./Home.module.css";
import SectionGallery from "@/components/sections/gallery/SectionGallery";
import SectionHeader from "@/components/header/SectionHeader";

export default function Home() {
  return (
    <div className={styles.container}>
        <SectionHeader/>
        <SectionGallery/>
        <SectionCeremony/>
        <SectionVehicle/>
        <SectionSleep/>
        <SectionQuestions/>
    </div>
  );
}

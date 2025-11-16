import Footer from "@/components/footer/Footer";
import SectionVehicle from "@/components/sections/vehicle/SectionVehicle";
import SectionSleep from "@/components/sections/sleep/SectionSleep";
import MainLayout from "@/components/layout/main/MainLayout";
import SectionCeremony from "@/components/sections/ceremony/SectionCeremony";
import SectionQuestions from "@/components/sections/questions/SectionQuestions";
import styles from "./Home.module.css";
import SectionGallery from "@/components/sections/gallery/SectionGallery";

export default function Home() {
  return (
    <div className={styles.container}>
      <MainLayout header>
        <SectionGallery/>
        <SectionCeremony/>
        <SectionVehicle/>
        <SectionSleep/>
        <SectionQuestions/>
      </MainLayout>
      <Footer/>
    </div>
  );
}

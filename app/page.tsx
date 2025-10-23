import styles from "@/app/Home.module.css";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import SectionHeader from "@/components/sections/header/SectionHeader";
import SectionDate from "@/components/sections/date/SectionDate";
import SectionVehicle from "@/components/sections/vehicle/SectionVehicle";
import SectionSleep from "@/components/sections/sleep/SectionSleep";

export default function Home() {
  return (
    <>
      <main className={styles.mainContainer}>
        <SectionHeader></SectionHeader>
        <SectionDate></SectionDate>
        <SectionVehicle></SectionVehicle>
        <SectionSleep></SectionSleep>
      </main>
      <Footer />
    </>
  );
}

import Footer from "@/components/footer/Footer";
import SectionHeader from "@/components/sections/header/SectionHeader";
import SectionDate from "@/components/sections/date/SectionDate";
import SectionVehicle from "@/components/sections/vehicle/SectionVehicle";
import SectionSleep from "@/components/sections/sleep/SectionSleep";
import MainLayout from "@/components/layout/main/MainLayout";

export default function Home() {
  return (
    <>
      <MainLayout>
        <SectionHeader></SectionHeader>
        <SectionDate></SectionDate>
        <SectionVehicle></SectionVehicle>
        <SectionSleep></SectionSleep>
      </MainLayout>
      <Footer />
    </>
  );
}

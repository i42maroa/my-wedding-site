import Footer from "@/components/footer/Footer";
import SectionHeader from "@/components/sections/header/SectionHeader";
import SectionDate from "@/components/sections/date/SectionDate";
import SectionVehicle from "@/components/sections/vehicle/SectionVehicle";
import SectionSleep from "@/components/sections/sleep/SectionSleep";
import MainLayout from "@/components/layout/main/MainLayout";
import SectionCeremony from "@/components/sections/ceremony/SectionCeremony";

export default function Home() {
  return (
    <>
      <MainLayout>
        <SectionHeader></SectionHeader>
        <SectionDate></SectionDate>
        <SectionCeremony></SectionCeremony>
        <SectionVehicle></SectionVehicle>
        <SectionSleep></SectionSleep>
      </MainLayout>
      <Footer />
    </>
  );
}

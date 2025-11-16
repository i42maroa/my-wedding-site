import Footer from "@/components/footer/Footer";
import SectionDate from "@/components/sections/date/SectionDate";
import SectionVehicle from "@/components/sections/vehicle/SectionVehicle";
import SectionSleep from "@/components/sections/sleep/SectionSleep";
import MainLayout from "@/components/layout/main/MainLayout";
import SectionCeremony from "@/components/sections/ceremony/SectionCeremony";
import SectionQuestions from "@/components/sections/questions/SectionQuestions";

export default function Home() {
  return (
    <>
      <MainLayout header>
        {/* <SectionDate/> */}
        <SectionCeremony/>
        <SectionVehicle/>
        <SectionSleep/>
        <SectionQuestions/>
      </MainLayout>
      <Footer/>
    </>
  );
}

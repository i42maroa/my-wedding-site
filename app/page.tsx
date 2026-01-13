import SectionVehicle from "@/components/sections/vehicle/SectionVehicle";
import SectionSleep from "@/components/sections/sleep/SectionSleep";
import SectionCeremony from "@/components/sections/ceremony/SectionCeremony";
import SectionQuestions from "@/components/sections/questions/SectionQuestions";
import SectionGallery from "@/components/sections/gallery/SectionGallery";
import SectionHeader from "@/components/header/SectionHeader";

export default function Home() {
  return (
    <>
        <SectionHeader/>
        <SectionGallery/>
        <SectionCeremony/>
        <SectionVehicle/>
        <SectionSleep/>
        <SectionQuestions/>
    </>
  );
}

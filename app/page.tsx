import SectionVehicle from "@/components/sections/vehicle/SectionVehicle";
import SectionSleep from "@/components/sections/sleep/SectionSleep";
import SectionCeremony from "@/components/sections/ceremony/SectionCeremony";
import SectionQuestions from "@/components/sections/questions/SectionQuestions";
import SectionGallery from "@/components/sections/gallery/SectionGallery";
import SectionHeader from "@/components/sections/header/SectionHeader";
import PreloadCode from "@/components/preload/PreloadCode";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ accessCode?: string }>;
}) {
    
  const { accessCode } = await searchParams;

  return (
    <>
        <PreloadCode accessCode={accessCode}></PreloadCode>
        <SectionHeader/>
        <SectionGallery/>
        <SectionCeremony/>
        <SectionVehicle/>
        <SectionSleep/>
        <SectionQuestions/>
    </>
  );
}

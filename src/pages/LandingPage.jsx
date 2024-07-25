import FrameComponent6 from "../components/FrameComponent6";
import Slidee from "../components/Slidee";
import GalleryWork from "../components/GalleryWork";
import WhoWeAre from "../components/WhoWeAre";
import FrameComponent4 from "../components/FrameComponent4";
import FrameComponent2 from "../components/FrameComponent2";
import Container from "../components/Container";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="w-full h-[356.75rem] relative bg-white overflow-hidden flex flex-col items-end justify-start pt-[0rem] px-[0rem] pb-[67.125rem] box-border leading-[normal] tracking-[normal] lg:h-auto">
      <FrameComponent6 />
      <Slidee />
      <section className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[3.437rem] box-border max-w-full shrink-0 mq825:pb-[1.438rem] mq825:box-border mq1425:pb-[2.25rem] mq1425:box-border">
        <GalleryWork />
        <WhoWeAre />
      </section>
      <FrameComponent4 />
      <div className="w-[55.5rem] h-[78.25rem] relative bg-gainsboro-200 hidden max-w-full z-[4]" />
      <FrameComponent2 />
      <section className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[10.75rem] box-border gap-[4.937rem] max-w-full shrink-0 mq450:gap-[1.25rem] mq825:gap-[2.438rem] mq825:pb-[4.563rem] mq825:box-border mq1425:pb-[7rem] mq1425:box-border">
        <Container />
        <FrameComponent1 />
      </section>
      <section className="flex flex-col items-start self-stretch justify-start max-w-full shrink-0">
        <FrameComponent />
        <Footer/>
      </section>
    </div>
  );
};

export default LandingPage;

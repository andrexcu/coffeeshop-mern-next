import React from "react";
import { kaushan } from "@/app/fonts";
import Separator from "../Common/Separator";
import { Check } from "lucide-react";

const About = () => {
  return (
    <div
      className="relative h-dvh bg-zinc-900 flex justify-center items-center bg-cover"
      style={{
        backgroundImage: 'url("/images/about-us-bg.jpg")',
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
      {/* About */}
      <div className="flex flex-col lg:flex-row justify-center items-center mx-auto min-w-[720px] max-w-[1280px] h-[600px] z-10">
        <div className="flex flex-col items-start justify-start gap-y-4 p-4 w-1/2 h-full text-slate-200 ">
          <p className={`${kaushan.className} text-4xl`}>
            Welcome to Premium Coffee Shop, where every cup tells a story.
          </p>
          <p className="text-lg ">
            Indulge in our carefully crafted brews, blending passion with
            perfection.
          </p>
          <div className="flex gap-x-2 justify-center">
            <div className="mt-2 rounded-full h-5 w-5 border border-orange-200 flex justify-center items-center">
              <Check className="h-4 w-4 text-orange-200" />
            </div>
            <p className="flex">
              Experience the artistry of our baristas, dedicated to delivering
              unparalleled coffee excellence.
            </p>
          </div>
          <div className="flex gap-x-2 justify-center">
            <div className="mt-2 rounded-full h-5 w-5 border border-orange-200 flex justify-center items-center">
              <Check className="h-4 w-4 text-orange-200" />
            </div>
            <p className="flex">
              Embrace the richness of flavors sourced from local, sustainable
              farms, fostering community connections.
            </p>
          </div>
          <div className="flex gap-x-2 justify-center">
            <div className="mt-2 rounded-full h-5 w-5 border border-orange-200 flex justify-center items-center">
              <Check className="h-4 w-4 text-orange-200" />
            </div>
            <p className="flex">
              Immerse yourself in a sensory journey, as our signature blends
              dance with aromatic allure, awakening your senses.
            </p>
          </div>
          <p>
            At Premium, we're not just a café; we're a haven for coffee
            enthusiast, a place where each cup is a celebration of quality,
            community, and the love for the perfect brew. Join us in savoring
            life, one exquisite sip at a time.
          </p>
        </div>
        <div
          className="about-img hidden lg:flex items-center justify-center w-1/2 h-full border-2 border-neutral-600 bg-cover mr-4"
          style={{
            backgroundImage: 'url("/images/about-us-img.jpg")',
            backgroundPosition: "center",
          }}
        >
          {/* <div className="h-[550px] w-[580px] "></div> */}
        </div>
      </div>
    </div>
  );
};

export default About;

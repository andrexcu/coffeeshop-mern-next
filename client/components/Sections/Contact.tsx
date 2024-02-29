import { Clock2, Mail, MapPin, Smartphone } from "lucide-react";
import React from "react";
import SectionTitle from "../Common/SectionTitle";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="max-w-7xl w-full mt-12">
      <SectionTitle title="Contact" subtitle="Contact Us" />
      <div className="relative flex justify-center items-center">
        <div className="flex flex-col lg:flex-row justify-center items-start mx-auto max-w-7xl w-full z-10">
          {/* <div className="flex flex-col lg:flex-row z-10 border"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex flex-col items-start justify-start gap-y-12 p-4 w-full lg:w-1/3 text-slate-200 ">
            <div className="flex gap-x-4">
              <div className="flex justify-center items-center bg-orange-300 rounded-full h-12 w-12">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-y-2">
                <p>Location:</p>
                <p className="text-sm font-thin">
                  Tigatto, Buhangin, Davao City
                </p>
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="flex justify-center items-center bg-orange-300 rounded-full h-12 w-12">
                <Clock2 className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-y-2">
                <p>Open Hours:</p>
                <p className="flex flex-col text-sm font-thin">
                  <span>Monday-Saturday:</span>
                  <span>06:00 - 24:00</span>
                </p>
                <p className="flex flex-col text-sm font-thin">
                  <span>Sunday:</span>
                  <span>07:00 - 24:00</span>
                </p>
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="flex justify-center items-center bg-orange-300 rounded-full h-12 w-12">
                <Mail className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-y-2">
                <p>Email:</p>
                <p className="text-sm font-thin">info@prcoffee.com</p>
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="flex justify-center items-center bg-orange-300 rounded-full h-12 w-12">
                <Smartphone className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-y-2">
                <p>Call:</p>
                <p className="text-sm font-thin">+63 9773443205</p>
              </div>
            </div>
          </div>
          <div
            onSubmit={handleSubmit}
            className="sm:grid grid-cols-2 gap-x-4 sm:items-start sm:justify-start  items-center justify-center p-4 gap-6 space-y-6 sm:space-y-0 w-full text-slate-200  border-gray-500"
          >
            <input
              type="text"
              className="text-md p-4 w-full h-10 bg-transparent border border-orange-300 "
              placeholder="Your Name"
            />
            <input
              type="email"
              className="text-md p-4 w-full h-10 bg-transparent border border-orange-300 "
              placeholder="Your Email"
            />
            <input
              type="text"
              className="w-full h-8 bg-transparent border border-orange-300 col-span-2 p-4"
              placeholder="Subject"
            />

            <textarea
              className="p-4 bg-transparent h-56 w-full col-span-2 border-2 border-orange-300"
              style={{ resize: "none" }}
              placeholder="Message"
            ></textarea>
            <button className="text-white w-48 py-2 col-span-2 rounded-full bg-orange-300 transition duration-300 ease-in hover:bg-stone-800">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React from "react";
import SectionLayout from "./layouts/SectionLayout";
import images from "../constants/images/images";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

export const Footer = () => {
  return (
    <SectionLayout className={"bg-gray9"}>
      <footer className=" text-white py-10">
        <div className="w-full flex items-center justify-between py-10 border-b border-[#363B47]">
          <div className="w-1/2 flex flex-col gap-8">
            <h3 className="font-semibold text-4xl">
              Start learning with 67.1k students around the world.
            </h3>
            <div className="flex items-center gap-3 font-medium">
              <button className="bg-primary text-white hover:bg-primary/80 hover:text-primary duration-300 py-2.5 px-4">
                Join the Family
              </button>
              <button className="bg-white/10 text-white hover:bg-black duration-300 py-2.5 px-4">
                Browse all courses
              </button>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-end gap-20">
            <div className="flex flex-col items-start justify-center gap-3">
              <span className="font-semibold text-4xl">6.3k</span>
              <p className="text-gray5 font-medium text-base">Online courses</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <span className="font-semibold text-4xl">26k</span>
              <p className="text-gray5 font-medium text-base">
                Certified Instructor
              </p>
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <span className="font-semibold text-4xl">99.9%</span>
              <p className="text-gray5 font-medium text-base">Sucess Rate</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between py-10 border-b border-[#363B47]">
          <div className="w-1/2 flex flex-col gap-5">
            <div className="w-full">
              <div className="w-[180px] h-[46px]">
                <img
                  src={images.LogoFooter}
                  className="w-full h-full object-cover"
                  alt="Logo"
                />
              </div>
            </div>
            <p className="text-gray5 font-normal text-sm">
              Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
              mattis odio at.
            </p>
            <div className="flex items-center gap-3 font-medium">
              <button className="bg-white/10 text-white hover:bg-black duration-300 py-4 px-4">
                <FaFacebookF />
              </button>
              <button className="bg-white/10 text-white hover:bg-black duration-300 py-4 px-4">
                <FaInstagram />
              </button>
              <button className="bg-primary text-white hover:bg-primary/80 hover:text-primary duration-300 py-4 px-4">
                <FaLinkedinIn />
              </button>
              <button className="bg-white/10 text-white hover:bg-black duration-300 py-4 px-4">
                <FaTwitter />
              </button>
              <button className="bg-white/10 text-white hover:bg-black duration-300 py-4 px-4">
                <FaYoutube />
              </button>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-end gap-20">
            <div className="flex flex-col items-start justify-center gap-3">
              <span className="font-semibold text-lg">Top 4 Category</span>
              <ul className="list-none pl-0 flex flex-col gap-4 text-gray5 font-medium text-sm">
                <li>Development</li>
                <li>Finance & Accounting</li>
                <li>Design</li>
                <li>Business</li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <span className="font-semibold text-lg">Quick Links</span>
              <ul className="list-none pl-0 flex flex-col gap-4 text-gray5 font-medium text-sm">
                <li>About</li>
                <li className="text-white flex items-center gap-5 border-b border-primary">
                  Become Instructor <FaArrowRight />
                </li>
                <li>Contact</li>
                <li>Career</li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <span className="font-semibold text-lg">Support</span>
              <ul className="list-none pl-0 flex flex-col gap-4 text-gray5 font-medium text-sm">
                <li>Help Center</li>
                <li>FAQs</li>
                <li>Terms & Condition</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </SectionLayout>
  );
};

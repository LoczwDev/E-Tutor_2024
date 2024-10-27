import React, { useState } from "react";
import { Link } from "react-scroll";

const TabsScrollDetail = ({ dataTabs }) => {
  const [activeTab, setActiveTab] = useState(dataTabs[0].link);
  const handleChangTab = (item) => {
    setActiveTab(item);
  };

  return (
    <div className="w-full sticky top-0 bg-white z-[50]">
      {/* Tabs */}
      <div className="w-full flex items-center justify-start h-14 border-b border-gray1">
        {dataTabs.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            spy={true}
            smooth={true}
            duration={300}
            offset={-80}
            id={index === 3 ? "step-6" : ""}
            className={`w-1/4 font-medium text-base py-5 h-full text-center flex items-center justify-center cursor-pointer capitalize hover:text-primary/90 duration-300 ${
              activeTab === item.link
                ? "border-b-2 border-primary text-primary"
                : ""
            }`}
            onClick={() => handleChangTab(item.link)}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabsScrollDetail;

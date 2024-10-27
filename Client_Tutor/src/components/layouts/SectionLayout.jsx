import React from "react";

const SectionLayout = ({ children, className }) => {
  return (
    <section className={`py-10 ${className} `}>
      <div className="max-w-[1300px] mx-auto">{children}</div>
    </section>
  );
};

export default SectionLayout;

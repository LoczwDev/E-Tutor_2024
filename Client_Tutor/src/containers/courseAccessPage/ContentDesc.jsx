import React from "react";
import parse from "html-react-parser";
import { Element } from "react-scroll";

const ContentDesc = ({ desc }) => {
  return (
    <Element name="Desc">
      <h3 className="text-2xl font-semibold mb-3">Mô tả bài giảng</h3>
      <div className="w-full text-justify">{parse(desc)}</div>
    </Element>
  );
};

export default ContentDesc;

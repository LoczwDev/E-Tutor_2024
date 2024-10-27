import React from "react";
import { Element } from "react-scroll";
import parse from "html-react-parser";

const ContentNote = ({ notes }) => {
  return (
    <Element name="Note">
      <h3 className="text-2xl font-semibold mb-3">Ghi chú</h3>
      <div className="w-full text-justify">{parse(notes)}</div>
    </Element>
  );
};

export default ContentNote;

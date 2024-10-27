import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import styled from "../../../constants/styles/styles";

const FieldList = ({
  title,
  placeholder,
  fields,
  setFields,
  maxFields = 8,
}) => {
  const handleInputChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  };

  const addNewField = () => {
    if (fields.length < maxFields) {
      setFields([...fields, ""]);
    }
  };

  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="block font-medium text-lg">
          {title} ({fields.length}/{maxFields})
        </h2>
        {fields.length < maxFields && (
          <button
            onClick={addNewField}
            className="text-primary hover:text-primary/70 text-sm font-medium flex items-center"
          >
            + Thêm mới
          </button>
        )}
      </div>

      {fields.map((field, index) => (
        <div key={index} className="w-full mb-4">
          <label className={styled.label}>0{index + 1}</label>
          <div className="w-full flex items-center justify-between gap-3">
            <div className="relative w-full justify-between items-center">
              <input
                value={field}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={placeholder}
                className={styled.input}
                maxLength={150}
              />
              <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xs text-gray5 ml-2">
                {field.length}/150
              </span>
            </div>
            <button
              disabled={fields.length <= 4}
              onClick={() => removeField(index)}
              className="text-error hover:text-primary p-2 disabled:text-gray7"
            >
              <AiOutlineDelete size={20} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FieldList;

import React from "react";

const CurrencyLanguageSelector = () => {
  return (
    <div className="flex items-center gap-4">
      <select className="bg-transparent border-none text-gray5 outline-none p-2">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="VND">VND</option>
      </select>

      <select className="bg-transparent border-none text-gray5 outline-none p-2">
        <option value="en">English</option>
        <option value="vi">Vietnamese</option>
        <option value="jp">Japanese</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
};

export default CurrencyLanguageSelector;

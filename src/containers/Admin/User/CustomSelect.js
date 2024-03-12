import React, { Fragment } from "react";
import Select from "react-select";

// import Button from "@mui/material/Button";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "pear", label: "Pear" },
  { value: "grape", label: "Grape" },
];
export default function CustomSelect(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleMultiSelectChange = (selectedOptions) => {
    console.log(selectedOptions);
    setSelectedOptions(selectedOptions);
  };
  return (
    <div className="content-wrapper mt-2">
      <section className="content">
        <div className="container-fluid">
          <Select
            options={options}
            isMulti
            onChange={handleMultiSelectChange}
            value={selectedOptions}
          />
        </div>
      </section>
    </div>
  );
}

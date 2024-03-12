import React, { Fragment } from "react";
import JoditEditor from "jodit-react";
// import Button from "@mui/material/Button";
import { useState, useRef, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

export function JoditCurrentActivity(props) {
  const valueInitCurrentActivity = useRef("");
  const [contentCurrentActivity, setContentCurrentActivity] = useState("");
  const sendDataCurrentActivity = (content) => {
    props.handleOnChangeCurrentActivityJodit(content);
  };
  return (
    <>
      <JoditEditor
        ref={valueInitCurrentActivity}
        value={contentCurrentActivity}
        // config={config}
        tabIndex={2} // tabIndex of textarea
        onBlur={(e) => setContentCurrentActivity(e)} // preferred to use only this option to update the content for performance reasons
        onChange={(e) => sendDataCurrentActivity(e)}
      />
    </>
  );
}

export function JoditContentSolution(props) {
  const valueInitContentSolution = useRef("");
  const [contentSolution, setContentSolution] = useState("");
  const sendDataContentSolution = (content) => {
    props.handleOnChangeContentSolutionJodit(content);
  };
  return (
    <>
      <JoditEditor
        ref={valueInitContentSolution}
        value={contentSolution}
        // config={config}
        tabIndex={2} // tabIndex of textarea
        onBlur={(e) => setContentSolution(e)} // preferred to use only this option to update the content for performance reasons
        onChange={(e) => sendDataContentSolution(e)}
      />
    </>
  );
}

export function JoditApplySolution(props) {
  const valueInitApplySolution = useRef("");
  const [ApplySolution, setApplySolution] = useState("");
  const sendDataApplySolution = (content) => {
    props.handleOnChangeApplySolutionJodit(content);
  };
  return (
    <>
      <JoditEditor
        ref={valueInitApplySolution}
        value={ApplySolution}
        // config={config}
        tabIndex={2} // tabIndex of textarea
        onBlur={(e) => setApplySolution(e)} // preferred to use only this option to update the content for performance reasons
        onChange={(e) => sendDataApplySolution(e)}
      />
    </>
  );
}

export function JoditEfficient(props) {
  const valueInitEfficient = useRef("");
  const [efficient, setEfficient] = useState("");
  const sendDataEfficient = (content) => {
    props.handleOnChangeEfficientJodit(content);
  };
  return (
    <>
      <JoditEditor
        ref={valueInitEfficient}
        value={efficient}
        // config={config}
        tabIndex={2} // tabIndex of textarea
        onBlur={(e) => setEfficient(e)} // preferred to use only this option to update the content for performance reasons
        onChange={(e) => sendDataEfficient(e)}
      />
    </>
  );
}

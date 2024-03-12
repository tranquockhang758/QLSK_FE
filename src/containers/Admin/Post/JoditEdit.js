import React, { Fragment } from "react";
import JoditEditor from "jodit-react";
// import Button from "@mui/material/Button";
import { useState, useRef, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

export default function JoditEdit(props) {
  const contentJodit = props.contentJodit;

  const valueInit = useRef("");
  const [content, setContent] = React.useState("");
  const sendData = (content) => {
    props.handleOnChangeJodit(content);
  };

  React.useEffect(() => {
    setContent(contentJodit);
  });
  return (
    <>
      <JoditEditor
        ref={valueInit}
        value={content}
        // config={config}
        tabIndex={2} // tabIndex of textarea
        onBlur={(e) => setContent(e)} // preferred to use only this option to update the content for performance reasons
        onChange={(e) => sendData(e, content)}
      />
    </>
  );
}

export function JoditCurrentActivity(props) {
  const contentJodit_1 = props.contentJodit_1;
  const valueInitCurrentActivity = useRef("");
  const [contentCurrentActivity, setContentCurrentActivity] = useState("");
  const sendDataCurrentActivity = (content) => {
    props.handleOnChangeCurrentActivityJodit(content);
  };
  React.useEffect(() => {
    setContentCurrentActivity(contentJodit_1);
  });
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
  const contentJodit_2 = props.contentJodit_2;

  const valueInitContentSolution = useRef("");
  const [contentSolution, setContentSolution] = useState("");
  const sendDataContentSolution = (content) => {
    props.handleOnChangeContentSolutionJodit(content);
  };
  React.useEffect(() => {
    setContentSolution(contentJodit_2);
  });
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
  const contentJodit_3 = props.contentJodit_3;
  const valueInitApplySolution = useRef("");
  const [ApplySolution, setApplySolution] = useState("");
  const sendDataApplySolution = (content) => {
    props.handleOnChangeApplySolutionJodit(content);
  };
  React.useEffect(() => {
    setApplySolution(contentJodit_3);
  });
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
  const contentJodit_4 = props.contentJodit_4;
  const valueInitEfficient = useRef("");
  const [efficient, setEfficient] = useState("");
  const sendDataEfficient = (content) => {
    props.handleOnChangeEfficientJodit(content);
  };
  React.useEffect(() => {
    setEfficient(contentJodit_4);
  });
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

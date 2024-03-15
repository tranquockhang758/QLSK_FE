import { useRef, useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// const MainSpeech = ({ microphoneParentRef, props })
const MainSpeech = () => {
  //Việc thực hiện câu nói dựa trên câu lệnh command
  const [background,setBackground] = useState("none");
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
    {
      command: "change background colour to *",
      callback: (color) => {
        document.body.style.background = color;
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    ,
    {
      command: "change background",
      callback: () => {
        setBackground("green");
      },
    },
    {
      command: "return background",
      callback: () => {
        setBackground("none");
      },
    },
  ];
  //Khi có sự thay đổi dưới transcript => thực hiện truyền data lên cha
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,language:"vi-VN"
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <div className="content-wrapper" style={{background:background}}>

      <div className="microphone-wrapper">
        <div className="microphone-wrapper">
          <div className="mircophone-container">
            <div
              className="microphone-icon-container"
              ref={microphoneRef}
              onClick={handleListing}
            >
              <i className="fas fa-microphone"></i>
            </div>
            <div className="microphone-status">
              {isListening ? "Listening........." : "Click to start Listening"}
            </div>
            {isListening && (
              <button className="microphone-stop btn" onClick={stopHandle}>
                Stop
              </button>
            )}
          </div>
          {transcript && (
            <div className="microphone-result-container">
              <div className="microphone-result-text">{transcript}</div>
              <button className="microphone-reset btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
      <textarea value={transcript}></textarea>
    </div>
  );
};
export default MainSpeech;

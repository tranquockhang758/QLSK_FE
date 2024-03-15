import { useRef, useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
//B1 tạo function connect với redux
// import { toggleOpenShop } from './store/actions';
const MainSpeechHeader = ({ callBackGetListUser,callBackFunction, microphoneParentRef,props }) => {
  const dispatch = useDispatch();


  useEffect(() => {
    microphoneParentRef.current = handleListingFromParent;
  }, [microphoneParentRef.current]);

  function handleListingFromParent() {
    //Click button trong component cha => dưới component con ràng buộc ref => ref này gọi đến hàm
    handleListing();
    setTimeout(() => {
      if (transcript === "") {
        handleReset();
      }
    }, 5000);
  }
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
      command: "nhận dữ liệu",
      callback: () => {
        handleListing();
        callBackFunction(transcript);
      },
    },
    {
      command: "lịch sử sự cố",
      callback: () => {
        handleListing();
        callBackFunction(transcript);
      },
    },
    {
      command: "danh sách người dùng",
      callback: () => {
        handleListing();
        callBackGetListUser(transcript);
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({commands});
  const [isListening, setIsListening] = useState(false);
  // const [background, setBackground] = useState("red")
  const microphoneRef = useRef();
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
      continuous: true,
      language:"vi-VN"
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
    <div className="content-wrapper" >
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
      <textarea value={transcript}></textarea>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isOpen: state.isOpen,
});

const mapDispatch = {
  
};
export default connect(mapStateToProps, mapDispatch)(MainSpeechHeader);

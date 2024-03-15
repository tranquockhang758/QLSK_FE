import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import * as faceapi from "face-api.js"

import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Progress from "../../inc/Progress.js"
import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb.js";
import { jwtDecode } from "jwt-decode";
import LogoutModal from "../../inc/LogoutModal.js";
import  "./FaceId.scss";
export default function FaceId(props) {

    const isMounted = useRef(false);
    const history = useHistory();
    const access_token = useSelector((state) => state.user.access_token);
    const user = useSelector((state) => state.user.userInfo);
    const [isOpenLogoutModal, setIsOpenLogoutModal] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const videoRef = useRef();
    const canvasRef = useRef()



    useEffect(() => {
        let date = new Date();
        let newAccessToken = access_token !== "" ? access_token : "";
        let decodeToken = jwtDecode(newAccessToken);
        //Nếu token hết hạn logout

        if (decodeToken !== "") {
            if (decodeToken.exp > date.getTime() / 1000) {
                isMounted.current = true;
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)

                //Load from useEffect
                startVideo();
                videoRef && loadModels();
                return () => {
                    isMounted.current = false;
                };
            } else if (decodeToken.exp < date.getTime() / 1000) {
                setIsOpenLogoutModal(true);
            }
        }
    }, []);

    const arrLink = handleBuildBreadCrumb();

    //Open webcam 
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            videoRef.current.srcObject = stream;
        }).catch((err) => {
            console.log(err)
        });
    }


    //Load Model from Face Api
    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('../../models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('../../models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('../../models'),
            faceapi.nets.faceExpressionNet.loadFromUri('../../models'),

        ]).then(() => {
            faceMyDetech();
        });
    }
    const faceMyDetech = () => {
        setInterval(async() => {
            // const detections = await faceapi.detectAllFaces(videoRef.current,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);

            //Draw your face  in webcam
            faceapi.matchDimensions(canvasRef.current, {
                width: 650,
                height: 400
            });
            const resized = faceapi.resizeResults(detections, {
                width: 650,
                height: 400
            });
            faceapi.draw.drawDetections(canvasRef.current, resized)
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
            faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
        }, 1000)
    }

    return ( 
        <>   
         <div className="content-wrapper">
      {/* <TableComponent></TableComponent> */}
      <LogoutModal
        className={"modalLogout"}
        isOpenLogoutModal={isOpenLogoutModal}
      />
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">{/* <h1>Thêm mới người dùng</h1> */}</div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                {arrLink &&
                  arrLink.length > 0 &&
                  arrLink.map((item, index) => {
                    return (
                      <Link
                        to={item.link}
                        key={index}
                        className={"breadcrumb-item"}
                      >
                        {item.text}
                      </Link>
                    );
                  })}
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <section className="content">
        <div className="appvite">
          <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
          <canvas ref={canvasRef} width="650" height="400" className="appcanvas"></canvas>
        </div>

      </section>

      
    </div>
        </>
    
    );
}
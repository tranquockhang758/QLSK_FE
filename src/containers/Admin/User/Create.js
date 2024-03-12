import React, { Component } from "react";
import Progress from "../../inc/Progress";

import { breadcrumb } from "../../../utils/constant";
import { connect } from "react-redux";
import "./CreateUser.scss";
import { Link } from "react-router-dom";
// import * as actions from "../../../store/actions/index";
import Thumbnail from "../../../assets/images/image4x6.jpg";
import { toast } from "react-toastify";
import {
  createNewUser,
  handleGetAllCompany,
} from "../../../services/userService";
import bcrypt from "bcryptjs";
import axios from "axios";
import { error } from "../../../utils/constant";
import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";
import _ from "lodash";
import { jwtDecode } from "jwt-decode";
import LogoutModal from "../../inc/LogoutModal.js";

import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./CropImage/setCanvasPreview.js";
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      gender: "",
      passwordBefore: "",
      name: "",
      birthday: "",
      mobile: "",
      thumbnailUrl: "",
      role: "",
      certificate: "",
      motherCompany: "",
      company: "",
      arrCompany: [],
      listCompany: [],
      listMotherCompany: [],
      currentFile: undefined,
      previewImage: undefined,
      image: null,
      showCanvas: false,
      isLoadingPreloader: true,
      isShowPassword: false,
      imageUrl: "",
      isCropImage: false,
      error_image: "",
      naturalWidth: 0,
      naturalHeight: 0,
      progress: 0,

      error_name: {},
      error_email: {},
      error_password: {},
      error_mobile: {},
      error_gender: {},
      error_thumbnailUrl: {},
      error_role: {},
      error_company: {},
      error_motherCompany: {},
      error_certificate: {},
      error_button: {},
      error_birthday: {},

      isOpenLogoutModal: false,

      crops: {
        unit: "%", // Can be 'px' or '%'
        x: 50,
        y: 50,
        width: 50,
        height: 50,
      },
    };
    this.imgRef = React.createRef();
    this.previewCanvasRef = React.createRef();
  }

  handleCheckInput = (data) => {
    let isValid = true;
    let arrInput = [
      "mobile",
      "name",
      "birthday",
      "gender",
      "role",
      // "levelOfAdmin",
      // "position",
      "certificate",
      "motherCompany",
      "company",
      // "department",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!data[arrInput[i]]) {
        isValid = false;
        toast.error("Please to fill " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnChangeSelect = (e, field) => {
    let copyState = { ...this.state };
    copyState[field] = e.target.value;
    this.setState({ ...copyState });
    if (field === "gender") {
      let data = error.gender;
      if (copyState[field] === "") {
        this.setState({ error_gender: data });
      } else {
        this.setState({ error_gender: "" });
      }
    }
    if (field === "role") {
      let data = error.role;
      if (copyState[field] === "") {
        this.setState({ error_role: data });
      } else {
        this.setState({ error_role: "" });
      }
    }
    if (field === "motherCompany") {
      let data = error.motherCompany;
      if (copyState[field] === "") {
        this.setState({ error_motherCompany: data });
      } else {
        this.setState({ error_motherCompany: "" });
      }
    }

    if (field === "company") {
      let data = error.company;
      if (copyState[field] === "") {
        this.setState({ error_company: data });
      } else {
        this.setState({ error_company: "" });
      }
    }

    if (field === "certificate") {
      let data = error.certificate;
      if (copyState[field] === "") {
        this.setState({ error_certificate: data });
      } else {
        this.setState({ error_certificate: "" });
      }
    }
  };
  handleOnchange = (e, field) => {
    let copyState = { ...this.state };
    copyState[field] = e.target.value;
    this.setState({ ...copyState });

    //===========================================Check lỗi name
    if (field === "name") {
      let data = error.name;
      if (copyState[field] === "") {
        this.setState({ error_name: data });
      } else {
        this.setState({ error_name: "" });
      }
    }

    //====================================================Kiểm tra email
    if (field === "email") {
      //Kiểm tra có để trống không
      let length = error.email.length;
      let format = error.email.format;
      let required = error.email.required;
      let data = {
        required: required,
        length: length,
        format: format,
      };
      if (copyState[field] === "") {
        this.setState({ error_email: data });
      } else {
        //Kiểm tra độ dài
        if (copyState[field].length >= 6 && copyState[field].length <= 32) {
          //Kiểm tra format
          //^[A-Za-z0-9_.]{6,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$
          let pattern_email = new RegExp(
            "^[a-zA-Z0-9_.+-]+@gmail.[a-zA-Z0-9-.]+$"
          );
          if (!pattern_email.test(copyState[field])) {
            delete data.length;
            delete data.required;
            this.setState({ error_email: data });
          } else {
            this.setState({ error_email: "" });
          }
        } else {
          delete data.required;
          this.setState({ error_email: data });
        }
      }
    }

    //====================================================Kiểm tra password
    if (field === "passwordBefore") {
      let length = error.password.length;
      let format = error.password.format;
      let required = error.password.required;
      let data = {
        required: required,
        length: length,
        format: format,
      };
      //Kiểm tra có để trống không
      if (copyState[field] === "") {
        this.setState({ error_password: data });
      } else {
        //Kiểm tra độ dài
        if (copyState[field].length >= 8 && copyState[field].length <= 32) {
          delete data.length;
          delete data.required;

          // \w : Kí tự a-zA-Z0-9
          // \W : Tìm kí tự từ a-z, A-Z, 0-9, kể cả _
          // \d :Tìm kí tự là chữ số
          // \s : Kí tự là khoảng trắng
          // + Chứa ít nhất 1 kí tự
          // * Khớp bất kì chuỗi nào
          // ? Its nhất 1 lần xuất hiện
          // ?=n bất kì chuỗi nào theo sau bởi chuỗi chỉ định n
          // + 1 lần
          // * nhiều lần
          // ? Có xuất hiện không
          //Kí tự đặt biệt phía trước có dấu \
          //([\w_!@#$%*]+)
          //1 kí tự  việt hoa đầu, 1 kí tự viết thường,1 kí tự đặc biệt,1 số, không có khoảng trắng
          let pattern_password =
            /^(?=.{8,})(?=.*[A-Z]){1}(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).\S*$/;
          if (!pattern_password.test(copyState[field])) {
            this.setState({ error_password: data });
          } else {
            this.setState({ error_password: "" });
          }
        } else {
          delete data.required;
          this.setState({ error_password: data });
        }
      }
    }

    //====================================================Kiểm tra mobile
    if (field === "mobile") {
      let length = error.mobile.length;
      let format = error.mobile.format;
      let required = error.mobile.required;
      let data = {
        required: required,
        length: length,
        format: format,
      };
      //Kiểm tra có để trống không
      if (copyState[field] === "") {
        this.setState({ error_mobile: data });
      } else {
        //Kiểm tra độ dài
        if (copyState[field].length >= 10 && copyState[field].length <= 11) {
          //Kiểm tra format
          delete data.length;
          delete data.required;
          let pattern_mobile = new RegExp(
            "^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$"
          );
          if (!pattern_mobile.test(copyState[field])) {
            this.setState({ error_mobile: data });
          } else {
            this.setState({ error_mobile: "" });
          }
        } else {
          delete data.required;
          this.setState({ error_mobile: data });
        }
      }
    }

    if (field === "birthday") {
      let required = error.birthday.required;
      let data = {
        required: required,
      };
      //Kiểm tra có để trống không
      if (copyState[field] === "") {
        this.setState({ error_birthday: data });
      } else {
        //Kiểm tra độ dài
        this.setState({ error_birthday: "" });
      }
    }

    if (field === "thumbnailUrl") {
      let data = error.thumbnailUrl;
      if (copyState[field] === "") {
        this.setState({ error_thumbnailUrl: data });
      } else {
        this.setState({ error_thumbnailUrl: "" });
      }
    }

    if (field === "company") {
      let data = error.company;
      if (copyState[field] === "") {
        this.setState({ error_company: data });
      } else {
        this.setState({ error_company: "" });
      }
    }

    //Sau khi cập nhật state ta kiểm tra state email,password ,name,role,birthday
  };
  // const salt = bcrypt.genSaltSync(10);
  // let hashPassword = await bcrypt.hashSync(password, salt);
  // let check = await bcrypt.compareSync(password, user.password);

  HandleCreateUser = async () => {
    let {
      email,
      passwordBefore,
      mobile,
      gender,
      name,
      birthday,
      role,
      certificate,
      motherCompany,
      company,
      thumbnailUrl,
      error_name,
      error_email,
      error_password,
      error_mobile,
      error_gender,
      error_thumbnailUrl,
      error_role,
      error_company,
      error_motherCompany,
      error_certificate,
      error_button,
      error_birthday,
      error_image,
    } = this.state;

    if (
      error_name &&
      error_email &&
      error_password &&
      error_mobile &&
      error_gender &&
      error_thumbnailUrl &&
      error_role &&
      error_company &&
      error_motherCompany &&
      error_certificate &&
      error_birthday &&
      error_image
    ) {
      this.setState({ error_button: error.button });
    } else {
      let salt = bcrypt.genSaltSync(10);
      let hashPassword = await bcrypt.hash(passwordBefore, salt);
      let password = hashPassword;
      let data = {
        email,
        password,
        mobile,
        gender,
        name,
        birthday,
        role,
        certificate,
        motherCompany,
        company,
        thumbnailUrl,
      };
      try {
        console.log(data);
        let access_token = this.props.access_token;
        let res = await createNewUser(data, access_token);
        if (res && res.code === 200) {
          toast.success("Tạo người dùng mới thành công");
          this.setState({
            email: "",
            passwordBefore: "",
            mobile: "",
            gender: "",
            name: "",
            birthday: "",
            role: "",
            certificate: "",
            motherCompany: "",
            company: "",
          });
          this.props.history.push("/admin/list-users");
        } else if (res && res.code !== 200) {
          toast.error(res.message);
          // toast.error("Create new user unsuccessfully", res.message);
        } else {
          toast.error(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  setSelectedImage = (e) => {
    let files = e.target.files[0];
    this.setState({ image: e.target.files[0] });
    //Tai đây kiểm tra file
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      //Tạo đối tượng image mới
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || Thumbnail;
      //Set image url

      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth > 113 && naturalHeight > 151) {
          this.setState({
            error_image: "Vui lòng chọn ảnh 3x4",
          });
        }
      });
      this.setState({ imageUrl: imageUrl });
    });

    //Tạo preview
    reader.readAsDataURL(files);
  };
  handleGetAllCompany = async () => {
    let access_token = this.props.access_token;
    let res = await handleGetAllCompany(access_token);
    if (res && res.code === 200) {
      this.setState({ isLoadingPreloader: false });
      this.setState({ listCompany: res.data });
      //Xử lí lấy công ty mẹ
      if (this.state.listCompany.length > 0) {
        let arrMotherCompany = [];
        let arrCompany = [];
        this.state.listCompany.map((item, index) => {
          //Duyệt mãng và chạy vòng for để check xem phần tử nào chứa trong mãng
          arrMotherCompany.push(item.motherCompany);
          arrCompany.push(item.company);
        });
        //Xử lí lấy công ty me
        if (arrMotherCompany.length > 0) {
          let newArrMotherCompany = [];
          for (let i = 0; i < arrMotherCompany.length; i++) {
            if (!newArrMotherCompany.includes(arrMotherCompany[i])) {
              newArrMotherCompany.push(arrMotherCompany[i]);
            }
          }
          this.setState({
            listMotherCompany: newArrMotherCompany,
          });
        }

        //Xử lí lấy công ty con
        if (arrCompany.length > 0) {
          let newArrCompany = [];
          for (let i = 0; i < arrCompany.length; i++) {
            if (!newArrCompany.includes(arrCompany[i])) {
              newArrCompany.push(arrCompany[i]);
            }
          }
          this.setState({
            arrCompany: newArrCompany,
          });
        }
      }
    } else {
      this.setState({ isLoadingPreloader: false });
      console.log(res);
    }
  };
  componentDidMount() {
    let date = new Date();
    let access_token = this.props.access_token ? this.props.access_token : "";
    let decodeToken = jwtDecode(access_token);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        this.handleGetAllCompany();
      } else if (decodeToken.exp < date.getTime() / 1000) {
        this.setState({ isOpenLogoutModal: true });
        // return this.props.history.push("/admin/logout");
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  async uploadImage() {
    if (this.state.image) {
      this.setState({ progress: 0, error_image: "" });
      let avartar = this.state.image;
      let extensions = avartar.name.split(".").pop().toLowerCase();
      let arrImage = ["jpg", "jpeg", "png", "word", "pdf"];
      let size = avartar.size;
      let isExtension = arrImage.includes(extensions);
      if (isExtension) {
        if (size < 10000000) {
          // Tên file có dạng name-time.đuôi file
          // Nếu file năm trong giới hạn cho phép ta đổi tên file đi
          let url = "http://upload.httpbridge.com/upload_image.php";
          const fd = new FormData();
          fd.append("avatar", avartar);
          let res = await axios.post(url, fd, {
            onUploadProgress: (event) => {
              this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
              });
            },
          });
          if (res && res.status === 200 && !res.data.error) {
            console.log(res);
            this.setState({ thumbnailUrl: res.data.url });
          }
        } else {
          this.setState({ error_image: "File có độ lớn nhỏ hơn 2MB" });
        }
        //Nếu đúng đuối file rồi ta tiếp tục kiểm tra tiếp đến size
      } else {
        this.setState({
          error_image: "Đuôi file có dạng:jpg,jpeg,png,word,pdf",
        });
      }
    } else {
      this.setState({ error_image: "Vui lòng chọn file hình cần upload" });
    }
  }
  //======================================================Lấy url ảnh đại diện
  handleGetThumbnailUrl = async () => {
    this.uploadImage();
  };

  handleOnChangeCrop = (pixelCrop, percentCrop) => {
    this.setState({ crops: pixelCrop });
  };
  onLoadImage = (e) => {
    const { width, height } = e.currentTarget;
    // console.log(width);
    const crop = makeAspectCrop(
      {
        unit: "px",
        width: 50,
      },
      1,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    this.setState({
      crops: centeredCrop,
    });
  };
  handleShowPassword = (crop) => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  urltoFile(url, filename, mimeType) {
    try {
      if (url.startsWith("data:")) {
        const arr = url.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[arr.length - 1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        const file = new File([u8arr], filename, {
          type: mime || mimeType,
        });
        return file;
      }
    } catch (e) {
      console.log(e);
    }
  }
  handleCropImage = () => {
    //Khi click vào button mà chưa tải ảnh ta phải check có ảnh chưa
    if (this.state.image.name === "") {
      this.setState({ error_image: "Vui lòng chọn ảnh cần cắt" });
    } else {
      this.setState({ isCropImage: true });
      setCanvasPreview(
        this.imgRef.current,
        this.previewCanvasRef.current,
        convertToPixelCrop(
          this.state.crops,
          this.imgRef.current.width,
          this.imgRef.current.height
        )
      );
      //Khi ta click nút cắt ảnh => thuộc tính sẽ thay đổi thành previewCanvasRef

      //B1 ta chuyển thuộc tính thành dạnh url base64
      let dataUrl = this.previewCanvasRef.current.toDataURL();
      let name = this.state.image ? this.state.image.name : "File-name";

      //Bước 2 ta chuyển thành dạng file list
      let files = this.urltoFile(dataUrl, name, "jpg");
      if (files) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          //Tạo đối tượng image mới
          const imageElement = new Image();
          const imageUrl = reader.result?.toString() || Thumbnail;
          //Set image url

          imageElement.src = imageUrl;
          imageElement.addEventListener("load", (e) => {
            const { naturalWidth, naturalHeight } = e.currentTarget;
            if (naturalWidth > 113 && naturalHeight > 151) {
              this.setState({
                error_image: "Vui lòng chọn ảnh 3x4",
              });
            }
          });
          this.setState({ imageUrl: imageUrl, image: files });
        });

        //Tạo preview
        reader.readAsDataURL(files);
      }
    }
  };
  render() {
    let {
      progress,
      error_name,
      error_email,
      error_password,
      error_company,
      error_certificate,
      error_gender,
      error_mobile,
      error_role,
      error_motherCompany,
      error_thumbnailUrl,

      listMotherCompany,
      arrCompany,
    } = this.state;
    let arrLink = handleBuildBreadCrumb();
    let role = this.props.userInfo.role;
    return (
      <>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <LogoutModal
            className={"modalLogout"}
            isOpenLogoutModal={this.state.isOpenLogoutModal}
          />
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  {/* <h1>Thêm mới người dùng</h1> */}
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    {arrLink &&
                      arrLink.length > 0 &&
                      arrLink.map((item, index) => {
                        let label = item.text;
                        return (
                          <Link
                            to={item.link}
                            key={index}
                            className={"breadcrumb-item"}
                          >
                            {breadcrumb.hasOwnProperty(item.text) ? (
                              <>{breadcrumb[label]}</>
                            ) : (
                              ""
                            )}
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
            <div className="row d-flex">
              {/* //Form ở đây */}
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Thêm tài khoản</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        {/* //==============================================Upload image in Here */}
                        <ReactCrop
                          crop={this.state.crops}
                          keepSelection
                          aspect={1}
                          onChange={(pixelCrop, percentCrop) =>
                            this.handleOnChangeCrop(pixelCrop, percentCrop)
                          }
                          maxWidth={113}
                          style={{ objectFit: "contain" }}
                          // maxHeight={150}
                        >
                          <img
                            ref={this.imgRef}
                            src={
                              this.state.imageUrl
                                ? this.state.imageUrl
                                : Thumbnail
                            }
                            alt={"none"}
                            className="img-thumbnail"
                            onLoad={this.onLoadImage}
                            style={{ maxHeight: "70vh" }}
                          />
                        </ReactCrop>

                        {/* <ImageCrop /> */}
                        <input
                          data-show-upload="false"
                          data-show-caption="true"
                          multiple
                          type="file"
                          className="file d-block"
                          onChange={(e) => {
                            this.setSelectedImage(e);
                          }}
                        />
                        {progress > 0 ? (
                          <div className="progress mt-1">
                            <div
                              className="progress-bar progress-bar-info progress-bar-striped"
                              role="progressbar"
                              aria-valuenow={progress}
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: progress + "%" }}
                            >
                              {progress}%
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <p className="error-image">
                          {this.state.error_image ? this.state.error_image : ""}
                        </p>
                        <p className="size-image">
                          {this.state.naturalWidth && this.state.naturalHeight
                            ? "Width:" + this.state.naturalWidth
                            : ""}
                        </p>

                        <div className="button-task d-flex">
                          <button
                            className="btn-sm btn-primary btn-upload"
                            onClick={this.handleGetThumbnailUrl}
                          >
                            Tải hình
                          </button>
                          <button
                            className=" btn-primary btn-upload ml-1 btn-crop-image"
                            onClick={() => {
                              this.handleCropImage();
                            }}
                          >
                            Cắt hình
                          </button>
                        </div>
                        {this.state.crops && (
                          <canvas
                            ref={this.previewCanvasRef}
                            className="mt-4"
                            style={{
                              display: "none",
                              border: "1px solid black",
                              objectFit: "contain",
                              width: 150,
                              height: 150,
                            }}
                          />
                        )}
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-7">
                        {/* //======================================Họ tên */}
                        <div className="form-group">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="name" className="">
                                Họ tên
                              </label>
                            </div>
                            <div className="col-md-9 col-sm-9">
                              <input
                                name="name"
                                type="text"
                                className={
                                  _.isEmpty(this.state.error_name)
                                    ? "form-control form-name shadow-none"
                                    : "form-control form-name shadow-none active-error"
                                }
                                placeholder="Họ và tên"
                                value={this.state.name}
                                onChange={(e) => {
                                  this.handleOnchange(e, "name");
                                }}
                              />
                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_name) ? (
                                <i className="fa fa-info-circle"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                              {/* //Render lỗi tại đây */}
                              {this.state.error_name &&
                                Object.entries(this.state.error_name).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================Họ tên */}
                        {/* //======================================email */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="inputName" className="">
                                email
                              </label>
                            </div>
                            <div className="col-md-9 col-sm-9 input-email">
                              <input
                                type="text"
                                className={
                                  _.isEmpty(this.state.error_email)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                                placeholder="email"
                                value={this.state.email}
                                onChange={(e) => {
                                  this.handleOnchange(e, "email");
                                }}
                              />

                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_email) ? (
                                <i className="fa fa-info-circle error-info-email"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                              {this.state.error_email &&
                                Object.entries(this.state.error_email).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================email*/}
                        {/* //======================================password */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="inputName" className="">
                                Mật khẩu
                              </label>
                            </div>
                            <div className="col-md-9 col-sm-9 input-password">
                              <input
                                className={
                                  _.isEmpty(this.state.error_password)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                                placeholder="********"
                                value={this.state.password}
                                onChange={(e) => {
                                  this.handleOnchange(e, "passwordBefore");
                                }}
                                type={
                                  this.state.isShowPassword
                                    ? "text"
                                    : "password"
                                }
                              />
                              <i
                                className={
                                  this.state.isShowPassword
                                    ? "fas fa-eye-slash"
                                    : "fas fa-eye"
                                }
                                onClick={this.handleShowPassword}
                              ></i>
                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_password) ? (
                                <i class="fa fa-info-circle error-info-password"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                              {" "}
                              {error_password &&
                                Object.entries(error_password).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================password */}
                        {/* //======================================role*/}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="inputName" className="">
                                Vai trò
                              </label>
                            </div>
                            {/* //Ta render theo role của user */}
                            <div className="col-md-9 col-sm-9 input-select">
                              <select
                                onChange={(e) => {
                                  this.handleOnChangeSelect(e, "role");
                                }}
                                value={this.state.role}
                                className={
                                  _.isEmpty(this.state.error_role)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                              >
                                <option value={""}>Chọn vai trò</option>
                                <option value={"Admin"}>Admin</option>
                                <option value={"Moderator"}>Moderator</option>
                                <option value={"User"}>User</option>
                              </select>
                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_role) ? (
                                <i className="fa fa-info-circle error-select"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                              {this.state.error_role &&
                                Object.entries(this.state.error_role).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================role */}

                        {/* //======================================năm sinh */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="inputName" className="">
                                Năm sinh
                              </label>
                            </div>
                            <div className="col-md-9 col-sm-9">
                              <input
                                type="text"
                                className={
                                  _.isEmpty(this.state.error_birthday)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                                placeholder="dd/mm/yyyy"
                                value={this.state.birthday}
                                onChange={(e) => {
                                  this.handleOnchange(e, "birthday");
                                }}
                              />

                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_birthday) ? (
                                <i class="fa fa-info-circle"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                              {this.state.error_role &&
                                Object.entries(this.state.error_birthday).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================Năm sinh */}
                        {/* //======================================mobile */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="inputName" className="">
                                Số điện thoại
                              </label>
                            </div>
                            <div className="col-md-9 col-sm-9">
                              <input
                                type="text"
                                className={
                                  _.isEmpty(this.state.error_mobile)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                                value={this.state.mobile}
                                onChange={(e) => {
                                  this.handleOnchange(e, "mobile");
                                }}
                              />
                              {!_.isEmpty(this.state.error_mobile) ? (
                                <i class="fa fa-info-circle error-info-mobile"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                              {" "}
                              {this.state.error_mobile &&
                                Object.entries(this.state.error_mobile).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================mobile */}
                        {/* //======================================gender: Gọi API và render cho người dùng*/}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="inputName" className="">
                                Giới tính
                              </label>
                            </div>
                            <div className="col-md-9 col-sm-9 input-select">
                              <select
                                onChange={(e) => {
                                  this.handleOnChangeSelect(e, "gender");
                                }}
                                value={this.state.gender}
                                className={
                                  _.isEmpty(this.state.error_gender)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                              >
                                <option value={""}>Chọn giới tính</option>
                                <option value={"Male"}>Nam</option>
                                <option value={"Female"}>Nữ</option>
                              </select>
                              {!_.isEmpty(this.state.error_gender) ? (
                                <i className="fa fa-info-circle error-select"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                              {this.state.error_gender &&
                                Object.entries(this.state.error_gender).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================gender */}
                        {/* //======================================certificate: Gọi API và render cho người dùng*/}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="inputName" className="">
                                Trình độ chuyên môn
                              </label>
                            </div>
                            <div className="col-md-9 col-sm-9 input-select">
                              <select
                                onChange={(e) => {
                                  this.handleOnChangeSelect(e, "certificate");
                                }}
                                value={this.state.certificate}
                                className={
                                  _.isEmpty(this.state.error_certificate)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                              >
                                <option value={""}>
                                  Chọn trình độ chuyên môn
                                </option>
                                <option value={"College"}>Cao đẳng</option>
                                <option value={"Bachelor"}>Đại học</option>
                                <option value={"Master"}>Thạc sỹ</option>
                                <option value={"Doctor"}>Tiến sỹ</option>
                              </select>
                              {!_.isEmpty(this.state.error_certificate) ? (
                                <i className="fa fa-info-circle error-select"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                              {this.state.error_certificate &&
                                Object.entries(
                                  this.state.error_certificate
                                ).map(([key, value]) => (
                                  <span key={key} className="error">
                                    {value}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                        {/* //======================================certificate */}
                        {/* //======================================motherCompany*/}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="inputName" className="">
                                Công ty trực thuộc
                              </label>
                            </div>
                            <div className="col-md-9 col-sm-9">
                              <select
                                onChange={(e) => {
                                  this.handleOnChangeSelect(e, "motherCompany");
                                }}
                                value={this.state.motherCompany}
                                className={
                                  _.isEmpty(this.state.error_motherCompany)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                              >
                                <option value={""} key={0}>
                                  Chọn công ty trực thuộc
                                </option>
                                {listMotherCompany.map((item, index) => {
                                  return (
                                    <option
                                      value={item}
                                      key={index + 1}
                                      className="d-block"
                                    >
                                      {item}
                                    </option>
                                  );
                                })}
                              </select>
                              {!_.isEmpty(this.state.error_motherCompany) ? (
                                <i className="fa fa-info-circle error-select-motherCompany"></i>
                              ) : (
                                ""
                              )}
                              {this.state.error_motherCompany &&
                                Object.entries(
                                  this.state.error_motherCompany
                                ).map(([key, value]) => (
                                  <span key={key} className="error">
                                    {value}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                        {/* //======================================motherCompany */}
                        {/* //======================================company */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-3 col-sm-3">
                              <label htmlFor="inputName" className="">
                                Nhà máy
                              </label>
                            </div>
                            <div className="col-md-9 col-sm-9">
                              <select
                                onChange={(e) => {
                                  this.handleOnChangeSelect(e, "company");
                                }}
                                value={this.state.company}
                                className={
                                  _.isEmpty(this.state.error_motherCompany)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                              >
                                <option value={""} key={0}>
                                  Chọn công ty
                                </option>
                                {arrCompany.map((item, index) => {
                                  return (
                                    <option
                                      value={item}
                                      key={index + 1}
                                      className="d-block"
                                    >
                                      {item}
                                    </option>
                                  );
                                })}
                              </select>
                              {!_.isEmpty(this.state.error_company) ? (
                                <i className="fa fa-info-circle "></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                              {this.state.error_company &&
                                Object.entries(this.state.error_company).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================company */}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer footer-user">
                    <button
                      className="btn-sm btn-primary btn-add-user"
                      onClick={this.HandleCreateUser}
                      disabled={
                        !error_name &&
                        !error_email &&
                        !error_password &&
                        !error_mobile &&
                        !error_gender &&
                        !error_thumbnailUrl &&
                        !error_role &&
                        !error_company &&
                        !error_motherCompany &&
                        !error_certificate
                          ? true
                          : false
                      }
                    >
                      Thêm người dùng
                    </button>
                    {this.state.error_button &&
                      Object.entries(this.state.error_button).map(
                        ([key, value]) => (
                          <span key={key} className="error">
                            {value}
                          </span>
                        )
                      )}
                  </div>
                  {/* /.card-body */}
                </div>

                {/* /.card */}
              </div>
              {this.state.isLoadingPreloader && <Progress />}
              {/* /.content */}
            </div>
          </section>
          {/* //================================================ProgressIcon */}
        </div>
        {/* /.content-wrapper */}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
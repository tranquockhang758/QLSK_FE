import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import * as actions from "../../../store/actions/index";
import Thumbnail from "../../../assets/images/image4x6.jpg";
import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";
// import _ from "lodash";
import axios from "axios";

import { breadcrumb } from "../../../utils/constant";

class UploadMultiple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      image: null,

      isShowPassword: false,
      error_image: "",
      progress: 0,
      selectedFiles: {},
      multiFile: [],
      multiFileProgress: [],
      _progressInfos: [],
      progressInfos: [],
      error_file: "",
      note_success_file: "",
    };
  }

  setSelectedFile = (e) => {
    let files = e.target.files;
    this.setState({ selectedFiles: files });
  };
  componentDidMount() {
    this.setState({});
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  async uploadImage() {
    let files = this.state.selectedFiles;
    let arrExtensions = ["jpg", "jpeg", "png", "docx", "pdf", "xlsx"];
    // console.log(files);
    for (let i = 0; i < files.length; i++) {
      let extensions = files[i].name.split(".").pop().toLowerCase();
      let isExtension = arrExtensions.includes(extensions);
      let size = files[i].size;
      if (isExtension) {
        //Size có độ dài tối đa 2MB
        if (size < 2000000) {
          // Tên file có dạng name-time.đuôi file
          // Nếu file năm trong giới hạn cho phép ta đổi tên file đi
          let url = "http://upload.httpbridge.com/upload_file.php";
          const fd = new FormData();
          fd.append("avatar", files[i]);
          let res = await axios.post(url, fd, {
            onUploadProgress: (event) => {
              this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
              });
            },
          });
          if (res && res.status === 200) {
            console.log(res);
            this.setState({ note_success_file: "Upload file thành công" });
          }
        } else {
          this.setState({ error_image: "File có độ lớn nhỏ hơn 2MB" });
        }
      } else {
        this.setState({
          error_file: `File ${files[i].name} không nằm trong đuôi file cho phép. Đuôi file có dạng:jpg,jpeg,png,word,pdf, xlsx`,
        });
      }
    }
  }

  //======================================================Lấy url ảnh đại diện
  handleGetFileUrl = async () => {
    this.uploadImage();
  };

  render() {
    let { progress } = this.state;
    let arrLink = handleBuildBreadCrumb();
    return (
      <>
        <>
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h3>Thông tin cá nhân</h3>
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
                              {breadcrumb.hasOwnProperty(item.text)
                                ? breadcrumb[label]
                                : item.text}
                            </Link>
                          );
                        })}
                    </ol>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </section>
            <section className="content ">
              <div className="row d-flex">
                {/* //Form ở đây */}
                <div className="col-md-12">
                  <div className="card card-primary d-flex">
                    <div className="card-header">
                      <h3 className="card-title">Upload nhiều file</h3>
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                          title="Collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-2">
                          {/* //==============================================Upload image in Here */}
                          <img
                            src={this.state.image ? Thumbnail : Thumbnail}
                            alt={"none"}
                            className="img-thumbnail"
                          />
                          <input
                            type="file"
                            multiple
                            className="d-block mt-4"
                            onChange={(e) => {
                              this.setSelectedFile(e);
                            }}
                            accept="*"
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
                            {this.state.error_file ? this.state.error_file : ""}
                          </p>
                          <p className="error-image">
                            {this.state.note_success_file
                              ? this.state.note_success_file
                              : ""}
                          </p>
                          <button
                            className="btn-sm btn-primary btn-upload"
                            onClick={this.handleGetFileUrl}
                          >
                            Tải File
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer footer-user">
                      <button
                        className="btn btn-primary btn-add-user"
                        onClick={this.HandleCreateUser}
                      >
                        Thêm người dùng
                      </button>
                    </div> */}
                    {/* /.card-body */}
                  </div>

                  {/* /.card */}
                </div>
                {/* /.content */}
              </div>
            </section>
          </div>
          {/* /.content-wrapper */}
        </>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadMultiple);

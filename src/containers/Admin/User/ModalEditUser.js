import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ModalEditUser.scss";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import Select from "react-select";
import { languages } from "../../../utils/constant";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      isShowPassword: "",
      listGender: {},
      selectedGender: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({ selectedGender: e.value });
    console.log(this.state.selectedGender);
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      let { language } = this.props;
      if (type === "DOCTORS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName} `;
          let labelEn = `${item.firstName} ${item.lastName} `;
          //   Nếu ngôn ngữ là tiếng việt hiển thị tên theo tiếng việt
          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (
        type === "PRICE" ||
        type === "PROVINCE" ||
        type === "PAYMENT" ||
        "GENDER"
      ) {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          //   Nếu ngôn ngữ là tiếng việt hiển thị tên theo tiếng việt
          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY" || type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          //   Nếu ngôn ngữ là tiếng việt hiển thị tên theo tiếng việt
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  componentDidMount() {
    let user = this.props.current_user;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  //Hàm toggle gọi đến props là this.props.isShowModal để toggle bit isShowModal dẫn đến ẩn hiện Modal
  toggle = () => {
    this.props.toggleModalEditUserFromParent();
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };
  handleCheckInput = () => {
    let isValid = true;
    let arrInput = ["email", "firstName", "lastName", "address", "phoneNumber"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleShowPassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  handleEditUserFromChild = () => {
    let isValid = this.handleCheckInput();
    if (isValid === true) {
      this.props.handleEditUserFromParent(this.state);
    }
  };
  render() {
    let { listGender } = this.props;
    return (
      <>
        <div>
          <Button color="danger btn" onClick={this.toggle}>
            {this.props.buttonLabel}
          </Button>
          <Modal
            isOpen={this.props.isShowModalEditUser}
            toggle={this.toggle}
            className={this.props.className}
            size="lg"
          >
            <ModalHeader toggle={this.toggle}>
              <FormattedMessage id="user.Edit-user" />
            </ModalHeader>
            <ModalBody>
              <div className="container">
                <div className="row">
                  {/* UserName======================================================= */}
                  <div className="col-md-6 form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          @
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-label="email"
                        aria-describedby="basic-addon1"
                        onChange={(e) => this.handleOnChangeInput(e, "email")}
                        value={this.state.email}
                      />
                    </div>
                  </div>
                  {/* UserName======================================================= */}
                  {/* password======================================================= */}
                  <div className="col-md-6 form-group input-password">
                    <div className="input-group mb-3 password">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          #
                        </span>
                      </div>
                      <input
                        type={this.state.isShowPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="********"
                        aria-label="password"
                        aria-describedby="basic-addon1"
                        onChange={(e) =>
                          this.handleOnChangeInput(e, "password")
                        }
                        value={this.state.password}
                        disabled
                      />
                    </div>
                    <i
                      className={
                        this.state.isShowPassword
                          ? "fas fa-eye"
                          : "fas fa-eye-slash"
                      }
                      onClick={this.handleShowPassword}
                    ></i>
                  </div>
                  {/* password======================================================= */}
                  {/* firstName======================================================= */}
                  <div className="col-md-6 form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <FormattedMessage id="user.firstName" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Khang"
                        aria-label="firstName"
                        aria-describedby="basic-addon1"
                        onChange={(e) =>
                          this.handleOnChangeInput(e, "firstName")
                        }
                        value={this.state.firstName}
                      />
                    </div>
                  </div>
                  {/* firstName======================================================= */}
                  {/* lastName======================================================= */}
                  <div className="col-md-6 form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <FormattedMessage id="user.lastName" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tran"
                        aria-label="lastName"
                        aria-describedby="basic-addon1"
                        onChange={(e) =>
                          this.handleOnChangeInput(e, "lastName")
                        }
                        value={this.state.lastName}
                      />
                    </div>
                  </div>
                  {/* lastName======================================================= */}
                  {/* address======================================================= */}
                  <div className="col-md-6 form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <FormattedMessage id="user.address" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="116 8/3 Street"
                        aria-label="address"
                        aria-describedby="basic-addon1"
                        onChange={(e) => this.handleOnChangeInput(e, "address")}
                        value={this.state.address}
                      />
                    </div>
                  </div>
                  {/* address======================================================= */}
                  {/* phoneNumber======================================================= */}
                  <div className="col-md-6 form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <FormattedMessage id="user.numberPhone" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0367xxxxxx"
                        aria-label="phoneNumber"
                        aria-describedby="basic-addon1"
                        onChange={(e) =>
                          this.handleOnChangeInput(e, "phoneNumber")
                        }
                        value={this.state.phoneNumber}
                      />
                    </div>
                  </div>
                  {/* phoneNumber======================================================= */}

                  {/* gender======================================================= */}
                  <div className="form-group col-6">
                    <label htmlFor="">
                      <FormattedMessage id="user.gender" />
                    </label>

                    {/* //Gồm value-label => handleOnChange ta lấy value */}
                    <Select
                      value={this.state.selectedGender}
                      onChange={(e) => {
                        this.handleOnChange(e);
                      }}
                      options={this.props.listGender}
                    />
                  </div>
                  {/* gender======================================================= */}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="save"
                onClick={this.handleEditUserFromChild}
              >
                <FormattedMessage id="user.save-changes" />
              </Button>
              <Button color="secondary" className="close" onClick={this.toggle}>
                <FormattedMessage id="user.cancel" />
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gender: state.admin.gender,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
